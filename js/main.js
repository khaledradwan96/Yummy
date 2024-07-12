// ========== loading screen ========== 
$(document).ready(function(){
    $('.loading-screen').fadeOut(2000, function(){
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
goToSearch()

// ========== Search meal by name ==========
async function searchByName(name = 'Arrabiata'){
    let api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    let response = await fetch(api)
    response = await response.json()
    console.log(response.meals)
    displayMeals(response.meals)
}

// ========== List all meals by first letter ==========
async function searchByFirstLetter(letter = 'a'){
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
                    <div class="meal-layer">
                            <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    rowData.innerHTML = cartona
}

// ========== get meal details ==========
function getMealDetails(id){
    console.log('details' , id)

}