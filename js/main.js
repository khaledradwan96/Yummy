// #################### main script ####################
// ========== loading screen ========== 
$(document).ready(function(){
    $('.loading-screen').fadeOut(1000, function(){
        $('body').css('overflow', 'auto')
    })
})

// ========== navbar left ==========
let boxWidth = $('nav .nav-tab').outerWidth()
// start view
$('nav').css({'left': -boxWidth})
for(let i=0; i<5; i++){
    $('.nav-tab li').eq(i).animate({top: 300}, 500)
}

// ========== function close nav ==========
function closeNav(){
    $(this).toggleClass('fa-bars').toggleClass('fa-x')
    // make nav hidden left
    if($('nav').css('left') == '0px'){ // nav is shown
        $('nav').animate({left: -boxWidth}, 500)
        // make nav-tab li go up
        for(let i=0; i<5; i++){
            $('.nav-tab li').eq(i).animate({top: 300}, 500)
        }
    }else{ // nav is hidden
        $('nav').animate({left: 0}, 500)
        // make nav-tab li go down
        for(let i=0; i<5; i++){
            $('.nav-tab li').eq(i).animate({top: 0}, (i + 5) * 100)
        }
    }
}
// ========== function loadingScreen ==========
function loadingScreen(){
    $('.loading-screen').fadeIn(100).fadeOut(500);
    rowData.innerHTML = ''
    searchContainer.innerHTML = ''
}

// ========== change website theme ==========
$('.colorContainer span').click(function(){
    let color = $(this).css('backgroundColor')
    // console.log(color) // => for testing
    $(':root').css('--main-color', color)
})

let searchContainer = document.getElementById('searchContainer')
let rowData = document.getElementById('rowData')

// #################### Search script ####################
// ========== Show Search inputs ==========

function goToSearch(){
    closeNav();
    loadingScreen()
    searchContainer.innerHTML = `
        <div class="row py-5 g-4 w-75 m-auto">
            <div class="col-md-6">
                <input onkeyup="searchByName(value)" type="text" class="form-control" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByFirstLetter(value)" maxlength="1" type="text" class="form-control" placeholder="Search By First Letter">
            </div>
        </div>`
}
// goToSearch() // => for testing

// ========== Search meal by name ==========
async function searchByName(name){
    let api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    let response = await fetch(api)
    response = await response.json()
    // console.log(response.meals) // => for testing
    displayMeals(response.meals)
}

// ========== List all meals by first letter ==========
async function searchByFirstLetter(letter){
    let api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    let response = await fetch(api)
    response = await response.json()
    // console.log(response) // => for testing
    displayMeals(response.meals)
}

// #################### Display meals & details script ####################
// ========== Display meals ==========
function displayMeals(data){
    let cartona = ''
    for(let i = 0; i<data.length; i++){
        cartona += 
            `<div class="col-md-3">
                <div class="meal" onclick="getMealDetails(${data[i].idMeal})">
                    <img src="${data[i].strMealThumb}" class="w-100">
                    <div class="meal-layer justify-content-center">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    rowData.innerHTML = cartona
}

// ========== get meal details ==========
async function getMealDetails(id){
    loadingScreen()
    // console.log('details' , id) // => for testing
    let api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    let response = await fetch(api)
    response = await response.json()
    let details = response.meals[0];
    // console.log(details) // => for testing

    // === Get Ingredients ===
    let ingredients = ''
        for(let i=0; i<=20; i++){
            if(details[`strIngredient${i}`]){
                ingredients += `<li class="alert alert-warning m-2 p-1">${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]}</li>`
            }
        }

    // === Get Tags ===
    let tags = details.strTags?.split(',')
    // console.log(tags); // => for testing
    if(tags == undefined){tags = []}
    let tagsStr = ''
    for(let i=0; i< tags.length; i++){
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let cartona = ''
    cartona = 
        `<div class="col-lg-4">
            <img src="${details.strMealThumb}" class="w-100 rounded">
            <h2>${details.strMeal}</h2>
        </div>
        <div class="col-lg-8">
            <h3>Instructions</h3>
            <p id="instructions">${details.strInstructions}</p>
            <h4><strong>Area: </strong>${details.strArea}</h4>
            <h4><strong>Category:</strong>${details.strCategory}</h4>
            <h4><strong>Recipes:</strong></h4>
            <ul class="list-unstyled d-flex flex-wrap g-3">
                ${ingredients}
            </ul>
            <h4><strong>Tags:</strong></h4>
            <ul class="list-unstyled d-flex flex-wrap g-3">
                ${tagsStr}
            </ul>
            <a target="_blank" class="btn btn-success" href="${details.strSource}">Source</a>
            <a target="_blank" class="btn btn-danger" href="${details.strYoutube}">Youtube</a>
        </div>`

        // let num = 75
        // ${details.strInstructions.split(' ').slice(0 , num).join(" ")}
        // <a href="#"> see more ... </a>
    rowData.innerHTML = cartona
}
// === for testing getMealDetails(id) ===
// getMealDetails(52979) // => many strTags
// getMealDetails(52971) // => null strTags

// #################### Category script ####################
// ========== go To meals category ==========
async function goToCategory(){
    closeNav();
    loadingScreen()
    let api = `https://www.themealdb.com/api/json/v1/1/categories.php`
    let response = await fetch(api)
    response = await response.json()
    let categories = response.categories
    // console.log(categories) // => for testing

    let cartona = ''
    for(let i=0; i< categories.length; i++){
        cartona += 
            `<div class="col-md-4">
                <div onclick="displayByCategory('${categories[i].strCategory}')" class="meal">
                    <img src="${categories[i].strCategoryThumb}" class="w-100">
                    <div class="meal-layer">
                        <h3>${categories[i].strCategory}</h3>
                        <p>${categories[i].strCategoryDescription.split(" ").slice(0,30).join(" ")}</p>
                    </div>
                </div>
            </div>`
    }
    rowData.innerHTML = cartona
}
// goToCategory()  // => for testing

