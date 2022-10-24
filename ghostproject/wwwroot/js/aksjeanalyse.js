$(funtion(){
    hentAlleAksjer();
});


function hentAlleAksjer() {

//Begynnelse på å liste alle aksjer i kundeanalyse
    $.get("aksje/hentAlle", function (aksjer) {
        formaterAksjer(aksjer);
    });
}

