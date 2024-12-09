interface Props {
  completedLength: number;
  totalLength: number;
}

export const Progress = ({ totalLength, completedLength }: Props) => {
  const width = totalLength === 0 ? 0 : (completedLength / totalLength) * 100;

  return (
    <div>
      {/* Progress bar */}
      <div className="h-5 w-[285px] border border-black rounded-md">
        <div
          className="h-full bg-[#FFC9C9]"
          style={{ width: `${width}%` }}
        ></div>
      </div>

      {/* Numbers */}
      <div className="flex items-center justify-end">
        <span className="text-sm font-medium text-gray-800">
          {completedLength} / {totalLength}
        </span>
      </div>
    </div>
  );
};
