const feed = document.querySelector('.view')
const loading = document.querySelector('.loading');
const container = document.querySelector('.container');
//let userCreatedQuizzId = JSON.parse(localStorage.getItem("quizzes"))
let localQuizzes = localStorage.getItem("quizzes");
let quizzes;
let id;

init();

function init() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(pullquizzes);
    promise.catch((error) => {
        alert(error);
        window.location.reload();
    });
}

function pullquizzes(promise) {
    quizzes = promise.data;
    renderizeQuizzes();
    loading.classList.add("hidden");
    container.classList.remove("hidden");
}

function renderizeQuizzes() {
    feed.innerHTML = "";
    for (let i = 0; i < quizzes.length; i++) {
        //console.log(quizzes[i]); //printa quizz por quizz
        feed.innerHTML += `<div class="quizz-image box" id="${quizzes[i].id}" onclick="goToQuizz(this)">
                                <p class="titulo-quizz">${quizzes[i].title}</p>
                                <div class="edit-delete">
                                    <ion-icon name="create-outline" onclick="deleteQuizz()"></ion-icon>
                                    <ion-icon name="trash" onclick="deleteQuizz()"></ion-icon>
                                </div>
                            </div>`;
        feed.children[i].style.backgroundImage = `url(${quizzes[i].image})`;
    }
    SyncLayout();
}

function goToQuizz(quizz) {
    id = quizz.getAttribute("id");
    console.log(id);
    window.location.href = 'quizz.html?id=' + id;
}

function SyncLayout() {
    /*se não tiver quizz add hidden em seus quizzes*/
    // if (localQuizzes === null) {
    //     withQuizz.classList.add("hidden");
    //     alert();
    // } /* senão add none em add hidden em criar quizz*/
    // else {
    //     alert();
    //     NoQuizz.classList.add("hidden");
    //     renderyourQuizzes();
    // }
}
function renderyourQuizzes() {

}

async function deleteQuizz(quizz) {
    alert();
    try {
        let options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Secret-Key": quizz.key ? quizz.key : ""
            }
        };
        let request = await fetch("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + quizz.id, options);
        if (request.ok) {
            let userQuizzes = JSON.parse(localStorage.getItem("quizzes"));
            let userQuizz = userQuizzes.filter(userQuizz => userQuizz.id === quizz.id);
            let indexOf = Array.prototype.indexOf.call(userQuizzes, userQuizz[0]);
            userQuizzes.splice(indexOf, 1);
            localStorage.setItem(myQuizzes, JSON.stringify(userQuizzes));
        }
        await renderizeQuizzes();
    } catch (error) {
        window.location.reload();
    }

}