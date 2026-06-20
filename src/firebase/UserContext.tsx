import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import type {
  User,
} from "firebase/auth";

import { auth }
from "./config";

const UserContext =
  createContext<User | null>(
    null
  );

export function UserProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(
      null
    );

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (firebaseUser) => {

          setUser(
            firebaseUser
          );
        }
      );

    return () =>
      unsubscribe();

  }, []);

  return (

    <UserContext.Provider
      value={user}
    >

      {children}

    </UserContext.Provider>

  );
}

export function useUser() {

  return useContext(
    UserContext
  );
}