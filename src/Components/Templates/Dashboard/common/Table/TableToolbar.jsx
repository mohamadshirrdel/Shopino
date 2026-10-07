const TableToolbar = ({ useFlexBetween, children }) => {
  return (
    <div
      className={`${useFlexBetween ? "flex items-center justify-between" : null} min-h-16 px-10! border-b border-zinc-200`}
    >
      {children}
    </div>
  );
};

export default TableToolbar;
