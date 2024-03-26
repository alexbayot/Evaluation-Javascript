let matches = document.querySelector('.matches');
let odds = document.querySelector('.odds')
let odd = document.querySelector('.odd')
let betsAdded = []
let yourBets = document.querySelector('.your-bets')
let yourBetsWrapper = document.querySelector('.your-bets-wrapper')
let detailBets = document.querySelector('.detail_bets')
let subtitle  = document.querySelector('.subtitle')
let earningsWrapper = document.querySelector('.earnings-wrapper')
let matchHTML = ''
let mise = document.querySelector('.mise')
let cote = document.querySelector('.cote')
let gain = document.querySelector('.gain')
let deleteIcon = document.querySelector('.delete--icon')
let button = document.querySelector('button')

// Inject match data from the JSON file
fetch("js/datas.json")
    .then(response => response.json())
    .then(data => {
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
                if (event.target.classList.contains('active')) {
                    event.target.classList.remove('active');
                } else {
                    let children = match.querySelectorAll('.odd');
                    children.forEach(child => {
                        child.classList.remove('active');
                    });
                    if (event.target.classList.contains('odd')) {
                        event.target.classList.add('active');
                    }
                }
                //Add item to list
                let matchHTML = match.innerHTML;
                matchHTML = matchHTML.split("<")[0];
                let matchLeft = matchHTML.split("-")[0];
                let matchRight = matchHTML.split("-")[1];
                let detailsRight = document.querySelector('.details-right')
                let cote = document.querySelector('.cote');
                let thisOdd = match.querySelector('.active');
                let odd1 = match.querySelector('.odd:nth-child(1)');
                let odd2 = match.querySelector('.odd:nth-child(2)');
                let odd3 = match.querySelector('.odd:nth-child(3)');
                let detailsLeft = document.querySelector('.details-left');
                
                if (thisOdd) {
                    if (thisOdd.innerHTML == odd1.innerHTML) {
                        detailsLeft.innerHTML = matchLeft
                        subtitle.innerHTML = matchHTML
                        detailsRight.innerHTML = odd1.innerHTML
                        cote.innerHTML = odd1.innerHTML
                    } else if (thisOdd.innerHTML == odd2.innerHTML) {
                        detailsLeft.innerHTML = "Match Nul"
                        subtitle.innerHTML = matchHTML
                        detailsRight.innerHTML = odd2.innerHTML;
                        cote.innerHTML = odd2.innerHTML
                    } else if (thisOdd.innerHTML == odd3.innerHTML) {
                        detailsLeft.innerHTML = matchRight
                        subtitle.innerHTML = matchHTML
                        detailsRight.innerHTML = odd3.innerHTML;
                        cote.innerHTML = odd3.innerHTML
                    }
                }
                totalBets(matchHTML,thisOdd);
            });
        });
    })   
    .catch(error => {    
        console.error("Erreur lors de la récupération des données :", error);  
    });

//Add "active" divs to give total bets added to cart
function totalBets(matchHTML,thisOdd) {
    let activeOdds = document.querySelectorAll('.odd.active');
    if (activeOdds.length > 0) {
        detailBets.classList.remove('hidden');
        earningsWrapper.classList.remove('hidden');
        //detailBets.innerHTML = detailBets.innerHTML + <div>+matchHTML+</div>;
        detailBets.innerHTML = detailBets.innerHTML + `<div class="details-wrapper">
                   <div class="details-left">
                        <div class="subtitle">`+matchHTML+`</div>
                    </div>        
                    <div class="details-right">`+thisOdd.innerHTML+`</div>
                    <div>
                        <i class="fa-solid fa-trash-can delete-icon"></i>
                    </div>
                </div>`
    } else {
        detailBets.classList.add('hidden');
        earningsWrapper.classList.add('hidden');
    }
    yourBets.innerHTML = `Your Bets ${activeOdds.length}`
}
totalBets(matchHTML)

//dark mode + local storage
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', toggleDarkMode);
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}
document.addEventListener('DOMContentLoaded', function() {
    const darkModeEnabled = localStorage.getItem('darkMode');
    if (darkModeEnabled === 'true') {
        document.body.classList.add('dark-mode');
    }
});

//random player image

function selectRandomImage() {
    const imageFilenames = [
        'bg1.webp',
        'bg2.webp',
        'bg3.webp',
    ];
    const randomIndex = Math.floor(Math.random() * imageFilenames.length);
    const randomImageFilename = imageFilenames[randomIndex];
    const imgElement = document.createElement('img');
    imgElement.src = '/images/' + randomImageFilename;
    document.getElementById('image').appendChild(imgElement); 
  }
  selectRandomImage();

  //calculation of total potential earnings
  button.addEventListener('click', function(){
    let userInput = parseFloat(document.querySelector('.mise').value);
    let coteValue = parseFloat(cote.innerHTML);
    let calculatedGain = userInput * coteValue;

    calculatedGain = calculatedGain.toFixed(2);
    gain.innerHTML = calculatedGain + '€';
});