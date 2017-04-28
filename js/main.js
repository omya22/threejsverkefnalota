let play = document.getElementById('play');
let howToPlayList = document.getElementById('howToPlayList');
let aboutUsList = document.getElementById('aboutUsList');

let welcomeLeft = document.getElementById('welcomeLeft');
let welcomeRight = document.getElementById('welcomeRight');
let backArrow = document.getElementById('arrow');

let canvas = $(".canvasContainer").children("canvas");

const toggleListClass = () => {
    let sidemenuHowtoplay = document.getElementById("sidemenu-howtoplay-content");
    let sidemenuList = sidemenuHowtoplay.childNodes;
    let i = 1;
    counter = 2;
    setInterval(function() {
        if (i < sidemenuList.length) {
            sidemenuList[i].classList.toggle("activeList");
            i = i + counter;
            sidemenuList.length
            console.log(sidemenuList.length)
            console.log(i)
        } else {
            clearInterval();
        }
    }, 150)
};

play.addEventListener("click", function() {
    welcomeLeft.style.left = "-100%";
    welcomeRight.style.right = "-100%";
    threeJSPlayground.classList.toggle("active-ingame");
});

let howToPlay = document.getElementById('howToPlay');
let howToPlayLeft = document.getElementById('howToPlayLeft')
let howToPlayRight = document.getElementById('howToPlayRight')
let carpenter = document.getElementById('carpenter1');

howToPlayList.addEventListener("click", function() {
    welcomeLeft.style.bottom = "-100%";
    welcomeRight.style.top= "-100%";
    howToPlayLeft.style.top = "0%";
    howToPlayRight.style.bottom = "0%";
    howToPlay.style.zIndex = "10";
    howToPlay.className += " active"
    backArrow.style.left = "20px";
    carpenter.classList.toggle("animation-carpenter");
    toggleListClass();
});

let aboutUs = document.getElementById('aboutUs');
let aboutUsLeft = document.getElementById('aboutUsLeft')
let aboutUsRight = document.getElementById('aboutUsRight')

aboutUsList.addEventListener("click", function() {
    welcomeLeft.style.bottom = "100%";
    welcomeRight.style.top= "100%";
    aboutUsLeft.style.bottom = "0%";
    aboutUsRight.style.top= "0%";
    aboutUs.style.zIndex = "10";
    backArrow.style.left = "20px";
    aboutUsRight.className += " activeAboutus";
    setTimeout(function() {
        aboutUs.className += " active";
    }, 300)

})

backArrow.addEventListener("click", function() {
    if (aboutUs.classList.contains("active")) {
        aboutUs.classList.remove("active");
        console.log("about")
        setTimeout(function() {
            aboutUsLeft.style.bottom = "-100%";
            aboutUsRight.style.top= "-100%";
            aboutUs.style.zIndex = "-1";
            aboutUs.classList.remove("active");
            backArrow.style.left = "-40px";
            welcomeLeft.style.bottom = "0%";
            welcomeRight.style.top= "0%";
        }, 200)
    } else if (howToPlay.classList.contains("active")){
        console.log("howto")
        howToPlayLeft.style.top = "-100%";
        howToPlayRight.style.bottom = "-100%";
        howToPlay.style.zIndex = "-1";
        howToPlay.classList.remove("active");
        backArrow.style.left = "-40px";
        welcomeLeft.style.bottom = "0%";
        welcomeRight.style.top= "0%";
        carpenter.classList.remove("animation-carpenter");
        toggleListClass('sidemenu-howtoplay-content');
    }
});

// INGAME JS
//Búa til IF-- then hér..

var picker = new CP(document.querySelector('input[type="text"]'));



  picker.on("change", function(color) {
      this.target.value = '#' + color;


  });


      


$("#texture").click(function() {
  $("#Textureinner").toggleClass('Tactive');
  $("#Hamar-icon").removeClass('TactiveF');
  $("#ljosaperainner").removeClass('TactiveL');
    $("#Settingsinner").removeClass('TactiveS');
    $('.addtexture').toggleClass("left");




  if (  $( '#kassahreyfari' ).attr( "x" ) == '13.5' ){
      $('#kassahreyfari').attr("x","0.5");
  } else {
      $('#kassahreyfari').attr("x","13.5" );
  }

});

function activeRemover() {
  $("#Textureinner").removeClass('Tactive');
}
$( "#hamarsnua" ).click(function() {

    $("#Hamar-icon").toggleClass('TactiveF');
    $("#Textureinner").removeClass('Tactive');
    $("#ljosaperainner").removeClass('TactiveL');
      $("#Settingsinner").removeClass('TactiveS');
      $('#kassahreyfari').attr("x","13.5" );

            $(".howto").toggleClass('left');

    if (  $( '#hamarsnua' ).css( "transform" ) == 'none' ){
        $('#hamarsnua').css("transform","rotate(-45deg)");
    } else {
        $('#hamarsnua').css("transform","" );
    }
});


$( "#LightbulbT" ).click(function() {
  $("#ljosaperainner").toggleClass('TactiveL');

  $("#Hamar-icon").removeClass('TactiveF');
  $("#Textureinner").removeClass('Tactive');
    $("#Settingsinner").removeClass('TactiveS');


    if (  $( '#LightbulbT' ).css( "transform" ) == 'none' ){
        $('#LightbulbT').css("transform","rotate(-45deg)");
    } else {
        $('#LightbulbT').css("transform","" );
    }
});



$( "#settingssnu" ).click(function() {

  $("#Settingsinner").toggleClass('TactiveS');
  $("#ljosaperainner").removeClass('TactiveL');
  $("#Hamar-icon").removeClass('TactiveF');
  $("#Textureinner").removeClass('Tactive');








    if (  $( '#settingssnu' ).css( "transform" ) == 'none' ){
        $('#settingssnu').css("transform","rotate(-45deg)");
    } else {
        $('#settingssnu').css("transform","" );
    }
});

$( ".skiptaumlit" ).click(function(){
  $(".skiptaumlit").css('height', "256px");
});
