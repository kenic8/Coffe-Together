
export default function klikbareOpslag(ActiveClassList, specificopslagdivs) {
    let htmlTemplate2 = "";
    console.log(ActiveClassList)
    for (var i = 0; i < ActiveClassList.length; i++) {
     ActiveClassList[i].id = i;
      ActiveClassList[i].addEventListener("click", function () {
        htmlTemplate2 += `
        <div id="klikkedopslagoverlaywrap">
        <div id="userwrapstuff">
        <div id="resetknap"></div>
          <div id="Oimgwrap">
            <div id="placeimg" style="background-image: url('${specificopslagdivs[this.id].img}')"></div>
          </div>
          <div id="Obutwrap">
          <button id="Jbutton">Join</button>
          <div id="joiner" class="joinet">
          <div class="join-content">
          <span class="lukke">&times;</span>
          <h2>Tillykke!</h2> <br>
         <p> Du har nu joinet</p>
        </div>
      </div>
          <div id="OpslagsInf">
              <div id="OPImg" style="background-image: url('${specificopslagdivs[this.id].profilimg}')"></div>
              <div id="OPInf">
                <div id="OPInftekstwrap">
                  <h2>${specificopslagdivs[this.id].name}    ${specificopslagdivs[this.id].alder}</h2>
                  <p>${specificopslagdivs[this.id].emne}</p>
                </div>
                <div id="OPInfpropertywrap">
                  <p><img id="tid1" src="images/clock.png">${specificopslagdivs[this.id].tid}</p>
                  <p><img id="personer1" src="images/account.png">${specificopslagdivs[this.id].personer}</p>
                </div>
              </div>
          </div>
          <div id="MoreButwrap">
            <div id="chatbut"><img src="images/chat.png">Gå til chat</div>
            <div id="profilbut"><img src="images/account.png">Gå til profil</div>
          </div>
        </div>
      </div>
        `;
        document.getElementById("opslagklikwrapwrap").innerHTML = htmlTemplate2;
        document.getElementById("resetknap").addEventListener("click", function () {
            htmlTemplate2 = "";
            document.getElementById("opslagklikwrapwrap").innerHTML = htmlTemplate2;
          });
                // Get the element by id -- joiner
            let join = document.getElementById("joiner");

                // Get the button that opens the join
              let btn = document.getElementById("Jbutton");

                // Get the <span> element that closes the join box
              let spanns = document.getElementsByClassName("lukke")[0];

                // When the user clicks the button, open the join box
                btn.onclick = function() {
                 join.style.display = "block";
                }

                // When the user clicks on <span> (x), close the box
                spanns.onclick = function() {
                  join.style.display = "none";
                }
      });
    }
  }