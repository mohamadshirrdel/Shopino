import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useCommentForm } from "./../../../../../../lib/Hooks/useCommentForm";
import AuthContext from "./../../../../../../context/AuthContext";
import StarRating from "./StarRating";

const CreateComment = ({ productId }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(AuthContext);

  const { error, isSubmitting, submit } = useCommentForm(productId, () => {
    toast.success("نظر شما با موفقیت ثبت شد.");
    setContent("");
    setRating(0);
  });

  const handleSubmit = async () => {
    if (!user) {
      toast.error("برای ثبت کامنت باید لاگین کنید", {
        action: {
          label: "ورود به حساب",
          onClick: () =>
            navigate(`/auth?redirect=${encodeURIComponent(location.pathname)}`),
        },
      });
    }

    if (!content.trim()) {
      toast.error("متن نظر را وارد کنید");
      return;
    }

    if (!rating) {
      toast.error("لطفا امتیاز را وارد کنید");
      return;
    }

    await submit({ content, rating });
  };

  return (
    <div className="col-span-3 space-y-3 bg-slate-50 rounded-lg border border-slate-200 max-h-max sticky top-4">
      <div>
        <label
          htmlFor="comment-email"
          className="text-xs select-none cursor-pointer text-slate-500"
        >
          امتیاز شما
        </label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <div>
        <label
          htmlFor="comment-content"
          className="text-xs select-none cursor-pointer text-slate-500"
        >
          متن کامنت{" "}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name="comment-content"
          id="comment-content"
          className="w-full rounded-md border border-slate-200 bg-white mt-1.5 h-[130px]"
        ></textarea>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full text-xs h-10 bg-slate-800 text-white focus-within:ring-4! ring-slate-600/50"
      >
        {isSubmitting ? "در حال ثبت ..." : "ثبت نظر"}
      </button>
    </div>
  );
};

export default CreateComment;
