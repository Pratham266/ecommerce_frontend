import React, { useEffect, useState } from 'react'
import { Circles } from "react-loader-spinner";

const Dashboard = () => {
    // const [allItem,setAllItem] = useState(null);
    const [loading,setLoading] = useState(false);
    const [items,setItems] = useState({});

    const allItemsOfBuyer = async () => {
        setLoading(true);
        
        const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/dashboard`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include"
        });
        const data = await res.json();
        setItems(data);
        setLoading(false);
      };

      useEffect(()=>{
        allItemsOfBuyer();
      },[])

      const handleEdit=(item)=>{
        console.log("click on edit",item);
      }

if(loading){
    return <>
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
 </>;
}else{
    return (
        <div className="max-w-2xl mx-auto">
    <p className="mt-5 text-3xl text-center m-4">Dashboard</p>
        <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                    Product Name
                                </th>
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                    Category
                                </th>
                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                    Price
                                </th>
                                <th scope="col" className="p-4">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                           
                           {Object.keys(items).map((key,value)=>{
                            return(<>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{items[key].name}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{items[key].category}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{items[key].price}</td>
                                <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                    <button onClick={()=>handleEdit(items[key])} className="text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                </td>
                            </tr>
                            </>)
                           })}
                           
                         
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
        
    </div>
      )
}
 
}

export default Dashboard
