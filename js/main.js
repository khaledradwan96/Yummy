// ========== loading screen ========== 
$(document).ready(function(){
    $('.loading-screen').fadeOut(1000, function(){
        $('body').css('overflow', 'auto')
    })
})

// ========== navbar left ==========
let boxWidth = $('nav .nav-tab').outerWidth()
$('#toggleButton').click(function(){
    // toggle icon
    $(this).toggleClass('fa-bars')
    $(this).toggleClass('fa-x')
    
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
})
// start view
$('nav').animate({left: -boxWidth}, 10)
for(let i=0; i<5; i++){
    $('.nav-tab li').eq(i).animate({top: 300}, 500)
}

// ========== function close nav ==========
function closeNav(){
    $('nav').animate({left: -boxWidth}, 500)
    $('#toggleButton').toggleClass('fa-bars')
    $('#toggleButton').toggleClass('fa-x')
}
// ========== function loadingScreen ==========
function loadingScreen(){
    $('.loading-screen').fadeIn(100).fadeOut(500)
}

// ========== change website theme ==========
$('.colorContainer span').click(function(){
    let color = $(this).css('backgroundColor')
    console.log(color)
    $(':root').css('--main-color', color)
})

let searchContainer = document.getElementById('searchContainer')
let rowData = document.getElementById('rowData')

// ========== Show Search inputs ==========
function goToSearch(){
    closeNav()
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
// goToSearch()

// ========== Search meal by name ==========
async function searchByName(name){
    let api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    let response = await fetch(api)
    response = await response.json()
    console.log(response.meals)
    displayMeals(response.meals)
}

// ========== List all meals by first letter ==========
async function searchByFirstLetter(letter){
    let api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    let response = await fetch(api)
    response = await response.json()
    console.log(response)
    displayMeals(response.meals)
}

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
    rowData.innerHTML = ''
    searchContainer.innerHTML = ''
    console.log('details' , id)
    let api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    let response = await fetch(api)
    response = await response.json()
    // console.log(response)
    // console.log(response.meals)
    console.log(response.meals[0])
    
    let details = response.meals[0];

    // === Get Ingredients ===
    let ingredients = ''
        for(let i=0; i<=20; i++){
            if(details[`strIngredient${i}`]){
                ingredients += `<li class="alert alert-warning m-2 p-1">${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]}</li>`
            }
        }

    // === Get Tags ===
    let tags = details.strTags?.split(',')
    console.log(tags);
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

// ========== go To meals category ==========
async function goToCategory(){
    closeNav()
    loadingScreen()
    let api = `https://www.themealdb.com/api/json/v1/1/categories.php`
    let response = await fetch(api)
    response = await response.json()
    // console.log(response.categories)
    let categories = response.categories
    let cartona = ''
    for(let i=0; i< categories.length; i++){
        cartona += 
            `<div class="col-md-3">
                <div class="meal">
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
// goToCategory()

// ========== display category meals ==========
function displayCategory(){

}