$(document).ready(function () {
    hentAlleBrukere();
    $('#inputBruker').on('change', function () {
       hentInfo(this.value)
    });
});


function hentAlleBrukere() {
    $.get("../bruker/HentAlle", function (bruker) {
        formaterBruker(bruker);
    });
}

function formaterBruker(bruker) {
    let ut = "<option selected>Choose...</option>"
    for (let brukere of bruker){
        ut += '<option value="'+ brukere.id +'">' + brukere.fornavn + '</option>' 
    }
    $("#inputBruker").html(ut);
}

function hentInfo(variabel) {
    let sum = "id=" + parseInt(variabel);
    console.log(sum);
    $.get("../Bruker/HentEn?" + sum, function (bruker) {
        formaterInfo(bruker);
    });
}

function formaterInfo(bruker) {
    var ut = '<thread><tr><th scope="col">Fornavn</th><td scope="col">' + bruker.fornavn + '</td></tr></thread>' +
        '<tbody><tr><th>Etternavn</th><td>' + bruker.etternavn + '</td></tr>' +
        '<tr><th>Adresse</th><td>' + bruker.adresse + '</td></tr>' +
        '<tr><th>Postnummer</th><td>' + bruker.postnr + '</td></tr>' +
        '<tr><th>Bye</th><td>' + bruker.poststed + '</td></tr></tbody>'
    $("#table").html(ut);
}