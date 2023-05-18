import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";

const AddToCart = (props) => {
  const { user, setUser } = useContext(UserContext);
  // console.log("Userid in addtocart : ",user._id);
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    const itemId = props.itemId;

    const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/addcart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ owner: user._id,itemId, quantity }),
      credentials:"include",
    });

    const data =await  res.json();

    console.log(data);
    if (data && res.status === 201) {
      toast.success("Item added to cart", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
    } else if (data.status === undefined) {
      toast.error("Item not added to cart", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     
    }
  };

  return (
    <>
      {user && user.customer === "buyer" ? (
        <>
          <input
            type="number"
            min="1"
            style={{ width: "50px", paddingLeft: "8px" }}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="ml-2 border-double border-4 border-indigo-600 rounded-lg"
          />
          <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            <button className="text-sm" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AddToCart;
