$(document).ready(function () {
    hentAlleTransaksjoner();
});

function hentAlleTransaksjoner() {
    $.get("../../Transaksjon/HentAlle", function (Transaksjoner) {
        console.log(Transaksjoner);
        sorterTransaksjon(Transaksjoner);
    });
}

function sorterTransaksjon(Transaksjoner) {
   
    for (let Transaksjon of Transaksjoner) {
        const omsatt = Transaksjon.volum * Transaksjon.pris;
        Transaksjon.omsetning = omsatt;
    }
    Transaksjoner.sort((a, b) => {
        if (a.omsetning > b.omsetning) {
            return -1;
        }
        if (a.omsetning < b.omsetning) {
            return 1;
        }
        return 0;
    });

    //formater
}