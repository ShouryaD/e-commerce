'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import userContext from '../../context/userContext'
import axios from 'axios'
import logo from '../../assets/logo.jpg'


const menuItems = [
  {
    name: 'Home',
    href: '#',
  },
  {
    name: 'About',
    href: '#',
  },
  {
    name: 'Contact',
    href: '#',
  },
]

export default function ClientNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  let { list } = useContext(userContext)

  let { auth, userLogout } = useContext(userContext)
  let [data, setData] = useState([])
  useEffect(() => {
    getCLient()
  }, [auth])
  async function getCLient() {
    if (auth.userId) {
      let result = await axios.get(`http://127.0.0.1:3000/api/getUser/${auth.userId}`)
      console.log(result)
      setData(result.data)
    }
  }

  function Logout(){
    userLogout()
    window.location.reload()
  }
  return (
    <div className=" w-full bg-white p-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className='inline-flex items-center space-x-2'>
          <img className='h-10' src={logo} alt="" />
          <h1 className='text-xl font-bold font-serif'>Buyer</h1>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex items-center'>

          <div className="hidden lg:block relative">
            {auth.userId && <button className='px-2 py-2 bg-black rounded-full mr-4 text-white text-sm font-semibold hover:bg-slate-400' onClick={Logout}>Logout</button>}
            <Link
              type="button" to='/cart'
              className="relative rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Cart
            </Link>
            <span className={`${list ? 'absolute -top-[18px] right-[-5px] text-2xl bg-red-400 text-white rounded-full px-1' : 'hidden'}`}>{list}</span>
          </div>
          {data.map((data) => (
            <div className="ml-4 flex items-center space-x-2 relative cursor-pointer">
              <img
                className="inline-block h-10 w-10 rounded-full object-cover"
                src={`http://127.0.0.1:3000/${data.image}`}
                alt="Dan_Abromov"
              />
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
            </div>
          ))}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Button text
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
