interface Person {
  name: string
  age?: number
}

function printPerson(person: Person) {
  const { name, age } = person // Should trigger no-unused-variable
  console.log(name)
}

export default printPerson
