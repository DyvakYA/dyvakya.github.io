function services() {
    var h = document.getElementById('services');
    pullService().then(function (r) {
        document.getElementsByClassName('loading')[0].classList.add('hide');

        r.data.forEach(function (x) {
            h.innerHTML += '<div class="col-md-4">'
                + '<span class="fa-stack fa-4x">'
                + '<i class="fas fa-circle fa-stack-2x text-primary"></i>'
                + '<i class="fas fa-' + x.icon + ' fa-stack-1x fa-inverse"></i>'
                + '</span>'
                + '<h4 class="service-heading">' + x.title + '</h4>'
                + '<p class="text-muted">' + x.description + '</p>'
                + '</div>';
        });
    });
}

// pull services
function pullService() {
    return fetch('contents/services.json', buildHeader()).then(function (response) {
        return response.json();
    });
}

// get all the contents jazz
(function () {
    window.addEventListener('load', function () {
        services();
    }, false);
})();

function buildHeader() {
    var head = new Headers();
    head.append('pragma', 'no-cache');
    head.append('cache-control', 'no-cache');

    var init = {
        method: 'GET',
        headers: head
    };
    return init;
}