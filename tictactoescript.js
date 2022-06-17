var current = 0;

var gewinnBedingungen = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

var bestesFeld;

const Spielmodus = {
    GegenSpieler: 'GegenSpieler',
    GegenKI: 'GegenKI',
    KIGegenKI: 'KIGegenKI'
};

var spielmodus;

document.addEventListener('DOMContentLoaded', Spielfeldgenerieren)

function buttongeklickt(element) {   // 0
    var button = element.target;
    if (current === 0 && spielmodus !== Spielmodus.KIGegenKI) {
        button.setAttribute("class", "spieler0")
        button.innerText = "X";
    } else if (current === 1 && spielmodus !== Spielmodus.KIGegenKI) {
        button.setAttribute("class", "spieler1")
        button.innerText = "O";
    }
    if (wergewinnt() !== true && spielmodus === Spielmodus.GegenKI) {
        minimax()
        wergewinnt();
    }
    current = 1 - current// 1
    button.setAttribute("disabled", "true")
}

async function KIgegenKI() {
    if (wergewinnt() === false) {
        setTimeout(gegenspieler, 1000)
        wergewinnt()
        setTimeout(minimax, 1000)
        setTimeout(KIgegenKI, 1000)
    }
}

function wergewinnt() {

    var allebuttons = document.querySelectorAll(' td > button')

    var cAs = "spieler" + current

    for (var k = 0; k < 8; k++) {
        if (allebuttons[gewinnBedingungen[k][0]].getAttribute('class') === cAs
            && allebuttons[gewinnBedingungen[k][1]].getAttribute('class') === cAs
            && allebuttons[gewinnBedingungen[k][2]].getAttribute('class') === cAs) {
            spielende();
            return true;
        }
    }
    return unentschieden()
}

var SpielegegenKI = true

function unentschieden() {
    var allebuttons = document.querySelectorAll(" td > button")
    var unentschieden = true
    for (var z = 0; z < 8; z++) {
        if (allebuttons[z].getAttribute('class') === null) {
            unentschieden = false
        }
    }
    if (unentschieden === true) {
        alert("Unentschieden")
    }
    return unentschieden
}

function spielende() {
    var allebuttons = document.querySelectorAll("td > button")

    for (var i = 0; i < 9; i++) {
        allebuttons[i].setAttribute('disabled', 'true');
    }

    Gewinneranzeige();
}


function Gewinneranzeige() {
    alert("Spieler " + current + " gewinnt!")
}


function Spielfeldgenerieren() {

    var dialog = document.getElementById("dialog")
    dialog.showModal()

    document.querySelector('table')?.remove()
    var neueTabelle = document.createElement('table')
    var div = document.getElementById('t1')
    div.appendChild(neueTabelle)

    for (k = 0; k < 3; k++) {
        var zeilenbruch = document.createElement('tr')
        for (i = 0; i < 3; i++) {
            var button = document.createElement('button')
            button.addEventListener('click', buttongeklickt)
            var td = document.createElement('td')
            td.appendChild(button)
            zeilenbruch.appendChild(td)
        }
        neueTabelle.appendChild(zeilenbruch)
        current = 0;
    }

}

function Spielfeldgenerieren2() {

    var dialog = document.getElementById("dialog")

    document.querySelector('table')?.remove()
    var neueTabelle = document.createElement('table')
    var div = document.getElementById('t1')
    div.appendChild(neueTabelle)

    for (k = 0; k < 3; k++) {
        var zeilenbruch = document.createElement('tr')
        for (i = 0; i < 3; i++) {
            var button = document.createElement('button')
            button.addEventListener('click', buttongeklickt)
            var td = document.createElement('td')
            td.appendChild(button)
            zeilenbruch.appendChild(td)
        }
        neueTabelle.appendChild(zeilenbruch)
        current = 0;
    }

}

function gegenspieler() {
    if (kannKIGewinnen("spieler1") === false) {
        if (kannKIGewinnen("spieler0") === false) {
            zufaelligesFeld()
        }
    }
}

function botduell() {
    Spielfeldgenerieren2;
    spielmodusaussuchen(Spielmodus.KIGegenKI);
    KIgegenKI()
}


function kannKIGewinnen(spieler) {
    var allebuttons = document.querySelectorAll('td >button')
    for (var x = 0; x < 8; x++) {
        if (allebuttons[gewinnBedingungen[x][0]].getAttribute('class') === spieler &&
            allebuttons[gewinnBedingungen[x][1]].getAttribute('class') === spieler &&
            allebuttons[gewinnBedingungen[x][2]].getAttribute('class') === null) {
            // KI kann gewinnen
            allebuttons[gewinnBedingungen[x][2]].setAttribute("class", "spieler0")
            allebuttons[gewinnBedingungen[x][2]].innerText = "X";
            current = 1 - current
            allebuttons[gewinnBedingungen[x][2]].setAttribute("disabled", "true")
            return true;
        } else if (allebuttons[gewinnBedingungen[x][0]].getAttribute('class') === spieler &&
            allebuttons[gewinnBedingungen[x][1]].getAttribute('class') === null &&
            allebuttons[gewinnBedingungen[x][2]].getAttribute('class') === spieler) {
            // KI kann gewinnen
            allebuttons[gewinnBedingungen[x][1]].setAttribute("class", "spieler0")
            allebuttons[gewinnBedingungen[x][1]].innerText = "X";
            current = 1 - current
            allebuttons[gewinnBedingungen[x][1]].setAttribute("disabled", "true")
            return true;
        } else if (allebuttons[gewinnBedingungen[x][0]].getAttribute('class') === null &&
            allebuttons[gewinnBedingungen[x][1]].getAttribute('class') === spieler &&
            allebuttons[gewinnBedingungen[x][2]].getAttribute('class') === spieler) {
            // KI kann gewinnen
            allebuttons[gewinnBedingungen[x][0]].setAttribute("class", "spieler0")
            allebuttons[gewinnBedingungen[x][0]].innerText = "X";
            current = 1 - current
            allebuttons[gewinnBedingungen[x][0]].setAttribute("disabled", "true")
            return true;
        }
    }
    return false;
}

