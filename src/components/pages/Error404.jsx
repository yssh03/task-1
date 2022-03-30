import React from 'react';
import { useNavigate } from 'react-router-dom';
import Error from "../../assets/6368620.jpg";

function Error404() {
  const navigate = useNavigate()
  return (
    <div className='inline-block justify-center w-2/6 h-2/6'>
      <img src={Error} alt="Page not found!!" />
      <div className="ui secondary button" onClick={() => navigate("/home")}>Go to Home</div>
    </div>
  )
}

export default Error404