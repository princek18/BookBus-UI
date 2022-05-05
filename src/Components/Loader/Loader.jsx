import React from 'react';
import { Audio } from 'react-loader-spinner';
import './Loader.css'

export const Loader = () => {
  return (
    <div className='overlay' id="loader">
      <div style={{left: "47%", top: "50%", bottom: "50%", position: "fixed"}}>
        <Audio color="black" height={80} width={80} />
      </div>
    </div>
  )
}
