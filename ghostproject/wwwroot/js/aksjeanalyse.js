$(document).ready(function () {
    hentAlleAksjer();
});

function hentAlleAksjer() {

//Begynnelse på å liste alle aksjer i kundeanalyse
    $.get("aksje/hentAlle", function (aksjer) {
        formaterAksjer(aksjer);
    });
}
function formaterAksjer(aksjer) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>ID</th><th>Selskap</th><th>Ticker</th><th></th><th>Pris</th><th>Prisendring</th>" +
        "</tr>";


    for (let Aksje of aksjer) {
        const sum = (Aksje.gammelPris - Aksje.pris) / Aksje.pris
    
        if (sum < 0) {

                sum.style.color = 'red';

            ut += "<tr>" +
                "<td>" + Aksje.id + "</td>" +
                "<td>" + Aksje.selskap + "</td>" +
                "<td>" + Aksje.ticker + "</td>" +
                "<td>" + Aksje.pris + "</td>" +
                + "<td>" + sum + "</td>"
            "</tr>";
        } else {
                 
            sum.style.color = 'green';

            ut += "<tr>" +
                "<td>" + Aksje.id + "</td>" +
                "<td>" + Aksje.selskap + "</td>" +
                "<td>" + Aksje.ticker + "</td>" +
                "<td>" + Aksje.pris + "</td>" +
                + "<td>" + sum + "</td>"
            "</tr>";

        }
        console.log(sum)
    }
    
    ut += "</table>";
    $("#aksjene").html(ut);
}

