function navigation() {
    Array.from(document.getElementsByTagName('button')).forEach(e => {
        e.addEventListener('click', bioToggle);
    });
}

function bioToggle(e) {
    let bioType = e.target;

    off(bioType);
    on(bioType);
    onHtmlBlock(bioType);

    let titles = document.getElementsByClassName('title');
    setTitleEventListeners('click', titles);
}

function off() {
    Array.from(document.getElementsByTagName('button')).forEach(butt => {
        butt.style.borderColor = '#96979c';
        butt.style.color = '#96979c';
        butt.style.background = '';
    });
}

function on(bioType) {
    let color = 'rgba(150, 151, 156, 0.1)';
    bioType.style.cssText = `background: ${color}; font-weight: bold;`;
}

function onHtmlBlock(bioType) {
    let activeBlock = bioType.id + '-frame';
    let block = document.getElementById(activeBlock);
    let content = document.getElementById('content');
    content.innerHTML = block.innerHTML;
}

function setTitleEventListeners(event, titles) {
    Array.prototype.forEach.call(titles, function (title) {
        title.addEventListener(event, function () {
            title.parentElement.classList.toggle('expand');
            if (title.classList.contains('flash')) {
                title.classList.remove('flash');
            }
        }, false);
    });
}

/* Dark Mode */
// function setModeEventListener() {
//     let list = document.body.classList;
//     document.getElementById('toggler').addEventListener('change', event => {
//         event.target.checked ? list.add('dark-mode') : list.remove('dark-mode');
//     });
// }


// build headers for requests
function buildHeader() {
    let head = new Headers();
    head.append('pragma', 'no-cache');
    head.append('cache-control', 'no-cache');

    let init = {
        method: 'GET',
        headers: head
    };
    return init;
}

function pull(path) {
    return fetch(path, buildHeader())
        .then(function (response) {
            return response.json();
        });
}

function education() {
    let h = document.getElementById('education-block');
    pull('contents/education.json')
        .then(response => {
            loadingOff(0);
            response.data.forEach(item => {
                h.innerHTML += getHTML(item);
            });
        });
}

function getHTML(item) {
    return '<li class="' + item.type + '">' +
        '<div class="left">' + item.date + '</div>' +
        '<div class="desc"><div>' + item.description.what + ' ' + '<em>' + item.description.emphasis + '</em></div>' +
        '<div class="info">' + item.description.info + '</div></div></li>';
}

function getWorkHTML(item) {
    return '<li class="' + item.type + '">' +
        '<div class="left">' + item.date + '</div>' +
        '<div class="desc"><div><em>' + item.job.company + '</em></div>' +
        '<div class="info"><div>' + item.job.position + '</div>' +
        '<div class="info">' + item.job.description + '</div></div></li>';
}

function getInternshipHTML(item) {
    return '<li class="' + item.type + '">' +
        '<div class="left">' + item.date + '</div>' +
        '<div class="desc"><div><em>' + item.description.emphasis + '</em></div>' +
        '<div class="info">' + item.description.info + '</div></div></li>';
}

function work() {
    let h = document.getElementById('work-block');
    pull('contents/work.json')
        .then(response => {
            loadingOff(1);
            response.data.forEach(item => {
                h.innerHTML += getWorkHTML(item);
            });
        });
}

function internship() {
    let h = document.getElementById('internship-block');
    pull('contents/internship.json')
        .then(function (response) {
            loadingOff(2);
            response.data.forEach(item => {
                h.innerHTML += getInternshipHTML(item);
            });
        });
}

function courses() {
    let h = document.getElementById('courses-block');
    pull('contents/courses.json')
        .then(function (response) {
            loadingOff(3);
            response.data.forEach(item => {
                h.innerHTML += getHTML(item);
            });
        });
}

function hobbies() {
    let h = document.getElementById('hobbies-block');
    pull('contents/hobbies.json')
        .then(function (response) {
            loadingOff(4);
            response.data.forEach(item => {
                h.innerHTML += '<li class="' + item.type + '">' +
                    '<div>' + item.description.title + '</div>' +
                    '<div>' + item.description.technologies + '</div>' +
                    '<img class="photo" src="' + item.description.photo + '"></li>'
            });
        });
}

// generate projects section
function projects() {
    let p = document.getElementById('projects-block');
    pull('contents/projects.json')
        .then(function (response) {
            loadingOff(5);
            response.data.forEach(item => {
                p.innerHTML += '<li><a href="' + item.url + '">' + item.title + '</a></li>';
            });
        });
}

function setRandomPhoto() {
    let num = Math.floor(Math.random() * 3) + 1;
    document.getElementById('picture').src = `img/photos/photo_${num}.jpg`;
}

function loadingOff(loadingNum) {
    document.getElementsByClassName('loading')[loadingNum].classList.add('hide');
}

// get all the contents
(function () {
    window.addEventListener('load', function () {

        // fetch data from json files in contents folder
        education();
        work();
        internship();
        courses();
        hobbies();
        projects();

        // add listeners for buttons and blocks with information
        navigation();

        // set photo from folder
        setRandomPhoto();

        // change photo after interval
        setInterval(() => {
            setRandomPhoto();
        }, 5000);

    }, false);
})();
