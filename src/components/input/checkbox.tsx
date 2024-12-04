import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
      className="w-4 h-4 rounded border-gray-300 text-[#0FA3B8] focus:ring-[#0FA3B8] checked:bg-[#0FA3B8] checked:hover:bg-[#0FA3B8] accent-[#0FA3B8]"
    />
  );
};
