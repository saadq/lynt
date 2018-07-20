interface Person {
  name: string
  age?: number
}

const person: Person = {
  name: 'Saad'
}

// Should trigger 'curly'
if (person.age)
  console.log(person.name)
  console.log(person.age)
