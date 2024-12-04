import { Todo } from '../types/todo';
import { Checkbox } from './input/checkbox';

interface Props {
  todo: Todo;
  onChange: () => void;
}

export const TodoElement = ({ todo, onChange }: Props) => {
  return (
    <li className="flex justify-between items-center">
      <Checkbox checked={todo.completed} onChange={onChange} />
      <div>{todo.title}</div>
    </li>
  );
};
