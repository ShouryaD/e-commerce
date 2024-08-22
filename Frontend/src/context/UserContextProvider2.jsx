import React, { useEffect, useState } from "react";
import userContext from './userContext'
import axios from "axios";


export default function UserContextProvider2({ children }) {
  let [list, setList] = useState("");

  let [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    userId: ''
  })

  let userLogin = async (data) => {
    let result = await axios.post('http://127.0.0.1:3000/api/userLogin', data)
    console.log(data)
    if (result.data.isMatch) {
      let token = result.data.token
      let unique = data.email.split('@')[0]
      console.log(result.data)
      localStorage.setItem('token', token)
      setAuth({
        token: token,
        isAuthenticated: true,
        userId: unique
      })
      createClient(unique)
      return true
    }
  }

  let userLogout = ()=>{
    localStorage.removeItem('token')
    setAuth({token: null, isAuthenticated: false, userId: ''})
  }

  async function createClient(unique) {
    await axios.post(`http://127.0.0.1:3000/api/createUser/${unique}`)
  }

  let profile = async () => {
    let token = localStorage.getItem('token')
    console.log(token + ' mama')
    if (token) {
      let result = await axios.get('http://127.0.0.1:3000/api/verify')
      console.log(result.data)
      let unique = result.data.email.split('@')[0]
      setAuth((preAuth)=>({...preAuth, userId:unique}))
    }
  }

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    profile()
  },[])
  return (
    <userContext.Provider value={{ list, setList, auth, userLogout, userLogin }}>
      {children}
    </userContext.Provider>
  );
}
