import { toPersianDate } from "../../../../lib/helpers/date";
import Message from "./Fragments/Message";
import UserProfile from "./Fragments/UserProfile";

const Comment = ({ content, createdAt, user }) => {

  return (
    <article className="p-4 space-y-3 rounded-lg border border-slate-200 py-6">
      <div className="flex-between">
        <UserProfile {...user} />
        <div className="text-xs text-slate-400">
          {createdAt && toPersianDate(createdAt)}
        </div>
      </div>
      <Message message={content} />
    </article>
  );
};

export default Comment;
