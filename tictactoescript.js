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

document.addEventListener('DOMContentLoaded', Spielfeldgenerieren)

function buttongeklickt(element) {   // 0
    var button = element.target;
    if (current === 0) {
        button.setAttribute("class", "spieler0")
        button.innerText = "X";
    } else {
        button.setAttribute("class", "spieler1")
        button.innerText = "O";
    }
    wergewinnt();
    if (SpielegegenKI === true) {
        if (wergewinnt() !== true) {
            felderchecken()
            wergewinnt()
        }
    }
    current = 1 - current// 1
    button.setAttribute("disabled", "true")
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

function spielmodusaussuchen(SpielgegenKI) {
    SpielegegenKI = SpielgegenKI
    dialog.close()
}

function felderchecken() {

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
    if (unentschieden2() === true || tiefe === 4) {
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
   Statement expected Bedeutung herausfinden
 */

/*

 */