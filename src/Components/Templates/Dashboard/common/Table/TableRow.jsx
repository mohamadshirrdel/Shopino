import clsx from "clsx";

const TableRow = ({ className, children }) => {
  return (
    <div
      className={clsx(
        "flex relative *:flex *:items-center *:gap-1.5 items-center overflow-visible duration-150 transition-all",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default TableRow;
