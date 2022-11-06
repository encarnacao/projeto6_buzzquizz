let feed = document.querySelector('.view')
let id;


init();

function init()
{
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(pullquizzes);
    promise.catch((error) => {
        alert(error);
    });
    
    /*se não tiver quizz add none em seus quizzes*/
    /* senão add none em add none em criar quizz*/
}

function pullquizzes(promise)
{
    for (let i = 0; i < promise.data.length; i++) {
        console.log(promise.data[i]); //printa quizz por quizz
        feed.innerHTML += `<button class="box quizz" id="${promise.data[i].id}" onclick="window.location.href = 'quizz.html'">
                                <p class="NameQuiz">${promise.data[i].title}</p>
                            </button>`;
        
    }
    id = document.getElementById(16899);
    id.style.background = "";
}