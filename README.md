# BuzzQuizz

https://buzzquizz-lac.vercel.app/

# Descrição
Seu primeiro projetão será a implementação de um sistema de Quizzes em HTML, CSS e JavaScript! Nesse sistema, você será responsável por desenvolver tanto a experiência do Quiz em si, quanto as telas que permitem criar quizzes! 

Você e sua dupla construirão todo o front-end da aplicação e usarão como back-end a API que fornecemos:

# API

## Obter quizzes
Para obter todos os quizzes, faça uma requisição `GET` para a URL
```jsx
https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes
```

O servidor enviará um array de objetos como o seguinte:
```
[
	{
		id: 1,
		title: "Título do quizz",
		image: "https://http.cat/411.jpg",
		questions: [
			{
				title: "Título da pergunta 1",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false
					}
				]
			},
			{
				title: "Título da pergunta 2",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false
					}
				]
			},
			{
				title: "Título da pergunta 3",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false
					}
				]
			}
		],
		levels: [
			{
				title: "Título do nível 1",
				image: "https://http.cat/411.jpg",
				text: "Descrição do nível 1",
				minValue: 0
			},
			{
				title: "Título do nível 2",
				image: "https://http.cat/412.jpg",
				text: "Descrição do nível 2",
				minValue: 50
			}
		]
	}
]
```

## Obter um único quizz

Para buscar um único quizz, faça uma requisição `GET` para a URL
```jsx
https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ
```

substituindo `ID_DO_QUIZZ` pelo id do quizz desejado.

O servidor entregará um objeto no seguinte formato:
```
{
	id: 1,
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 2",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 3",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
}
```

## Criar quizz
Para criar um quizz, envie uma requisição `POST` para a URL
```jsx
https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes
```

enviando um objeto no seguinte formato:
```
{
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 2",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 3",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
}
```
Deve haver pelo menos 3 perguntas por quizz. Cada pergunta deve ter entre 2 e 4 respostas. Deve haver pelo menos 2 níveis por quizz.

## BÔNUS: Apagar quizz
Na criação do quizz, o servidor responde enviando um objeto que representa o quizz, com algumas informações a mais do que quando só buscamos. Ele vem com um campo `key`.

Este valor pode ser usado para apagar um quizz, fazendo com que somente quem enviou o quizz consiga apagá-lo.

Para que isso seja possível, você deve ter este valor armazenado no `localStorage` junto aos outros dados dos quizzes criados pelo usuário.

Para apagar um quizz, envie uma requisição `DELETE` para a URL
```jsx
https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ
```

substituindo `ID_DO_QUIZZ` pelo quizz que deseja remover.
**Importante:** Além disso, para evitar que qualquer pessoa apague um quizz, você deve enviar a chave secreta do quizz no **cabeçalho (header)** da requisição.

*Uai, mas como faço isso!?*

Ao enviar a requisição com axios, você pode passar mais parâmetros além da URL, por exemplo **headers**. A chave secreta deve ser enviada em um **header** com nome `Secret-Key`.

*Isso não ajudou muito :(*

Um dos propósitos deste bônus é pesquisar! Procure no Google mais informações ou peça ajuda ao seu tutor/tutora :)

## BÔNUS: Editar quizz

Na criação do quizz, o servidor responde enviando um objeto que representa o quizz, com algumas informações a mais do que quando só buscamos. Ele vem com um campo `key`.

Este valor pode ser usado para editar um quizz, fazendo com que somente quem enviou o quizz consiga editá-lo.

Para que isso seja possível, você deve ter este valor armazenado no `localStorage` junto aos outros dados dos quizzes criados pelo usuário.

Para apagar um quizz, envie uma requisição `PUT` para a URL
```jsx
https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ
```

substituindo `ID_DO_QUIZZ` pelo quizz que deseja remover, enviando no corpo da requisição o objeto que representa o quizz, no mesmo formato do `POST`.

**Importante:** Além disso, para evitar que qualquer pessoa apague um quizz, você deve enviar a chave secreta do quizz no **cabeçalho (header)** da requisição.

*Uai, mas como faço isso!?*

Ao enviar a requisição com axios, você pode passar mais parâmetros além da URL e do corpo, por exemplo **headers**. A chave secreta deve ser enviada em um **header** com nome `Secret-Key`.

*Isso não ajudou muito :(*

Um dos propósitos deste bônus é pesquisar! Procure no Google mais informações ou peça ajuda ao seu tutor/tutora :)

# **Rotinas do Projetão**

