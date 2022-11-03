/*Telas que terão visibilidade alternada ao longo do código*/
const startScreen = document.querySelector('.comeco');
const questionScreen = document.querySelector('.perguntas');
const levelsScreen = document.querySelector(".niveis");
const endScreen = document.querySelector(".quizz-pronto");
/*Lista de perguntas e níveeis*/
const questionList = document.querySelector(".perguntas ul");
const levelsList = document.querySelector(".niveis ul");
/*Modelos de pergunta e nível*/
const questionTemplate = `
<div class="campos-de-texto">
<section>
    <input type="text" autocomplete="off" class="question" placeholder="Texto da pergunta">
    <input type="text" autocomplete="off" class="color" placeholder="Cor de fundo da pergunta">
</section>
<section>
    <h1>Resposta correta</h1>
    <div class="resposta">
        <input type="text" autocomplete="off" class="answer" placeholder="Resposta correta">
        <input type="text" autocomplete="off" class="image" placeholder="Url da Imagem">
    </div>
</section>
<section>
    <h1>Respostas incorretas</h1>
    <div class="resposta">
        <input type="text" autocomplete="off" class="answer" placeholder="Resposta incorreta 1">
        <input type="text" autocomplete="off" class="image" placeholder="Url da Imagem 1">
    </div>
    <div class="resposta">
        <input type="text" autocomplete="off" class="answer" placeholder="Resposta incorreta 2">
        <input type="text" autocomplete="off" class="image" placeholder="Url da Imagem 2">
    </div>
    <div class="resposta">
        <input type="text" autocomplete="off" class="answer" placeholder="Resposta incorreta 3">
        <input type="text" autocomplete="off" class="image" placeholder="Url da Imagem 3">
    </div>
`;
const levelTemplate = `
<div class="campos-de-texto">
    <input type="text" autocomplete="off" class="level-title" placeholder="Título do nível">
    <input type="text" autocomplete="off" class="level-percentage" placeholder="% de acerto mínima">
    <input type="text" autocomplete="off" class="level-image" placeholder="URL da imagem do nível">
    <textarea class="level-description" placeholder="Descrição do nível"></textarea>
</div>
`;
/* Variáveis globais */
let quizzQuestionNumber, quizzLevelNumber;
/* Objetos */
let quizz={
    title: "",
    image: "",
    questions: [],
    levels: []
};

/*-------------*/

function questionObject(){
    /**
     * Função que me retorna um objeto de pergunta
     */
    return {
        title: "",
        color: "",
        answers: []
    };
}

function answerObject(){
    /**
     * Função que me retorna um objeto de resposta
     */
    return {
        text: "",
        image: "",
        isCorrectAnswer: false
    };
}

function levelObject(){
    return {
        title: "",
        image: "",
        text: "",
        minValue: 0
    }
}

function renderizeQuestions(){
    /**
     * Pega os valores digitados na tela de começo, armazena em variáveis e renderiza na tela de perguntas
     */
    const info =  document.querySelector(".comeco .campos-de-texto").children;
    //Implementar validação depois
    quizz.title = info[0].value;
    quizz.image = info[1].value;
    quizzQuestionNumber = Number(info[2].value);
    quizzLevelNumber = Number(info[3].value);
    startScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    questionList.innerHTML = "";
    for(let i=0; i<quizzQuestionNumber; i++){
        const question = document.createElement("li");
        let title;
        if(i == 0){
            title = `
            <div class="titulo hide-icon">
                <h1>Pergunta 1</h1>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            `
            question.innerHTML = title + questionTemplate;
            question.classList.add("active");
        } else{
            title = `
            <div class="titulo">
                <h1>Pergunta ${i+1}</h1>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            `
            question.innerHTML = title + questionTemplate;
            question.children[1].classList.add("collapsed");
        }
        question.classList.add("pergunta");
        questionList.appendChild(question);
        const ionIcon = question.querySelector("ion-icon");
        ionIcon.addEventListener("click", toggleElement);
    }
}

function toggleElement(){
    const title = this.parentNode;
    const content = title.nextElementSibling;
    const list = title.parentNode.parentNode;
    const activeElement = list.querySelector(".active");
    if(activeElement != null){
        activeElement.classList.remove("active");
        activeElement.children[1].classList.add("collapsed");
        activeElement.children[0].classList.remove("hide-icon");
    }
    title.classList.add("hide-icon");
    title.parentNode.classList.add("active");
    content.classList.remove("collapsed");
    title.scrollIntoView({behavior: "smooth", block: "center"});
}

function pushQuestions(){
    const questions = document.querySelectorAll(".perguntas .pergunta");
    for(let i=0; i<questions.length; i++){
        const question = questionObject();
        question.title = questions[i].querySelector(".question").value;
        question.color = questions[i].querySelector(".color").value;
        /* 
        Uso o spread operator(qualquer coisa me perguntem) para pegar as respostas num array
        Desta forma, consigo usar o filter para pegar apenas os elementos que não estão vazios
        */
        const answers = [...questions[i].querySelectorAll(".resposta")];
        const nonEmptyAnswers = answers.filter((answer) => answer.children[0].value != "");
        if(nonEmptyAnswers.length < 2){}; //Implementar validação depois. Preciso fazer casos de erro, pois sempre é necessário ter uma resposta correta
        for(let j=0; j<nonEmptyAnswers.length; j++){
            const answer = answerObject();
            answer.text = nonEmptyAnswers[j].children[0].value;
            answer.image = nonEmptyAnswers[j].children[1].value;
            if(j == 0){
                answer.isCorrectAnswer = true;
            }
            question.answers.push(answer);
        }
        quizz.questions.push(question);
    }
}

function renderizeLevels(){
    pushQuestions();
    console.log(quizz);
    questionScreen.classList.add("hidden");
    levelsScreen.classList.remove("hidden");
    levelsList.innerHTML = "";
    for(let i=0; i<quizzLevelNumber; i++){
        const level = document.createElement("li");
        let title;
        if(i == 0){
            title = `
            <div class="titulo hide-icon">
                <h1>Nivel 1</h1>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            `
            level.innerHTML = title + levelTemplate;
            level.classList.add("active");
        } else{
            title = `
            <div class="titulo">
                <h1>Nivel ${i+1}</h1>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            `
            level.innerHTML = title + levelTemplate;
            level.children[1].classList.add("collapsed");
        }
        level.classList.add("nivel");
        levelsList.appendChild(level);
        const ionIcon = level.querySelector("ion-icon");
        ionIcon.addEventListener("click", toggleElement);

    }
}

function pushLevels(){
    const levels = document.querySelectorAll(".nivel");
    for(let i=0; i<levels.length; i++){
        const level = levelObject();
        level.title = levels[i].querySelector(".level-title").value;
        level.image = levels[i].querySelector(".level-image").value;
        level.text = levels[i].querySelector(".level-description").value;
        level.minValue = levels[i].querySelector(".level-min-value").value;
        quizz.levels.push(level);
    }
}

function endQuizz(){
    pushLevels();
    console.log(quizz);
    levelsScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    const quizzCard = endScreen.querySelector(".quizz-image");
    quizzCard.innerHTML = `
        <img src="${quizz.image}">
        <div class="titulo-quizz">
            ${quizz.title}
        </div>
    `

}

function goToQuizz(){
    /**
     * A ser implementada
     */
    alert(quizz);
}
