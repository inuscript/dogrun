const assert = require("assert")
const { groupBy, mapValues } = require("lodash")
const { normalize, schema, denormalize } = require("normalizr")
const mydeno = require("./index")
const areasData = [
  { id: 1, name: "tohoku" },
  { id: 2, name: "kanto" },
]
const prefsData = [
  { id: 1, name: "aomori", areaId: 1 },
  { id: 2, name: "akita", areaId: 1 },
  { id: 3, name: "tokyo", areaId: 2 }
]

const createMockState = () => {
  const areas = [new schema.Entity("areas")]
  const prefs = [new schema.Entity("prefs")]
  return Object.assign({},
    normalize(areasData, areas).entities,
    normalize(prefsData, prefs).entities
  )
}
const connectSchema = (state, entity) => {

}

describe("", () => {
  // it("1", () => {
  //   const state = createMockState()
  //   const entity = {
  //     areas: [new schema.Entity("areas", {
  //       prefs: new schema.Entity("prefs") 
  //     })],
  //     prefs: [new schema.Entity("prefs", {
  //       areaId: new schema.Entity("areas")
  //     })]
  //   }
  //   const de = denormalize({ areas: [1] }, entity, state)
  
  //   console.log(state)
  //   console.log(de)
  // })

  // it("connect", () => {
  //   const state = createMockState()

  // })
  // it("1", () => {
  //   const state = createMockState()
  //   const areaGrouped = groupBy(state.prefs, "areaId")
  //   const expand = (data, fn) => {
  //     return Object.values(data).map( item => {
  //       return Object.assign({},  
  //         item,
  //         fn(item)
  //       )
  //     })
  //   }
  //   const result = expand(state.areas, (area) => {
  //     return { prefs: areaGrouped[area.id] }
  //   })
  //   const exp = [{"id":1,"name":"tohoku","prefs":[{"id":1,"name":"aomori","areaId":1},{"id":2,"name":"akita","areaId":1}]},{"id":2,"name":"kanto","prefs":[{"id":3,"name":"tokyo","areaId":2}]}]
  //   assert.deepEqual(result ,exp)
  // })
  it("lib", () => {
    const state = createMockState()
    const pref = new schema.Entity("prefs", {
      areaId: new schema.Entity("areas")
    })
    const area = new schema.Entity("areas", {
      prefs: [pref]
    })
    const entity = {
      areas: area
    }
    const de = mydeno({ areas: [1] }, entity, state)

  })
  // it("2", () => {
  //   const prefs = [new schema.Entity("prefs")]
  //   const areas = [new schema.Entity("areas", {
  //     prefs
  //   })]
  //   const state = normalize({ areas: areasData, prefs: prefsData}, {
  //     areas, prefs
  //   })

  //   console.log(state.entities)
  // })
})