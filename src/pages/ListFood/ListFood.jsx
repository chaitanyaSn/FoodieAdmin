import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './ListFood.css';

const ListFood = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/foods");
      if (response.status === 200) {
        setList(response.data);
      } else {
        toast.error("Error while reading the food");
      }
    } catch (error) {
      toast.error("Failed to fetch food data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/foods/${id}`);
      if (response.status === 204) {
        toast.success("Item removed successfully");
        fetchList(); // Call fetchList only after a successful deletion
      } else {
        toast.error("Error in removing food");
      }
    } catch (error) {
      toast.error("Failed to delete food item");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className='py-5 justify-content-center row'>
      <div className='card col-11'>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : list.length === 0 ? (
          <p className="text-center">No food items found.</p>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index}>
                  <td><img src={item.imageUrl} alt={item.name} height={40} width={48} /></td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>&#8377;{item.price}</td>
                  <td className='text-danger'>
                    <i className='bi bi-x-circle-fill' onClick={() => removeFood(item.id)} style={{ cursor: "pointer" }}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListFood;
