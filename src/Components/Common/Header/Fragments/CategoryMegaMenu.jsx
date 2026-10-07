import { useState } from "react";
import { TbCategory, TbChevronLeft } from "react-icons/tb";
import { Link } from "react-router";
import useCategories from "./../../../../lib/Hooks/useCategories";
import useSubCategories from "../../../../lib/Hooks/useSubCategories";

const CategoryMegaMenu = () => {
  const { categories, isLoading } = useCategories();

  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const { subCategories } = useSubCategories();

  const activeSubCategories = subCategories.filter(
    (subCategory) => subCategory.parent === activeCategory?._id,
  );

  const handleClose = () => setIsOpen(false);

  const handleOpen = () => {
    setIsOpen(true);

    if (categories.length && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  };

  return (
    <div
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      className="relative!"
    >
      <button className="flex! items-center! gap-1! text-shadow-teal-800 font-medium">
        <TbCategory />
        <span>دسته‌بندی کالاها</span>
      </button>

      {isOpen && !isLoading && categories.length > 0 && (
        <div className="absolute! top-full! right-0! pt-2! z-50! w-screen! max-w-5xl!">
          <div className="flex! items-stretch! bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden max-h-[70vh]!">
            <ul className="flex! flex-col! gap-0! w-56! shrink-0! border-l border-slate-100 py-3! overflow-y-auto!">
              {categories.map((category) => (
                <li
                  onMouseEnter={() => setActiveCategory(category)}
                  key={category._id}
                >
                  <Link
                    to={`/category/${category.slug}`}
                    className={`flex! items-center! justify-between! gap-2! px-4! py-2.5! text-sm transition-colors ${
                      activeCategory?._id === category._id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{category.title}</span>
                    <TbChevronLeft className="text-xs opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex-1! p-6! overflow-y-auto!">
              {activeSubCategories.length > 0 ? (
                <div className="grid! grid-cols-4! gap-x-6! gap-y-4! items-start!">
                  {activeSubCategories.map((sub) => (
                    <div key={sub._id} className="flex! flex-col! gap-0!">
                      <Link
                        to={`/category/${activeCategory.slug}/${sub.slug}`}
                        className="flex! items-center! gap-1! text-sm font-bold text-slate-800 hover:text-blue-600 pb-2! mb-2! border-b border-slate-100"
                      >
                        <TbChevronLeft className="text-xs" />
                        <span>{sub.title}</span>
                      </Link>

                      <ul className="flex! flex-col! gap-1.5!">
                        <li>
                          <Link
                            to={`/category/${activeCategory.slug}/${sub.slug}`}
                            className="text-xs text-slate-500 hover:text-blue-600"
                          >
                            مشاهده محصولات
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-400">
                  زیردسته‌ای برای این دسته‌بندی وجود ندارد.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMegaMenu;
