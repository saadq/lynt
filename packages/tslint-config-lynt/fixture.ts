interface Person {
  name: string
  age?: number
}

const person: Person = {
  name: 'Saad'
}

// This should trigger no-empty
if (person.age) {
}
