import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'


function ProductsList(){

    const [products,setProducts]=useState([]);

    useEffect(()=>{
        getProducts();

    },[])

    const getProducts=async()=>{
        let result=await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        setProducts(result);
    }
    console.warn("products",products);

    const deleteproduct=async(id)=>{
        let result=await fetch(`http://localhost:5000/product/${id}`,{
            method:'Delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        console.warn(result);
        if(result){
        getProducts();
        }
    }

    const searchHandler=async(event)=>{
        let key=event.target.value;
        if(key){
            let result=await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result=await result.json();
            if(result){
                setProducts(result);
            }

        }else{
            getProducts();
        }
       

    }
    return(
        <div className="product-list">
            <h1>Products List</h1>
            <input type="text" placeholder="Search Product" className="search-product" onChange={searchHandler}/>
            <ul>
                <li>S.NO</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operations</li>
            </ul>
            {
               products.length>0? products.map((item,index)=>
                    <ul key={item._id}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li><button  onClick={()=>deleteproduct(item._id)}><FontAwesomeIcon icon={faTrash} /></button>
                    <Link to={'/update/'+item._id}><FontAwesomeIcon icon={faPenToSquare} /></Link></li>
                </ul>

                ):<h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductsList;