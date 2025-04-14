import axios from "axios";
const API_URL="http://localhost:8080/api/foods"
export const addfood=async(foodData,image)=>{
   
    const formdata=new FormData();
    formdata.append('food',JSON.stringify(foodData))
    formdata.append('file',image)
    try {
       
              await axios.post(API_URL,formdata,{headers:{"Content-Type":"multipart/form-data"}})
      
            } catch (error) {
              console.log('Error',error)
              throw error
           
              
            }
}

export const getFoodlist=()=>{
    try {
        
    } catch (error) {
        
    }
}