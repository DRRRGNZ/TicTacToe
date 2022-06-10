
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
    if(SpielegegenKI === true)
{
    gegenspieler()
    wergewinnt()
}
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
    var s1 = "spieler" + 0
    var s2 = "spieler" + 1
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
    // Sieg des Spielers vereiteln
    if (kannKIGewinnen('spieler1') === false) {
    if (kannKIGewinnen('spieler0') === false) {
    zufaelligesFeld()
}
}
}

    function kannKIGewinnen(spieler) {
    var allebuttons = document.querySelectorAll( 'td >button')
    var s1 = "spieler" + 0
    var s2 = "spieler" + 1
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
    if (allebuttons[zufaelligeZahl].getAttribute('class') === s1 || allebuttons[zufaelligeZahl].getAttribute('class') === s2) {
    zufaelligesFeld()
} else {
    allebuttons[zufaelligeZahl].setAttribute("class", "spieler1")
    allebuttons[zufaelligeZahl].innerText = "O";
    current = 1 - current
    allebuttons[zufaelligeZahl].setAttribute("disabled", "true")
}
}

function mensch()
    {
        SpielegegenKI = false
        dialog.close()
    }

    function ki()
    {
        SpielegegenKI =true
        dialog.close()
    }

function spielmodusaussuchen(){
        var ki = document.getElementById()
        if()
}




