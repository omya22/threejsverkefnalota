const play = document.getElementById('play');
const howToPlayList = document.getElementById('howToPlayList');
const aboutUsList = document.getElementById('aboutUsList');

const welcomeLeft = document.getElementById('welcomeLeft');
const welcomeRight = document.getElementById('welcomeRight');
const backArrow = document.getElementById('arrow');
const HideBob = document.getElementById('Bob-T2');
const HideBob2 = document.getElementById('Bob-T3');
const canvas = document.getElementById("ourCanvas")

const threeJSPlayground = document.getElementById('playground');

const toggleListClass = () => {
    const sidemenuHowtoplay = document.getElementById("sidemenu-howtoplay-content");
    const sidemenuList = sidemenuHowtoplay.childNodes;
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

play.addEventListener("click", () => {
    welcomeLeft.style.left = "-100%";
    welcomeRight.style.right = "-100%";
    document.body.className += "ingame";
    threeJSPlayground.classList.toggle("active-ingame");

    playground.style.display = "block";
    canvas.style.zIndex = "5";


    setTimeout(() => {
        HideBob.classList.toggle("HideBob");
    }, 1000)

});

const howToPlay = document.getElementById('howToPlay');
const howToPlayLeft = document.getElementById('howToPlayLeft')
const howToPlayRight = document.getElementById('howToPlayRight')
const carpenter = document.getElementById('bobhowtoplay');

howToPlayList.addEventListener("click", () => {
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

const aboutUs = document.getElementById('aboutUs');
const aboutUsLeft = document.getElementById('aboutUsLeft')
const aboutUsRight = document.getElementById('aboutUsRight')

aboutUsList.addEventListener("click", () => {
    welcomeLeft.style.bottom = "100%";
    welcomeRight.style.top= "100%";
    aboutUsLeft.style.bottom = "0%";
    aboutUsRight.style.top= "0%";
    aboutUs.style.zIndex = "10";
    backArrow.style.left = "20px";
    aboutUsRight.className += " activeAboutus";
    setTimeout(() => {
        aboutUs.className += " active";
    }, 300)

})

backArrow.addEventListener("click", () => {
    if (aboutUs.classList.contains("active")) {
        aboutUs.classList.remove("active");
        console.log("about")
        setTimeout(() => {
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

$('.textColorChangeInput').change(() => {
    changeTexture('../img/textures/originaltexture.jpg')

    console.log($(this).val().slice(0,1))

    if ($(this).val().slice(0,1) == "#") {
        console.log('0x' + ($(".textColorChangeInput").val().slice(1,7)))
        cubeMaterial.color.setHex('0x' + ($(".textColorChangeInput").val().slice(1,7)));

        $(".kassilitur").css("fill", "#" + $(".textColorChangeInput").val().slice(1,7));
        $(".kassilitur1").css("opacity", ".9");
        $(".kassilitur2").css("opacity", ".95");
        $(".kassilitur3").css("opacity", "1");
    } else {
            cubeMaterial.color.setHex('0x' + ($(".textColorChangeInput").val()));

            $(".kassilitur").css("fill", "#" + $(".textColorChangeInput").val());
            $(".kassilitur1").css("opacity", ".9");
            $(".kassilitur2").css("opacity", ".95");
            $(".kassilitur3").css("opacity", "1");
    }



})

const picker = new CP(document.querySelector('.btn-floating'));

$(".colorpikk").click(() => {
    changeTexture('../img/textures/originaltexture.jpg')
    cubeMaterial.color.setHex(($(".colorpikk").val()));
});

  picker.on("change", (color) => {

      console.log(color);
      $(".textColorChangeInput").val('0x' +color);
      cubeMaterial.color.setHex($(".textColorChangeInput").val());

      $(".textColorChangeInput").val('#' + color);

      $(".kassilitur").css("fill", "#" + color);
      $(".kassilitur1").css("opacity", ".9");
      $(".kassilitur2").css("opacity", ".95");
      $(".kassilitur3").css("opacity", "1");

      $('.btn-floating').css('background-color', '#' +color);

  });




$(".texture").click(() => {
  if (  $( '#kassahreyfari' ).attr( "x" ) == '13.5' ){
      $('#kassahreyfari').attr("x","0.5");
  } else {
      $('#kassahreyfari').attr("x","13.5" );
  }

});

$( ".hamar" ).click(() => {

    if (  $( '#hamarsnua' ).css( "transform" ) == 'none' ){
        $('#hamarsnua').css("transform","rotate(-45deg)");
    } else {
        $('#hamarsnua').css("transform","" );
    }
});

$( ".settings" ).click(() => {

    if (  $( '#settingssnu' ).css( "transform" ) == 'none' ){
        $('#settingssnu').css("transform","rotate(-45deg)");
    } else {
        $('#settingssnu').css("transform","" );
    }
});

$( ".skiptaumlit" ).click(() => {
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

$("canvas").click(() => {
$('.addtexture, .settingsdiv, .howto, .addobject').removeClass("left");
  $("#Hamar-icon, #ljosaperainner, #Textureinner, #Settingsinner").removeClass('TactiveS');
    $('#kassahreyfari').attr("x","13.5" );
        $('#hamarsnua').css("transform","" );
          $('#settingssnu').css("transform","" );
});

    const buttontrue = document.getElementById('bobGotIt')
    const buttongamefalse = document.getElementById('skip-T')
    const bobHeading = document.getElementById('bobHeading');
    const bobParagraph = document.getElementById('bobParagraph');
    const inputTime = document.getElementById('inputTime');
    const inputCubes = document.getElementById('inputCubes');
    const pulsin =  document.getElementById('texturepuls');

    let clicks = 0;

    function gotIt(){


      if (clicks==1){
        changeBob("Add your first cube", "Click on the playground");
      }
      else if (clicks==2) {
        changeBob("Change the color", "Try changing the color or the texture");
        pulsin.classList.add("activepuls");
      }
      else if (clicks==3){
        changeBob("Erease cube", "Hold CTRL and click cube to erease");
        pulsin.classList.remove("activepuls");

      }
      else if (clicks==4){
        changeBob("Change view", "Hold shift to change view");

      }
      else if (clicks==5){
        changeBob("Challenges", "You wanna challenge?");
        changeBob("Challenges", "You wanna challenge?");
        buttontrue.innerHTML = "Yes";
        buttongamefalse.innerHTML = "No Thanks";
        buttongamefalse.style.marginLeft = "3%";
        $('#bobGotIt').click(() => {
            $('#Bob-T2').css("right", "-100%")
            HideBob2.className += " HideBob";
        })

      }

      else if (clicks==6){

      carpenter.classList.remove("animation-carpenter");
            HideBob2.className += " HideBob";

        }

          $('#bobChallengeSetup').click(() => {
              HideBob2.classList.remove("HideBob");
              console.log(clicks)

              setTimeout(() => {
                $('.cubeinput').css('display', 'block');
                $('.timeinput').css('display', 'none');
                }, 400)

              setTimeout(() => {
                  HideBob2.className += " HideBob"
                  $('#bobChallengeSetup').toggleClass("challenges_go");
              }, 500)


          })

      }





$('.challengeMe').click(() => {
    $('.Bob-T').removeClass('HideBob');

    setTimeout(() => {
        changeBob("Challenges", "You wanna challenge?");
        buttontrue.innerHTML = "Yes";
        buttongamefalse.innerHTML = "No Thanks";
        buttongamefalse.style.marginLeft = "3%";
        $('#bobGotIt').click(() => {
            $('#Bob-T2').css("right", "-100%")
            HideBob2.className += " HideBob";
        })

    }, 100);

    setTimeout(() => {
        $('#Bob-T2').toggleClass('HideBob');
    }, 500)
})



function changeBob(heading,paragraph) {
  bobHeading.innerHTML = heading;
  bobParagraph.innerHTML = paragraph;
}

changeBob("Hi, I'm Bob." , "Welcome to BUILDR, I'll be your guide.");

$('#bobGotIt').click(() => {
  clicks++;
  $('#Bob-T2').toggleClass('HideBob');
  setTimeout(() => {
    gotIt();
    $('#Bob-T2').toggleClass('HideBob');
  }, 1000)
})

$('#bobTimeSetup').click(() => {
    $('#Bob-T3').toggleClass('HideBob');
    $('#Bob-T4').toggleClass('HideBob');


})

$('#skip-T').click(() => {

  $('.Bob-T').removeClass('HideBob');

})

$('.challenges_go').click(() => {
    const seconds = parseInt($('.challenge_time_input').val());
    const cubeCounterValue = document.getElementById('cubeCounter')

    if ($('.challenge_time_input').val() === "") {
        alert("tomt input!!")
    } else {
        setInterval(function secondTimer() {
            seconds--;
            if (seconds === -1) {
                clearInterval(secondTimer);
                seconds === 0;
                $('.challenges_active').toggleClass('HideBob');
                $('#Bob-T3').toggleClass('HideBob');
                clicks == 5;
                gotIt();
            }
        }, 1000)
    }

    if ($('.challenge_max_input').val() === "" || $('.challenge_max_input').val() === "0") {
        $('#cubeCounter').toggleClass("up");
        cubeCounterValue.innerHTML = 0;
    } else {
        $('#cubeCounter').html(parseInt($('.challenge_max_input').val()));
        cubeCounter = parseInt($('.challenge_max_input').val());
    }

    $('#Bob-T4').toggleClass('HideBob');

    setTimeout(() => {
        $('.challenges_active').toggleClass('HideBob');
    }, 500)


    setTimeout(() => {
        $('.challenges_setup').css("display", "none");
        $('.challenges_active').css("display", "block");
    }, 100)

    $('#progressBar').css('transition', $('.challenge_time_input').val() + 's linear');

    setTimeout(() => {
        $('.ingame-challenges').css('top', '10px');
        $('#progressBar').css('strokeDashoffset', "-101%");
    }, 800)


    return cubeCounter;

})

//
//
//
//  CHALLENGES
//
//
//

const timer = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const startTimer = document.getElementById("startTimer");
const secondsCounter = document.getElementById("secondsCounter");
const testInput = document.getElementById("testInput");
const replay = document.getElementById("replay");
const replayTest = document.getElementById("Page-1");

function startTimerFun() {
    console.log(testInput.value)
    progressBar.style.stroke = "#7DF483";
    progressBar.style.transition = testInput.value + "s linear";
    progressBar.style.strokeDashoffset = "-101%";
    const seconds = testInput.value;
    // if (progressBar.style.strokeDashoffset === "-283%") {
    //     alert("YOURE TIME IS FINIIIISHEEDD!");
    // }
    const myInterval = setInterval(() => {
            seconds--;
            if (seconds === 0) {
                clearInterval(myInterval)
                progressBar.style.stroke = "#E78478";
                progressBar.style.transition = "1s";
                progressBar.style.strokeDashoffset = "0%";
                secondsCounter.style.opacity = "0";
                replay.style.opacity = "1";
                setTimeout(() => {
                    progressBar.style.stroke = "#7DF483";
                }, 1000)
            }
        }, 1000);
}


// });
