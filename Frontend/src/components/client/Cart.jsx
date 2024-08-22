import React, { useContext, useEffect, useState } from 'react'
import { Trash, Heart} from 'lucide-react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import userContext from '../../context/userContext'

export default function Cart() {

  let [data, setData] = useState([])
  let { auth } = useContext(userContext)

  useEffect(() => {
    getData()
  }, [auth])

  async function getData() {
    if (auth.userId) {
      let result = await axios.get(`http://127.0.0.1:3000/api/getCart/${auth.userId}`)
      setList(result.data.length)
      setData(result.data)
    }
  }

  let total = data.reduce((accumulator, currentValue) =>
    accumulator + JSON.parse(currentValue.price)
    //if {} is used then return needs to be used
    , 0)

  let { setList } = useContext(userContext)

  async function deleteFromCart(ID) {
    let result = confirm('Delete?')
    console.log(ID)
    if (result) {
      await axios.delete(`http://127.0.0.1:3000/api/deleteCart/${ID}/${auth.userId}`)
      getData()
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-3xl font-bold mt-10">Your cart</h2>
      <p className="mt-3 text-sm font-medium text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius repellat ipsam, sit
        praesentium incidunt.
      </p>
      <ul className="flex flex-col divide-y divide-gray-200">
        {data.map((data) => (
          <li key={data.ID} className="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={`http://127.0.0.1:3000/${data.image}`}

              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">{data.name}</h3>
                    <p className="text-sm">{data.type}</p>
                    <p className="text-sm">{data.rating}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{data.price}</p>
                  </div>
                </div>
                <div className="flex divide-x text-sm">
                  <button type="button"
                    onClick={() => deleteFromCart(data.ID)}
                    className="flex items-center space-x-2 px-2 py-1 pl-0">
                    <Trash size={16} />
                    <span>Remove</span>
                  </button>
                  <button type="button" className="flex items-center space-x-2 px-2 py-1">
                    <Heart size={16} />
                    <span>Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right">
        <p>
          Total amount:
          <span className="font-semibold">{total}</span>
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Back to shop
        </button>
        <Link
          type="button"
          to='/checkout'
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}
