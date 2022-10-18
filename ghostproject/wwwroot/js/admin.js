$(document).ready(function () {
    $("#btnSkriv").click(function () {
        hentAlleBrukere();
    });
});

function hentAlleBrukere() {
    $.get("../Bruker/HentAlle", function (Bruker) {
        formaterBruker(Bruker);
    });
}

function formaterBruker(Bruker) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Navn</th><th>Adresse</th><th></th><th></th>" +
        "</tr>";
    for (let bruker of Bruker) {
        ut += "<tr>" +
            "<td>" + bruker.fornavn + "</td>" +
            "<td>" + bruker.etternavn + "</td>" +
            "<td>" + bruker.adresse + "</td>" +
            "<td>" + bruker.postnr + "</td>" +
            "<td>" + bruker.poststed + "</td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#testBrukere").html(ut);
}

function lagreBruker() {
        const bruker = {
            Fornavn: $("#testFornavn").val(),
            Etternavn: $("#testEtternavn").val(),
            Adresse: $("#testAdresse").val(),
            Postnr: $("#testPostNr").val(),
            Poststed: $("#testPoststed").val()
        }
        const url = "../Bruker/Lagre";
        $.post(url, bruker, function (OK) {
            if (OK) {
                $("#feil").html("Lagt inn i db");
            }
            else {
                $("#feil").html("Feil i db - prøv igjen senere");
            }
        });
}

