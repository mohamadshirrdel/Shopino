import { BiPlus } from "react-icons/bi";
import { HiX } from "react-icons/hi";

const FILTER_TYPES = [
  { value: "selectbox", label: "Select (انتخابی)" },
  { value: "radio", label: "رادیویی" },
];

const FiltersEditor = ({ filters, dispatch }) => {
  const updateOptions = (index, optionValue) => {
    const options = optionValue.split(",").map((option) => option.trim());

    dispatch({
      type: "filters/optionsChange",
      payload: {
        index,
        options,
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-zinc-700">
          فیلترهای دسته‌بندی
        </label>
        <button
          onClick={() =>
            dispatch({
              type: "filters/add",
            })
          }
          type="button"
          className="text-blue-500 text-xs flex items-center gap-1"
        >
          <BiPlus /> افزودن فیلتر
        </button>
      </div>

      <div className="space-y-3">
        {filters.map((filter, index) => (
          <div
            key={index}
            className="border border-zinc-200 rounded-md p-3 space-y-2"
          >
            <div className="flex items-center gap-2">
              <input
                value={filter.name}
                onChange={(e) =>
                  dispatch({
                    type: "filters/fieldChange",
                    payload: {
                      index,
                      field: "name",
                      value: e.target.value,
                    },
                  })
                }
                placeholder="نام فیلتر (مثلا رم)"
                className="flex-1 h-9 text-sm rounded-md outline-none primary-border px-2"
              />
              <button
                onClick={() =>
                  dispatch({
                    type: "filters/remove",
                    payload: { index },
                  })
                }
                type="button"
                className="text-red-500 shrink-0"
              >
                <HiX />
              </button>
            </div>

            <input
              value={filter.slug}
              onChange={(e) =>
                dispatch({
                  type: "filters/fieldChange",
                  payload: {
                    index,
                    field: "slug",
                    value: e.target.value,
                  },
                })
              }
              placeholder="slug (مثلا ram)"
              className="w-full h-9 text-sm rounded-md outline-none primary-border px-2"
            />

            <input
              value={filter.description}
              onChange={(e) =>
                dispatch({
                  type: "filters/fieldChange",
                  payload: {
                    index,
                    field: "description",
                    value: e.target.value,
                  },
                })
              }
              placeholder="توضیح فیلتر"
              className="w-full h-9 text-sm rounded-md outline-none primary-border px-2"
            />

            <select
              value={filter.type}
              onChange={(e) =>
                dispatch({
                  type: "filters/fieldChange",
                  payload: {
                    index,
                    field: "type",
                    value: e.target.value,
                  },
                })
              }
              className="w-full h-9 text-sm rounded-md outline-none primary-border px-2 bg-white"
            >
              <option value="">انتخاب نوع فیلتر</option>

              {FILTER_TYPES.map((filterType, index) => (
                <option key={index} value={filterType.value}>
                  {filterType.label}
                </option>
              ))}
            </select>

            <input
              value={filter.options?.join(", ") || ""}
              onChange={(e) => updateOptions(index, e.target.value)}
              placeholder="گزینه‌ها با کاما جدا کن (مثلا: نو, کهنه, تعمیری)"
              className="w-full h-9 text-sm rounded-md outline-none primary-border px-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltersEditor;
