import {React, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from "axios";
import config  from '../config.json';

export default function Homepage() {

  const history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = `${config.apiUrl}/products?populate=picture`;
    const fetchProducts = async () => {
      const  data  = await axios.get(url);
      setProducts(data.data.data);
    };
    fetchProducts();
  },[]);

  const handleDelete = async (id) => {
    const url = `${config.apiUrl}/products/${id}`;
    await axios.delete(url);
    setProducts(products.filter(product => product.id !== id));
  }

  return (
    <div >
    {products.map(product => (
      <div key={product.id} className="review-card glowing">
        <h1 style={{marginBottom: "0"}}>{product.attributes.title}</h1>
        <div>
          <small>Publish time : {new Date(product.attributes.publishedAt).toUTCString()}</small>
        </div>
        <div className = "img-title">
          <img src={product.attributes.picture ? `${config.url}${product.attributes.picture.data.attributes.formats.thumbnail.url}`: ""} alt={product.attributes.title} />
          <p>{product.attributes.description}</p>
        </div>
        <div className="buttons">
          <button className="button-75"  onClick={() => {history.push(`/product/${product.id}`)}}><span className="text">Edit</span></button>
          <button className="button-75 button-76"  onClick={() => {handleDelete(product.id)}}><span className="text">Delete</span></button>
        </div>
      </div>
    ))}
    </div>
  )
}
