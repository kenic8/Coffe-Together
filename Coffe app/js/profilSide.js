import { firebaseDB } from "./firebase.js";



class profilservice {
    constructor() {
        this.bruger = firebaseDB.collection("bruger")
        this.read();
    }

    read() {
        // ========== READ ==========
        // watch the database ref for changes
        this.bruger.onSnapshot(snapshotData => {
            let bruger = [];

            snapshotData.forEach(doc => {
                const brugerS = doc.data();
                brugerS.id = doc.id;
                bruger.push(brugerS);
            });

            this.appendminprofil(bruger)

        });
    }


    appendminprofil(bruger) {

        var currentUser = firebase.auth().currentUser.uid;
        let htmlTemplate = "";
        for (var i = 0; i < bruger.length; i++) {
            var profilid = bruger[i].id
            // console.log(bruger[i].id);
            if (currentUser === profilid) {
                console.log("du er matchet")

                htmlTemplate += `
                <div id="logout">Log ud</div>
                <div class="opslagwrap">
                <div id="profilimg" style="background-image: url('${bruger[i].profilimg}')"></div>
                <div id="tekstogshit">
                <h2>${bruger[i].navn}  ${bruger[i].alder}</h2>
                <p>${bruger[i].Omig}</p>
                </div>
                <div id="infoogshit">
                </div>
                </div>
                `;

            }
        }
        document.getElementById("profilcontent").innerHTML = htmlTemplate;
        // console.log(bruger[1].id);
        // console.log(bruger[0].id)
        console.log(bruger)

        ////logout

        document.getElementById("logout").addEventListener("click", logout)
        // sign out user
        function logout() {
            firebase.auth().signOut();
        }

    }
}



new profilservice;
console.log("profil oppe at køre");