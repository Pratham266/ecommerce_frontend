import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import {toast } from "react-toastify";
import Loader from './Loader';

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
        <Loader/>
    </>
  )
}

export default Logout
