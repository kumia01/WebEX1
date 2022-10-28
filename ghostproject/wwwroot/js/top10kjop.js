/*$(document).ready(function () {
    //hentAlleAksjer();
    hentAlle1();
});


function hentAlle() {
    $.get("../Transaksjon/HentAlle", function (transaksjoner) {
        
    });
}

function hentAlle1() {
    let aksjer = [$.get("../Aksje/HentAlle")];
    let transaksjoner = $.get("../Transaksjon/HentAlle");
    $.when(aksjer, transaksjoner).done(function (aksjer, transaksjoner) {
        finnTopp(aksjer, transaksjoner);
    });
 
}

function finnTopp(aksjer, transaksjoner) {
    console.log(aksjer);
    console.log(transaksjoner);
    for (let transaksjon of transaksjoner) {
        const aksjeid = transaksjon.flereAksjerId;
        const sum = transaksjon.volum * transaksjon.pris;
        for (let aksje of aksjer) {
            if (aksjeid == aksje.id) {
                aksje.omsetning += sum;
            }
        }
    }
    console.log(aksjer[0]);
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

function hentAlleAksjer() {
    
}*/