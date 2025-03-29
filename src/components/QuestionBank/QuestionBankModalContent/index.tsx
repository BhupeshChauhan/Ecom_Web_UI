//return a react component

import { TabsComp, TabsContent, TabsList, TabsTrigger } from "@dashflowx/core";
import { useEffect, useState, useMemo } from "react";
import { cn } from "../../../utils";
import { QuestionBankCard } from "../QuestionBankCard";
import JobService from "../../../Api/JobService";
import { LoaderMask, LoadingCompoent } from "../../Loader";

const hcData = [
  {
    id: 6,
    clientId: 7,
    question:
      "Tell me about a time when you had to adapt to a significant change at work.",
    categoryId: 3,
    answer: "",
    createdAt: "2025-02-14 07:13:33",
    updatedAt: "2025-02-14 07:13:33",
    category: "Behavioural",
  },
  {
    id: 5,
    clientId: 7,
    question:
      "Can you share an example of when you had to make a difficult decision at work?",
    categoryId: 3,
    answer: "",
    createdAt: "2025-02-14 07:13:09",
    updatedAt: "2025-02-14 07:13:09",
    category: "Behavioural",
  },
  {
    id: 4,
    clientId: 7,
    question:
      "Describe a situation where you had to work with a difficult team member. How did you handle it?",
    categoryId: 4,
    answer: "",
    createdAt: "2025-02-14 07:12:53",
    updatedAt: "2025-02-14 07:12:53",
    category: "Situational",
  },
  {
    id: 3,
    clientId: 7,
    question:
      "Tell me about a time you faced a conflict at work and how you handled it?",
    categoryId: 3,
    answer: "",
    createdAt: "2025-02-14 07:12:36",
    updatedAt: "2025-02-14 07:12:36",
    category: "Behavioural",
  },
  {
    id: 2,
    clientId: 7,
    question: "What are States and Props?",
    categoryId: 2,
    answer:
      "In React, state and props are used to manage data and render UI dynamically.State is a component's internal data, which can change over time using useState or other state management techniques. Updating state re-renders the component.Props (short for properties) are external inputs passed from a parent component to a child component. Props are immutable within the child component.State is managed within a component, while props allow data to flow between components",
    createdAt: "2025-02-14 07:11:05",
    updatedAt: "2025-02-14 07:11:05",
    category: "Technical",
  },
];

// Remove the hardcoded technicalQuestions array and create a function to filter questions by category
const filterQuestionsByCategory = (questions: any[], category: string) => {
  return questions.filter((q) => q.category === category);
};

const CategoryContent = ({
  questions,
  category,
  selectedQuestions,
  onQuestionsChange,
}: {
  questions: any[];
  category: string;
  selectedQuestions: any[];
  onQuestionsChange: (question: any, isSelected: boolean) => void;
}) => {
  const filteredQuestions = filterQuestionsByCategory(questions, category);

  const isQuestionSelected = (question: any) => {
    return selectedQuestions.some((q) => q.id === question.id);
  };

  const handleToggle = (question: any) => {
    onQuestionsChange(question, !isQuestionSelected(question));
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      {filteredQuestions.map((question) => (
        <QuestionBankCard
          key={question.id}
          question={question.question}
          answer={question.answer}
          checked={isQuestionSelected(question)}
          onToggle={() => handleToggle(question)}
        />
      ))}
    </div>
  );
};

const QuestionBankModalContent = ({
  onSelectedQuestionsChange,
}: {
  onSelectedQuestionsChange?: (questions: any[]) => void;
}) => {
  const { isLoading, data, GetQuestionBank } = JobService();
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  const handleQuestionsChange = (question: any, isSelected: boolean) => {
    setSelectedQuestions((prev) => {
      const updated = isSelected
        ? [...prev, question]
        : prev.filter((q) => q.id !== question.id);

      onSelectedQuestionsChange?.(updated);
      return updated;
    });
  };

  const tabsArray = useMemo(() => {
    const categories = [...new Set((data?.list || []).map((q) => q.category))];
    return categories.map((category, index) => ({
      content: (
        <CategoryContent
          questions={data?.list || []}
          category={category as string}
          selectedQuestions={selectedQuestions}
          onQuestionsChange={handleQuestionsChange}
        />
      ),
      id: index,
      title: category,
    }));
  }, [data?.list, handleQuestionsChange, selectedQuestions]);

  useEffect(() => {
    GetQuestionBank?.();
  }, []);

  useEffect(() => {
    if (data?.list?.length > 0 && tabsArray.length > 0 && !activeTab) {
      setActiveTab(tabsArray[0].title.toLowerCase());
    }
  }, [data?.list, tabsArray, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="w-full">
      {isLoading && <LoadingCompoent />}
      <TabsComp
        value={activeTab}
        onValueChange={handleTabChange}
        className={cn("w-full")}
      >
        <TabsList className="flex items-start justify-start">
          {tabsArray.map((tab) => (
            <TabsTrigger
              value={tab.title.toLowerCase()}
              key={tab.id}
              className={cn(
                "inline-block pl-2 border-b-2 typography-h5 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 pt-2",
                "data-[state=active]:text-primary-light data-[state=active]:font-bold",
                "text-gray-500",
              )}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsArray.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.title.toLowerCase()}
            className="w-full bg-slate-100 p-2 h-full"
          >
            {tab.content}
          </TabsContent>
        ))}
      </TabsComp>
    </div>
  );
};

export default QuestionBankModalContent;
