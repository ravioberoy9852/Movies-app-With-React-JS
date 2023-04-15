
import React, { useState,useEffect } from 'react'


export default function Favourite() {
    const [genres, setgenres] = useState(['All Genres']);
    const [currgen, setcurrgen] = useState('All Genres');
    const [movies, setmovies] = useState([]);
    const [currText, setcurrText] = useState('');
    const [limit, setlimit] = useState(5);
    const [curPage, setcurPage] = useState(1);

    useEffect(() => {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let data = JSON.parse(localStorage.getItem("movies-app") || "[]")  
        let temp=[];
        data.forEach(element => {
            if(!temp.includes(genreids[element.genre_ids[0]])){
                temp.push(genreids[element.genre_ids[0]]);
            }
        });
        temp.unshift('All Genres');
        setgenres([...temp]);
        setmovies([...data]);
    
        console.log("useEffect");
    },[] )
   const changeGenre=(genre)=>{
       setcurrgen(genre);
   }
   const sortRatingDesc=()=>{
    let temp = movies;
    temp.sort(function(objA,objB){
        return objB.vote_average-objA.vote_average
    })
    setmovies([...temp]);
}
const changePage=(page)=>{
    setcurPage(page);
}
const removeMovie=(id)=>{
    let temp=[];
    temp=movies.filter((movie)=>movie.id!=id);
    setmovies([...temp]);
    localStorage.setItem("movies-app",JSON.stringify(temp));
    
}
let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        
        let filterarr = [];
       
        if(currText===''){
            filterarr=movies
        }else{
            filterarr=movies.filter((movieObj)=>{
                let title = movieObj.original_title.toLowerCase();
                return title.includes(currText.toLowerCase())
            })
        }

        
        if(currgen!="All Genres"){
            filterarr = movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==currgen)
        }
        let pages = Math.ceil(filterarr.length/limit);
        let pagesarr = [];
        for(let i=1;i<=pages;i++){
            pagesarr.push(i);
        }
        let si = (curPage-1)*limit;
        let ei = si+limit;
        filterarr = filterarr.slice(si,ei);

    return (
        
        <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-lg-3 col-sm-12">
                            <ul class="list-group favourites-genres">
                                {
                                    genres.map((genre)=>(
                                        currgen == genre ?
                                        <li class="list-group-item" style={{background:'#3f51b5',color:'white',fontWeight:'bold'}} >{genre}</li> :
                                        <li class="list-group-item" style={{background:'white',color:'#3f51b5'}} onClick={()=>changeGenre(genre)}>{genre}</li>
                                    ))
                                }
                            </ul>
                            </div>
                            <div className="col-lg-9 favourites-table col-sm-12">
                                <div className="row">
                                    <input type="text" className="input-group-text col" placeholder="Search" value={currText} onChange={(e)=>setcurrText(e.target.value)}/>
                                    <input type="number" className="input-group-text col" placeholder="Rows Count" value={limit} onChange={(e)=>setlimit(e.target.value)}/>
                                </div>
                                <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">Popularity</th>
                                        <th scope="col" onClick={sortRatingDesc}>Rating</th>
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterarr.map((movieObj)=>(
                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'5rem'}}/> {movieObj.original_title}</td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick={()=>removeMovie(movieObj.id)}>Remove</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {
                                            pagesarr.map((page)=>(
                                                <li class="page-item"><a class="page-link" onClick={()=>changePage(page)}>{page}</a></li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        
        
    )
}
