"use strict";


var body = $('body');


var interpolations = [{

    backGPosx: "0%",
    backGPosy: "0%",

  },
  {
    backGPosx: "48%",
    backGPosy: "4%",

  },
  {
    backGPosx: "94%",
    backGPosy: "0%",

  },

  {
    backGPosx: "140%",
    backGPosy: "0%",

  },
]

var prevDivaA = undefined;
var prevDivaB = undefined;

// ---------------------------Code pour le score - plus tard : A NE PAS SUPPRIMER ---------------- 
//   var calculScore = function () {
//     var ciblageDivScore = document.getElementById('conteneurCounterScore');
//     var contenuHTML = document.getElementById('conteneurCounterScore').innerHTML;


//     var compteur = Number(contenuHTML);

//       ciblageDivScore.innerHTML= compteur+1;
// }
// ---------------------------Code pour le score - plus tard : A NE PAS SUPPRIMER ---------------- 




// ---------------------------Fonctions ---------------- 

function createBats() {

  var bats = $('<div>').addClass('bats');
  $('#conteneur').append(bats);
  var indice = 0;
  var i;

  setInterval(function () {

    for (i = 0; i < document.getElementsByClassName('bats').length; i++) {
      this.document.getElementsByClassName('bats')[i].style.backgroundPositionX = interpolations[indice].backGPosx;
      this.document.getElementsByClassName('bats')[i].style.backgroundPositionY = interpolations[indice].backGPosy;
      indice++;
      if (indice > 3) {
        indice = 0;
      };
    }
  }, 500)

  setInterval(function () {
    moveBats(bats)
  }, 30)

  bats.click(function () {
    shootBats(bats);
  })
}


var idInterval;

function jouer() {
  for (var i = 0; i < 2; i++) {
    createBats();
    var tempsecoule = 0;
    idInterval = setInterval(function () {
      tempsecoule++;
      // console.log("je suis la fonction jouer",tempsecoule);
      if (tempsecoule === 1000) {
        clearInterval(idInterval);
        alert("Perdu!");
        body.empty();
        jouer();
      }
    }, 1000)
  }
}
jouer();


function shootBats(chauveS) {
  chauveS.addClass('shot');
  setTimeout(function () {
    chauveS.remove();
    // console.log ("je suis la morte dans SHOOT",chauveS)
    if ($('.bats').length === 0) {
      // console.log($('.bats'))
      clearInterval(idInterval)
      alert('Gagné');
      jouer();

    }
  }, 100)
}

function intersection_boxes(rect1, rect2){
  var overlap = false
  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y) {
      overlap = true
}
return overlap
}

function moveBats(chauveS) {
  var randomLeft = Math.random() * (document.getElementById('conteneur').clientWidth);
  var randomTop = Math.random() * (document.getElementById('conteneur').clientHeight);

  chauveS.css({
    left: randomLeft,
    top: randomTop,
  });


  var height = 66;
  var width = 46;
  var div1 = document.getElementsByClassName('bats')[0];
  var div2 = document.getElementsByClassName('bats')[1];
  var div3 = document.getElementsByClassName('bats')[2];
  var comparaisonCollisionDivs = function (divA, divB, chauveS) {
    if (!divA || !divB ) return;
    var infoBat = divA.getBoundingClientRect();
    var divaA = {
      top: infoBat.top,
      bottom: infoBat.bottom,
      left: infoBat.left,
      right: infoBat.right,
      height: infoBat.height,
      width: infoBat.width,
      x: infoBat.x,
      y: infoBat.y,
    }

    var infoBat_ = divB.getBoundingClientRect();
    var divaB = {
      top: infoBat_.top,
      bottom: infoBat_.bottom,
      left: infoBat_.left,
      right: infoBat_.right,
      height: infoBat_.height,
      width: infoBat_.width,
      x: infoBat_.x,
      y: infoBat_.y,
    }

    const overlap = intersection_boxes(divaA, divaB)
    if (overlap){
      if (prevDivaA !== undefined && prevDivaB !== undefined){
        /*chauveS.css({
          left: randomLeft,
          top: randomTop,
          });*/
          divA = prevDivaA
          divB = prevDivaB

          var randomLeft = Math.random() * (document.getElementById('conteneur').clientWidth);
          var randomTop = Math.random() * (document.getElementById('conteneur').clientHeight);
          
          chauveS.css({
            left: randomLeft,
            top: randomTop,
          })
        }
    }
    prevDivaA = divA;
    prevDivaB = divB;


  }
  comparaisonCollisionDivs(div1, div2, chauveS);

}