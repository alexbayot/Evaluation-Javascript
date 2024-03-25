let matches = document.querySelector('.matches');
let odds = document.querySelector('.odds')
let odd = document.querySelector('.odd')
let betsAdded = []
let yourBets = document.querySelector('.your-bets')

// Inject match data from the JSON file
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
            matches.innerHTML += `<div class="match">
                                        ${hometeam} - ${awayteam}
                                        <div class="odds">
                                            <div class="odd">${home_odd}</div>
                                            <div class="odd">${draw_odd}</div>
                                            <div class="odd">${away_odd}</div>
                                        </div>
                                    </div>`;
        });
        // Add event listener to each match
        document.querySelectorAll('.match').forEach(match => {
            match.addEventListener('click', function(event) {
                // Toggle "active" class for the clicked odd element
                if (event.target.classList.contains('odd')) {
                    event.target.classList.toggle('active');
                    
                    // Update total bets count
                    totalBets();
                }
            });
        });
    })   
    .catch(error => {    
        console.error("Erreur lors de la récupération des données :", error);  
    });

//Add "active" divs to give total bets added to cart
function totalBets() {
    let activeOdds = document.querySelectorAll('.odd.active');
    yourBets.innerHTML = `Your bets (${activeOdds.length})`
}
totalBets()

       