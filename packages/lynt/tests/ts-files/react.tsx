interface Props {
  name: String
  age: number
}

function Person(props: Props) {
  return (
    <div>
      <h1 ref="heading">My name is {props.name}</h1>
      <h2>My age is {props.age}</h2>
    </div>
  )
}

export default Person
