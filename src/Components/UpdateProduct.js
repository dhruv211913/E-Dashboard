import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params=useParams();
    const navigate=useNavigate();

useEffect(()=>{
    getProductdetails();
},[]);

const getProductdetails=async()=>{
    let result=await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result=await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);

}
    const updateproduct = async () => {
        let result=await fetch(`http://localhost:5000/product/${params.id} `,{
            method:'put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
     result =await result.json();
     console.warn(result);
     navigate('/products');
    }
    return (
        <div className="addproduct">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter Product Name" className="inputbox"
                onChange={(e) => setName(e.target.value)} value={name} />
            <input type="text" placeholder="Enter Product Price" className="inputbox"
                onChange={(e) => setPrice(e.target.value)} value={price} />

            <input type="text" placeholder="Enter Product Category" className="inputbox"
                onChange={(e) => setCategory(e.target.value)} value={category} />

            <input type="text" placeholder="Enter Product Company" className="inputbox"
                onChange={(e) => setCompany(e.target.value)} value={company} />

            <button type="button" className="signupbtn" onClick={updateproduct}>Update Product</button>




        </div>
    )
}

export default UpdateProduct;