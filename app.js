let show = document.getElementById("show");
let showMoreBtn = document.getElementById("Show-More");
let difficultyOption = document.getElementById("difficulty");
let cuisineOption =  document.getElementById("cuisine");
let inputSearch   = document.getElementById("search");
let limit = 4;
let currentIndex = 0;

let recipes = fetch('https://dummyjson.com/recipes')

recipes.then((res) =>{
  return res.json()

}).then((allData)=>{

  console.log(allData);


  
if (show) {


  function recipesRender(data, reset=false) {

    console.log(data);
    
    if(reset){
      show.innerHTML = "";
      currentIndex = 0;
    }

    if (data.length === 0) {
      show.innerHTML = "<h2 style='color:white;text-align:center'>No Recipes Found </h2>";
      showMoreBtn.style.display = "none";
      return;
    }
    
    let end = currentIndex + limit;
    
    for (let i = currentIndex; i<end && i<data.length; i++) {
      
      show.innerHTML += `  <div class="card" onclick="recipesInfo(${allData.recipes.indexOf(data[i])})">
       
      <img src="${data[i].image}" alt="">
      
      <h2>${data[i].name}</h2>
      
      <p>${data[i].ingredients.join(", ")}</p>
      
      <h4>${data[i].difficulty}</h4>
      
      <h4>${data[i].cuisine}</h4>
      

      </div>`
    
  }

  currentIndex = end;
  
  if (currentIndex >= data.length) {
    
    showMoreBtn.style.display = "none";
    
  } else {
    
    showMoreBtn.style.display = "block";
    
  }
  
}


let difficultyValue = [];
let cuisineValue = [];


allData.recipes.forEach((v,i,a)=>{

  if(!difficultyValue.includes(allData.recipes[i].difficulty)){
    difficultyValue.push(allData.recipes[i].difficulty)
  }
  
  if(!cuisineValue.includes(allData.recipes[i].cuisine)){
    cuisineValue.push(allData.recipes[i].cuisine)
  }

})

difficultyValue.forEach((v,i,a)=>{

   difficultyOption.innerHTML += `<option value="${difficultyValue[i]}">${difficultyValue[i]}</option>`

})

cuisineValue.forEach((v,i,a)=>{

  cuisineOption.innerHTML += `<option value="${cuisineValue[i]}">${cuisineValue[i]}</option>`

})


let filterData = allData.recipes
function filterRecipes() {
  
  filterData = [];
  let difficultySelect = difficultyOption.value;
  let cuisineSelect = cuisineOption.value;
  let searchValue = inputSearch.value;
  
  for (let i = 0; i < allData.recipes.length; i++) {
    
    let difficultyMatch = difficultySelect == "All" || difficultySelect == allData.recipes[i].difficulty;
    let cuisineMatch = cuisineSelect == "All" || cuisineSelect == allData.recipes[i].cuisine;
    let inputMatch = allData.recipes[i].name.toLowerCase().includes(searchValue.toLowerCase());
   
    if(difficultyMatch && cuisineMatch && inputMatch){
      filterData.push(allData.recipes[i]);
    }
    
  }
  
  recipesRender(filterData, true);
  
}


if (showMoreBtn) {
  showMoreBtn.addEventListener("click", ()=>{
    recipesRender(filterData,false);
  })
}

difficultyOption.addEventListener("change",filterRecipes);
cuisineOption.addEventListener("change",filterRecipes);
inputSearch.addEventListener("input" ,filterRecipes);


filterRecipes();



}


})


function recipesInfo(index) {
  
  
  localStorage.setItem("recipesIndex", index)
  window.location.assign("recipesInfo.html")
  
  
}
