
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, UserRole } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<{ email: string }>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  socialLogin: (provider: 'Google' | 'LinkedIn', name: string, email: string) => Promise<void>;
  logout: () => void;
  getDbCount: () => number;
  toggleLikeProduct: (productId: string) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  addPoints: (points: number) => void;
  redeemPoints: (points: number) => void;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideNotification: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DB_KEY = 'ecobazaar_registered_users';
const SESSION_KEY = 'ecobazaar_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const hideNotification = () => setNotification(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(SESSION_KEY);
    if (storedUser) {
      setState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const getDbCount = () => {
    const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    return users.length;
  };

  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
        const foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

        if (!foundUser) {
          reject(new Error('Account not found. Join our community by creating a new account!'));
          return;
        }

        if (!foundUser.isEmailVerified) {
          reject(new Error('Security Hold: Email not verified.'));
          return;
        }

        if (foundUser.password !== password) {
          reject(new Error('Invalid credentials. Please verify your password.'));
          return;
        }

        const userObj: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          createdAt: foundUser.createdAt,
          isEmailVerified: foundUser.isEmailVerified,
          likedProducts: foundUser.likedProducts || [],
          cart: foundUser.cart || [],
          greenPoints: foundUser.greenPoints || 0
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(userObj));
        setState({ user: userObj, isAuthenticated: true, isLoading: false });
        resolve();
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string, role: UserRole = UserRole.USER) => {
    return new Promise<{ email: string }>((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
        if (users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
          reject(new Error('This email already exists in our records.'));
          return;
        }

        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          password,
          role,
          createdAt: new Date().toISOString(),
          isEmailVerified: false,
          verificationCode: '123456',
          greenPoints: 0
        };

        users.push(newUser);
        localStorage.setItem(DB_KEY, JSON.stringify(users));
        resolve({ email });
      }, 1000);
    });
  };

  const verifyEmail = async (email: string, code: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
        const userIndex = users.findIndex((u: any) => u.email.toLowerCase() === email.toLowerCase());

        if (userIndex === -1) {
          reject(new Error('Database error: User record missing.'));
          return;
        }

        if (code === '123456') {
          users[userIndex].isEmailVerified = true;
          localStorage.setItem(DB_KEY, JSON.stringify(users));
          resolve();
        } else {
          reject(new Error('Invalid verification sequence.'));
        }
      }, 600);
    });
  };

  const socialLogin = async (provider: 'Google' | 'LinkedIn', name: string, email: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
        let foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
        
        if (!foundUser) {
          // AUTO-REGISTRATION: Save to DB if first time
          foundUser = {
            id: Math.random().toString(36).substr(2, 9),
            name: name,
            email: email,
            role: UserRole.USER,
            createdAt: new Date().toISOString(),
            isEmailVerified: true,
            isSocial: true,
            provider: provider,
            greenPoints: 0
          };
          users.push(foundUser);
          localStorage.setItem(DB_KEY, JSON.stringify(users));
        }

        const userObj: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          createdAt: foundUser.createdAt,
          isEmailVerified: true,
          likedProducts: foundUser.likedProducts || [],
          cart: foundUser.cart || [],
          greenPoints: foundUser.greenPoints || 0
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(userObj));
        setState({ user: userObj, isAuthenticated: true, isLoading: false });
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const toggleLikeProduct = (productId: string) => {
    if (!state.user) return;

    const currentLiked = state.user.likedProducts || [];
    const isLiked = currentLiked.includes(productId);
    const newLiked = isLiked 
      ? currentLiked.filter(id => id !== productId)
      : [...currentLiked, productId];

    const updatedUser = { ...state.user, likedProducts: newLiked };
    
    // Update Session
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    
    // Update DB
    const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    const userIndex = users.findIndex((u: any) => u.id === state.user?.id);
    if (userIndex !== -1) {
      users[userIndex].likedProducts = newLiked;
      localStorage.setItem(DB_KEY, JSON.stringify(users));
    }

    setState(prev => ({ ...prev, user: updatedUser }));
  };

  const addToCart = (productId: string) => {
    if (!state.user) return;
    const currentCart = state.user.cart || [];
    const existingItem = currentCart.find(item => item.productId === productId);
    
    let newCart;
    if (existingItem) {
      newCart = currentCart.map(item => 
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...currentCart, { productId, quantity: 1 }];
    }

    const updatedUser = { ...state.user, cart: newCart };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    const userIndex = users.findIndex((u: any) => u.id === state.user?.id);
    if (userIndex !== -1) {
      users[userIndex].cart = newCart;
      localStorage.setItem(DB_KEY, JSON.stringify(users));
    }
    setState(prev => ({ ...prev, user: updatedUser }));
    showNotification('Added to cart!');
  };

  const removeFromCart = (productId: string) => {
    if (!state.user) return;
    const currentCart = state.user.cart || [];
    const newCart = currentCart.filter(item => item.productId !== productId);

    const updatedUser = { ...state.user, cart: newCart };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    const userIndex = users.findIndex((u: any) => u.id === state.user?.id);
    if (userIndex !== -1) {
      users[userIndex].cart = newCart;
      localStorage.setItem(DB_KEY, JSON.stringify(users));
    }
    setState(prev => ({ ...prev, user: updatedUser }));
    showNotification('Removed from cart', 'info');
  };

  const addPoints = (points: number) => {
    if (!state.user) return;
    const newPoints = (state.user.greenPoints || 0) + points;
    const updatedUser = { ...state.user, greenPoints: newPoints };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    const userIndex = users.findIndex((u: any) => u.id === state.user?.id);
    if (userIndex !== -1) {
      users[userIndex].greenPoints = newPoints;
      localStorage.setItem(DB_KEY, JSON.stringify(users));
    }
    setState(prev => ({ ...prev, user: updatedUser }));
  };

  const redeemPoints = (points: number) => {
    if (!state.user) return;
    const currentPoints = state.user.greenPoints || 0;
    if (currentPoints < points) {
      showNotification('Not enough Green Points', 'error');
      return;
    }
    
    const newPoints = currentPoints - points;
    const updatedUser = { ...state.user, greenPoints: newPoints };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    const userIndex = users.findIndex((u: any) => u.id === state.user?.id);
    if (userIndex !== -1) {
      users[userIndex].greenPoints = newPoints;
      localStorage.setItem(DB_KEY, JSON.stringify(users));
    }
    setState(prev => ({ ...prev, user: updatedUser }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, verifyEmail, socialLogin, logout, getDbCount, toggleLikeProduct, addToCart, removeFromCart, addPoints, redeemPoints, notification, showNotification, hideNotification }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
