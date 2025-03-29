import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useRef,
} from "react";

export const MainContext = createContext<{
  activePlans: number;
  handlePlanTabChange: (value: any) => void;
  Limit: any;
  ws: any;
  setLimit: any;
  handleAdminTabChange: (value: any) => void;
  activeAdminTab: number;
}>({
  activePlans: 1,
  handlePlanTabChange: () => {},
  Limit: 0,
  ws: null, // Use ref to persist WebSocket instance across renders
  setLimit: () => {},
  handleAdminTabChange: (value: any) => {},
  activeAdminTab: 1,
});

interface Props {
  children: React.ReactNode;
}

export const MainProvider = ({ children }: Props) => {
  const [activePlans, setActivePlans] = useState(1);

  const [activeAdminTab, setActiveAdminTab] = useState(1);
  const handleAdminTabChange = useCallback((value: any) => {
    setActiveAdminTab(value);
  }, []);
  const handlePlanTabChange = useCallback((value: any) => {
    setActivePlans(value);
  }, []);
  const [Limit, setLimit] = useState(0);
  const ws = useRef(null); // Use ref to persist WebSocket instance across renders

  const memoizedJobFormValue = useMemo(
    () => ({
      activePlans,
      handlePlanTabChange,
    }),
    [activePlans, handlePlanTabChange],
  );

  return (
    <MainContext.Provider
      value={{
        ws,
        Limit,
        setLimit,
        activeAdminTab,
        handleAdminTabChange,
        ...memoizedJobFormValue,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
