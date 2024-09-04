// createContext.js
import { createContext, useState } from 'react';

const SignupContext = createContext();

const SignupProvider = ({ children }) => {
    const [isSignedUp, setIsSignedUp] = useState(localStorage.getItem("MEntor_admin") ?? false);

    const signup = () => {
        localStorage.setItem("MEntor_admin", true);
        setIsSignedUp(true);
    };

    const logout = () => {
        localStorage.removeItem("MEntor_admin");
        setIsSignedUp(false);
    };

  return (
    <SignupContext.Provider value={{ isSignedUp, signup, logout }}>
      {children}
    </SignupContext.Provider>
  );
};

export { SignupProvider, SignupContext };