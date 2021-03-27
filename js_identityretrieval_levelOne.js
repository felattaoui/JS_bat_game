"use strict";

  
    var body= $('body');
    
   
    var interpolations =
      [{
         
          backGPosx: "0%",
          backGPosy:"0%",
  
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
      
// ---------------------------Code pour le score - plus tard : A NE PAS SUPPRIMER ---------------- 
    //   var calculScore = function () {
    //     var ciblageDivScore = document.getElementById('conteneurCounterScore');
    //     var contenuHTML = document.getElementById('conteneurCounterScore').innerHTML;
        
    
    //     var compteur = Number(contenuHTML);
      
    //       ciblageDivScore.innerHTML= compteur+1;
    // }
 // ---------------------------Code pour le score - plus tard : A NE PAS SUPPRIMER ---------------- 




 // ---------------------------Fonctions ---------------- 
   
   function createBats(){
      
    var bats = $('<div>').addClass('bats');
    $('#conteneur').append(bats);
    var indice = 0;
    var i;
   
   setInterval(function(){
    
    for(i=0;i<document.getElementsByClassName('bats').length;i++){
      this.document.getElementsByClassName('bats')[i].style.backgroundPositionX = interpolations[indice].backGPosx;
      this.document.getElementsByClassName('bats')[i].style.backgroundPositionY = interpolations[indice].backGPosy;
    indice ++;
    if(indice>3){
      indice=0;
    };
    }
   }, 500)
   
   setInterval(function(){
    moveBats(bats)
   }, 30)
    
  bats.click(function(){
  shootBats(bats);})
      }


  var idInterval;   
  function jouer(){
  for (var i = 0; i < 2; i++) {
            createBats();
          var tempsecoule = 0;
           idInterval = setInterval(function(){
            tempsecoule ++;
            // console.log("je suis la fonction jouer",tempsecoule);
            if(tempsecoule === 1000) {
              clearInterval(idInterval);
              alert("Perdu!");
              body.empty();
              jouer();
            }
          },1000)
        }
        }
        jouer();

function shootBats(chauveS) {
  chauveS.addClass('shot');
  setTimeout(function(){
  chauveS.remove();
 // console.log ("je suis la morte dans SHOOT",chauveS)
  if($('.bats').length === 0){
  // console.log($('.bats'))
  clearInterval(idInterval)
  alert('Gagné');
  jouer();

            }
          }, 100)
        }
      
      
function moveBats(chauveS){
          
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
            // var infoBat1 = div1.getBoundingClientRect();
            // diva1= {
            //   top : randomTop,
            //   bottom : infoBat1.bottom,
            //   left : randomLeft,
            //   right : infoBat1.right,
            //   height : infoBat1.height,
            //   width : infoBat1.width,
            // }

            var comparaisonCollisionDivs = function (divA,divB, chauveS) {
              // console.log ('premiere console log ', divA.left,divA.top, divB.left, divB.top)

              var infoBat = divA.getBoundingClientRect();
              var divaA= {
              top : infoBat.top,
              bottom : infoBat.bottom,
              left : infoBat.left,
              right : infoBat.right,
              height : infoBat.height,
              width : infoBat.width,
            }

            var infoBat_ = divB.getBoundingClientRect();
            var divaB= {
              top : infoBat_.top,
              bottom : infoBat_.bottom,
              left : infoBat_.left,
              right : infoBat_.right,
              height : infoBat_.height,
              width : infoBat_.width,
            }

              if ((divaA.right>=divaB.left) && ((divaB.bottom - divaA.top <= (2*height)) && (divaB.bottom - divaA.top>=0 ))) {
                console.log("il y a collision latérale A DROITE entre div 1 et div2 ", divaA.right, divaB.left, divaB.bottom - divaA.top);

                var randomLeft = Math.random() * (document.getElementById('conteneur').clientWidth);
                var randomTop = Math.random() * (document.getElementById('conteneur').clientHeight);

                console.log(randomLeft)
                console.log(randomTop)
      
          chauveS.css({
            left: randomLeft,
            top: randomTop,
          });

              }

          //     if( (divaA.left<=divaB.right) && ((divaB.bottom - divaA.top<= (2*height)) && (divaB.bottom - divaA.top>=0 ))){
          //       console.log("il y a collision latérale A GAUCHE entre div 1 et div2 ", infoBat, infoBat_);
                
          //       var randomLeft = Math.random() * (document.getElementById('conteneur').clientWidth);
          // var randomTop = Math.random() * (document.getElementById('conteneur').clientHeight);
      
          // chauveS.css({
          //   left: randomLeft,
          //   top: randomTop,
          // });
          //     }

          //     if( (divaA.bottom>=divaB.top) && ((divaA.right - divaB.left<= (2*height)) && (divaA.right - divaB.left>=0))){
          //       console.log("il y a collision horizontale EN BAS  entre div 1 et div2 ", infoBat, infoBat_);
                
          //       var randomLeft = Math.random() * (document.getElementById('conteneur').clientWidth);
          // var randomTop = Math.random() * (document.getElementById('conteneur').clientHeight);
      
          // chauveS.css({
          //   left: randomLeft,
          //   top: randomTop,
          // });
          //     }

          //     if( (divaB.bottom>=divaA.top) && ((divaA.right - divaB.left<= (2*height)) && (divaA.right - divaB.left>=0))){
          //       console.log("il y a collision horizontale EN HAUT entre div 1 et div2 ", infoBat, infoBat_);
                
          
          //       var randomLeft = Math.random() * (document.getElementById('conteneur').clientWidth);
          // var randomTop = Math.random() * (document.getElementById('conteneur').clientHeight);
      
          // chauveS.css({
          //   left: randomLeft,
          //   top: randomTop,
          // });
          //     }
            }
            comparaisonCollisionDivs(div1,div2, chauveS);
            // comparaisonCollisionDivs(div1,div3);
            // comparaisonCollisionDivs(div2,div3);
        }
        // dans jQuery, il y a une méthode .remove() comme empty() qui dégage tous les éléments du DOM ou un élément du DOM et tout ce qui se trouve à l'intérieur. Attention, tout ce qui est à l'interieur et toutes les méthodes associées sont supprimées aussi
      
          
      
      