import React from 'react'
import { Link } from 'react-router-dom';

export default function navbar() {
    return (
        <div>
            <div className=" nav-bar">
            
            <Link to="/" style={{textDecoration:'none'}}><h1 style={{marginTop:'1rem',marginLeft:'1rem',color:'white'}}>Movies App</h1></Link>
            <Link to="/favourites" style={{textDecoration:'none'}}><h1 style={{marginRight:'2rem',marginTop:'1.5rem',color:'white'}}>Favourites</h1></Link>
            </div>
        
        </div>
    )
}

