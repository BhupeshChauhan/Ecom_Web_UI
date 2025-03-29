import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { v4 as uuidv4 } from "uuid";
import useMounted from "../hooks/useMounted";

export const JobFormContext = createContext<{
  step: number;
  requiredSkills: string;
  optionalSkills: string;
  requiredSkillsArray: Array<any>;
  optionalSkillsArray: Array<any>;
  handleStepChange: (value: any) => void;
  handleRequiredSkillsChange: (e: any) => void;
  handleOptionalSkillsChange: (e: any) => void;
  handleSkillSubmit: () => void;
  handleOptionalSkillSubmit: () => void;
  handleClearSkill: (id: any) => void;
  handleClearOptionalSkill: (id: any) => void;
  FormData: any;
  handleFormDataChange: (value: any) => void;
  handleJdtypeChange: (value: string) => void;
  handleJdDataChange: (value: any) => void;
  handleIsLoadingChange: (value: boolean) => void;
  Jdtype: string;
  JdData: any;
  IsLoading: boolean;
  JdDataAI: any;
  handleJdDataAIChange: (value: any) => void;
  LocationType: string;
  handleLocationTypeChange: (value: any) => void;
  activeJobTab: number;
  handleJobTabChange: (value: any) => void;
  activeApplicantTab: number;
  handleApplicantTabChange: (value: any) => void;
  ResetData: () => void;
  handleSkillUpdate: (value: any) => void;
  handleOptionalSkillUpdate: (value: any) => void;
  mounted: any;
  visibility: boolean;
  handleChangeVisibility: (value: boolean) => void;
}>({
  step: 1,
  FormData: {},
  requiredSkills: "",
  optionalSkills: "",
  requiredSkillsArray: [],
  optionalSkillsArray: [],
  Jdtype: "",
  JdData: "",
  JdDataAI: "",
  IsLoading: false,
  LocationType: "Remote",
  activeJobTab: 1,
  handleJobTabChange: () => {},
  activeApplicantTab: 1,
  handleApplicantTabChange: () => {},
  handleJdtypeChange: () => {},
  handleJdDataChange: () => {},
  handleJdDataAIChange: () => {},
  handleIsLoadingChange: () => {},
  handleStepChange: () => {},
  handleRequiredSkillsChange: () => {},
  handleOptionalSkillsChange: () => {},
  handleSkillSubmit: () => {},
  handleOptionalSkillSubmit: () => {},
  handleClearSkill: () => {},
  handleClearOptionalSkill: () => {},
  handleFormDataChange: () => {},
  handleLocationTypeChange: () => {},
  ResetData: () => {},
  handleSkillUpdate: () => {},
  handleOptionalSkillUpdate: () => {},
  mounted: "",
  visibility: false,
  handleChangeVisibility: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const JobFormProvider = ({ children }: Props) => {
  const mounted = useMounted();
  const [step, setStep] = useState(1);
  const [FormData, setFormData] = useState({});
  const [requiredSkills, setRequiredSkills] = useState("");
  const [optionalSkills, setOptionalSkills] = useState("");
  const [requiredSkillsArray, setRequiredSkillsArray] = useState([]);
  const [optionalSkillsArray, setOptionalSkillsArray] = useState([]);
  const [Jdtype, setJdtype] = useState("upload");
  const [JdData, setJdData] = useState<any>("<p>Enter Job Description...</p>");
  const [JdDataAI, setJdDataAI] = useState<any>(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [LocationType, setLocationType] = useState("Remote");
  const [visibility, setVisibility] = useState(false);

  const [activeJobTab, setActiveJobTab] = useState(1);
  const handleJobTabChange = useCallback((value: any) => {
    setActiveJobTab(value);
  }, []);

  const [activeApplicantTab, setActiveApplicantTab] = useState(1);
  const handleApplicantTabChange = useCallback((value: any) => {
    setActiveApplicantTab(value);
  }, []);

  const handleStepChange = useCallback((value: any) => {
    setStep(value);
  }, []);

  const handleLocationTypeChange = useCallback((value: any) => {
    setLocationType(value);
  }, []);

  const handleJdDataAIChange = useCallback((value: any) => {
    setJdDataAI(value);
  }, []);

  const handleJdtypeChange = useCallback((value: any) => {
    setJdtype(value);
  }, []);

  const handleJdDataChange = useCallback((value: any) => {
    setJdData(value);
  }, []);

  const handleIsLoadingChange = useCallback((value: any) => {
    setIsLoading(value);
  }, []);

  const handleFormDataChange = useCallback((value: any) => {
    setFormData(value);
  }, []);

  const handleChangeVisibility = useCallback((value: boolean) => {
    setVisibility(value);
  }, []);

  const handleRequiredSkillsChange = useCallback((e) => {
    setRequiredSkills(e.target.value);
  }, []);

  const handleOptionalSkillsChange = useCallback((e) => {
    setOptionalSkills(e.target.value);
  }, []);

  const handleSkillSubmit = useCallback(() => {
    if (requiredSkills.length > 0) {
      const requiredSkillsSplit = requiredSkills.split(",");
      if (requiredSkillsSplit.length > 1) {
        requiredSkillsSplit.map((element) => {
          setRequiredSkillsArray((prev) => [
            ...prev,
            {
              id: uuidv4(),
              value: element,
            },
          ]);
        });
      } else {
        setRequiredSkillsArray((prev) => [
          ...prev,
          {
            id: uuidv4(),
            value: requiredSkills,
          },
        ]);
      }
      setRequiredSkills("");
    }
  }, [requiredSkills]);

  const handleSkillUpdate = useCallback((value: any) => {
    if (value?.length > 0) {
      const requiredSkillsSplit = value.split(",");
      if (requiredSkillsSplit.length > 1) {
        requiredSkillsSplit.map((element) => {
          setRequiredSkillsArray((prev) => [
            ...prev,
            {
              id: uuidv4(),
              value: element,
            },
          ]);
        });
      } else {
        setRequiredSkillsArray((prev) => [
          ...prev,
          {
            id: uuidv4(),
            value: value,
          },
        ]);
      }
      setRequiredSkills("");
    }
  }, []);

  const handleOptionalSkillSubmit = useCallback(() => {
    if (optionalSkills.length > 0) {
      const optionalSkillsSplit = optionalSkills.split(",");
      if (optionalSkillsSplit.length > 1) {
        optionalSkillsSplit.map((element) => {
          setOptionalSkillsArray((prev) => [
            ...prev,
            {
              id: uuidv4(),
              value: element,
            },
          ]);
        });
      } else {
        setOptionalSkillsArray((prev) => [
          ...prev,
          {
            id: uuidv4(),
            value: optionalSkills,
          },
        ]);
      }
      setOptionalSkills("");
    }
  }, [optionalSkills]);

  const handleOptionalSkillUpdate = useCallback(
    (value: any) => {
      if (value?.length > 0) {
        const optionalSkillsSplit = value.split(",");
        if (optionalSkillsSplit.length > 1) {
          optionalSkillsSplit.map((element) => {
            setOptionalSkillsArray((prev) => [
              ...prev,
              {
                id: uuidv4(),
                value: element,
              },
            ]);
          });
        } else {
          setOptionalSkillsArray((prev) => [
            ...prev,
            {
              id: uuidv4(),
              value: value,
            },
          ]);
        }
        setOptionalSkills("");
      }
    },
    [optionalSkills],
  );

  const handleClearSkill = useCallback(
    (id) => {
      const newArray = requiredSkillsArray.filter(
        (element) => element.id !== id,
      );
      setRequiredSkillsArray(newArray);
    },
    [requiredSkillsArray],
  );

  const handleClearOptionalSkill = useCallback(
    (id) => {
      const newArray = optionalSkillsArray.filter(
        (element) => element.id !== id,
      );
      setOptionalSkillsArray(newArray);
    },
    [optionalSkillsArray],
  );

  const ResetData = () => {
    setStep(1);
    setFormData({});
    setRequiredSkills("");
    setOptionalSkills("");
    setRequiredSkillsArray([]);
    setOptionalSkillsArray([]);
    setJdtype("upload");
    setJdData("<p>Enter Job Description...</p>");
    setJdDataAI(null);
    setLocationType("Remote");
  };

  const memoizedJobFormValue = useMemo(
    () => ({
      step,
      FormData,
      requiredSkills,
      optionalSkills,
      requiredSkillsArray,
      optionalSkillsArray,
      LocationType,
      handleStepChange,
      handleRequiredSkillsChange,
      handleOptionalSkillsChange,
      handleSkillSubmit,
      handleOptionalSkillSubmit,
      handleClearSkill,
      handleClearOptionalSkill,
      handleFormDataChange,
      Jdtype,
      JdData,
      IsLoading,
      handleJdtypeChange,
      handleJdDataChange,
      handleIsLoadingChange,
      JdDataAI,
      handleJdDataAIChange,
      handleLocationTypeChange,
      activeJobTab,
      handleJobTabChange,
      activeApplicantTab,
      handleApplicantTabChange,
      handleSkillUpdate,
      handleOptionalSkillUpdate,
      visibility,
      handleChangeVisibility,
    }),
    [
      step,
      FormData,
      requiredSkills,
      optionalSkills,
      requiredSkillsArray,
      optionalSkillsArray,
      LocationType,
      handleStepChange,
      handleRequiredSkillsChange,
      handleOptionalSkillsChange,
      handleSkillSubmit,
      handleOptionalSkillSubmit,
      handleClearSkill,
      handleClearOptionalSkill,
      handleFormDataChange,
      Jdtype,
      JdDataAI,
      handleJdDataAIChange,
      JdData,
      IsLoading,
      handleJdtypeChange,
      handleJdDataChange,
      handleIsLoadingChange,
      handleLocationTypeChange,
      activeJobTab,
      handleJobTabChange,
      activeApplicantTab,
      handleApplicantTabChange,
      handleSkillUpdate,
      handleOptionalSkillUpdate,
      visibility,
      handleChangeVisibility,
    ],
  );

  return (
    <JobFormContext.Provider
      value={{ mounted, ResetData, ...memoizedJobFormValue }}
    >
      {children}
    </JobFormContext.Provider>
  );
};

export const useJobFormContext = () => useContext(JobFormContext);
