$(funtion(){
    hentAlleAksjer();
});


function hentAlleAksjer() {

//Begynnelse på å liste alle aksjer i kundeanalyse
    $.get("aksje/hentAlle", function (aksjer) {
        formaterAksjer(aksjer);
    });
}
function formaterAksjer(Aksjer) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>ID</th><th>Selskap</th><th>Ticker</th><th></th><th>Pris</th><th>Prisendring</th>" +
        "</tr>";


    for (let Aksje of Aksjer) {
        int sum = (Aksje.gammelPris - Aksje.pris) / Aksje.pris

        if (sum < 0) {

            ut += "<tr>" +
                "<td>" + Aksje.id + "</td>" +
                "<td>" + Aksje.selskap + "</td>" +
                "<td>" + Aksje.ticker + "</td>" +
                "<td>" + Aksje.pris + "</td>" +
                + "<td>" + sum + "</td>"
            "</tr>";
        } else {
            ut += "<tr>" +
                "<td>" + Aksje.id + "</td>" +
                "<td>" + Aksje.selskap + "</td>" +
                "<td>" + Aksje.ticker + "</td>" +
                "<td>" + Aksje.pris + "</td>" +
                + "<td>" + sum + "</td>"
            "</tr>";

        }
    }
    
    ut += "</table>";
    $("#testAksje").html(ut);
}

