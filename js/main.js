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

// ========== change website theme ==========
$('.colorContainer span').click(function(){
    let color = $(this).css('backgroundColor')
    console.log(color)
    $(':root').css('--main-color', color)
})
