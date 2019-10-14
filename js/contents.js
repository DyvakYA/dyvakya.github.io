function navigation(event) {
    let buttons = document.getElementsByTagName('button');
    setButtonEventListeners(event, buttons);
}

function setButtonEventListeners(event, buttons) {
    Array.prototype.forEach.call(buttons, function (button) {
        button.addEventListener(event, function () {
            let activeBlock = button.id + '-frame';
            let block = document.getElementById(activeBlock);
            let content = document.getElementById('content');
            content.innerHTML = block.innerHTML;
            let titles = document.getElementsByClassName('title');
            setTitleEventListeners(event, titles);
        }, false);
    });
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

function setBioEventListener() {
    Array.from(document.getElementsByTagName('button')).forEach(e => {
        e.addEventListener('click', bioToggle);
    });
}

function bioToggle(e) {
    let bioType = e.target;
    let color = 'rgba(150, 151, 156, 0.1)';
    off(bioType);
    bioType.style.cssText = `background: ${color}; font-weight: bold;`;
    //document.getElementsByClassName(bioType.id)[0].classList.add('show');
}

function off(bioType) {
    Array.from(document.getElementsByTagName('button')).forEach(butt => {
        butt.style.borderColor = '#96979c';
        butt.style.color = '#96979c';
        butt.style.background = '';
    });
    Array.from(document.getElementsByClassName('bio')).forEach(e => {
        e.classList.remove('show');
    });
}


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
        .then(function (response) {
            document.getElementsByClassName('loading')[0].classList.add('hide');
            response.data.forEach(function (x) {
                h.innerHTML += '<li class="' + x.type +
                    '"><div class="left">' + x.date +
                    '</div><div class="desc"><div>' + x.description.what + ' ' +
                    '<em>' + x.description.emphasis + '</em></div><div class="info">' +
                    x.description.info + '</div></div></li>';
            });
        });
}

function work() {
    let h = document.getElementById('work-block');
    pull('contents/work.json')
        .then(function (response) {
            document.getElementsByClassName('loading')[1].classList.add('hide');
            response.data.forEach(function (x) {
                h.innerHTML += '<li class="' + x.type +
                    '"><div class="left">' + x.date +
                    '</div><div class="desc"><div>' + x.description.what + ' ' +
                    '<em>' + x.description.emphasis + '</em></div><div class="info">' +
                    x.description.info + '</div></div></li>';
            });
        });
}

function internship() {
    let h = document.getElementById('internship-block');
    pull('contents/internship.json')
        .then(function (response) {
            document.getElementsByClassName('loading')[2].classList.add('hide');
            response.data.forEach(function (x) {
                h.innerHTML += '<li class="' + x.type +
                    '"><div class="left">' + x.date +
                    '</div><div class="desc"><div>' + x.description.what + ' ' +
                    '<em>' + x.description.emphasis + '</em></div><div class="info">' +
                    x.description.info + '</div></div></li>';
            });
        });
}

function courses() {
    let h = document.getElementById('courses-block');
    pull('contents/courses.json')
        .then(function (response) {
            document.getElementsByClassName('loading')[3].classList.add('hide');
            response.data.forEach(function (x) {
                h.innerHTML += '<li class="' + x.type +
                    '"><div class="left">' + x.date +
                    '</div><div class="desc"><div>' + x.description.what + ' ' +
                    '<em>' + x.description.emphasis + '</em></div><div class="info">' +
                    x.description.info + '</div></div></li>';
            });
        });
}

function hobbies() {
    let h = document.getElementById('hobbies-block');
    pull('contents/hobbies.json')
        .then(function (response) {
            document.getElementsByClassName('loading')[4].classList.add('hide');
            console.log(JSON.stringify(response.data));
            response.data.forEach(function (x) {
                // h.innerHTML += '<li class="' + x.type +
                //     '"><div class="desc"><div>' + x.description.what + ' ' +
                //     '<em>' + x.description.emphasis + '</em></div><div class="info">' +
                //     x.description.info + '</div></div></li>';

                h.innerHTML += '<li class="' + x.type +
                    '"><div class="desc"><div>' + x.description.title + ' ' +
                    '<img class="photo" src="' + x.description.photo + '"></div></li>'
                console.log(h.innerHTML);
            });
        });
}

// generate projects section
function projects(articles) {
    let p = document.getElementById('projects-block');
    document.getElementsByClassName('loading')[5].classList.add('hide');
    articles.forEach(function (item) {
        p.innerHTML += '<li><a href="' + item.url + '">' + item.title + '</a></li>';
    });
}

function setRandomPhoto() {
    let num = Math.floor(Math.random() * 3) + 1;
    document.getElementById('picture').src = `img/photos/photo_${num}.jpg`;
}

// first 5 projects articles
function pressVars() {
    let recent = [];

    pull('contents/projects.json')
        .then(function (response) {
            for (let i = 0; i < 20; i++) {
                if (response.data[i]) {
                    recent[i] = response.data[i];
                }
            }
        })
        .then(function () {
            projects(recent);
        });
}

// get all the contents
(function () {
    window.addEventListener('load', function () {

        education();
        work();
        internship();
        courses();
        hobbies();

        pressVars();
        navigation('click');

        //setModeEventListener();
        setBioEventListener();

        setRandomPhoto();

        setInterval(() => {
            setRandomPhoto();
        }, 2500);

    }, false);
})();
