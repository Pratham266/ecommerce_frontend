import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import AddToCart from "./AddToCart";
import Header from "./Header";

import Loader from "./Loader";

const Home = () => {
    const [itemsData, setAllItem] = useState({});
    const { user, setUser } = useContext(UserContext);
    const[loading,setLoading] = useState(false);
    

    const allItem = async () => {
      try {
          setLoading(true)
          //http:/localhost:5000/items
        const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/items`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const items = await res.json();
        setAllItem(items);
        setLoading(false)
        if (!res.status === 200) {
          throw new Error(res.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    
    const callUserData = async()=>{
      try{  
        setLoading(true);
        //console.log("path : ",`${process.env.REACT_APP_BACKENDURL}/about`)
        const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/about`,{
          method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:"include"
        });

        if(res.status === 201){
          setUser(null);
      }else if (res.ok) {
          const data = await res.json();
          setUser(data);
          setLoading(false);
        } else {
          throw new Error(res.statusText);
        }
      } catch(error){
        console.log(error);
      }
    }

    useEffect(() => {
      allItem();
      callUserData();
    }, []);


  if (loading) {
    return <>
  <Loader/>
    </>;
  } else {
    return (
      <>
      {/* {console.log("Home page : ",user)} */}
        <div className="bg-white">
            <Header />
          <div className="bg-white"></div>
          <section className="py-10 bg-gray-100">
            <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.keys(itemsData).map((key, value) => {
                return (
                  <div key={itemsData[key]._id}>
                    
                    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                      <NavLink to="/displayitem" state={{ itemData: itemsData[key] }} >
                        <div className="relative flex items-end overflow-hidden rounded-xl">
                          <img
                            className="object-contain h-48 w-96"
                            src={`${process.env.REACT_APP_BACKENDURL}/${itemsData[key].imageUrl}`}
                            alt="product Photo"
                          />
                        </div>
                        </NavLink>
                        <div className="mt-1 p-2">
                          
                          <h2 className="text-slate-800">     
                            {itemsData[key].name}
                          </h2>
                          <p className="mt-1 text-lg text-slate-600">
                            <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                              {itemsData[key].category}
                            </span>
                          </p>
                          <p className="text-lg font-bold text-blue-500">
                            {itemsData[key].price} ₹
                          </p>

                          <div className="mt-3 flex items-end justify-between">
                            <AddToCart itemId={itemsData[key]._id} />
                          </div>
                        </div>
                     
                    </article>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </>
    );
  }
};

export default Home;
