import { ChevronRight } from "lucide-react";

const TodoItem = ({ src, title, subtitle }) => (
  <div className="self-stretch justify-start items-center gap-3 inline-flex cursor-pointer">
    <div className="p-2 bg-[#f8f8f8] rounded-[66px] flex-col justify-center items-center gap-[6.67px] inline-flex">
      <img src={src} height={20} width={20} />
    </div>
    <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
      <div className="text-[#020c17] text-sm font-medium font-['Golos Text'] leading-none">
        {title}
      </div>
      <div className="text-[#4e5760] text-xs font-normal font-['Golos Text'] leading-none">
        {subtitle}
      </div>
    </div>
    <ChevronRight
      size={20}
      color="#E3EAEE"
      strokeWidth={2}
      className="inline"
    />
  </div>
);

const TodoCard = ({ data }) => {
  const applicationTodo = {
    src: "/eyes.png",
    title: "Review new applications",
    subtitle: "There are 0 new applications",
  };

  const assessmentTodo = {
    src: "/notes.png",
    title: "Review assessments",
    subtitle: "There are 0 new assessments",
  };
  const todos = [];
  data?.map((item, index) => {
    switch (item.title) {
      case "Total applications":
        if (item.new_count > 0) {
          applicationTodo.subtitle = `There are ${item.new_count} new applications`;
          todos.push(applicationTodo);
        }
        break;
      case "Total Assessments":
        assessmentTodo.subtitle = `There are ${item.new_count} new assessments`;
        todos.push(assessmentTodo);
        break;
    }
  });

  if (todos.length === 0) return null;

  return (
    <div className="self-stretch p-4 bg-white rounded-xl border border-[#e3eaee] flex-col justify-center items-start gap-[17px] flex">
      <div className="self-stretch text-[#4e5760] text-sm font-medium font-['Golos Text'] leading-none">
        Todo's
      </div>
      {todos.map((todo, index) => (
        <TodoItem key={index} {...todo} />
      ))}
    </div>
  );
};

export default TodoCard;