function zufaelligesFeld() {

    var allebuttons = document.querySelectorAll(' td > button')
    var s1 = "spieler" + 0
    var s2 = "spieler" + 1
    var zufaelligeZahl = Math.floor(Math.random() * 8)
    if (allebuttons[zufaelligeZahl].getAttribute('class') === s1 ||
        allebuttons[zufaelligeZahl].getAttribute('class') === s2) {
        zufaelligesFeld()
    } else {
        allebuttons[zufaelligeZahl].setAttribute("class", "spieler0")
        allebuttons[zufaelligeZahl].innerText = "X";
        current = 1 - current
        allebuttons[zufaelligeZahl].setAttribute("disabled", "true")
    }
}

function spielmodusaussuchen(modus) {
    spielmodus = modus
    dialog.close()
    return modus;
}

function spielwiederholen() {
    Spielfeldgenerieren2()
    if (spielmodus === Spielmodus.KIGegenKI) {
        botduell()
    }
}

function minimax() {

    var spieler0 = "spieler0";
    var spieler1 = "spieler1";

    var allebuttons = document.querySelectorAll('td >button')
    bestesFeld = gewinner(spieler1, 0)
    allebuttons[bestesFeld].setAttribute('class', "spieler1")
    allebuttons[bestesFeld].innerText = "O";
    allebuttons[bestesFeld].setAttribute("disabled", "true")
    current = 1
}

function gewinner(aktuellerSpieler, tiefe) {
    var allebuttons = document.querySelectorAll(' td > button')

    var spieler0 = "spieler0"
    var spieler1 = "spieler1"

    for (var k = 0; k < 8; k++) {
        if (allebuttons[gewinnBedingungen[k][0]].getAttribute('class') === spieler0
            && allebuttons[gewinnBedingungen[k][1]].getAttribute('class') === spieler0
            && allebuttons[gewinnBedingungen[k][2]].getAttribute('class') === spieler0) {
            return -10 + tiefe;
        }
        if (allebuttons[gewinnBedingungen[k][0]].getAttribute('class') === spieler1
            && allebuttons[gewinnBedingungen[k][1]].getAttribute('class') === spieler1
            && allebuttons[gewinnBedingungen[k][2]].getAttribute('class') === spieler1) {
            return 10 - tiefe;
        }
    }
    if (unentschieden2() === true || tiefe === 10000) {
        return 0;
    }
    var zugWertung;
    if (aktuellerSpieler === spieler0) {
        var kleinsteWertung;

        for (var x = 0; x < 9; x++) {
            if (allebuttons[x].getAttribute('class') === null) {

                allebuttons[x].setAttribute('class', "spieler0")
                allebuttons[x].innerText = "X";

                zugWertung = gewinner(spieler1, tiefe + 1) // 1 => -1    spieler0 => spieler1

                if (kleinsteWertung === undefined || zugWertung < kleinsteWertung) {
                    kleinsteWertung = zugWertung;
                }
                allebuttons[x].removeAttribute('class')
                allebuttons[x].innerText = "";

            }
        }
        return kleinsteWertung;
    } else {
        var besteWertung;
        var besterZug;
        for (var x = 0; x < 9; x++) {
            if (allebuttons[x].getAttribute('class') === null) {

                allebuttons[x].setAttribute('class', "spieler1")
                allebuttons[x].innerText = "O";

                zugWertung = gewinner(spieler0, tiefe + 1);

                if (besteWertung === undefined || zugWertung > besteWertung) {
                    besteWertung = zugWertung
                    besterZug = x;
                }
                allebuttons[x].removeAttribute('class')
                allebuttons[x].innerText = "";
            }
        }

        if (tiefe === 0) {
            return besterZug
        } else {
            return besteWertung;
        }
    }
}

function unentschieden2() {
    var allebuttons = document.querySelectorAll(" td > button")
    var unentschieden = true;

    for (var z = 0; z < 8; z++) {
        if (allebuttons[z].getAttribute('class') === null) {
            unentschieden = false
        }
    }
    return unentschieden;
}


//Ausdruck for(var feld of allebuttons) vielleicht benutzen, um alle, diesen langen if Bedingungen auszutauschen

//Mit der Variable "tiefe" versuche ich zu bewirken, dass die KI immer die Sieg möglichkeit, mit den am wenigsten benötigten Zügen

/*

*/

