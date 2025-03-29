import { Check } from "lucide-react";

interface QuestionBankCardProps {
  question: string;
  answer: string;
  checked?: boolean;
  onToggle?: () => void;
}

export const QuestionBankCard = ({
  question,
  answer,
  checked = false,
  onToggle,
}: QuestionBankCardProps) => {
  return (
    <div className="flex flex-col text-left p-2 w-full bg-white">
      <div className="p-4 flex items-start gap-3">
        <button
          onClick={onToggle}
          className={`rounded-sm p-2 flex items-center justify-center cursor-pointer transition-colors
                ${checked ? "bg-[#FF7233] text-white" : "bg-gray-200 text-gray-400"}`}
        >
          <Check size={10} />
        </button>
        <div className="flex-1">
          <p className="text-[#020c17] font-medium text-base mb-2">
            {question}
          </p>
          <p className="text-[#4e5760] text-sm">{answer}</p>
        </div>
      </div>
    </div>
  );
};
