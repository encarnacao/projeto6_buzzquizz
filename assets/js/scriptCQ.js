/*Telas que terão visibilidade alternada ao longo do código*/
const startScreen = document.querySelector('.comeco');
const questionScreen = document.querySelector('.perguntas');
const levelsScreen = document.querySelector(".niveis");
const endScreen = document.querySelector(".quizz-pronto");
const loadingScreen = document.querySelector(".loading");
/*Lista de perguntas e níveis*/
const questionList = document.querySelector(".perguntas ul");
const levelsList = document.querySelector(".niveis ul");
/*Modelos de pergunta e nível*/
const questionTemplate = `
<div class="campos-de-texto">
<section>
    <input type="text" autocomplete="off" class="question" placeholder="Texto da pergunta">
    <p class="error hidden">A pergunta deve ter no mínimo 20 caracteres</p>
    <input type="text" autocomplete="off" class="color" placeholder="Cor de fundo da pergunta">
    <p class="error hidden">Não é uma cor em formato válido. (#FFF000)</p>
</section>
<section>
    <h1>Resposta correta</h1>
    <div class="resposta">
        <input type="text" autocomplete="off" class="answer" placeholder="Resposta correta">
        <p class="error hidden">É necessário ter pelo menos uma resposta correta e uma incorreta</p>
        <input type="text" autocomplete="off" class="image" placeholder="Url da Imagem">
        <p class="error hidden">O valor informado não é uma URL válida</p>
    </div>
</section>
<section>
    <h1>Respostas incorretas</h1>
    <div class="resposta">
        <input type="text" autocomplete="off" class="answer" placeholder="Resposta incorreta 1">
        <p class="error hidden">É necessário ter pelo menos uma resposta correta e uma incorreta</p>
        <input type="text" autocomplete="off" class="image" placeholder="Url da Imagem 1">
        <p class="error hidden">O valor informado não é uma URL válida</p>
    </div>
    <div class="resposta">
        <input type="text" autocomplete="off" class="answer" placeholder="Resposta incorreta 2">
        <p class="error hidden">É necessário ter pelo menos uma resposta correta e uma incorreta</p>
        <input type="text" autocomplete="off" class="image" placeholder="Url da Imagem 2">
        <p class="error hidden">O valor informado não é uma URL válida</p>
    </div>
    <div class="resposta">
        <input type="text" autocomplete="off" class="answer" placeholder="Resposta incorreta 3">
        <p class="error hidden">É necessário ter pelo menos uma resposta correta e uma incorreta</p>
        <input type="text" autocomplete="off" class="image" placeholder="Url da Imagem 3">
        <p class="error hidden">O valor informado não é uma URL válida</p>
    </div>
`;
const levelTemplate = `
<div class="campos-de-texto">
    <input type="text" autocomplete="off" class="level-title" placeholder="Título do nível">
    <p class="error hidden">O título deve ter no mínimo 10 caracteres</p>
    <input type="text" autocomplete="off" class="level-percentage" placeholder="% de acerto mínima">
    <p class="error hidden">Deve ser um valor entre 0 e 100. Um nível é necessário ter valor 0</p>
    <input type="text" autocomplete="off" class="image" placeholder="URL da imagem do nível">
    <p class="error hidden">O valor informado não é uma URL válida</p>
    <textarea class="level-description" placeholder="Descrição do nível"></textarea>
    <p class="error hidden">A descrição deve ter no mínimo 30 caracteres</p>
</div>
`;
/* Variáveis globais */
let quizzQuestionNumber, quizzLevelNumber;
/* Objetos */
let quizz = {
    title: "",
    image: "",
    questions: [],
    levels: []
};

/*-------------*/

function questionObject() {
    /**
     * Função que me retorna um objeto de pergunta
     */
    return {
        title: "",
        color: "",
        answers: []
    };
}

function answerObject() {
    /**
     * Função que me retorna um objeto de resposta
     */
    return {
        text: "",
        image: "",
        isCorrectAnswer: false
    };
}

function levelObject() {
    return {
        title: "",
        image: "",
        text: "",
        minValue: 0
    }
}

