const SomeList = ({someItem}) => {
  if(someItem === undefined){
    return <div>アイテムが存在しません</div>
  }
  return <div>{someItem}</div>
}


const ItemNotFound = () => <div>アイテムが存在しません</div>
const Item = ({someItem}) => <div>{someItem}</div>

const SomeList = ({someItem}) => {
  if(someItem === undefined){
    return <ItemNotFound />
  }
  return <Item someItem={someItem} />
}


const SomeList = ({someItem}) => {
  if(someItem === undefined){
    return <div>
      <Mecha>
        <Sugoi>
          <Decoration>
          アイテムが存在しません
          </Decoration>
        </Sugoi>
      </Mecha>
    </div>
  }
  if(someItem === "fuga"){
    return <div>アイテムがfugaです</div>
  }
  return <div>
    <Sugoi>
      <Mendokusai>
        <Decoration>
          {someItem}
        </Decoration>
      </Mendokusai>
    </Sugoi>
  </div>
}

const SomeForm = ({name, onChangeName, mail, onChangeMail onSubmit}) => {
  return <from>
    <div>
      <label>
        Name: <input onChange={onChangeName} name={name} />
      </label>
      <label>
        Email: <input onChange={onChangeMail} name={mail} />
      </label>
    </div>
    <input type={onSubmit} value={"send"} />
  </from>
}

const SomeInput = ({name, onChangeName, mail, onChangeMail}) => {
  return <div>
    <label>
      Name: <input onChange={onChangeName} name={name} />
    </label>
    <label>
      Email: <input onChange={onChangeMail} name={mail} />
    </label>
  </div>
}
const SomeSendButton = ({onSubmit}) => {
  return <input type={onSubmit} value={"send"} />
}

const SomeForm = (props) => {
  return <from>
    <SomeInput {...props} />
    <SomeSendButton {...props} />
  </from>
}