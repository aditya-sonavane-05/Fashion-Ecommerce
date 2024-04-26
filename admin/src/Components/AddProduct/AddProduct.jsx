import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails,setProductdetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const imageHandler =(e) =>{
        setImage(e.target.files[0]);

    }
    const changeHandler =(e)=>{
        setProductdetails({...productDetails,[e.target.name]:e.target.value})
    }
    // const Add_product  = async()=>
    // {
    //     console.log(productDetails);
    //     let responseData;
    //     let product = productDetails;
    //     let formData = new FormData();
    //     formData.append('product',image);

    //     await fetch('http://localhost:4000/upload',{
    //         method:'POST',
    //         headers:{
    //             Accept:'application/json',
    //         },
    //         body:formData,
    //     }).then((resp)=>responseData = resp).then((data)=>{responseData=data});

    //     if (responseData.success){
    //         product.image=responseData.image_url;
    //         console.log(responseData);
    //         console.log(product);
    //         await fetch('http://localhost:4000/addproduct',{
    //             method:'POST',
    //             headers:{
    //                 Accept:'application/json',
    //                 'Content-Type':'application/json',
    //             },
    //             body: JSON.stringify(product),
    //         }).then((resp)=>resp.json()).then((data)=>{
    //             data.success?alert("Product Added"):alert("Failed")
    //         })
    //     }
    // }
    const Add_product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);
    
        try {
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });
            responseData = await uploadResponse.json();
    
            if (uploadResponse.ok) {
                if (responseData.success) {
                    product.image = responseData.image_url;
                    console.log(responseData);
                    console.log(product);
                    const addProductResponse = await fetch('http://localhost:4000/addproduct', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(product),
                    });
                    const addProductData = await addProductResponse.json();
                    if (addProductData.success) {
                        alert("Product Added");
                    } else {
                        alert("Failed to add product");
                    }
                } else {
                    alert("Failed to upload image");
                }
            } else {
                alert("Failed to upload image: " + uploadResponse.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding product");
        }
    }
    
  return (

    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>Add_product()} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct