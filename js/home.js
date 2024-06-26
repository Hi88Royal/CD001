
const fpPromiseMain = import('https://openfpcdn.io/fingerprintjs/v3')
        .then(FingerprintJS => FingerprintJS.load());

updateAccessLinkClickStatistic = function (linkId, url) {
    fpPromiseMain.then(fp => fp.get()).then(result => {
        const visitorId = result.visitorId;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/Home/UpdateLinkClickStatistic", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                LinkId: linkId,
                Ip: visitorId
            }));
    });
    window.location.href = url;
    //window.open(url);
}


expandArticle = function () {
    $("#expand-container").addClass('expanded');
}

checkDomain = function () {
    var domain = $("#txt-check-domain").val();
    $.ajax({
        type: "POST",
        url: "/home/CheckOfficialDomain",
        data: { DomainValue: domain },
        success: function (res) {
            if (res && res == 1) {
                $('#goodModalCenter').modal({ keyboard: false })
                $('#goodModalCenter').modal('show');
                $('#good-domain').html(domain);
            } else {
                $('#badModalCenter').modal({ keyboard: false })
                $('#badModalCenter').modal('show');
                $('#bad-domain').html(domain);
            }
        },
        dataType: "json"
    });

};

$("#btn-check-domain").click(checkDomain);

$("#txt-check-domain").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        checkDomain();
    }
});

setHash = function (hashContent) {
    setTimeout(function () {
        window.location.hash = hashContent;
    }, 300);

    $('.wrapper-bg, body, html').animate({
        scrollTop: $("#" + hashContent).offset().top
    }, 300);
}


$(document).ready(function () {

    var atag = $(window.location.hash).find(">:first-child");
    atag.first().trigger("click");

});

