$(document).ready(function () {
    hentAlleAksjer();
});

function hentAlleAksjer() {

//Begynnelse på å liste alle aksjer i kundeanalyse
    $.get("../Aksje/HentAlle", function (Aksjer) {
        formaterAksjer(Aksjer);
    });
}
function formaterAksjer(Aksjer) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>ID</th><th>Selskap</th><th>Ticker</th><th>Pris</th><th>Prisendring</th>" +
        "</tr>";


    for (let Aksje of Aksjer) {
        const sum = ((Aksje.pris - Aksje.gammelPris) / Aksje.gammelPris) * 100;
        if (sum < 0) {

                //sum.style.color = 'red';

            ut += "<tr>" +
                "<td>" + Aksje.id + "</td>" +
                "<td>" + Aksje.selskap + "</td>" +
                "<td>" + Aksje.ticker + "</td>" +
                "<td>" + Aksje.pris + "</td>" +
                + "<td>" + sum + "%" + "</td>"
            "</tr>";
        } else {
                 
           // sum.style.color = 'green';

            ut += "<tr>" +
                "<td>" + Aksje.id + "</td>" +
                "<td>" + Aksje.selskap + "</td>" +
                "<td>" + Aksje.ticker + "</td>" +
                "<td>" + Aksje.pris + "</td>" +
                "<td>" + sum + "%" + "</td>" +
            "</tr>";

        }
        console.log(sum);
        console.log(Aksje);
    }
    
    ut += "</table>";
    $("#aksjene").html(ut);
}

