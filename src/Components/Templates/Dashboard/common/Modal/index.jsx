import { HiX } from "react-icons/hi";

const index = ({ isOpen, children, title, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between border-b border-zinc-200 p-4 sticky top-0 bg-white">
          <p className="font-medium">{title}</p>
          <button onClick={onClose} className="text-zinc-600">
            <HiX className="size-6" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default index;
