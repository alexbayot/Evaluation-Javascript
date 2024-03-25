let matches = document.querySelector('.matches');
let odds = document.querySelector('.odds')
let odd = document.querySelector('.odd')

//injecter les matchs à partir du fichier .json
fetch("js/datas.json")  
    .then(response => response.json())  
    .then(data => {  
        console.log(data);  
        matches.innerHTML = "";
        data.matchs.forEach(function(match) {
            let hometeam = match.hometeam;
            let awayteam = match.awayteam;
            let home_odd = match.home_odd;
            let draw_odd = match.draw_odd;
            let away_odd = match.away_odd;
            let match_id = match.match_id;
            matches.innerHTML += `<div class= "match">${hometeam} - ${awayteam}<div class="odds"><div class= "odd">${home_odd}</div><div class= "odd">${draw_odd}</div><div class= "odd">${away_odd}</div></div></div>`;
        });
         // Add event listener to each odd element
        document.querySelectorAll('.odd').forEach(odd => {
            odd.addEventListener('click', function() {
                // Add "active" class to the clicked odd element
                document.querySelectorAll('.odd').forEach(item => {
                    odd.classList.add('active');   
                });
                
                
            });
        });
    })   
    .catch(error => {    
        console.error("Erreur lors de la récupération des données :", error);  
    });
       