import {

  onAuthStateChanged,

} from "firebase/auth";

import type {

  User,

} from "firebase/auth";

import {

  createContext,

  useContext,

  useEffect,

  useState,

} from "react";

import React from "react";

import { auth }
from "./config";

const UserContext =
  createContext<User | null>(
    null
  );

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(
      null
    );

  useEffect(() => {

    return onAuthStateChanged(

      auth,

      setUser
    );

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