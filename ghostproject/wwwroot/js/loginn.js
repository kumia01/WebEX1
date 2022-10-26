$(document).ready(function () {
    hentAlleBrukere();
});

function hentAlleBrukere() {
    $.get("../bruker/HentAlle", function (bruker) {
        consol.log(bruker);
        formaterBruker(bruker);
    });
}

function formaterBruker(bruker) {
    let ut = 
            <select class="custom-select" id="inputGroupSelect01">
                <option selected>Choose...</option>
        </select>
    for (let brukere of bruker){
        ut += '<option id="'+ bruker.Id +'">' + bruker.Fornavn + '</option>' 
    }
    $("#inputBruker").html(ut);
}