// @flow

import React from 'react'

type Props = {|
  name: string,
  age: number,
  name: string
|}

function Person({ name, age }: Props) {
  return (
    <div>
      <h1 ref="bad-string-ref">Name: {name}</h1>
      <h1>Age: {age}</h1>
    </div>
  )
}

export default Person
