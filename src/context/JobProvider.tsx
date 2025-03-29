import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { retrieveValue } from "../utils";

export const JobContext = createContext<{
  messages: any;
  setMessages: any;
  ws: any;
}>({
  messages: null,
  setMessages: () => {},
  ws: null,
});

interface Props {
  children: React.ReactNode;
}

export const JobProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState(null);
  const ws = useRef(null); // Use ref to persist WebSocket instance across renders
  const token = retrieveValue("accessToken");

  return (
    <JobContext.Provider value={{ messages, setMessages, ws }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
