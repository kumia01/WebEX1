$(document).ready(function () {
    hentAlleAksjer();
    //endrer på Aksjeprisen
    endrePris();
});

function endrePris() {
    $.get("../Aksje/endrePris")
}

function hentAlleAksjer() {

    //Begynnelse på å liste alle aksjer i kundeanalyse
    $.get("../Aksje/HentAlle", function (Aksjer) {
        formaterAksjer(Aksjer);
    });
}
//Formaterer alle aksjene
function formaterAksjer(Aksjer) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "   <th>Selskap</th><th>Ticker</th><th>Pris</th><th>Prisendring</th><th>Kjøp</th><th>Salg</th>" +

        "</tr>";

        for (let Aksje of Aksjer) {
            const sum = ((Aksje.pris - Aksje.gammelPris) / Aksje.gammelPris) * 100; //Regner ut prisendringen til hver aksje i %

            if (Aksje.id == 9) {
                break;
            }

            else {
                if (sum < 0) { //Hvis prisendringen til en aksje er negativ vil det sette prisendringen til rød
                    ut += "<tr>" +
                        "<td>" + Aksje.selskap + "</td>" +
                        "<td>" + Aksje.ticker + "</td>" +
                        "<td>" + Aksje.pris + "</td>" +
                        '<td style="color: red;">' + sum + "%" + "</td>" +
                        "<td> <a class='btn btn-success' href='endre.html?id=" + Aksje.id + "'>Kjøp</a></td>" +
                        "<td> <a class='btn btn-danger' href='endreSelg.html?id=" + Aksje.id + "'>Selg</a></td>" +
                        "</tr>";
                } else { //Hvis prisendringen til en aksje er positiv vil det sette prisendringen til grønn
                    ut += "<tr>" +
                        "<td>" + Aksje.selskap + "</td>" +
                        "<td>" + Aksje.ticker + "</td>" +
                        "<td>" + Aksje.pris + "</td>" +
                        '<td style="color: green;">' + sum + "%" + "</td>" +
                        "<td> <a class='btn btn-success' href='endre.html?id=" + Aksje.id + "'>Kjøp</a></td>" +
                        "<td> <a class='btn btn-danger' href='endreSelg.html?id=" + Aksje.id + "'>Selg</a></td>" +
                        "</tr>";

                }
            }
        }

    ut += "</table>";
    $("#aksjene").html(ut);
}