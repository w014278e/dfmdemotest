if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {

    console.log('Service worker registered successfully');
  }).catch(function(err) {
    console.log('Service worker registration failed: ', err);
  });
}

const eventsContainer = document.getElementById('events');
if(eventsContainer){
    fetch("events.json")
        .then(response => {
            return response.json();
        }).then(events => {
            const eventsHTML = events.map(event => {
                return `<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
                    <div class="mdl-card__media">
                        <img class="article-image" src="${event.picture}" border="0" alt="">
                    </div>
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">${event.heading}</h2>
                    </div>
                    <div class="mdl-card__supporting-text">
                        ${event.text}
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="${event.link}" data-upgraded=",MaterialButton,MaterialRipple">Read more<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>
                    </div>
                </div>`;
            }).join("\n");
            
            eventsContainer.innerHTML = eventsHTML;
        });
}

// For second page
const newsContainer = document.getElementById('news');
if(newsContainer){
    fetch("https://newsapi.org/v1/articles?source=bbc-news&apiKey=c0d26668d2dd4049bfd66155dde340b3")
        .then(response => {
            return response.json();
        }).then(news => {
            const newsHTML = news.articles.map(article => {
                return `<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
                    <div class="mdl-card__media">
                        <img class="article-image" src="${article.urlToImage}" border="0" alt="">
                    </div>
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">${article.title}</h2>
                    </div>
                    <div class="mdl-card__supporting-text">
                        ${article.description}
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="${article.url}" data-upgraded=",MaterialButton,MaterialRipple">Read more<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>
                    </div>
                </div>`;
            }).join("\n");
            
            newsContainer.innerHTML = newsHTML;
        });
}

const askJack = document.getElementById("askJackForm");
if(askJack){
    const askJackFormSubmit = e => {
        e.preventDefault();
        const contact = {
            "name": e.target.name.value,
            "email": e.target.email.value,
            "question": e.target.question.value,
        };

        fetch("https://fi67.github.io/dfm/index.html", {mode: "no-cors", method: "POST", body: contact})
            .then(response => {
                console.log('hello response!', response);
            }).catch(() => {
                let allContacts = [];

                const existingContacts = localStorage.getItem('contact');
                if(existingContacts){
                    allContacts = JSON.parse(existingContacts);
                }

                allContacts.push(contact);
                localStorage.setItem('contact', JSON.stringify(allContacts));
            });
    };
    askJack.addEventListener('submit', askJackFormSubmit, false);
}
