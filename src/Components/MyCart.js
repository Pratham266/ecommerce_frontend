import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
const MyCart = () => {
  const [cartData, setCartData] = useState({});
  const [items, setItems] = useState({});
  const [loading,setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const getDetails = async () => {
    setLoading(true)
    //${process.env.REACT_APP_BACKENDURL}
    console.log("fetch cart ");
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include"
      });
      const data = await res.json();
      console.log("cart data : ",data);
      setLoading(false)
     

      if (res.status === 201) {
        setLoading(false);
        setCartData(data);
        
        if(data && data.items){
          setItems(data.items);
        }
        else{
          setItems({});
        }

      }else if(res.status === 200){
        toast.warning("Your cart is empty", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      }else{
        setLoading(false)
        throw new Error(res.error);
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }  
    setLoading(false)
  };

  
  const deletItem = async (itemId) => {
    console.log("ID:",itemId);
    setLoading(true)
    // ${process.env.REACT_APP_BACKENDURL}
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/cartdelete?itemId=${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include"
      });
      setLoading(false)
      if (res.status === 200) {
        const cartdata = await res.json();
        toast.success("Item Deleted", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setCartData(cartdata);
        setItems((prevItems) =>
          prevItems.filter((item) => item.itemId !== itemId)
        );
      } else {
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
    } catch (error) {
      toast.error("Something went wrong !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const orderMailSend = async () => {
    setLoading(true)
    const bill = cartData.bill;
    // ${process.env.REACT_APP_BACKENDURL}
    const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, bill }),
      credentials:"include"
    });
    const data = await res.json();
    
    if (res.status === 200) {
      setLoading(false)
      setCartData({})
      toast.success("email send successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      setLoading(false)
      toast.error("email not send!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
 
  useEffect(() => {
    getDetails();
  }, []);

  if(loading){
    return(<>
      <Loader/>
    </>)
  }
  else if (user && user.customer === "seller") {
    // return <>You are seller</>;
    toast.warning("You are seller!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    navigate("/")
  } else if (user && user.customer === "buyer") {
    return (
      <>
      {/* {console.log(Object.keys(cartData).length)} */}
        <section
          className="antialiased bg-gray-100 text-gray-600 h-screen px-4"
          x-data="app"
        >
          <div className="flex flex-col justify-center h-full">
            {/*<!-- Table --> */}
            {
              (Object.keys(cartData).length ==0)?<>
              <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
              <div className="font-semibold text-red-700">You cart is Empty!</div>
            </header>
            </div>
            </>:
            <>
            <div>
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
                <div className="font-semibold text-gray-800">Manage Carts</div>
              </header>
              
              <div className="overflow-x-auto p-3">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2">
                        <div className="font-semibold text-left">Sr.</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-left">
                          Product Name
                        </div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-left">Quantity</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-left">Price</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-center">Total</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-center">Delete</div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-sm divide-y divide-gray-100">
                    {/* record */}
                    {Object.keys(items).map((key, value) => {
                      return (
                        <>
                          <tr key={key}>
                            <td className="p-2">{value + 1}</td>
                            <td className="p-2">
                              <div className="font-medium text-gray-800">
                                {items[key].name}
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="text-left">
                                {items[key].quantity}
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="text-left font-medium text-green-500">
                                Rs {items[key].price}
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="flex justify-center text-red-500">
                                Rs {items[key].price * items[key].quantity}
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="text-center font-medium">
                                <AiFillDelete
                                  onClick={() => deletItem(items[key].itemId)}
                                  className="cursor-pointer text-center"
                                />
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* <!-- total amount --> */}
              <div className="flex justify-end font-bold space-x-4 text-2xl border-t border-gray-100 px-5 py-4">
                <div className="text-red-800">Grand Total : </div>
                <div className="text-blue-600">
                  Rs <span x-text="total.toFixed(2)"> {cartData.bill}</span>
                </div>
              </div>
              <div className="flex justify-center font-bold space-x-4 text-2xl border-t border-gray-100 px-5 py-4">
                <button
                  onClick={orderMailSend}
                  className="py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                >
                  Order Now
                </button>
              </div>
              </div>
            </div>
            </>
            }
            

          </div>
        </section>
      </>
      
    );
  } else{

    return (
      <>
    <Loader/>
      </>
    );

  }
};

export default MyCart;
