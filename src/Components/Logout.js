import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import { Circles } from "react-loader-spinner";
import {toast } from "react-toastify";

const Logout = () => {
    const {setUser} = useContext(UserContext);
    
    const navigate = useNavigate();
    useEffect(()=>{ 

        fetch(`${process.env.REACT_APP_BACKENDURL}/logout`,{
        method:"GET", 
          headers:{
              Accept:"appllication/json",
              "Content-Type":"application/json"
          },
         credentials:"include"
        }).then((res)=>{
            // localStorage.setItem("login",false);
            setUser(null); // Set the user context state to null
            toast.success("You are successfully logged Out", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
      
            navigate('/login',{replace:true});
            if(res.status != 201){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        })

    });

  return (
    <>
    <div className="h-screen flex items-center justify-center">
        <Circles
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperclassName="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      </div>
    </>
  )
}

export default Logout
