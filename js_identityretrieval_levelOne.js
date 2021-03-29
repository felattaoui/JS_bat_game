"use strict";

var body = $("body");

var interpolations = [
  {
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
];

var prevDivaA = undefined;
var prevDivaB = undefined;
var speed = 30;

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
  var bats = $("<div>").addClass("bats");
  $("#conteneur").append(bats);
  var indice = 0;
  var i;

  //let myBats = document.getElementsByClassName("bats");
  //myBats[0].style.borderColor = "red";

  setInterval(function () {
    for (i = 0; i < document.getElementsByClassName("bats").length; i++) {
      this.document.getElementsByClassName("bats")[
        i
      ].style.backgroundPositionX = interpolations[indice].backGPosx;
      this.document.getElementsByClassName("bats")[
        i
      ].style.backgroundPositionY = interpolations[indice].backGPosy;
      indice++;
      if (indice > 3) {
        indice = 0;
      }
    }
  }, 500);

  setInterval(function () {
    moveBats(bats);
  }, speed);

  bats.click(function () {
    shootBats(bats);
  });
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
    }, 1000);
  }
}
jouer();

function shootBats(chauveS) {
  chauveS.addClass("shot");
  setTimeout(function () {
    chauveS.remove();
    // console.log ("je suis la morte dans SHOOT",chauveS)
    if ($(".bats").length === 0) {
      // console.log($('.bats'))
      clearInterval(idInterval);
      alert("Gagné");
      jouer();
    }
  }, 100);
}

function intersection_boxes(rect1, rect2) {
  var overlap = false;
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  ) {
    overlap = true;
  }
  return overlap;
}

function moveBats(chauveS) {
  var div1 = document.getElementsByClassName("bats")[0];
  var div2 = document.getElementsByClassName("bats")[1];

  var previousDivA = div1;
  var previousDivB = div2;

  var randomLeft =
    Math.random() * document.getElementById("conteneur").clientWidth;
  var randomTop =
    Math.random() * document.getElementById("conteneur").clientHeight;

  chauveS.css({
    left: randomLeft,
    top: randomTop,
  });
  var comparaisonCollisionDivs = function (divA, divB, chauveS) {
    if (!divA || !divB) return;
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
    };

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
    };

    const overlap = intersection_boxes(divaA, divaB);
    if (overlap) {
      console.log("overlap");
      if (prevDivaA !== undefined && prevDivaB !== undefined) {
        var infoBat1 = previousDivA.getBoundingClientRect();
        var infoBat2 = previousDivB.getBoundingClientRect();

        let factLeft =
          Math.abs(infoBat1.left) > Math.abs(infoBat2.left) ? -1 : 1;
        let factTop = Math.abs(infoBat1.top) > Math.abs(infoBat2.top) ? -1 : 1;
        $(".bats:first-child").css({
          left: infoBat1.left,
          top: infoBat1.top,
        });

        $(".bats:nth-child(2)").css({
          left: factLeft * infoBat1.left,
          top: factTop * infoBat1.top,
        });
      }
    }
    prevDivaA = divA;
    prevDivaB = divB;
  };
  comparaisonCollisionDivs(div1, div2, chauveS);
}
