import React from 'react'
import { useLocation } from 'react-router-dom'
import { BsCurrencyRupee } from "react-icons/bs";
import AddToCart from './AddToCart';
import Header from './Header';

const DisplayItem = () => {
    let location = useLocation();
    const  itemData  = location.state

    if(!itemData){
        return(<>Loading....</>)
    }else{
        return (
            <>
            <Header/>
              <div className="min-w-screen min-h-screen bg-yellow-300 flex items-center p-5 lg:p-10 overflow-hidden relative">
          <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
              <div className="md:flex items-center -mx-10">
                  <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                      <div className="relative">
                          <img  src={`http://localhost:5000/${itemData.itemData.imageUrl}`} className="w-full relative z-10" alt=""/>
                          <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                      </div>
                  </div>
                  <div className="w-full md:w-1/2 px-10">
                      <div className="mb-10">
                          <h1 className="font-bold uppercase text-2xl mb-5">{itemData.itemData.name} <br/>{itemData.itemData.category}</h1>
                          <p className="text-sm">{itemData.itemData.description}</p>
                      </div>
                      <div>
                          <div className="inline-block align-bottom mr-5">
                            <div className="flex">
                              <span className="text-2xl leading-none align-baseline"><BsCurrencyRupee/></span>
                              <span className="font-bold text-5xl leading-none align-baseline">{itemData.itemData.price}</span>
                              </div>
                          </div>
                          <div className="inline-block align-bottom flex">
                              <AddToCart itemId={itemData.itemData._id}/>
                              {/* <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"><i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW</button> */}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
            </>
          )
    }
    
  }

export default DisplayItem;