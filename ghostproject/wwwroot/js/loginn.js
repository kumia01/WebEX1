$(document).ready(function () {
    hentAlleBrukere();
});

function hentAlleBrukere() {
    $.get("../bruker/HentAlle", function (bruker) {
        formaterBruker(bruker);
    });
}

function formaterBruker(bruker) {
    let ut = "<option selected>Choose...</option>"
    for (let brukere of bruker){
        ut += '<option id="'+ brukere.id +'">' + brukere.fornavn + '</option>' 
    }
    $("#inputBruker").html(ut);
}