function renderizeQuestions() {
    /**
     * Pega os valores digitados na tela de começo, armazena em variáveis e renderiza na tela de perguntas
     */
    if (!validateQuizzInfo()) {
        return;
    }
    const info = document.querySelector(".comeco .campos-de-texto").children;
    quizz.title = info[0].value;
    quizz.image = info[2].value;
    quizzQuestionNumber = Number(info[4].value);
    quizzLevelNumber = Number(info[6].value);
    startScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    questionList.innerHTML = "";
    for (let i = 0; i < quizzQuestionNumber; i++) {
        const question = document.createElement("li");
        let title;
        if (i == 0) {
            title = `
            <div class="titulo hide-icon">
                <h1>Pergunta 1</h1>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            `
            question.innerHTML = title + questionTemplate;
            question.classList.add("active");
        } else {
            title = `
            <div class="titulo">
                <h1>Pergunta ${i + 1}</h1>
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

function toggleElement() {
    const title = this.parentNode;
    const content = title.nextElementSibling;
    const list = title.parentNode.parentNode;
    const activeElement = list.querySelector(".active");
    if (activeElement != null) {
        activeElement.classList.remove("active");
        activeElement.children[1].classList.add("collapsed");
        activeElement.children[0].classList.remove("hide-icon");
    }
    title.classList.add("hide-icon");
    title.parentNode.classList.add("active");
    content.classList.remove("collapsed");
    title.scrollIntoView({ behavior: "smooth", block: "center" });
}

function pushQuestions() {
    const questions = document.querySelectorAll(".perguntas .pergunta");
    for (let i = 0; i < questions.length; i++) {
        const question = questionObject();
        question.title = questions[i].querySelector(".question").value;
        question.color = questions[i].querySelector(".color").value;
        /* 
        Uso o spread operator(qualquer coisa me perguntem) para pegar as respostas num array
        Desta forma, consigo usar o filter para pegar apenas os elementos que não estão vazios
        */
        const answers = [...questions[i].querySelectorAll(".resposta")];
        const nonEmptyAnswers = answers.filter((answer) => answer.children[0].value != "");
        if (nonEmptyAnswers.length < 2) { }; //Implementar validação depois. Preciso fazer casos de erro, pois sempre é necessário ter uma resposta correta
        for (let j = 0; j < nonEmptyAnswers.length; j++) {
            const answer = answerObject();
            answer.text = nonEmptyAnswers[j].children[0].value;
            answer.image = nonEmptyAnswers[j].children[2].value;
            if (j == 0) {
                answer.isCorrectAnswer = true;
            }
            question.answers.push(answer);
        }
        quizz.questions.push(question);
    }
}

function renderizeLevels() {
    if (!validateQuestions()) {
        return;
    }
    pushQuestions();
    console.log(quizz);
    questionScreen.classList.add("hidden");
    levelsScreen.classList.remove("hidden");
    levelsList.innerHTML = "";
    for (let i = 0; i < quizzLevelNumber; i++) {
        const level = document.createElement("li");
        let title;
        if (i == 0) {
            title = `
            <div class="titulo hide-icon">
                <h1>Nivel 1</h1>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            `
            level.innerHTML = title + levelTemplate;
            level.classList.add("active");
        } else {
            title = `
            <div class="titulo">
                <h1>Nivel ${i + 1}</h1>
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

function pushLevels() {
    const levels = document.querySelectorAll(".nivel");
    for (let i = 0; i < levels.length; i++) {
        const level = levelObject();
        level.title = levels[i].querySelector(".level-title").value;
        level.image = levels[i].querySelector(".image").value;
        level.text = levels[i].querySelector(".level-description").value;
        level.minValue = levels[i].querySelector(".level-percentage").value;
        quizz.levels.push(level);
    }
}

function endQuizz(response) {
    if(localStorage.getItem("quizzes") == null){
        localStorage.setItem("quizzes", JSON.stringify([]));
    }
    const quizzes = JSON.parse(localStorage.getItem("quizzes"));
    quizz = response.data;
    quizzes.push(quizz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    loadingScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    const quizzCard = endScreen.querySelector(".quizz-image");
    quizzCard.innerHTML = `
        <div class="titulo-quizz">
            ${quizz.title}
        </div>
    `
    quizzCard.style.backgroundImage = `url(${quizz.image})`;
}

function goToQuizz() {
    window.location.href = `quizz.html?id=${quizz.id}`;
}

function pushQuizz(){
    if (!validateLevels()) {
        return;
    }
    pushLevels();
    levelsScreen.classList.add("hidden");
    loadingScreen.classList.remove("hidden");
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizz);
    promise.then(endQuizz);
    promise.catch((error) => {
        alert("Erro ao criar quizz");
        console.log(error);
    });
}

/* Validação */
//Procurei como validar URLs e encontrei essa função. Não sei se é a melhor forma, mas funciona
const isValidUrl = urlString => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

//Essa aqui eu procurei sobre RegExp (regular expression) e eu acho que entendi o suficiente pra criar. É o suficiente pra sabermos que a cor é valida, tanto no formato quanto no tamanho.
const validHexColor = (color) => {
    const hexPattern = new RegExp("^#([A-Fa-f0-9]{6})$");
    return hexPattern.test(color);
}

function validQuizzTitle(title) {
    const minChar = 20, maxChar = 65;
    if (title.value.length < minChar || title.length > maxChar) {
        return false;
    }
    return true;
}

function validLevelTitle(title) {
    const minChar = 10;
    if (title.value.length < minChar) {
        return false;
    }
    return true;
}

function validQuestion(question) {
    const minChar = 20;
    if (question.value.length < minChar) {
        return false;
    }
    return true;
}

function validQuestionNumber(questions) {
    const minNumber = 3;
    if (questions.value < minNumber || isNaN(questions.value)) {
        return false;
    }
    return true;
}

function validLevelNumber(levels) {
    const minNumber = 2;
    if (levels.value < minNumber || isNaN(levels.value)) {
        return false;
    }
    return true;
}

function errorFound(element) {
    element.classList.add("input-error");
    element.nextElementSibling.classList.remove("hidden");
}

function errorFixed(element) {
    element.classList.remove("input-error");
    element.nextElementSibling.classList.add("hidden");
}

function checkError(validation, element) {
    if (!validation) {
        errorFound(element);
    } else if (validation && element.classList.contains("input-error")) {
        errorFixed(element);
    }
}

function validateQuizzInfo() {
    const title = document.querySelector("#title");
    const image = document.querySelector("#image");
    const questions = document.querySelector("#questions");
    const levels = document.querySelector("#levels");
    checkError(validQuizzTitle(title), title);
    checkError(isValidUrl(image.value), image);
    checkError(validQuestionNumber(questions), questions);
    checkError(validLevelNumber(levels), levels);
    const isValid = (validQuizzTitle(title) && isValidUrl(image.value) && validQuestionNumber(questions) && validLevelNumber(levels));
    return isValid;
}

function validateAnswers(answers) {
    const nonEmptyAnswers = answers.filter((answer) => answer.children[0].value != "");
    let isValid = true;
    if (nonEmptyAnswers.length < 2) {
        const emptyAnswers = answers.filter((answer) => answer.children[0].value == "");
        errorFound(emptyAnswers[0].querySelector(".answer"));
        return false;
    } else if (answers[0].children[0].value === "") {
        errorFound(answers[0].children[0]);
        isValid = false;
    }

    for (let i = 0; i < nonEmptyAnswers.length; i++) {
        const url = nonEmptyAnswers[i].querySelector(".image");
        checkError(isValidUrl(url.value), url);
        if (!isValidUrl(url.value)) {
            isValid = false;
        }
    }

    if (isValid) {
        errorFixed(answers[0].children[0]);
    }
    return isValid;
}

function validateQuestions() {
    const questions = document.querySelectorAll(".pergunta");
    let isValid = true;
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i].querySelector(".question");
        const color = questions[i].querySelector(".color");
        const answers = [...questions[i].querySelectorAll(".resposta")];
        const validAnswers = validateAnswers(answers);
        checkError(validQuestion(question), question);
        checkError(validHexColor(color.value), color);
        if (!validQuestion(question) || !validHexColor(color.value) || !validAnswers) {
            isValid = false;
            questions[i].style.border = "1px solid red";
        } else if (questions[i].style.border === "1px solid red") {
            questions[i].style.border = "none";
        }
    }
    return isValid;
}

function validPercentage(percentage) {
    const minPercentage = 0, maxPercentage = 100;
    const percent = Number(percentage.value);
    const isValid = percent >= minPercentage && percent <= maxPercentage && !isNaN(percent);
    return isValid;
}

function validatePercentage() {
    const percentages = document.querySelectorAll(".level-percentage");
    let isValid = false;
    for (let i = 0; i < percentages.length; i++) {
        if (percentages[i].value === "0") {
            isValid = true;
        }
    }
    if (!isValid) {
        Array.prototype.map.call(percentages, percentage => { errorFound(percentage) });
    } else {
        Array.prototype.map.call(percentages, percentage => { errorFixed(percentage) });
    }
    return isValid;
}

function validateDescription(description) {
    const minChar = 30;
    const isValid = description.value.length >= minChar;
    return isValid;
}

function validateLevels() {
    const levels = document.querySelectorAll(".nivel");
    let isValid = true;
    for (let i = 0; i < levels.length; i++) {
        const levelTitle = levels[i].querySelector(".level-title");
        const levelImage = levels[i].querySelector(".image");
        const levelPercentage = levels[i].querySelector(".level-percentage");
        const levelDescription = levels[i].querySelector(".level-description");
        checkError(validLevelTitle(levelTitle), levelTitle);
        checkError(isValidUrl(levelImage.value), levelImage);
        checkError(validPercentage(levelPercentage), levelPercentage);
        checkError(validateDescription(levelDescription), levelDescription);
        if (!validLevelTitle(levelTitle) || !isValidUrl(levelImage.value) || !validPercentage(levelPercentage) || !validateDescription(levelDescription)) {
            isValid = false;
            levels[i].style.border = "1px solid red";
        } else if (levels[i].style.border === "1px solid red") {
            levels[i].style.border = "none";
        }
    }
    if (isValid) {
        isValid = validatePercentage();
    }
    return isValid;
}
/* -------- */