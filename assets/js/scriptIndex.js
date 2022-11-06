const feed = document.querySelector('.view');
const withQuizz = document.querySelector('.WithQuizz');
const loading = document.querySelector(".loading");
const container = document.querySelector("section");
const noQuizz = document.querySelector('.NoQuizz');
let localQuizzes = localStorage.getItem("quizzes");
let quizzes;
let id;


init();

function init() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(pullquizzes);
    promise.catch((error) => {
        alert(error);
    });

    /*se não tiver quizz add none em seus quizzes*/
    /* senão add none em add none em criar quizz*/
}

function pullquizzes(promise) {
    quizzes = promise.data;
    renderizeQuizzes();
    loading.classList.add("hidden");
    container.classList.remove("hidden");
}

function renderizeQuizzes(){
    feed.innerHTML = "";
    for (let i = 0; i < quizzes.length; i++) {
        feed.innerHTML += `<div class="quizz-image" id="${quizzes[i].id}" onclick="goToQuizz(this)">
                                <p class="titulo-quizz">${quizzes[i].title}</p>
                            </button>`;
        feed.children[i].style.backgroundImage = `url(${quizzes[i].image})`;
    }

}

function goToQuizz(quizz){
    id = quizz.getAttribute("id");
    console.log(id);
    window.location.href = 'quizz.html?id=' + id;
}

if(localQuizzes === null){
    withQuizz.classList.add("hidden");
}
else{
    noQuizz.classList.add("hidden");
}