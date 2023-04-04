import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import AddToCart from './AddToCart';
import Header from './Header';
import { Circles } from "react-loader-spinner";


const SearchedProduct = () => {
  let location = useLocation();
  const item = location.state;
  if(!item){
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
      <Header/>
        <section className="py-10 bg-gray-100">
            <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.keys(item.item).map((key, value) => {
                 return (
                   <div key={item.item[key]._id}>
                     <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                       <NavLink to="/displayitem" state={{ itemData: item.item[key] }}>
                         <div className="relative flex items-end overflow-hidden rounded-xl">
                           <img
                             className="object-contain h-48 w-96"
                             src={`http://localhost:5000/${item.item[key].imageUrl}`}
                             alt="product Photo"
                           />
                         </div>
                         </NavLink>
                         <div className="mt-1 p-2">
                           <h2 className="text-slate-800">
                             {item.item[key].name}
                           </h2>
                           <p className="mt-1 text-lg text-slate-600">
                             <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                               {item.item[key].category}
                             </span>
                           </p>

                           {/* <p className="mt-1 text-sm text-slate-400">
                           {itemsData[key].description}
                           </p> */}
                           {/* <p className="mt-1 text-sm text-slate-200">
                           {itemsData[key].owner}
                           </p> */}

                           <p className="text-lg font-bold text-blue-500">
                             {item.item[key].price}
                           </p>

                           <div className="mt-3 flex items-end justify-between">
                             <AddToCart itemId={item.item[key]._id} />
                           </div>
                         </div>
                     
                     </article>
                   </div>
                 );
              })}
            </div>
          </section> 
      </>
    )
  }

}

export default SearchedProduct
