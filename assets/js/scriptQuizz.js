const id = new URLSearchParams(window.location.search).get('id');
const loading = document.querySelector(".loading");
const container = document.querySelector(".container");
const questionList = document.querySelector("ul.questions");
const level = document.querySelector(".level");
console.log("id : " + id);
let quizz, totalAnswers, answered = 0, rightAnswers = 0;

function getQuizz() {
    axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + id)
        .then(renderQuizz)
        .catch(error => {
            console.log(error);
            alert("Ocorreu um erro, tente novamente mais tarde");
            window.location.href = "index.html";
        });
}

function renderQuizz(response) {
    quizz = response.data;
    totalAnswers = quizz.questions.length;
    console.log(quizz);
    loading.classList.add("hidden");
    container.classList.remove("hidden");
    questionList.innerHTML = "";
    level.innerHTML = "";
    renderHeader();
    renderQuestions();
}