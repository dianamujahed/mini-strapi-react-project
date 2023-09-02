import {React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import config  from '../config.json';
export default function SiteHeader() {

  const [header, setHeader] = useState(null);
  const url = `${config.apiUrl}/home?populate=header`;

  useEffect(() => {
    console.log("useeffect")
    const fetchHeader = async () => {
      const  data  = await axios.get(url);
      setHeader(data.data.data);
      console.log(data)

    };
    fetchHeader();
  },[url]);

  return (
    <div className="site-header ">
      <Link to="/"><h1>{header ? header.attributes.header.title : ""}</h1></Link>
    </div>
    
  )
  
}
