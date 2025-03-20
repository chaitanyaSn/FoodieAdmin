import axios from 'axios'
import React, { useState } from 'react'


const AddFood = () => {
  const[image,setImage]=useState(false)
  const[loading,setLoading]=useState(false)
  const[data,setData]=useState({
    name:'',
    description:'',
    price:'',
    category:''
  })
  const onHandleSubmit=async(event)=>{
    event.preventDefault();
    if(!image){
      alert("please select image")
      return
    }
    const formdata=new FormData();
    formdata.append('food',JSON.stringify(data))
    formdata.append('file',image)

    try {
setLoading(true)
      const response=await axios.post("http://localhost:8080/api/foods",formdata,{headers:{"Content-Type":"multipart/form-data"}})
      if(response.status===200){
        alert("food added successfully")
        setData({name:'',description:'',price:'',category:''})
        setImage(null)
        
      }
    } catch (error) {
      console.log('Error',error)
      setLoading(false)
      
    }

  }
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-4">
          <div className="card-body">
            <h2 className="mb-4">Add Food</h2>
            <form onSubmit={onHandleSubmit}>
            <div className="mb-2">
                <label htmlFor="image" className="form-label">
                <img src={image?URL.createObjectURL(image):"./upload.png"} alt="upload" width={60}/>
                </label>
                <input type="file" className="form-control" id="image"  hidden onChange={(e)=>setImage(e.target.files[0])}/>
              </div>
              <div className="mb-2">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" required name='name' onChange={onChangeHandler} value={data.name}/>
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" rows="5" required name='description' onChange={onChangeHandler} value={data.description}></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" className="form-control" id="price" required name='price' onChange={onChangeHandler} value={data.price}/>
              </div>
              <div className="mb-2">
                <label htmlFor="category" className="form-label">Category</label>
                <select className="form-control" id="category" required name='category' onChange={onChangeHandler} value={data.category}>
                  <option value="">Select Category</option>
                  <option value="burger">Burger</option>
                  <option value="pizza">Pizza</option>
                  <option value="pasta">Pasta</option>
                  <option value="salad">Salad</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">{`${loading?"Saving..":"save"}`}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFood
