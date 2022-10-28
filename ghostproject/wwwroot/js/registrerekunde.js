﻿function lagreBruker() {
    const bruker = {
        Fornavn: $("#fornavn").val(),
        Etternavn: $("#etternavn").val(),
        Adresse: $("#adresse").val(),
        Postnr: $("#postnr").val(),
        Poststed: $("#poststed").val()
    }
    console.log(bruker);
    $.post("../Bruker/Lagre", bruker, function (OK) {
        if (OK) {
            console.log("Lagt inn i db");
        }
        else {
            console.log("Feil i db - prøv igjen senere");
        }
    });
}

function slettBruker() {
    $.get("/Slett", function () {
            hentAlle();
        })
    }