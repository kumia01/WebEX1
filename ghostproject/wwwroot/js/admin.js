$(document).ready(function () {

    //const id = window.location.search.substring(1);
    //const url = "../Bruker/HentEn?" + id;

    $("#BrukereId").val(4); // må ha med id inn skjemaet, hidden i html
    $("#FlereAksjerId").val(2);
    

    $("#btnSkriv").click(function () {
        //hentAlleTransaksjoner();
        hentBrukerTransaksjoner();
    });
    //hentAlleTransaksjoner();
    hentBrukerTransaksjoner();
    hentAlleAksjer();
});

function hentAlleTransaksjoner() {
    $.get("../Transaksjon/HentAlle", function (Transaksjon) {
        console.log(Transaksjon);
        formaterTransaksjon(Transaksjon);
    });
}

function formaterTransaksjon(Transaksjon) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Volum</th><th>Pris</th><th>BrukereId</th><th>FlereAksjerId</th>" +
        "</tr>";
    for (let transaksjon of Transaksjon) {
        ut += "<tr>" +
            "<td>" + transaksjon.volum + "</td>" +
            "<td>" + transaksjon.pris + "</td>" +
            "<td>" + transaksjon.brukereId + "</td>" +
            "<td>" + transaksjon.flereAksjerId + "</td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#testTransaksjon").html(ut);
}


function hentBrukerTransaksjoner() {
    const brukerId = "brukerId=4"
    const url = "../Transaksjon/HentBrukerTransaksjoner?" + brukerId;
    $.get(url, function (Transaksjon) {
        console.log(Transaksjon);
        formaterTransaksjon(Transaksjon);
    });
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
    const Transaksjon = {
        Volum: $("#testVolum").val(),
        Pris: $("#testPris").val(),
        BrukereId: $("#BrukereId").val(),
        FlereAksjerId: $("#FlereAksjerId").val()
    }
    const url = "../Transaksjon/Lagre";
    console.log(Transaksjon);
    $.post(url, Transaksjon, function (OK) {
        if (OK) {
            $("#feil").html("Lagt inn i db");
        }
        else {
            $("#feil").html("Feil i db - prøv igjen senere")
        }
    });
}

function hentAlleAksjer() {
    $.get("../Aksje/HentAlle", function (Aksjer) {
        console.log(Aksjer);
        formaterAksjer(Aksjer);
    });
}

function formaterAksjer(Aksjer) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>ID</th><th>Selskap</th><th>Ticker</th><th></th><th>Pris</th>" +
        "</tr>";
    for (let Aksje of Aksjer) {
        ut += "<tr>" +
            "<td>" + Aksje.id + "</td>" +
            "<td>" + Aksje.selskap + "</td>" +
            "<td>" + Aksje.ticker + "</td>" +
            "<td>" + Aksje.pris + "</td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#testAksje").html(ut);
}

