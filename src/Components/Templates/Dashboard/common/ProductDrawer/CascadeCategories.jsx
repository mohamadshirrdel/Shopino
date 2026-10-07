import { useState } from "react";

const CascadeCategories = ({ categories, onChange }) => {
  const [path, setPath] = useState([]);
  const levels = [categories, ...path.map((cat) => cat.subCategories || [])];

  const handelSelect = (levelIndex, id) => {
    const option = levels[levelIndex];
    const node = option.find((cat) => cat._id === id);
    const newpath = [...path.slice(0, levelIndex), node];
    setPath(newpath);

    const isLeaf = !node.subCategories || node.subCategories.length === 0;
    onChange(isLeaf ? node : null);
  };

  return (
    <div className="space-y-3">
      {levels.map((options, index) => {
        if (!options || options.length === 0) return null;
        return (
          <select
            value={path[index]?._id || ""}
            onChange={(e) => handelSelect(index, e.target.value)}
            key={index}
            className="w-full h-10 text-sm rounded-md outline-none primary-border px-3 bg-white"
          >
            <option value="" disabled>
              انتخاب دسته‌بندی
            </option>
            {options?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.title}
              </option>
            ))}
          </select>
        );
      })}
    </div>
  );
};

export default CascadeCategories;
