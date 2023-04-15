import React, { useState, useEffect } from 'react'

import axios from 'axios';



export default function Banner() {
    const [movie, setmovie] = useState([])

    useEffect(async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e80375e32a0c4129416c817114d85bca&language=en-US&page=1`)
        let data = res.data
        console.log(data)
        setmovie([...data.results]);

    }, [])


    return (
        <div>
            {


                movie == '' ?
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                    <div className="banner-p">
                        <div className="card banner-card">
                            <img src={`https://image.tmdb.org/t/p/original${movie[0].backdrop_path}`} alt={movie[0].title} className="card-img-top banner-img" />
                            <h1 className="card-title banner-title">{movie[0].original_title}</h1>
                            <p class="card-text banner-text">{movie[0].overview}</p>

                        </div>
                        
                    </div>
            
            
             } </div>
    )
            }
