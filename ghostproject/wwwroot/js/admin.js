$(document).ready(function () {

    //const id = window.location.search.substring(1);
    //const url = "../Bruker/HentEn?" + id;
    
    $("#id").val(1); // må ha med id inn skjemaet, hidden i html
    $("#aksjeid").val(1);
    

    $("#btnSkriv").click(function () {
        hentAlleTransaksjoner();
    });
});

function hentAlleTransaksjoner() {
    $.get("../Transaksjon/HentAlle", function (Transaksjon) {
        formaterTransaksjon(Transaksjon);
    });
}

function formaterTransaksjon(Transaksjon) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Volum</th><th>Pris</th><th></th><th></th>" +
        "</tr>";
    for (let transaksjon of Transaksjon) {
        ut += "<tr>" +
            "<td>" + transaksjon.volum + "</td>" +
            "<td>" + transaksjon.pris + "</td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#testTransaksjon").html(ut);
}



/*$(document).ready(function () {
    $("#btnSkriv").click(function () {
        hentAlleBrukere();
    });
});

function hentAlleBrukere() {
    $.get("../Bruker/HentAlle", function (Bruker) {
        formaterBruker(Bruker);
    });
}*/

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

function lagreTransaksjon() {
    const transaksjon = {
        Volum: $("#testVolum").val(),
        Pris: $("#testPris").val(),
        BrukereId: $("#id").val(),
        AksjeId: $("#aksjeid").val()
    }
    const url = "../Transaksjon/Lagre";
    console.log(transaksjon);
    $.post(url, transaksjon, function (OK) {
        if (OK) {
            $("#feil").html("Lagt inn i db");
        }
        else {
            $("#feil").html("Feil i db - prøv igjen senere")
        }
    });
}

