import React, { useEffect, useContext, useState } from 'react'
import Dashboard_row from './Dashboard_row';
import Loader from './Loader';
import { UserContext } from "../Context/UserContext";
const Dashboard = () => {
    // const [allItem,setAllItem] = useState(null);
    const [loading,setLoading] = useState(false);
    const [items,setItems] = useState({});
    const {user,setUser} = useContext(UserContext);

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

if(loading){
    return <>
<Loader/>
 </>;
}else{
    return (
    <>
    <div className="max-w-2xl mx-auto">
    <p className="mt-5 text-3xl text-center m-4">Dashboard</p>
    {
        user?<><p className="mt-5 text-2xl text-center m-4">Name : {user.name} </p>
        <p className="mt-5 text-2xl text-center m-4">Email : {user.email}</p></>:null
    }
    
        <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
                {
                    (Object.keys(items).length ==0)?<>
                    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
              <div className="font-semibold text-red-700">You are not added any Item!</div>
            </header>
            </div>
                    </>:<>
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
            <th scope="col" className="p-4">
                <span className="sr-only">Delete</span>
            </th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
    
      {Object.keys(items).map((key,value)=>{
        return(<>
        
        <Dashboard_row items={items[key]} key={items[key]._id}/>
        
        </>)
       })}
       
     
    </tbody>
</table>
</div>
                    </>
                }
               

            </div>
        </div>
    </div>
    
        
    </div>
    </>
      )
}
 
}

export default Dashboard
