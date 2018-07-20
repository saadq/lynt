import React from 'react'

// Should trigger jsx-no-string-ref
function App() {
  return <h1 ref="string-ref">My App</h1>
}

export default App
