function App() {
  const handleAddTodo = async () => {
    await fetch('http://localhost:3001/todo', {
      method: 'POST',
      body: JSON.stringify({ title: 'New Todo' }),
    })
  }
  return (
    <main>
      <button className="p-2 bg-blue-500 text-white" onClick={handleAddTodo}>
        Add Todo
      </button>
    </main>
  )
}

export default App
