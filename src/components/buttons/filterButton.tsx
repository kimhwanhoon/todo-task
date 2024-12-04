import clsx from 'clsx';

interface Props {
  textColor?: string;
  backgroundColor?: string;
  children: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
}

export const FilterButton = ({
  textColor = '#222',
  backgroundColor = 'white',
  children,
  type = 'button',
  onClick,
  className,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx([
        // base
        'p-2 rounded-md border border-[#DEE2E5]',
        // added className
        className,
      ])}
      style={{ backgroundColor, color: textColor }}
    >
      {children}
    </button>
  );
};
