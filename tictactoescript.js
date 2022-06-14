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
    if (wergewinnt() !== true) {
        felderchecken()
        wergewinnt()
    }
    current = 1 - current// 1
    button.setAttribute("disabled", "true") // 1
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

function gegenspieler() {
    if (kannKIGewinnen("spieler0") === false)
        if (kannKIGewinnen("spieler1") === false) {
            {
                zufaelligesFeld()
            }
        }
}

function kannKIGewinnen(spieler) {
    var allebuttons = document.querySelectorAll('td >button')
    for (var x = 0; x < 8; x++) {
        if (allebuttons[gewinnBedingungen[x][0]].getAttribute('class') === spieler &&
            allebuttons[gewinnBedingungen[x][1]].getAttribute('class') === spieler &&
            allebuttons[gewinnBedingungen[x][2]].getAttribute('class') === null) {
            // KI kann gewinnen
            allebuttons[gewinnBedingungen[x][2]].setAttribute("class", "spieler1")
            allebuttons[gewinnBedingungen[x][2]].innerText = "O";
            current = 1 - current
            allebuttons[gewinnBedingungen[x][2]].setAttribute("disabled", "true")
            return true;
        } else if (allebuttons[gewinnBedingungen[x][0]].getAttribute('class') === spieler &&
            allebuttons[gewinnBedingungen[x][1]].getAttribute('class') === null &&
            allebuttons[gewinnBedingungen[x][2]].getAttribute('class') === spieler) {
            // KI kann gewinnen
            allebuttons[gewinnBedingungen[x][1]].setAttribute("class", "spieler1")
            allebuttons[gewinnBedingungen[x][1]].innerText = "O";
            current = 1 - current
            allebuttons[gewinnBedingungen[x][1]].setAttribute("disabled", "true")
            return true;
        } else if (allebuttons[gewinnBedingungen[x][0]].getAttribute('class') === null &&
            allebuttons[gewinnBedingungen[x][1]].getAttribute('class') === spieler &&
            allebuttons[gewinnBedingungen[x][2]].getAttribute('class') === spieler) {
            // KI kann gewinnen
            allebuttons[gewinnBedingungen[x][0]].setAttribute("class", "spieler1")
            allebuttons[gewinnBedingungen[x][0]].innerText = "O";
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
        allebuttons[zufaelligeZahl].setAttribute("class", "spieler1")
        allebuttons[zufaelligeZahl].innerText = "O";
        current = 1 - current
        allebuttons[zufaelligeZahl].setAttribute("disabled", "true")
    }
}

function spielmodusaussuchen(SpielgegenKI) {
    SpielegegenKI = SpielgegenKI
    dialog.close()
}

function felderchecken(spieler0, spieler1) {
    var besteWertung;
    var besterZug;

    spieler0 = "spieler0";
    spieler1 = "spieler1";

    var allebuttons = document.querySelectorAll('td >button')
    for (var x = 0; x < 9; x++) {
        if (allebuttons[x].getAttribute('class') == null) {

            allebuttons[x].setAttribute('class', "spieler1")
            allebuttons[x].innerText = "O";


            var zugWertung = gewinner(spieler1);

            if (besteWertung === undefined || zugWertung > besteWertung) {
                besteWertung = zugWertung
                besterZug = x;
            }

            allebuttons[x].removeAttribute('class')
            allebuttons[x].innerText = "";
        }
    }
    allebuttons[besterZug].setAttribute('class', "spieler1")
    allebuttons[besterZug].innerText = "O";
    allebuttons[besterZug].setAttribute("disabled", "true")
    current = 1
    return besterZug;
}


function gewinner(aktuellerSpieler) {
    var allebuttons = document.querySelectorAll(' td > button')

    var spieler0 = "spieler0"
    var spieler1 = "spieler1"

    for (var k = 0; k < 8; k++) {
        if (allebuttons[gewinnBedingungen[k][0]].getAttribute('class') === spieler0
            && allebuttons[gewinnBedingungen[k][1]].getAttribute('class') === spieler0
            && allebuttons[gewinnBedingungen[k][2]].getAttribute('class') === spieler0) {
            return -10;
        }
        if (allebuttons[gewinnBedingungen[k][0]].getAttribute('class') === spieler1
            && allebuttons[gewinnBedingungen[k][1]].getAttribute('class') === spieler1
            && allebuttons[gewinnBedingungen[k][2]].getAttribute('class') === spieler1) {
            return 10;
        }
    }
    if (unentschieden2() === true) {
        return 0;
    }

    var zugWertung;
    if (aktuellerSpieler === spieler0) {
        var kleinsteWertung;

        for (var x = 0; x < 9; x++) {
            if (allebuttons[x].getAttribute('class') === null) {

                allebuttons[x].setAttribute('class', "spieler0")
                allebuttons[x].innerText = "X";

                zugWertung = gewinner(spieler1) // 1 => -1    spieler0 => spieler1

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
        for (var x = 0; x < 9; x++) {
            if (allebuttons[x].getAttribute('class') === null) {

                allebuttons[x].setAttribute('class', "spieler1")
                allebuttons[x].innerText = "O";

                zugWertung = gewinner(spieler0);

                if (besteWertung === undefined || zugWertung > besteWertung) {
                    besteWertung = zugWertung
                }
                allebuttons[x].removeAttribute('class')
                allebuttons[x].innerText = "";
            }
        }

    }
    return besteWertung;
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

//vielleicht anstelle, der ganzen setAttribut eine modifizierte buttongeklickt methode
// verwenden. Damit könnte man dann auch das gewinner(true) oder gewinner(false)
// zum Funktionieren bringen kann, da ich mir sicher bin, dass das aktuell nicht funktionieren wird.
// man könnte das mögliche Problem, das durch gewinner(true) oder gewinner(false) entstehen könnte auch versuchen zu lösen, indem
// man hier wieder mit current arbeitet, also gewinner einmal meinen Zug durch Current übergeben, indem man dadurch, der Funktion
// spieler0 übergibt oder eben spieler1
// Da zu kommt, dass auch die unentschieden2 Methode, mit hoher wahrscheinlichkeit bearbeitet werden muss
//Ausdruck for(var feld of allebuttons) vielleicht benutzen, um alle, diesen langen if Bedingungen auszutauschen
// Problem ist, möglicherweise, dass zwar alle mögliche gesetzt, entfernt und auch gespeichert wird, aber das am Ende kein finales
// Feld besetzt wird, weil das besterZug = allebuttons[x] nicht ganz funktioniert, wie es soll.
// Bei wergewinnt statt cAs spieler 0 || spieler1, da das mit dem wechsel (current) vielleicht nicht funktioniert ---> war nicht das Problem

