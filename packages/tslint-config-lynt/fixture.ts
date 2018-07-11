interface Person {
  name: string
  age?: number
}

const person: Person = {
  name: 'Saad'
}

if (person.age) {
} // This should trigger no-empty
