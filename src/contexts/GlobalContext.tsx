import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserDetails } from '../types/UserDetails';

interface GlobalContextType {
  userDetails: {
    userData: UserDetails
    setUserData: React.Dispatch<React.SetStateAction<UserDetails>>
  };
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserDetails>({
    //EVENTUAIS DETALHES DO USUARIO
    _id: '',
    USER_NAME: '',
  });
  const userDetails = {
    userData,
    setUserData
  };

  return (
    <GlobalContext.Provider value={{ userDetails }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an GlobalProvider');
  }
  return context;
};
