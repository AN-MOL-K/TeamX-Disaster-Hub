import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'enduser' | 'guest';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  joinDate: string;
  verified: boolean;
  contributionScore: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  hasPermission: (permission: string) => boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: { [key: string]: User & { password: string } } = {
  'admin@disaster.com': {
    id: '1',
    email: 'admin@disaster.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    joinDate: '2024-01-01',
    verified: true,
    contributionScore: 1000,
    password: 'admin123'
  },
  'user@disaster.com': {
    id: '2',
    email: 'user@disaster.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'enduser',
    joinDate: '2024-06-15',
    verified: false,
    contributionScore: 45,
    password: 'user123'
  }
};

// Define permissions for each role
const rolePermissions = {
  admin: [
    'verify_reports',
    'delete_reports',
    'manage_users',
    'access_analytics',
    'moderate_content',
    'create_reports',
    'view_reports',
    'donate',
    'share_info'
  ],
  enduser: [
    'create_reports',
    'view_reports',
    'donate',
    'share_info',
    'view_preparedness_tips'
  ],
  guest: [
    'view_reports',
    'view_preparedness_tips',
    'donate'
  ]
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('disaster_hub_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('disaster_hub_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email.toLowerCase()];
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('disaster_hub_user', JSON.stringify(userWithoutPassword));
    } else {
      throw new Error('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'enduser', // New users are end users by default
      joinDate: new Date().toISOString().split('T')[0],
      verified: false,
      contributionScore: 0
    };

    setUser(newUser);
    localStorage.setItem('disaster_hub_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('disaster_hub_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('disaster_hub_user', JSON.stringify(updatedUser));
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) {
      return rolePermissions.guest.includes(permission);
    }
    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    register,
    updateUser,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}