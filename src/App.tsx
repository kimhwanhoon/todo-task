import { useCallback, useState } from 'react';
import { TextInput } from './components/input/textInput';
import { ChevronRight } from './assets/ChevronRight';
import { FilterButton } from './components/buttons/filterButton';
import { Filter } from './types/todo';
import { v4 } from 'uuid';
import { useGetTodos } from './hooks/getTodos';
import { TodoElement } from './components/todoElement';

function App() {
  const { todos, isLoading, refetch, error } = useGetTodos();
  const [currentFilter, setCurrentFilter] = useState<Filter>('active');
  const [inputValue, setInputValue] = useState('');

  const handleFilter = (filter: 'all' | 'active') => {
    setCurrentFilter(filter);
  };

  const handleAddTodo = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, title: string) => {
      e.preventDefault();

      const newTodo = {
        id: v4(),
        title,
        completed: false,
      };

      await fetch('http://localhost:3001/todo', {
        method: 'POST',
        body: JSON.stringify(newTodo),
      });

      refetch();
    },
    [todos]
  );

  const todoStatusChangeHandler = async (id: string) => {
    try {
      const prevTodos = structuredClone(todos);
      const targetTodo = prevTodos.find((todo) => todo.id === id);
      if (targetTodo) {
        targetTodo.completed = !targetTodo.completed;
      }
      await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(targetTodo),
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-dvh flex flex-col justify-center items-center">
      <div>
        <form
          className="space-y-4"
          onSubmit={(e) => handleAddTodo(e, inputValue)}
        >
          <TextInput
            value={inputValue}
            onChange={setInputValue}
            classNames={{ container: 'w-[285px]' }}
            rightSection={
              <ChevronRight
                size={20}
                className="cursor-pointer hover:scale-110 duration-300 ease-in-out hover:border-gray-500 hover:border-2"
              />
            }
          />

          {/* Filter Buttons */}
          <section className="flex gap-2">
            {/* Show All button */}
            <FilterButton
              className="flex-1"
              backgroundColor={currentFilter === 'all' ? '#15A2B8' : 'white'}
              textColor={currentFilter === 'all' ? 'white' : '#222'}
              onClick={() => handleFilter('all')}
            >
              Show All
            </FilterButton>

            {/* Hide Completed button */}
            <FilterButton
              className="flex-1"
              backgroundColor={currentFilter === 'active' ? '#15A2B8' : 'white'}
              textColor={currentFilter === 'active' ? 'white' : '#222'}
              onClick={() => handleFilter('active')}
            >
              Hide Completed
            </FilterButton>
          </section>
          {/* End of Filter Buttons */}
        </form>

        <section className="space-y-2">
          {/* Loading and Error States */}
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error occurred while fetching todos</p>
          ) : null}

          {/* Todos */}
          <div className=" p-4 shadow-sm shadow-gray-400 rounded-md">
            {todos.length > 0 && (
              <ul>
                {todos.map((todo) => (
                  <TodoElement
                    key={todo.id}
                    todo={todo}
                    onChange={() => todoStatusChangeHandler(todo.id)}
                  />
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
