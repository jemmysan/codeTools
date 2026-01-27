import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // Sign up
  const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("There waw a problem signing up", error);
      return { success: false, error };
    }

    return { success: true, data };
  };

  const login = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email : email,
            password : password
        });

        if(error) {
            console.error('Sign in error occurred', error);
            return { success : true, data }
        }
    } catch (error) {
        console.error('An error occured', error);
    }
  }

  // SignOut
  const logout = () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.error("There was an error ", error);
    }
  };
  return (
    <AuthContext.Provider value={{ session, register, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
