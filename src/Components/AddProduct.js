import React, { useState } from "react";

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const addproduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
    }
    return (
        <div className="addproduct">
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter Product Name" className="inputbox"
             onChange={(e) => setName(e.target.value)} value={name} />
            {error && !name && <span className="invalid-input">Enter valid Name</span>}
            <input type="text" placeholder="Enter Product Price" className="inputbox"
             onChange={(e) => setPrice(e.target.value)} value={price} />
            {error && !price && <span className="invalid-input">Enter valid Price</span>}

            <input type="text" placeholder="Enter Product Category" className="inputbox"
             onChange={(e) => setCategory(e.target.value)} value={category} />
            {error && !category && <span className="invalid-input">Enter valid Category</span>}

            <input type="text" placeholder="Enter Product Company" className="inputbox"
             onChange={(e) => setCompany(e.target.value)} value={company} />
            {error && !company && <span className="invalid-input">Enter valid Company</span>}

            <button type="button" className="signupbtn" onClick={addproduct}>Add Product</button>




        </div>
    )
}

export default AddProduct;