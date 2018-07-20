interface Person {
  name: string
  age?: number
}

function printPerson(person: Person) {
  const { name, age = 30 } = person
  console.log(name)
}

export default printPerson
