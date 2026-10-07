import { useProductComments } from "../../../../../lib/Hooks/useProductComments";
import { useEffect, useRef } from "react";
import Comment from "../../../../Common/Cards/Comment";
import AiOverview from "./Fragments/AiOverview";
import CreateComment from "./Fragments/CreateComment";

const ProductComments = ({ productId }) => {
  const { comments, isLoadingMore, hasNextPage, loadMoreComments } =
    useProductComments(productId);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting && hasNextPage && !isLoadingMore) {
          loadMoreComments();
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isLoadingMore, hasNextPage]);

  return (
    <section id="product-comments" className="space-y-8">
      <h4 className="text-lg text-slate-700 font-black">نظرات کاربران</h4>
      <AiOverview />

      <div
        id="comments-container"
        className="grid grid-cols-8 *:w-full gap-5 *:p-4"
      >
        <CreateComment productId={productId} />

        <div className="col-span-5 ">
          {/* All Comments */}
          <div id="comments-content" className="pt-0! space-y-5">
            {comments?.map((comment) => (
              <Comment key={comment._id} {...comment} />
            ))}
          </div>

          <div
            ref={loadMoreRef}
            className="h-10 flex items-center justify-center"
          >
            {isLoadingMore && (
              <span className="mt-5 text-sm text-slate-500">
                در حال دریافت کامنت های بیشتر
              </span>
            )}

            {!hasNextPage && comments.length > 0 && (
              <span className="mt-5 text-sm text-slate-500">
                همه کامنت‌ها نمایش داده شدن.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductComments;
