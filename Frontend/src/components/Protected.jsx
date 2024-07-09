import React, { useContext } from 'react'
import {Navigate} from 'react-router-dom'
import userContext from '../context/userContext'

export default function Protected({children}) {

    let {user} = useContext(userContext)


    if(user){
        return children
    }
    else{
        return <Navigate to='/admin/login'/>
    }
}
