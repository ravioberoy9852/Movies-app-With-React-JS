import React, { useState,useEffect } from 'react'
import axios from 'axios';

export default function Movie() {

    const [hover, sethover] = useState('');
    const [parr, setparr] = useState([1]);
    const [currPage, setcurrPage] = useState(1);
    const [movies, setmovies] = useState([]);
    const [favourites, setfavourites] = useState([]);

   
   useEffect(async() => {
       const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e80375e32a0c4129416c817114d85bca&language=en-US&page=${currPage}`)
       let data =res.data
       setmovies([...data.results]);
     console.log("useeffect");
   }, [currPage])

  const nextPage=()=>{
       let tarr=[];
       for(let i=1;i<=parr.length+1;i++){
           tarr.push(i);
       }
       setparr([...tarr]);
       setcurrPage(currPage+1)
   }
   const prevPage=()=>{
       if(currPage!=1){
           setcurrPage(currPage-1)
        
       }
   }
  const  clickPage=(val)=>{
    if(val!=currPage){
        setcurrPage(val)
    }
   }
   const handleFavourites=(movieObj)=>{
     let oldData =JSON.parse(localStorage.getItem("movies-app")||"[]")
     if(favourites.includes(movieObj.id)){
         oldData=oldData.filter((m)=>
             m.id!=movieObj.id
         )
     }else{
         oldData.push(movieObj);
     }
     localStorage.setItem("movies-app",JSON.stringify(oldData));
     let temp = oldData.map((movie)=>movie.id);
     setfavourites([...temp]);
   }


    return (
        <>

            {
             movies.length == 0 ?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> :


                <div>
                    <h3 className="text-center" style={{color:'white'}}><strong>Trending</strong></h3>
                    <div className="movies-list">
                    {
                        
                            movies.map((movieObj)=>(
                                <div className="card movies-card" onMouseEnter={()=>sethover(movieObj.id)} onMouseLeave={()=>sethover('')}>
                                    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}  alt={movieObj.title} className="card-img-top movies-img"/>
                                    {/* <div className="card-body"> */}
                                        <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                        {/* <p class="card-text movies-text">{movieObj.overview}</p> */}
                                        <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                                        {
                                            hover == movieObj.id &&
                                            <a className="btn btn-primary movies-button" onClick={()=>handleFavourites(movieObj)} >{favourites.includes(movieObj.id)?"Remove from favourites":"Add to favourites"}</a>
                                        }
                                        </div>
                                    {/* </div> */}
                                </div>
                            ))
                        
                    }
                    </div>
                    <div style={{display:'flex',justifyContent:'center'}}> 
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" onClick={prevPage}>Previous</a></li>
                                {
                                    parr.map((value)=>(
                                        <li class="page-item"><a class="page-link" onClick={()=>clickPage(value)}>{value}</a></li>
                                    ))
                                }
                                <li class="page-item"><a class="page-link" onClick={nextPage}>Next</a></li>
                            </ul>
                        </nav> 
                     </div> 
                </div>
            }
        </>
    )
}
