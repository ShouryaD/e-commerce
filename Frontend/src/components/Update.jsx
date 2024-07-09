import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function Update() {
    let navigate = useNavigate()
    let [data,setData] = useState({
        name:'',
        type:'',
        rating:'',
        price:''
    })
    const {name,type,rating,price} = data

    let {id} = useParams()

    useEffect(()=>{
      xy()
    },[])

    async function xy(){
      let result = await axios.get(`http://127.0.0.1:3000/api/getProduct/${id}`)
      setData(result.data[0])
    }

    function change(e){
        setData({...data,[e.target.name]:e.target.value})
    }
    function handleSubmit(e){
        e.preventDefault()
        axios.put(`http://127.0.0.1:3000/api/update/${id}`, data)
        navigate('/admin')
    }
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Add Product
          </h2>
          <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  
                Name
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Name"
                    id="name"
                    name='name'
                    value={name}
                    onChange={change}
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  
                Type
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Type"
                    id="email"
                    name='type'
                    value={type}
                    onChange={change}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    
                    Rating
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder="rating"
                    id="password"
                    name='rating'
                    onChange={change}
                    value={rating}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    
                    Price
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder="rating"
                    id="password"
                    name='price'
                    onChange={change}
                    value={price}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Add Product <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
