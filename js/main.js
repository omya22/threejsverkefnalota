let play = document.getElementById('play');
let howToPlayList = document.getElementById('howToPlayList');
let aboutUsList = document.getElementById('aboutUsList');

let welcomeLeft = document.getElementById('welcomeLeft');
let welcomeRight = document.getElementById('welcomeRight');
let backArrow = document.getElementById('arrow');

let canvas = document.getElementById("ourCanvas")

let threeJSPlayground = document.getElementById('playground');

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

    playground.style.display = "block";
    canvas.style.zIndex = "5";

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

$(".colorpikk").click(function() {
    changeTexture('../img/textures/originaltexture.jpg')
    cubeMaterial.color.setHex(($(".colorpikk").val()));
});

  picker.on("change", function(color) {
      this.target.value = '0x' + color;
      cubeMaterial.color.setHex(($(".colorpikk").val()));

      this.target.value = '#' + color;

      $(".kassilitur").css("fill", "#" + color);
      $(".kassilitur1").css("opacity", ".9");
      $(".kassilitur2").css("opacity", ".95");
      $(".kassilitur3").css("opacity", "1");

  });




$(".texture").click(function() {
  if (  $( '#kassahreyfari' ).attr( "x" ) == '13.5' ){
      $('#kassahreyfari').attr("x","0.5");
  } else {
      $('#kassahreyfari').attr("x","13.5" );
  }

});

$( ".hamar" ).click(function() {

    if (  $( '#hamarsnua' ).css( "transform" ) == 'none' ){
        $('#hamarsnua').css("transform","rotate(-45deg)");
    } else {
        $('#hamarsnua').css("transform","" );
    }
});

$( ".settings" ).click(function() {

    if (  $( '#settingssnu' ).css( "transform" ) == 'none' ){
        $('#settingssnu').css("transform","rotate(-45deg)");
    } else {
        $('#settingssnu').css("transform","" );
    }
});

$( ".skiptaumlit" ).click(function(){
  $(".skiptaumlit").css('height', "256px");
});

$(".sidemenuLi").click(function() {
    $(this).toggleClass("active");
    if ($(this).hasClass("texture")) {
      $("#Textureinner").toggleClass('TactiveS');
    $("#Hamar-icon, #ljosaperainner, #Settingsinner").removeClass('TactiveS');
      $('.addobject, .howto, .settingsdiv').removeClass("left");
        $(".addtexture").toggleClass('left');
      $('#settingssnu, #hamarsnua').css("transform","" );

      }

      else if ($(this).hasClass("hamar")) {
      $("#Hamar-icon").toggleClass('TactiveS');
    $("#Settingsinner, #ljosaperainner, #Textureinner").removeClass('TactiveS');
        $('.addtexture, .howto, .settingsdiv').removeClass("left");
        $(".addobject").toggleClass('left');
          $('#kassahreyfari').attr("x","13.5" );
          $('#settingssnu').css("transform","" );
        }

        else if ($(this).hasClass("Lightbulb")) {
        console.log("ljos")
        $("#ljosaperainner").toggleClass('TactiveS');
      $("#Hamar-icon, #Settingsinner, #Textureinner").removeClass('TactiveS');
          $('.addtexture, .settingsdiv, .addobject').removeClass("left");
          $(".howto").toggleClass('left');
          $('#settingssnu, #hamarsnua').css("transform","" );
          $('#kassahreyfari').attr("x","13.5" );
    }

    else if ($(this).hasClass("settings")) {
        console.log("settings")
        $("#Settingsinner").toggleClass('TactiveS');
        $("#Hamar-icon, #ljosaperainner, #Textureinner").removeClass('TactiveS');
          $('.addtexture, .howto, .addobject').removeClass("left");
          $(".settingsdiv").toggleClass('left');
          $('#hamarsnua').css("transform","" );
    }
})

$("canvas").click(function(){
$('.addtexture, .settingsdiv, .howto, .addobject').removeClass("left");
});
