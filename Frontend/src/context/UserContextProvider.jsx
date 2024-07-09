import React, { useState } from 'react'
import userContext from './userContext'

export default function UserContextProvider({children}) {
    let [user,setUser] = useState(true)
  return (
    <userContext.Provider value={{user,setUser}}>
        {children}
    </userContext.Provider>
  )
}
