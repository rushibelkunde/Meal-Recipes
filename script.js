

// getting html elements for adding functionalities to them

var search = document.getElementById("search")

var btn = document.getElementById("btn")

var container = document.getElementById("container")

var favSection = document.getElementById("favSection")

var favBtn = document.getElementById("Favourites")

var closeBtn = document.getElementById("closeBtn")

var likeBtn = document.getElementsByClassName("fa-heart")

var mealInfo = document.getElementsByClassName("mealInfo")




var array = []


// localStorage.removeItem("favSection")

// LocalStorage for Favourite Meals

if (localStorage.getItem("favSection") == null) {
    localStorage.setItem("favSection", JSON.stringify(array))

} else {
    var array = JSON.parse(localStorage.getItem("favSection"))

    for (let i = 0; i < array.length; i++) {
        displayFav(array[i])
    }
}


// function for displaying favourite meals
var displayFav = (element) => {

    var favElemnt = document.createElement('div')
    favElemnt.className = "mealItem"

    favElemnt.innerHTML = element

    favSection.append(favElemnt)

}




// function for fetching meals from api and returning a response


const fetchMeals = (value) => {

    container.innerHTML = ""
    var url = "https://themealdb.com/api/json/v1/1/search.php?s=";
    fetch(url + value)
        .then(async (Response) => {
            var response = await Response.json();
            displayMeals(response)
        }
        )
}


// function for Displaying meals after search

const displayMeals = (response) => {

    container.innerHTML = ""

    console.log(response)

    if (response.meals == null) {
        return
    }

    response.meals.forEach(element => {
        console.log(element)
        var name = element.strMeal
        var thumb = element.strMealThumb
        var mealId = element.idMeal

        var mealItem = document.createElement("div")
        mealItem.className = "mealItem"

        mealItem.innerHTML = ` 
        <div class="img">
        <img src=${thumb} alt="" width="150px">
        </div>
        <div class="mealName">
        <h3>${name}</h3>
        </div>
        <div class="like">
                <i class="fa-solid fa-heart fa-2xl white"></i>
        </div>
        <button class="more" id="${mealId}" onclick="showMealDetails(${mealId})">more details </button>`
        container.append(mealItem)
    });

}



// function for showing meal Details

async function showMealDetails(mealId){

    container.innerHTML=""

    await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+mealId)
    .then(async (response)=>{
        var m = await response.json()

        var mealItem = document.createElement("div")
        mealItem.className = "mealItem1"

        mealItem.innerHTML = ` 
        <div class="img">
        <img src=${m.meals[0].strMealThumb} alt="" width="150px">
        </div>
        <div class="mealName">
        <h1>${m.meals[0].strMeal}</h1>
        </div>
        <div class="like">
                <i class="fa-solid fa-heart fa-2xl white"></i>
        </div>
        
        <div class="mealHeader">
                    <div>Category: ${m.meals[0].strCategory}</div>
                    <div>Area: ${m.meals[0].strArea}</div>
                </div>
                <div class="info">
                <h2>Instructions</h2>
                <p>${m.meals[0].strInstructions}</p>
                </div>
                <div class="ytLink">
                <a href="${m.meals[0].strYoutube}">Youtube Video</a>
                </div>
            `

        container.append(mealItem)

    })

}


// event listener for like button

document.addEventListener("click", (e) => {

    if (e.target.className == "fa-solid fa-heart fa-2xl white") {


        e.target.className = "fa-solid fa-heart fa-2xl red";
        var element = document.createElement("div")

        element.className = "mealItem"



        element.innerHTML = e.target.parentElement.parentElement.innerHTML


        console.log(element.innerHTML)
        favSection.append(element)

        array = JSON.parse(localStorage.getItem("favSection"))

        array.push(element.innerHTML)

        localStorage.setItem("favSection", JSON.stringify(array))

    }
    else if (e.target.className == "fa-solid fa-heart fa-2xl red") {



        var deleteItem = e.target.parentElement.parentElement.innerHTML
        array = JSON.parse(localStorage.getItem("favSection"))

        var index = array.indexOf(deleteItem)

        if (index >= 0) {
            array.splice(index, 1)
        }

        localStorage.setItem("favSection", JSON.stringify(array))

        e.target.className = "fa-solid fa-heart fa-2xl white";

        e.target.parentElement.parentElement.remove()
    }


})


// toggling visibility of favourite section via Favourites button and close button

favBtn.addEventListener("click", () => {

    favSection.style = "visibility: visible;"

})

closeBtn.addEventListener("click", () => {

    favSection.style = "visibility: hidden;"

})


