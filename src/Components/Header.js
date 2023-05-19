import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { MdSearch } from "react-icons/md";
import { toast } from "react-toastify";

const Header =() => {

  const {user,setUser} = useContext(UserContext);
  const [search,setSearch] = useState("");

  const navigaet = useNavigate();

  const handleChange=(e)=>{
    setSearch(e.target.value);
  }

const searchData = async(e)=>{
  if(e.key === 'Enter'){
    const res=  await fetch(`${process.env.REACT_APP_BACKENDURL}/searchproduct`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        search
    })
    });
     const data = await res.json();
    if(res.status === 200){
      navigaet('/searchitem',{ state: { item: data } });
    }else if(res.status === 201){
      toast.warning("Product not found!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      
    }else{
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }  

  }else{
    return;
  }
   
  }

    const handleCategoryClick=async(cate)=>{
      // console.log(cate)
      const res=  await fetch(`${process.env.REACT_APP_BACKENDURL}/filretbycategory`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          cate
      })
      });
      
      const data = await res.json();
      // console.log(data);
     if(res.status === 200){
      navigaet('/searchitem',{ state: {item : data } });
    }else if(res.status === 201){

       toast.warning("Product not found!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

    }else{
        toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
   
  }

  return (

    <>
      <div className="sm:px-4 py-2.5  mt-4 z-20 top-0 left-0  w-full flex flex-wrap items-center justify-between bg-white text-black-900 shadow-lg">
        
        <div className="flex flex-col sm:flex-row justify-between item-center mx-auto" >
          <div className="lex items-center mb-3 sm:mb-0">
            <span className="ml-2 font-semibold text-[#252C32]">
              {user? user.name : ""}
              <span className="rounded-sm py-1 px-2 text-sm font-medium ">
                {user? user.customer : ""}
                {user?<>  {user.phone}</>:""}
              </span>
            </span>
          </div>

          <div className="ml-6 flex flex-1 gap-x-3 border border-[#1e293b]">
            <input
              type="text"
              className="w-full rounded-md px-3 py-2 text-sm"
              placeholder="Search here.."
              onChange={handleChange}
              onKeyDown={searchData}
            />
            <button><MdSearch style={{height: "auto",width:"auto",paddingRight:"12px"}}  onClick={searchData} className="cursor-pointer"/></button>
          </div>

          <div className="ml-2 flex  sm:flex-row justify-between items-center">
            <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
           
              {
              user && user.customer === "buyer"? (
                <div className="relative flex items-center sm:item-center mx-auto">
                  <NavLink to="/mycart" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                    <span className="text-sm font-medium">My Cart</span>
                  </NavLink>
                </div>
              ) : 
              null
              }

            </div>
          </div>
        </div>

        {/* <div className="mt-4 flex  justify-between"> */}
          
              {/* {user ?<><div className="flex gap-x-2 py-1"><MdMobileScreenShare/>{user.phone}</div></>: ""} */}
        
      

              <div className="flex items-center space-x-4 overflow-y-auto md:max-w-lg xl:max-w-5xl 2xl:max-w-7xl lg:max-w-3xl whitespace-nowrap">
            <NavLink className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"  to="/">
              All
            </NavLink>
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"  onClick={()=>handleCategoryClick("electronics")}>
              Electronics
            </span>
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100" onClick={()=>handleCategoryClick("clothes")}>
              Clothes
            </span>
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"   onClick={()=>handleCategoryClick("shoes")}>
              Shoes
            </span>
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"  onClick={()=>handleCategoryClick("jewelry")}>
             jewellery
            </span>
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"  onClick={()=>handleCategoryClick("home")}>
            Decoration
            </span>
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"   onClick={()=>handleCategoryClick("books")}>
              Books
            </span>
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"   onClick={()=>handleCategoryClick("sports")}>
              Sports
            </span>
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"  onClick={()=>handleCategoryClick("toys")}>
              Toys
            </span>
            <div>
    </div>
        
        </div>
        
      </div>
    </>
  );
};

export default Header;
