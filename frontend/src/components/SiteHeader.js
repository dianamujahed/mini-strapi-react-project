import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from "axios";
import config  from '../config.json';

export default function SiteHeader() {

  const [header, setHeader] = useState(null);
  const url = `${config.apiUrl}/home?populate=header`;

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const response = await axios.get(url);
        setHeader(response.data.data);
      } catch (error) {
        console.error('Error fetching header:', error);
      }
    };
    fetchHeader();
  },[url]);

  return (
    <div className="site-header">
      <Link to="/">
        <h1>{header ? header.attributes.header.title : 'Loading...'}</h1>
      </Link>
    </div>
  )
  
}