// ========== display category meals ==========
async function displayByCategory(category){
    loadingScreen()
    let api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    let response = await fetch(api)
    response = await response.json()
    let data = response.meals
    // console.log(data) // => for testing

    let cartona = ''
    for(let i=0; i<data.length; i++){
        cartona +=
            `<div class="col-md-4">
                <div onclick="getMealDetails(${data[i].idMeal})" class="meal">
                    <img src="${data[i].strMealThumb}" class="w-100">
                    <div class="meal-layer justify-content-center text-center">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    rowData.innerHTML = cartona
}
// displayByCategory('Seafood')  // => for testing

// #################### Areas script ####################
// ========== go To Areas ==========
async function goToArea(){
    closeNav();
    loadingScreen()
    let api = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    let response = await fetch(api)
    response = await response.json()
    let data = response.meals
    // console.log(data) // => for testing

    let cartona = ''
    for(let i=0; i<data.length; i++){
        cartona +=
            `<div class="col-md-3">
                <div onclick="displayByArea('${data[i].strArea}')" class="meal">
                    <img src="images/country icons/${data[i].strArea}.png" class="w-100">
                    <h3 class="text-center">${data[i].strArea}</h3>
                </div>
            </div>`
    }
    rowData.innerHTML = cartona
}
// goToArea() // => for testing

// ========== Display Areas meals ==========
async function displayByArea(area){
    loadingScreen()
    let api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    let response = await fetch(api)
    response = await response.json()
    let data = response.meals
    // console.log(data) // => for testing

    let cartona = ''
    for(let i=0; i<data.length; i++){
        cartona +=
            `<div class="col-md-4">
                <div onclick="getMealDetails(${data[i].idMeal})" class="meal">
                    <img src="${data[i].strMealThumb}" class="w-100">
                    <div class="meal-layer justify-content-center text-center">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    rowData.innerHTML = cartona
}
// displayByArea('Canadian') // => for testing

// #################### Ingredients script ####################
// ========== go To Ingredients ==========
async function goToIngredients(){
    closeNav();
    loadingScreen()
    let api = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    let response = await fetch(api)
    response = await response.json()
    let data = response.meals
    // console.log(data) // => for testing

    let cartona = ''
    for(let i=0; i<20; i++){
        cartona +=
            `<div class="col-md-3">
                <div onclick="displayByIngredients('${data[i].strIngredient}')" class="meal text-center">
                    <i class="fa-solid fa-utensils fa-4x"></i>
                    <h3>${data[i].strIngredient}</h3>
                    <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>`
    }
    rowData.innerHTML = cartona
}
// goToIngredients() // => for testing

// ========== Display Ingredients ==========
async function displayByIngredients(ingredient){
    loadingScreen()
    let api = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    let response = await fetch(api)
    response = await response.json()
    let data = response.meals
    // console.log(data) // => for testing

    let cartona = ''
    for(let i=0; i<data.length; i++){
        cartona +=
            `<div class="col-md-4">
                <div onclick="getMealDetails(${data[i].idMeal})" class="meal rounded">
                    <img src="${data[i].strMealThumb}" class="w-100">
                    <div class="meal-layer justify-content-center text-center">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    rowData.innerHTML = cartona
}
// displayByIngredients('chicken')  // => for testing

// #################### contact us script ####################
// ========== go To contact us ==========
function goToContact(){
    closeNav();
    loadingScreen()
    console.log('hi')
}
// goToContact()  // => for testing
