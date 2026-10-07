import React from "react";

const Variant = ({ name, value }) => {
  return (
    <div className="bg-slate-100/60 p-2 h-18 flex flex-col justify-between rounded-md w-full">
      <p className="text-xs text-slate-500">{name}</p>
      <p className="text-xs font-medium text-slate-700 line-clamp-2">{value}</p>
    </div>
  );
};

export default Variant;