- Fazer o levantamento de horas individual
    - Criar uma cópia e preencher com os seus horários individuais
        
        [Levantamento de Horas da Semana - BuzzQuizz](https://docs.google.com/spreadsheets/d/1Fu02DYMrmdIGcarpCuBodUAetw8eFbVG3WPRn3OzkOI/edit?usp=drivesdk)
        
- Escolher uma pessoa, da dupla ou trio, para criar o repositório no github.
- **Rotina 1 - Priorizar tarefas**
    
    [https://trello.com/b/aTYIT6Bm/projetão-buzzquizz](https://trello.com/b/aTYIT6Bm/projet%C3%A3o-buzzquizz)
    
    Recomendação Google Meet
    
    [https://meet.google.com/](https://meet.google.com/)

# Requisitos

- Geral
    - [ ]  Não utilize nenhuma biblioteca para implementar este projeto (jquery, lodash, etc), somente JavaScript puro (exceção: biblioteca **axios**) e também não utilize outras linguagens que traduzam para JavaScript (ClojureScript, Elm, etc)
    - [ ]  Seu projeto deverá ser desenvolvido utilizando **Git** e **GitHub. A cada requisito implementado** faça um commit com uma mensagem descritiva do que você evoluiu.
    - [ ]  Todas as telas devem ser implementadas em um único arquivo HTML. Se preferir, por organização, pode dividir seu JavaScript/CSS em múltiplos arquivos.

- Layout
    - [ ]  Aplique o layout para mobile e desktop, seguindo o Figma fornecido:
        
        [https://www.figma.com/file/nCuPD1re0r4EAwNl7OCNvz/BuzzQuizz-Turma-02?node-id=0%3A1](https://www.figma.com/file/nCuPD1re0r4EAwNl7OCNvz/BuzzQuizz-Turma-02?node-id=0%3A1)
        
    - [ ]  O layout deve alternar para versão de dispositivos móveis quando a largura da janela for inferior a 1100px

- Tela 1: Lista de Quizzes
    - [ ]  Nesta tela, devem ser listados os quizzes fornecidos pelo servidor, seguindo o layout dado
    - [ ]  A lista de quizzes do usuário deve mostrar somente seus quizzes, enquanto a lista de baixo deve mostrar todos os quizzes recebidos, sem os do usuário. Para diferenciar os quizzes do usuário dos demais, veja o requisito **Quizzes do Usuário**
    - [ ]  Os quizzes devem ser exibidos num formato retangular (conforme layout), com a imagem e título do quizz. A imagem deve estar sobreposta com um degradê de preto para transparente conforme layout. Ao clicar sobre o quizz, esta tela deve sumir e dar lugar à **Tela 2: Página de um quizz** do quizz em questão
        
        **Dica**: pesquise por como fazer degradê (gradiente) com CSS
        
    - [ ]  Ao clicar em "Criar Quizz" ou no "+" essa tela deve sumir, dando lugar à tela de **Tela 3: Criação de Quiz**

- Tela 2: Página de um quizz (perguntas)
    - [ ]  No topo do quizz, deve ser exibido um banner com a imagem e o título do quizz. A imagem deve estar escurecida com uma camada preta de 60% de opacidade.
    - [ ]  As respostas de cada pergunta devem ser exibidas organizadas aleatoriamente
    - [ ]  Ao clicar em uma resposta, as demais devem ganhar o efeito "esbranquiçado" do layout
    - [ ]  Não deve ser possível alterar a resposta após a escolha
    - [ ]  Após escolher uma resposta, o texto das opções deve ganhar a cor vermelha ou verde, conforme layout, indicando quais eram as respostas erradas e a certa
    - [ ]  Após 2 segundos de respondida, deve-se scrollar a página para a próxima pergunta

- Tela 2: Página de um quizz (fim do quizz)
    - [ ]  Após responder todas as perguntas, deve aparecer ao final da tela a caixa de resultado do quizz. Assim como na passagem das perguntas, deve-se aguardar 2 segundos após a última resposta e então scrollar a tela para exibir essa caixa de resultado
    - [ ]  A pontuação do quiz (porcentagem de acertos sobre total de perguntas) deve ser calculada no front, sem nenhuma comunicação com o servidor, bem como a classificação de em qual nível o usuário ficou baseado nessa pontuação
    - [ ]  Deverão ser exibidos o título, a imagem e a descrição do nível que o usuário ficou
    - [ ]  O score deve ser arredondado de forma a não ter casas decimais
        
        **Dica**: pesquise pelas funções `Math.ceil`, `Math.floor`, `Math.round` (e utilize a que você preferir)
        
    - [ ]  Ao clicar no botão "Reiniciar Quizz", a tela deverá ser scrollada novamente para o topo, as respostas zeradas pro estado inicial e a caixa de resultado escondida novamente
    - [ ]  Ao clicar no botão "Voltar pra home", essa tela deve sumir e dar lugar à **Tela 1: Lista de Quizzes**

- Tela 3: Criação de Quiz
    - [ ]  O processo de criar um quizz passará por 4 telas, seguindo o layout:
        - Tela 3.1: Informações básicas do quizz
        - Tela 3.2: Perguntas do quizz
        - Tela 3.3: Níveis do quizz
        - Tela 3.4: Sucesso do quizz
    - [ ]  A cada etapa, antes de avançar para a próxima tela, devem ser feitas validações nas informações inseridas, seguindo as regras abaixo:
        - Informações básicas do quizz
            - [ ]  Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres
            - [ ]  URL da Imagem: deve ter formato de URL
            - [ ]  Quantidade de perguntas: no mínimo 3 perguntas
            - [ ]  Quantidade de níveis: no mínimo 2 níveis
        - Perguntas do quizz
            - [ ]  Texto da pergunta: no mínimo 20 caracteres
            - [ ]  Cor de fundo: deve ser uma cor em hexadecimal (começar em "#", seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)
            - [ ]  Textos das respostas: não pode estar vazio
            - [ ]  URL das imagens de resposta: deve ter formato de URL
            - [ ]  É obrigatória a inserção da resposta correta e de pelo menos 1 resposta errada. Portanto, é permitido existirem perguntas com só 2 ou 3 respostas em vez de 4.
        - Níveis do quizz
            - [ ]  Título do nível: mínimo de 10 caracteres
            - [ ]  % de acerto mínima: um número entre 0 e 100
            - [ ]  URL da imagem do nível: deve ter formato de URL
            - [ ]  Descrição do nível: mínimo de 30 caracteres
            - [ ]  É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%
    - [ ]  Caso alguma validação falhe, deve ser exibida um alerta pedindo para o usuário preencher os dados corretamente. Para simplificar, não é obrigatório informar qual foi a validação que falhou.
    - [ ]  Ao finalizar a criação do quizz e salvá-lo no servidor, o usuário deverá visualizar a **Tela 3.4: Sucesso do quizz**. Nesta tela ele pode clicar no quizz (ou no botão de "Acessar Quizz") para visualizar o quizz criado (Tela 2) ou voltar pra home (Tela 1)
    - [ ]  Quando o usuário retornar pra home (seja imediatamente ou mais tarde), esta deve atualizar os quizzes listados para incluir o quizz recém-criado

- Quizzes do Usuário
    - [ ]  Ao criar um quizz no servidor, este devolverá como resposta o objeto completo do quizz criado, incluindo o id (identificador único) que o servidor gerou pra este quizz
    - [ ]  Para futuramente você conseguir diferenciar um quizz criado pelo usuário de outros quizzes, você pode armazenar esses ids no momento da criação do quizz
        
        **Dica**: para isso, você usará um recurso do JavaScript chamado Local Storage. Preparamos um artigo pra te ajudar nisso:
        
        [Artigo: como armazenar dados no computador do usuário?](https://www.notion.so/Artigo-como-armazenar-dados-no-computador-do-usu-rio-8ec86587567e432da8e03b6c201b8df9)
        
    - [ ]  Na Tela 1: Lista de Quizzes, você pode comparar o id dos quizzes vindo do servidor com esses ids armazenados na criação dos quizzes para verificar se um determinado quizz foi criado pelo usuário em questão

- Deploy
    - [ ]  Faça deploy do seu projeto utilizando **GitHub Pages**

# Bônus (opcional)

- Bônus 1: Apagar quizz
    - [ ]  Adicione um botão em cada quizz (conforme layout do Bônus 1) permitindo que o usuário apague um quizz existente
        
        **Dica:** pesquise por "axios delete" e veja a documentação que fornecemos do servidor sobre delete de quizzes
        
    - [ ]  Ao clicar no botão, deve ser exibida um janelinha de confirmação, utilizando a função `confirm` do JavaScript (pesquise por JavaScript confirm)
    - [ ]  Ao confirmar, o quizz deve ser deletado no servidor e a lista de quizzes do usuário obtida novamente
- Bônus 2: Editar quizz
    - [ ]  Adicione um botão em cada quizz (conforme layout do Bônus 1) permitindo que o usuário edite um quizz existente
        
        **Dica:** pesquise por "axios put" e veja a documentação que fornecemos do servidor sobre update de quizzes
        
    - [ ]  Ao clicar no botão de editar, o usuário deverá ser levado para um fluxo idêntico ao de criação de quizzes, porém os campos já virão preenchidos com os dados atuais do quizz, permitindo que o usuário os altere e prossiga confirme desejado. Assim como na criação, a cada etapa devem ser validados os valores que o usuário inputou
    - [ ]  Ao finalizar a edição, caso volte pra home, a lista de quizzes do usuário deve ser obtida novamente
- Bônus 3: Loadings
    - [ ]  Adicione uma tela de loading (conforme layout) em todas as interações que demandem comunicação com o servidor:
        - Carregamento da lista de quizzes
        - Carregamento de um quizz
        - Criar / deletar / editar quizz
    
    **OBS**: o ícone de loading não precisa ser igual ao do layout. Você pode gerar um ícone de loading no formato que preferir no site:
    
    [](https://loading.io/)
    
- Bônus 4: Exibir erros na validação
    - [ ]  Altere o processo de criação/edição de quizzes para que, caso haja problemas de validação nos inputs, os erros sejam indicados abaixo dos campos em que ocorreram, seguindo o layout fornecido


