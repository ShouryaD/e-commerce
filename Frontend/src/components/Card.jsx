import React, {useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Card() {
  let [value, setValue] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    xy();
  }, []);
  async function xy() {
    let result = await axios.get(`http://127.0.0.1:3000/api/getProduct/${id}`);
    setValue(result.data);
  }

  return (
    <>
      {value.map((value) => (
        <div className="relative h-[400px] w-[300px] rounded-md m-20">
          <img
            src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            alt="AirMax Pro"
            className="z-0 h-full w-full rounded-md object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h1 className="text-lg font-semibold text-white">{value.name}</h1>
            <p className="mt-2 text-sm text-gray-300">{value.type}</p>
            <p className="mt-2 text-sm text-gray-300">{value.rating}</p>
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
              {value.price}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
