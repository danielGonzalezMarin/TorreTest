class Search {
    constructor(){}

    init(){
        this.searchName();
    }

    searchName() {
        const input = document.querySelector(".input");
        input.addEventListener('keypress', (event) => {
            var searchHistory = (localStorage.searchHistory) ? JSON.parse(localStorage.searchHistory) : [];
            
            if (event.key === "Enter") {
                const val_input = input.value;
                event.preventDefault();
                searchHistory.push(val_input);
                localStorage.searchHistory = JSON.stringify(searchHistory);

                fetch(`https://torre.ai/api/suite/people/name-suggestions?query=${val_input}&offset=0&limit=20`)
                .then(response => response.json())
                .then((data) => {
                    let users = data.results;
                    var div = document.querySelector('.results');
                    div.innerHTML += `<ul class="lista">`;
                    for (let n in users) {
                        div.innerHTML += `<li class="item_name"><a class="name" href="https://torre.ai/${users[n].username}">${users[n].name}</a></li>`;
                    }
                    div.innerHTML += `</ul>`;
                });
                input.value = "";
                document.querySelector('.results').innerHTML = '';
            }
            input.addEventListener("focus", () => {
                var data = document.querySelector("datalist#searchdata");
                data.innerHTML = "";
                searchHistory.forEach((search) => {
                  data.innerHTML = "<option>" + data.innerHTML;
                  data.querySelector("option").innerText = search;
                });
            });
        });
    }
}

const search = new Search(); 
search.init();
