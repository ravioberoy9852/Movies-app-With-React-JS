import logo from './logo.svg';
import Navbar from './components/navbar';
import Banner from './components/banner';
import Movie from './components/movies';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import './App.css';
import Favourite from './components/favourite';

function App() {
    return ( 
        
   <Router>
   <Navbar/>
   <Switch>
     <Route path='/' exact render={(props)=>(
       <>
         <Banner {...props}/>
         <Movie {...props}/>
       </>
     )}/>
     <Route path='/favourites' component={Favourite} />
   </Switch>
 </Router>
    );
}

export default App;