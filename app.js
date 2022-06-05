//rock = Zombie eftersom när jag designa spelet så hade jag än mer astroid tanke men valde att inte utföra den
//och höll mig till zombie konseptet istället.
//shooter = hero

//variabler
var shooteffect = new Audio('lasersound.mp3');
var backgroundsong = new Audio("Backgroundnoise.mp3");
var jet2 = document.getElementById("shoota");
var jet = document.getElementById("shooter");
var board = document.getElementById("board");
window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet2).getPropertyValue("left"));
  if (e.key == "a" && left > 0) {
    jet2.style.left = left - 10 + "px";
  }
      else if (e.key == "d" && left <= 630) {
      jet2.style.left = left + 10 + "px";
    }
 //16 i detta fall står för shift key
    if (e.key == "v" || e.keyCode == 16) {
      shooteffect.play();
     

      var bullet = document.createElement("div");
      bullet.classList.add("bullets");
      board.appendChild(bullet);
  
      var movebullet = setInterval(() => {
        var rocks = document.getElementsByClassName("rocks");
  
        for (var i = 0; i < rocks.length; i++) {
          var rock = rocks[i];
          if (rock != undefined) {
            var rockbound = rock.getBoundingClientRect();
            var bulletbound = bullet.getBoundingClientRect();
            
            //tittar ifall zombie och varje skott är på samma ställe, är de på samma ställe så dör zombien
            
            if (
              bulletbound.left >= rockbound.left &&
              bulletbound.right <= rockbound.right &&
              bulletbound.top <= rockbound.top &&
              bulletbound.bottom <= rockbound.bottom
              
  
            ) {
              rock.parentElement.removeChild(rock); //Tar bort skottet som blivit träffad
              //ger poäng
              document.getElementById("points").innerHTML =
                parseInt(document.getElementById("points").innerHTML) + 1;
                killSound.play();
            }
          }
        }
        var bulletbottom = parseInt(
          window.getComputedStyle(bullet).getPropertyValue("bottom")
        );
  
        //stoppar skotten ifrån att åka utanför boxen
        if (bulletbottom >= 700) {
          clearInterval(movebullet);
        }
  
        bullet.style.left = left + "px"; //gör så att skottet ligger ovanför
        bullet.style.bottom = bulletbottom + 2.5 + "px";
      });
    }
  });
  
window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 10 + "px";
  }
  //460  =>  spelbrädans bredd- shooter bredd
  else if (e.key == "ArrowRight" && left <= 630) {
    jet.style.left = left + 10 + "px"; 
  }
  if (e.key == "ArrowUp" || e.keyCode == 32) {
    shooteffect.play();
    //32 står för space bar
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    var movebullet = setInterval(() => {
      var rocks = document.getElementsByClassName("rocks");

      for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        if (rock != undefined) {
          var rockbound = rock.getBoundingClientRect();
          var bulletbound = bullet.getBoundingClientRect();
          

        //tittar ifall zombie och varje skott är på samma ställe, är de på samma ställe så dör zombien


          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
            
          ) {
            rock.parentElement.removeChild(rock); //tar bort skottet som har blivit träffad
            //ger poäng
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
              killSound.play();
          }
        }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      //hindrar skottet ifrån att åka utanför banan
      if (bulletbottom >= 700) {
        clearInterval(movebullet);
      }
//gör så att skottet är ovanför shooter
      bullet.style.left = left + "px"; 
      bullet.style.bottom = bulletbottom + 2.5 + "px";
    });
  }
});
//ger obestämmt ställe
var generaterocks = setInterval(() => {
  var rock = document.createElement("div");
  rock.classList.add("rocks");
  
  var rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  //genererar ett värde mellan 0 till 650 där 650 => spelbrädans bredd - Zombie bredd
  rock.style.left = Math.floor(Math.random() * 650) + "px";

  board.appendChild(rock);
}, 1000);

var moverocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {
      //ökar hastigheten av zombies.
      var rock = rocks[i]; 
      var rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      //675 => spelbrädans höjd - zombiens höjd + 25
      if (rocktop >= 675) {
        alert("Game Over");
        clearInterval(moverocks);
        window.location.reload();
      }

      rock.style.top = rocktop + 25 + "px";
    }
  }
  backgroundsong.play();
}, 650);