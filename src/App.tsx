import type { Filter, Todo } from './types/todo';
import clsx from 'clsx';
import { v4 } from 'uuid';
import { useCallback, useState } from 'react';
import { TextInput } from './components/input/textInput';
import { ChevronRight } from './assets/ChevronRight';
import { FilterButton } from './components/buttons/filterButton';
import { useGetTodos } from './hooks/getTodos';
import { TodoElement } from './components/todoElement';

function App() {
  const { todos, isLoading, refetch, error } = useGetTodos();
  const [currentFilter, setCurrentFilter] = useState<Filter>('all');
  const [inputValue, setInputValue] = useState('');

  const handleFilter = (filter: Filter) => {
    setCurrentFilter(filter);
  };

  const handleAddTodo = useCallback(
    async ({
      e,
      title,
    }: {
      e?: React.FormEvent<HTMLFormElement>;
      title: string;
    }) => {
      e?.preventDefault();

      try {
        const newTodo = {
          id: v4(),
          title,
          completed: false,
        };

        await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
          method: 'POST',
          body: JSON.stringify(newTodo),
        });

        refetch();
        setInputValue('');
      } catch (error) {
        console.log(error);
        // error handling
      }
    },
    [refetch]
  );

  const todoStatusChangeHandler = useCallback(
    async (id: string, todos: Todo[]) => {
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
    },
    [refetch]
  );

  const todoDeleteHandler = useCallback(
    async (id: string) => {
      if (!confirm('Are you sure you want to delete this todo?')) return;
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}`, {
          method: 'DELETE',
        });
        refetch();
      } catch (error) {
        console.log(error);
      }
    },
    [refetch]
  );

  return (
    <main className="h-dvh flex flex-col justify-center items-center">
      <div className="space-y-4">
        <form
          className="space-y-4"
          onSubmit={(e) => handleAddTodo({ e, title: inputValue })}
        >
          {/* Input */}
          <TextInput
            value={inputValue}
            onChange={setInputValue}
            classNames={{ container: 'w-[285px]' }}
            rightSection={
              <ChevronRight
                size={20}
                className={clsx([
                  // base
                  'cursor-pointer',
                  // hover
                  'hover:scale-110 duration-300 ease-in-out hover:border-gray-500 hover:border-2',
                ])}
                onClick={() => handleAddTodo({ title: inputValue })}
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

        {/* Todos */}
        <section className="space-y-2">
          {/* Loading and Error States */}
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error occurred while fetching todos</p>
          ) : null}

          {/* Todos list*/}
          <div className="p-4 shadow-sm shadow-gray-400 rounded-md">
            {(() => {
              const filteredTodos = todos.filter((todo) => {
                if (currentFilter === 'active') return !todo.completed;
                return true;
              });

              if (filteredTodos.length === 0) {
                return (
                  <p className="text-gray-500 text-center">No todos found</p>
                );
              }

              return (
                <ul className="space-y-2">
                  {filteredTodos.map((todo) => (
                    <TodoElement
                      key={todo.id}
                      todo={todo}
                      onChange={() => todoStatusChangeHandler(todo.id, todos)}
                      onDelete={() => todoDeleteHandler(todo.id)}
                    />
                  ))}
                </ul>
              );
            })()}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
