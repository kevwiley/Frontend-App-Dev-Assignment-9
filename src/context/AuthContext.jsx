
import { createContext, useContext, useState } from 'react';

//create authentication context
const AuthContext = createContext(null);

//custom hook to access authentication data
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

//authentication provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  //check whether user is logged in
  const isAuthenticated = user !== null;

  //login function
  const login = (username, password, role = 'regular') => {
    //simulate creating authentication token
    const mockToken = `mock_jwt_token_${Date.now()}`;

    //create user object
    const userData = {
      username: username,
      role: role,
      token: mockToken
    };

    setUser(userData);

    //store token in localStorage
    localStorage.setItem('authToken', mockToken);

    return userData;
  };

  //logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  //check whether user has a specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  //check whether current user is an admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    hasRole,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

