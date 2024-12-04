import { useState } from 'react'
import { TextInput } from './components/input/textInput'
import { ChevronRight } from './assets/ChevronRight'

function App() {
  const [todo, setTodo] = useState('')
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = async () => {
    await fetch('http://localhost:3001/todo', {
      method: 'POST',
      body: JSON.stringify({ title: 'New Todo' }),
    })
  }
  return (
    <main>
      <TextInput
        value={inputValue}
        onChange={setInputValue}
        classNames={{ container: 'max-w-[285px]' }}
        rightSection={
          <ChevronRight
            size={20}
            className="cursor-pointer hover:scale-110 duration-300 ease-in-out"
          />
        }
      />
      <button className="p-2 bg-blue-500 text-white" onClick={handleAddTodo}>
        Add Todo
      </button>
    </main>
  )
}

export default App
