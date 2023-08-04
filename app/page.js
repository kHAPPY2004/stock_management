// pages/index.js
"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [dropdown, setDropdown] = useState([]);
  const [productForm, setProductForm] = useState({});
  const [alert, setAlert] = useState("");
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });
      if (response.ok) {
        console.log("product added successfully");
        setAlert("Your product has been added!");
        setProductForm({});
      } else {
        console.log("Error adding product");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("api/product");
      let rjson = await response.json();
      setProducts(rjson.products);
    };
    fetchProducts();
  }, [addProduct]);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const onDropdownEdit = async (e) => {
    let value = e.target.value;
    setQuery(value);
    console.log(value);
    if (value.length > 1) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch("api/search?query=" + query);
      let rjson = await response.json();
      setDropdown(rjson.products);
      setLoading(false);
    } else {
      setDropdown([]);
    }
  };
  return (
    <>
      <Header />
      {/* search a product */}
      <div className="text-3xl mb-10 flex justify-center text-center bg-red-300 mx-auto py-10 font-extrabold">
        <h1>Search a product</h1>
      </div>
      <div className="container mx-auto bg-red-500">
        <input
          type="text"
          onBlur={() => {
            setDropdown([]);
          }}
          onChange={onDropdownEdit}
          placeholder="Search..."
          className="py-2 px-4 border border-gray-300 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="">
        {loading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="40"
            height="40"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="6" x2="12" y2="12"></line>
            <line x1="12" y1="12" x2="12" y2="18"></line>
          </svg>
        )}
        {dropdown.map((item) => {
          return (
            <div
              key={item.slug}
              className="container mx-auto flex justify-between bg-green-500 px-4"
            >
              <span className="my-2">{item.slug}</span>
              <span className="my-2">{item.quantity}</span>
              <span className="my-2">{item.price}</span>
            </div>
          );
        })}
      </div>
      {/* Add product form */}
      <div className="text-3xl mt-10 flex justify-center text-center bg-red-300 mx-auto py-10 font-extrabold">
        <h1>Add a product</h1>
      </div>
      <div className="container mx-auto">
        <form className="mt-4">
          <div className="flex justify-center items-center mt-4">
            <label htmlFor="product" className="mr-2">
              Product slug :
            </label>
            <input
              value={productForm?.slug || ""}
              type="text"
              id="product"
              name="slug"
              onChange={handleChange}
              className="border px-4 py-2 bg-black"
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <input
              value={productForm?.quantity || ""}
              type="number"
              id="quantity"
              name="quantity"
              onChange={handleChange}
              className="border px-4 py-2 bg-black"
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <label htmlFor="quantity" className="mr-2">
              Price:
            </label>
            <input
              value={productForm?.price || ""}
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
              className="border px-4 py-2 bg-black"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={addProduct}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Product
            </button>
          </div>
          <div className="text-green-500 container mx-auto font-bold">
            {alert}
          </div>
        </form>
      </div>
      <div className="text-2xl my-5 flex justify-center text-center bg-red-300 mx-auto py-10 font-extrabold">
        <h1>Your products</h1>
      </div>
      {/* Table for displaying current stock */}
      <div className="container mx-auto">
        <table className="table-auto mx-auto mt-8">
          <thead>
            <tr>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item.slug}>
                  <td className="border px-4 py-2">{item.slug}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">₹ {item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
