$(document).ready(function () {
    hentEnAksje();
    hentAlleBrukere();
    $('#inputBruker').on('change', function () { //Henter id'en til valgt bruker fra dropdown og lar den brukeren bli valgt
        hentInfo(this.value)
        hentAntallAksjer(this.value)
    });
});

//Henter den valgte aksjen ved å ta aksjen sin id fra url
function hentEnAksje() {
    const id = window.location.search.substring(1);
    $.get("../Aksje/HentEn?" + id, function (Aksje) {
        formaterAksje(Aksje);
    });
}

//Setter den valgte aksjen sin informasjon til valgte felter
function formaterAksje(Aksje) {
    const prisendringProsent = ((Aksje.pris - Aksje.gammelPris) / Aksje.gammelPris) * 100; //Regner ut prisendringen i prosent
    const prisendring = Aksje.pris - Aksje.gammelPris; //Regner ut prisendringen i NOK
    document.getElementById("aksjenavn").firstChild.data = Aksje.selskap;
    document.getElementById("ticker").firstChild.data = Aksje.ticker;
    document.getElementById("pris").firstChild.data = Aksje.pris;
    document.getElementById("prisendringProsent").firstChild.data = prisendringProsent + "%";
    document.getElementById("prisendringNok").firstChild.data = prisendring + "kr";
}

//Henter alle brukere fra databasen
function hentAlleBrukere() {
    $.get("../bruker/HentAlle", function (bruker) {
        formaterBruker(bruker);
    });
}

//Lager dropdown box med alle brukere som valg
function formaterBruker(bruker) {
    let ut = "<option selected>Choose...</option>"
    for (let brukere of bruker) {
        ut += '<option value="' + brukere.id + '">' + brukere.fornavn + '</option>'
    }
    $("#inputBruker").html(ut);
}

//Henter valgt bruker fra database med id fra dropdown
function hentInfo(variabel) {
    let sum = parseInt(variabel);
    $.get("../bruker/HentEn?id=" + sum, function (bruker) {
        formaterInfo(bruker);
    });
}

//Setter inn fullt navn til valgt bruker
function formaterInfo(bruker) {
    document.getElementById("brukerid").firstChild.data = bruker.id;
    document.getElementById("fulltnavn").firstChild.data = bruker.fornavn + " " + bruker.etternavn;
}

//Henter alle transaksjoner til valgt bruker
function hentAntallAksjer(variabel) {
    let id = parseInt(variabel);
    $.get("../Transaksjon/HentBrukerTransaksjoner?brukerid=" + id, function (Transaksjoner) {
        antallAksjer(Transaksjoner);
    });
}

//Oppretter array brukerTransaksjoner som er brukerne sine transaksjoner i valgt aksje
function antallAksjer(Transaksjoner) {
    const url = window.location.search.substring(1); //Henter id'en fra url
    const aksjeid = url.charAt(url.length - 1); //Tar med bare id'en uten id=x
    let brukerTransaksjoner = [];
    let omsetning = 0;
    for (let Transaksjon of Transaksjoner) {
        omsetning += Transaksjon.volum * Transaksjon.pris;
        if (Transaksjon.flereAksjerId == aksjeid) { //Hvis valgt aksje sin id er lik bruker transaksjonene sin aksjeid
            brukerTransaksjoner.push(Transaksjon);
        }
    }
    console.log(omsetning);
    document.getElementById("omsatt").firstChild.data = omsetning;
    regnUtAntallAksjer(brukerTransaksjoner);
}

//Går gjennom arrayet brukerTransaksjoner og legger sammen alt volumet for å se hvor mange av en aksje en bruker har
function regnUtAntallAksjer(brukerTransaksjoner) {
    let volum = 0;
    for (let i = 0; i < brukerTransaksjoner.length; i++) {
        volum += brukerTransaksjoner[i].volum;
    }
    document.getElementById("brukeraksjer").firstChild.data = volum; //Setter inn volumet som er regnet ut
}

function lagreTransaksjon() {
    const url = window.location.search.substring(1); //Henter id'en fra url
    const aksjeid = url.charAt(url.length - 1); //Tar med bare id'en uten id=x
    const Transaksjon = {
        Volum: $("#antall").val(),
        Pris: document.getElementById("pris").firstChild.data,
        BrukereId: document.getElementById("brukerid").firstChild.data,
        FlereAksjerId: aksjeid
    }
    console.log(Transaksjon);
    $.post("../Transaksjon/Lagre", Transaksjon, function (OK) {
        if (OK) {
            console.log("Lagt inn i db");
        }
        else {
            console.log("Feil - Ikke lagt inn i db");
        }
    });
}

function lagreTransaksjonSelg() {
    const url = window.location.search.substring(1); //Henter id'en fra url
    const aksjeid = url.charAt(url.length - 1); //Tar med bare id'en uten id=x
    let volum = $("#antall").val();
    volum = volum * (-1);
    const Transaksjon = {
        Volum: volum,
        Pris: document.getElementById("pris").firstChild.data,
        BrukereId: document.getElementById("brukerid").firstChild.data,
        FlereAksjerId: aksjeid
    }
    console.log(Transaksjon);
    $.post("../Transaksjon/Lagre", Transaksjon, function (OK) {
        if (OK) {
            console.log("Lagt inn i db");
        }
        else {
            console.log("Feil - Ikke lagt inn i db");
        }
    });
}