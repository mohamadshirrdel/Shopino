import { FaMinus, FaPlus } from "react-icons/fa6";

const Entity = ({ count, onCountChange, isUpdating }) => {
  const buttonCSS =
    "size-8 rounded-md bg-white flex-center border border-neutral-200 text-slate-600";

  return (
    <div className="flex-center gap-5">
      <button
        className={buttonCSS}
        disabled={isUpdating}
        onClick={() => onCountChange(count - 1)}
      >
        <FaMinus />
      </button>

      <p>{Number(count).toLocaleString("fa-IR")} عدد</p>

      <button
        className={buttonCSS}
        disabled={isUpdating}
        onClick={() => onCountChange(count + 1)}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default Entity;
