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

function renderHeader(){
    const quizzImage = document.querySelector(".quizz-image");
    const quizzTitle = document.querySelector(".titulo-quizz");
    quizzImage.style.backgroundImage = `url(${quizz.image})`;
    quizzTitle.innerHTML = quizz.title;
}

function renderQuestions(){
    for(let i=0; i<quizz.questions.length; i++){
        const question = quizz.questions[i];
        const questionItem = document.createElement("li");
        questionItem.classList.add("question");
        questionItem.classList.add("card");
        questionItem.innerHTML = `
            <div class="question-title" style="background-color:${question.color}">
                <p>${question.title}</p>
            </div>
            <ul class="answers">
            </ul>
        `;
        questionList.appendChild(questionItem);
        renderAnswers(questionItem, question);
    }
}

function renderAnswers(questionItem, question){
    const answersList = questionItem.querySelector("ul.answers");
    const answers = question.answers;
    answers.sort(arrayScrambler);
    for(let i=0; i<answers.length; i++){
        const answer = answers[i];
        const answerItem = document.createElement("li");
        answerItem.classList.add("answer");
        answerItem.classList.add("unclicked");
        if(answer.isCorrectAnswer){
            answerItem.classList.add("correct");
        } else{
            answerItem.classList.add("wrong");
        }   
        answerItem.innerHTML = `
        <img src=${answer.image}>
        <p>${answer.text}</p>
        `;
        answerItem.setAttribute("onclick", "selectAnswer(this)");
        answersList.appendChild(answerItem);
    }
}

function arrayScrambler(){
    return 0.5 - Math.random();
}

function selectAnswer(answer){
    const questionCard = answer.parentNode.parentNode;
    const nextStep = questionCard.nextElementSibling;
    const answers = answer.parentNode.children;
    if(answer.classList.contains("correct")){
        rightAnswers++;
    }
    for(let i=0; i<answers.length; i++){
        answers[i].classList.remove("unclicked");
        answers[i].removeAttribute("onclick");
        if(answer !== answers[i]){
            answers[i].classList.add("not-selected");
        }
    }
    answered++;
    if(checkFinished()){
        renderLevel();
        setTimeout(() => {level.scrollIntoView({behavior: "smooth"});}, 1000);
    } else{
        setTimeout(()=>{nextStep.scrollIntoView({behavior: "smooth"});},2000);
    }
}