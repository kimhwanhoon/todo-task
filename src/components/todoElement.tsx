import { Todo } from '../types/todo';
import { Checkbox } from './input/checkbox';

interface Props {
  todo: Todo;
  onChange: () => void;
  onDelete: () => void;
}

export const TodoElement = ({ todo, onChange, onDelete }: Props) => {
  const textColor = todo.completed ? 'text-[#15A2B8]' : 'text-[#6D747D]';
  return (
    <li
      className="flex gap-2 items-center cursor-pointer group"
      onClick={onChange}
    >
      <Checkbox checked={todo.completed} onChange={onChange} />
      <span className={`${textColor} flex-1`}>{todo.title}</span>
      <span
        className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        x
      </span>
    </li>
  );
};
