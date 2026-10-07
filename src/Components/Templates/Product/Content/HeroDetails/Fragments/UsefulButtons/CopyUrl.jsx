import { useState } from "react";
import { FaShare } from "react-icons/fa6";
import Tooltip from "../../../../../../Ui/Tooltip";

const CopyUrl = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyUrl = () => {
    const origin = location.origin;
    const pathname = location.pathname;
    const url = origin + pathname;

    navigator.clipboard.writeText(url);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Tooltip text={isCopied ? "با موفقیت کپی شد" : "اشتراک گذاری"}>
      <button
        className="cursor-pointer size-8 text-sm hover:*:text-lg *:duration-150 *:transition-all active:*:text-sm flex-center border border-neutral-300 rounded-lg text-slate-700"
        onClick={copyUrl}
      >
        <FaShare />
      </button>
    </Tooltip>
  );
};

export default CopyUrl;
