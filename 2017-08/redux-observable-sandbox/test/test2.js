const { Observable } = require("rxjs")
const assert = require("assert")
const { combineEpics, createEpicMiddleware } = require("redux-observable")
const testSubject = require("./testHelper")

// Creates an action that cancels typingIndication for that sender,
//  but is not broadcast to other nodes
const createCancelActionFor = typingSender => ({
    type: 'Activity.notifyOfTyping',
    payload: {
        sender: typingSender,
        active: false
    },
    meta: { antares: { localOnly: true } }
})

const notifyOfTyping = (payload) => {
    return {
        type: 'Activity.notifyOfTyping',
        payload
    }
}


// Given a senders Id, returns an Observable which emits a
// typing cancellation action when a message comes from that sender
const dismissUponMessageFrom = (action$, typingSender) =>
    action$.ofType('Message.send')
        .filter(newMsgAction => newMsgAction.payload.sender === typingSender)
        .mapTo(createCancelActionFor(typingSender))

// Given a senders Id, returns an observable that in 2500 msec
//   emits an action to turn the indicator off for that sender
const timeoutIndicator = (action$, typingSender) =>
    Observable.timer(2500)
        .mapTo(createCancelActionFor(typingSender))


const epics = {
    notifyOfTyping: action$ =>
        action$.ofType('Activity.type')
            .throttleTime(1000)
            .map(a => notifyOfTyping({
                sender: a.payload.sender
            })),

    dismissTypingV1: action$ => {
        return action$.ofType('Activity.notifyOfTyping')
            .filter(a => a.payload.active === true)
            .switchMap(notifyAction =>
                Observable.race(
                    dismissUponMessageFrom(action$, notifyAction.payload.sender),
                    timeoutIndicator(action$, notifyAction.payload.sender)
                )
            )
    }
}

const rootEpic = combineEpics(
    epics.notifyOfTyping,
    epics.dismissTypingV1
)


describe("Action chain sample",() => {
    it("chain2", (done) => {
        return done()
        const subject = testSubject(rootEpic)

        // kick
        subject.next(createCancelActionFor("aaa"))

        subject
            .do(console.log)
            .subscribe( a => {
                console.log(a)
                done()
            })
        return subject
    })
})
