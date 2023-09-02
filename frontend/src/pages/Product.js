import {React, useEffect, useState } from 'react'
import axios from "axios";
import { useHistory , useParams} from "react-router-dom";
import config  from '../config.json';

export default function Product() {

    const history = useHistory();
    const { id } = useParams();
    const [product, setProduct] = useState({
    id: "",
    attributes: {},
    });
    const [edited, setEited] = useState(false);

    useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
        const url = `${config.apiUrl}/products/${id}?populate=picture`;
        const  data  = await axios.get(url);
        setProduct(data.data.data);
    };
    fetchProduct();
    },[id]);
  

    const handleSave = async (id) => {
        product.title = document.getElementById("title").innerHTML;
        product.description = document.getElementById("description").innerHTML;
        setProduct(product);
        await axios.put(`${config.apiUrl}/products/${id}`, {data: product});
        history.push('/')
    }

    const handleDelete = async (id) => {
        const url = `${config.apiUrl}/products/${id}`;
        await axios.delete(url);
        history.push('/')
    }

  return (
    <div>
        <div key={product.id} className="review-card glowing">
            <h1 style={{marginBottom: "0"}} contentEditable="true" id = "title"  onClick={() => {setEited(true)}}>{product.attributes.title}</h1>
            <div>
                <small>Publish time : {new Date(product.attributes.publishedAt).toUTCString()}</small>
            </div>
            <div className = "img-title">
                <img src={product.attributes.picture ? `${config.url}${product.attributes.picture.data.attributes.formats.thumbnail.url}`: ""} alt={product.attributes.title} />
                <p id = "description" contentEditable="true" onClick={() => {setEited(true)}}>{product.attributes.description}</p>
            </div>
            <div className="buttons">
                <button className="button-75 button-76"  onClick={() => {handleDelete(product.id)}}><span className="text">Delete</span></button>
                <button className="button-75"   onClick={() => {handleSave(product.id) }} style={{"visibility" : edited? "visible": "hidden"}}><span className="text">Save</span></button>
            </div>
        </div> 
    </div>
  )
}
