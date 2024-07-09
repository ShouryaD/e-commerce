import React, { useState } from "react";
import userContext from './userContext'


export default function UserContextProvider2({ children }) {
  let [list, setList] = useState("");
  let [login, setLogin] = useState('');
  return (
    <userContext.Provider value={{ list, setList, login, setLogin }}>
      {children}
    </userContext.Provider>
  );
}
