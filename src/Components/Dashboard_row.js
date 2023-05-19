import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";


const Dashboard_row = ({ items }) => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(items.imageUrl);
  const [previewImage, setPreviewImage] = useState(items.imageUrl);
  const [loading,setLoading] = useState(false);
 

  const [item, setItem] = useState({
    pname: items.name,
    pprice: items.price,
    pdescription: items.description,
    pcategory: items.category,
  });

  const handleImg = (event) => {
    setImage(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
      }
  };

  let name_field, value_field;
  const handleUser = (e) => {
    name_field = e.target.name;
    value_field = e.target.value;
    setItem({ ...item, [name_field]: value_field });
  };

  
  const handleEdit =async () => {
    setLoading(true);
    const { pname, pprice, pcategory, pdescription } = item;
    console.log('in edit data');
    try{
        console.log('in try');
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
            setLoading(false);
            return;
          }else{
            const formData = new FormData();
            formData.append("pname", pname);
            formData.append("pprice", pprice);
            formData.append("pcategory", pcategory);
            formData.append("pdescription", pdescription);
            formData.append("pimage", image);
            console.log('fetch above');
            const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/updatedata/${items._id}`, {
                method: "PUT",
                body: formData,
                credentials: "include",
              });
              const updatedItem = await res.json();
              console.log('gettin update Item');
              if (res.status === 200 && updatedItem) {
                console.log("Updated Item:", updatedItem);
                toast.success("item Updated Successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                  });
              } else {

                toast.warning("Something Went Wrong!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                  });
              }
              setLoading(false); 
              setModal(false);
          }

    }catch(error){
        console.log("catch error:",error);
    }
   
  };

  const handleDelete = async()=>{
        try{
            setLoading(true);
                const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/itemdelete/${items._id}`,{
                    method:"DELETE",
                    headers: {
                        "Content-Type": "application/json",                      
                    },
                    credentials:"include"
                });

                if(res.status===200){
                    toast.success("item Deleted Successfully", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      });
                }else{
                    toast.error("item Not Deleted!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      });
                }
                setLoading(false);
        }catch(error){
            toast.error("item Not Deleted!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
              setLoading(false);
        }
  }

  if(loading){
    return(<>
 <Loader/>
    </>)
  }else{
    return (
        <>
          {/* <!-- ====== Modal Section Start --> */}
          {modal ? (
            <>
              <section >
                <div
                  x-show="modalOpen"
                  x-transition="true"
                  className="fixed mx-auto top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5"
                >
                  <div className="overflow-y-auto max-h-screen w-full max-w-[1111px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]">
                    <h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
                      Update The Product Details
                    </h3>
                  
            <section class="pt-6 pb-6 lg:pt-[6px] lg:pb-6 overflow-y-auto">
          <div class="container mx-auto ">
            <div class="-mx-4 flex flex-wrap">
    
            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
                <div class="mb-12">
                  <label for="" class="mb-3 block text-base font-medium text-black">
                    Name
                  </label>
                  <input
                    type="text"
                    value={item.pname}
                    name="pname"
                    onChange={handleUser}
                    class="w-full rounded-lg border-[1.5px] border-form-stroke py-3 px-5 font-medium text-body-color placeholder-body-color outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD]"
                  />
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="mb-12">
                  <label for="" class="mb-3 block text-base font-medium text-black">
                    Price
                  </label>
                  <input
                    type="number"
                    name="pprice"
                   value={item.pprice}
                   onChange={handleUser}
                    class="w-full rounded-lg border-[1.5px] border-form-stroke py-3 px-5 font-medium text-body-color placeholder-body-color outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD]"
                  />
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              
              <div class="mb-12">
                  <label for="" class="mb-3 block text-base font-medium text-black">
                    category
                  </label>
                  <div class="relative">
                    <select
                      class="w-full appearance-none rounded-lg border-[1.5px] border-form-stroke py-3 px-5 font-medium text-body-color outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD]"
                        defaultValue={item.pcategory}
                        onChange={handleUser}
                        name="pcategory"
                    >
                      <option value="electronics">Electronics</option>
                              <option value="clothes">Clothes</option>
                              <option value="shoes">Shoes</option>
                              <option value="jewelry">jewellery</option>
                              <option value="home">Home Decoration</option>
                              <option value="books">Books</option>
                              <option value="sports">Sports</option>
                              <option value="toys">Toys</option>
                    </select>
                    <span
                      class="absolute right-4 top-1/2 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color"
                    >
                    </span>
                  </div>
                </div>
    
              </div> 
    
              <div class="w-full px-4 md:w-1/2 lg:w-1/3">
                <div class="mb-12">
                  <label for="" class="mb-3 block text-base font-medium text-black">
                    Description
                  </label>
                  <textarea
                    rows="5"
                    cols="10"
                    onChange={handleUser}
                    name="pdescription"
                    value={item.pdescription}
                    class="w-full rounded-lg border-[1.5px] border-form-stroke py-3 px-5 font-medium text-body-color placeholder-body-color outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD]"
                  ></textarea>
                </div>
              </div>
    
              <div class="w-full px-4 md:w-1/2 lg:w-1/3">
                <div class="mb-12">
                <img src={previewImage} alt="preview selected images" />
                </div>
         </div>
         <div class="w-full px-4 md:w-1/2 lg:w-1/3">
                <div class="mb-12">
                <label for="" class="mb-3 block text-base font-medium text-black">
                    Default file input
                  </label>
                  <input
                    type="file"
                    onChange={handleImg}
                              name="pimage"
                              id="pimage"
                    class="w-full cursor-pointer rounded-lg border-[1.5px] border-form-stroke font-medium text-body-color placeholder-body-color outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-form-stroke file:bg-[#F5F7FD] file:py-3 file:px-5 file:text-body-color file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD]"
                  />
                    </div>
                    </div>
    
                </div>
                
           
    
                </div>
                </section>
                    <div className="-mx-3 flex flex-wrap">
                      <div className="w-1/2 px-3">
                        <button
                          onClick={() => setModal(false)}
                          className="block w-full rounded-lg border border-[#E9EDF9] p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="w-1/2 px-3">
                        <button
                        onClick={()=>handleEdit()}
                        className="block w-full rounded-lg border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90">
                          Update Data
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : null}
    
          {/* <!-- ====== Modal Section End --> */}
    
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {items.name}
            </td>
            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
              {items.category}
            </td>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {items.price}
            </td>
            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
              <button
                onClick={() => {
                  setModal(true);
                }}
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </button>
            </td>
            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
              <button
                onClick={() => {
                  handleDelete();
                }}
                className="text-red-600 dark:text-blue-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        </>
      );
  }
 
};

export default Dashboard_row;
