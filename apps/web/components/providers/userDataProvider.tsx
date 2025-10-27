'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface UserDataContextType {
  userId: string;
  userName: string;
  userEmail?: string;
  userRole?: string;
  userOrganization?: string;
  isLoading: boolean;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  // Fetch current user from Convex
  const currentUser = useQuery(api.auth.currentUser);
  
  // Extract user data with fallbacks
  const userId = currentUser?.subject || '';
  const userName = currentUser?.name || '';
  const userEmail = currentUser?.email;
  const userRole = currentUser?.role;
  const userOrganization = currentUser?.organization;
  const isLoading = currentUser === undefined;

  return (
    <UserDataContext.Provider value={{ 
      userId, 
      userName,
      userEmail,
      userRole,
      userOrganization,
      isLoading
    }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to use the UserData context
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};