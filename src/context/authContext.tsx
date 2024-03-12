'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

// Define the type for your authentication object
interface Auth {
  user: any; 
  token: string;
}

// Define the type for context
type AuthContextType = [Auth, React.Dispatch<React.SetStateAction<Auth>>];

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}

// Define your AuthProvider component
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>({
    user: null,
    token: "",
  });

  // Set default axios headers
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth?.token;
  }, [auth]);

  // Load auth data from localStorage on component mount
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
      
    }
    //eslint-disable-next-line
  }, []);
  
  
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
