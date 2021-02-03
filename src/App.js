import React,{useEffect,useState} from "react";
import Recipe from './Recipe';
import "./App.css";

const App = () =>{
  const APP_ID="eca56871";
  const APP_KEY="87c90572ccc6d775650e9d1fb47df30f";
  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState("chicken");
  useEffect(() =>{
    getRecipes()
  },[query]);

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    };
    const updatesearch = e =>{
        setSearch(e.target.value);
        
    };
    const getSearch = e =>{
        e.preventDefault();
        setQuery(search);
        setSearch('');
    };
  return(
   <div className="App">
     <form onSubmit={getSearch} className="search-form">
       <input className="search-bar" type="text" value={search} onChange={updatesearch}></input>
       <button className="search-button" type="submit">SUBMIT</button>
     </form>
     <div className="recipes">
     {recipes.map(recipe =>(
       <Recipe 
       key={recipe.recipe.label}
       title={recipe.recipe.label} 
       calories={recipe.recipe.calories}
       image={recipe.recipe.image}
       ingredients={recipe.recipe.ingredients}
       url={recipe.recipe.url}
       />
     ))}
     </div>
   </div>
  );
};

export default App;
