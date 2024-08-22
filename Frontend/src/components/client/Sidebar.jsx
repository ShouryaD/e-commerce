import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";

export default function Sidebar() {
  let [data, setData] = useState([]);
  let [inp, setInp] = useState("");
  let navigate = useNavigate();
  let { auth } = useContext(userContext);

  useEffect(() => {
    getData();
    getCart();
  }, []);

  async function getData() {
    let result = await axios.get("http://127.0.0.1:3000/api/get");
    setData(result.data);
  }

  async function zeroToFive() {
    let result = await axios.get("http://127.0.0.1:3000/api/get");
    let final = result.data.filter(
      (item) => item.price > 0 && item.price <= 5000
    );
    setData(final);
  }
  async function FiveToTen() {
    let result = await axios.get("http://127.0.0.1:3000/api/get");
    let final = result.data.filter(
      (item) => item.price >= 5000 && item.price <= 10000
    );
    setData(final);
  }
  async function shoes() {
    let result = await axios.get("http://127.0.0.1:3000/api/get");
    let final = result.data.filter(
      (item) => item.type == "Shoes" || item.type == "shoes"
    );
    setData(final);
  }
  async function Jacket() {
    let result = await axios.get("http://127.0.0.1:3000/api/get");
    let final = result.data.filter(
      (item) => item.type == "jacket" || item.type == "Jacket"
    );
    setData(final);
  }
  useEffect(() => {
    searchBar();
    if (inp == "") {
      getData();
    }
  }, [inp]);

  async function searchBar() {
    if (inp !== '') {
      let result = await axios.get(`http://127.0.0.1:3000/api/getName/${inp}`);
      setData(result.data);
    }
  }

  async function addToCart(data) {
    if (auth.userId) {
      await axios.post(`http://127.0.0.1:3000/api/saveCart/${auth.userId}`, {
        name: data.name,
        type: data.type,
        rating: data.rating,
        price: data.price,
        image: data.image,
      });
    } else {
      navigate("/login");
    }
    getCart();
    // navigate('/cart')
  }

  let { setList } = useContext(userContext);

  async function getCart() {
    if (auth.userId) {
      let result = await axios.get(`http://127.0.0.1:3000/api/getCart/${auth.userId}`);
      setList(result.data.length);
    }
  }

  return (
    <>
      <aside className="flex fixed h-3/4 w-64 flex-col overflow-y-auto border-r bg-slate-100 px-5 py-8 mt-[6.5rem] rounded-md">
        <div className="relative mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>

          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-slate-200 dark:text-white-300 dark:border-gray-600 focus:border-slate-400 dark:focus:border-slate-300 focus:ring-slate-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Search"
            onChange={(e) => setInp(e.target.value)}
          />
        </div>
        {/* <button
            type="button"
            className="w-1/3 mt-5 py-2 pl-3.5 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" onClick={searchBar}
          >Search</button> */}
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                Filter by Price
              </label>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={zeroToFive}
              >
                {/* <BarChart className="h-5 w-5" aria-hidden="true" /> */}
                <span className="mx-2 text-sm font-medium">0-5K</span>
              </button>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={FiveToTen}
              >
                {/* <BarChart className="h-5 w-5" aria-hidden="true" /> */}
                <span className="mx-2 text-sm font-medium">5K-10K</span>
              </button>
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                Filter by Category
              </label>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={shoes}
              >
                {/* <BarChart className="h-5 w-5" aria-hidden="true" /> */}
                <span className="mx-2 text-sm font-medium">Shoes</span>
              </button>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={Jacket}
              >
                {/* <BarChart className="h-5 w-5" aria-hidden="true" /> */}
                <span className="mx-2 text-sm font-medium">Jacket</span>
              </button>
            </div>

            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                Filter by Rating
              </label>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                {/* <Brush className="h-5 w-5" aria-hidden="true" /> */}
                <span className="mx-2 text-sm font-medium">
                  ⭐⭐⭐⭐ and above
                </span>
              </button>
              <button
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                {/* <Wrench className="h-5 w-5" aria-hidden="true" /> */}
                <span className="mx-2 text-sm font-medium">
                  ⭐⭐⭐ to ⭐⭐⭐⭐
                </span>
              </button>
            </div>
          </nav>
        </div>
      </aside>
      <div className="relative hidden left-[145vh] top-[5vh] z-10">
        <div
          id="dropdownInformation"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownInformationButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-2/3 justify-between ml-[20vw] absolute top-[8vh]">
        {data.map((data) => (
          <div className="w-[300px] mt-[25px] rounded-md border bg-slate-100 transform hover:scale-110 transition-transform duration-300" key={data.id}>
            <img
              src={`http://127.0.0.1:3000/${data.image}`}
              // {`http://127.0.0.1:3000/${data.image}`}
              alt="Laptop"
              className="h-[200px] w-full rounded-md object-cover transform hover:scale-110 transition-transform duration-300"
            />
            <div className="p-4 text-center">
              <h1 className="inline-flex items-center justify-center text-lg font-semibold">
                {data.name}
              </h1>
              <br />
              <h1 className="inline-flex items-center text-lg font-semibold">
                {data.type}
              </h1>
              <br />
              <h1 className="inline-flex items-center text-lg font-semibold">
                {data.rating} ⭐
              </h1>
              <br />
              <h1 className="inline-flex items-center text-lg font-semibold">
                Price: Rs. {data.price}
              </h1>

              <button
                type="button"
                onClick={() => addToCart(data)}
                className="mt-4 w-2/3 rounded-3xl bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
