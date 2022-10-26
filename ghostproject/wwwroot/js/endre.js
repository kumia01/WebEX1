$(document).ready(function () {
    hentEnAksje();
});

function hentEnAksje() {
    const id = window.location.search.substring(1);
    $.get("../Aksje/HentEn?" + id, function (Aksje) {
        console.log(Aksje);
        //formaterAksje(Aksje);
    });
}

/*function formaterAksje(Aksje) {
    let ut = 
}*/
