import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import product from "../Images/product.jpg";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const AddItem = () => {
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(product);
  const { user, setUser } = useContext(UserContext);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [item, setItem] = useState({
    pname: "",
    pprice: "",
    pdescription: "",
    pcategory: "",
  });

  
  let name_field, value_field;
  const handleUser = (e) => {
    name_field = e.target.name;
    value_field = e.target.value;
    setItem({ ...item, [name_field]: value_field });
  };


  const handleImg = (e) => {
    setImage(e.target.files[0]);
    changePreviewImage(e);
  };

  const changePreviewImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const formData = new FormData();
const addProduct = async (e) => {
    e.preventDefault();

    const { pname, pprice, pcategory, pdescription } = item;
   
    if((!pname || !pprice || !pcategory || !pdescription) || (!image)){
      toast.warning("Please fill all the field!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }else{
      
      formData.append("pname", pname);
      formData.append("pprice", pprice);
      formData.append("pcategory", pcategory);
      formData.append("pdescription", pdescription);
      formData.append("pimage", image);
      // console.log("dfd",formData.get('pimage'));
      setLoading(true);
      //${process.env.REACT_APP_BACKENDURL}
      const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/additems`, {
        method: "POST",
        body: formData,
        credentials: 'include'
      });
  
      const itemData = await res.json();
      // console.log(itemData);
      setLoading(false);
      if (itemData && res.status === 201) {
        toast.success("Item added Successfully.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setItem({
          pname: "",
          pprice: "",
          pdescription: "",
        });
        let op = document.getElementById("pcategory");
        op.options[0].selected = true;
        setImage(null);
        setPreviewImage(product);
        return;
      } else {
        toast.error("Something went wrong,item not added!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }
  };
  
  if(user && user.customer==="buyer"){
    toast.warning("You are buyer!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    navigate("/")
  }else if(user && user.customer==="seller"){
    return (
      <>
        <div className="mt-4 sm:mt-0">
          <div className="mt-8 md:grid md:grid-cols-3 md:gap-6 shadow">
            <div className=" m-4 md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Add Item To Your Account
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Preview of Your Product Image
                </p>
              </div>
              <div className="px-4 sm:px-0">
                <div className="m-2">
                  <img src={previewImage} alt="preview selected images" />
                </div>
              </div>
            </div>
            <div className="mt-5   md:mt-0 md:col-span-2">
              <form method="POST">
                <div className="shadow overflow-hidden sm:rounded-md m-4">
                  <div className="px-4 py-5 bg-black sm:p-6 ">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first_name"
                          className="block text-sm font-medium text-white"
                        >
                          Product Picture
                        </label>
                        <input
                          type="file"
                          onChange={handleImg}
                          
                          name="pimage"
                          id="pimage"
                          accept="images/jpeg"
                          autoComplete="given-name"
                          className="border-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-white rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first_name"
                          className="block text-sm font-medium text-white"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          onChange={handleUser}
                          value={item.pname}
                          name="pname"
                          id="pname"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last_name"
                          className="block text-sm font-medium text-white"
                        >
                          Procuct Price
                        </label>
                        <input
                          type="number"
                          onChange={handleUser}
                          value={item.pprice}
                          name="pprice"
                          id="pprice"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="email_address"
                          className="block text-sm font-medium text-white"
                        >
                          Product Description
                        </label>
                        <textarea
                          row="12"
                          onChange={handleUser}
                          value={item.pdescription}
                          type="text"
                          name="pdescription"
                          id="pdescription"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <select
                          id="pcategory"
                          onChange={handleUser}
                          name="pcategory"
                          autoComplete="pcategory"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>--Select the Category--</option>
                          <option value="electronics">Electronics</option>
                          <option value="clothes">Clothes</option>
                          <option value="shoes">Shoes</option>
                          <option value="jewelry">jewellery</option>
                          <option value="home">Home Decoration</option>
                          <option value="books">Books</option>
                          <option value="sports">Sports</option>
                          <option value="toys">Toys</option>
                        </select>
                      </div>
                    </div>
                  </div>
  
                  <div className="px-4 py-3 bg-gray-900 text-center sm:px-6">
                    
                    <button
                      type="submit"
                      onClick={addProduct}
                      className="hover:bg-red-500 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }else if(loading){
    return(<>
   <Loader/>
    </>)
  }else{
    return(<>
      <Loader/>
    </>)
  }
   
};
export default AddItem;
