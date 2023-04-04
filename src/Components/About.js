import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ecommerce from '../Images/ecommerce.jpg';
import { Circles } from "react-loader-spinner";

const About = () => {
  const navigate = useNavigate();
  const [userData,setUserData] = useState({});
  const [loading,setLoading] = useState(false);

  const callAboutPage = async()=>{
    setLoading(true);
    try{  
      const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/about`,{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      
      if (res.ok) {
        const data = await res.json();
        setLoading(false)
        setUserData(data);
      } else {
        setLoading(false)
        throw new Error(res.statusText);
      }
      setLoading(false)
    } catch(error){
      setLoading(false)
      navigate("/login");
    }
  }

  useEffect(()=>{
      callAboutPage();
  },[]);
  if(loading){
      return(<>
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
      </>)
  }else{
    return (
      <>
        <div className="py-16 bg-white">  
    <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img src={ecommerce} alt="vector image for ecommerce" loading="lazy" width="750" height="650"/>
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">RaoEcommerce</h2>
            <p className="mt-6 text-gray-600">Welcome to RaoEcommerce, your one-stop destination for buying and selling products online. Our website offers a wide range of categories, including electronics, clothes, shoes, jewelry, home decorations, books, sports equipment, and toys.</p>
            <p className="mt-4 text-gray-600">Our mission is to provide a seamless online shopping experience to our customers by ensuring the highest quality products at competitive prices. We strive to offer a secure and reliable platform where buyers and sellers can connect and transact with confidence.</p>
            <p className="mt-6 text-gray-600">At RaoEcommerce, we understand that buying and selling products online can be a daunting task. That's why we have implemented a user-friendly interface that enables users to easily navigate our website and find the products they are looking for. Our advanced search feature allows users to filter products based on their category, price, and other specifications.</p>
            <p className="mt-4 text-gray-600">We also offer a safe and secure payment gateway to ensure that our customers' transactions are processed seamlessly. Our team of customer service representatives is always available to assist users with any queries or concerns they may have.</p>
            <p className="mt-6 text-gray-600">At RaoEcommerce, we believe in empowering our users to sell their products easily and efficiently. Our platform allows sellers to create their online store and upload their products quickly. We provide sellers with advanced tools to manage their inventory, track orders, and monitor their sales performance.</p>
            <p className="mt-4 text-gray-600">Our website is designed to provide a personalized experience to each of our users. Whether you're a buyer or a seller, our platform offers a range of features that cater to your needs. We are committed to providing a reliable and efficient platform that enables our users to buy and sell products online with ease.</p>
            <p className="mt-4 text-gray-600">Thank you for choosing RaoEcommerce as your preferred online shopping destination. We look forward to serving you and providing you with the best online shopping experience.</p>
          </div>
        </div>
    </div>
  </div>
      </>
    )
  }
  
}

export default About
