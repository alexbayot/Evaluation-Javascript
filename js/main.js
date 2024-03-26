let matches = document.querySelector('.matches');
let odds = document.querySelector('.odds')
let odd = document.querySelector('.odd')
let betsAdded = []
let yourBets = document.querySelector('.your-bets')
let yourBetsWrapper = document.querySelector('.your-bets-wrapper')
let detailBets = document.querySelector('.detail_bets')
let detailsLeft = document.querySelector('.details-left')
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
                // Toggle "active" class for the clicked odd element
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
                console.log(mise.value);
                if (thisOdd.innerHTML == odd1.innerHTML) {
                    detailsLeft.innerHTML = matchLeft
                    subtitle.innerHTML = matchHTML
                    detailsRight.innerHTML = odd1.innerHTML
                    cote.innerHTML = odd1.innerHTML
                    gain.innerHTML = parseInt(cote*mise)
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
                totalBets(matchHTML);
            });
        });
    })   
    .catch(error => {    
        console.error("Erreur lors de la récupération des données :", error);  
    });

//Add "active" divs to give total bets added to cart
function totalBets(matchHTML) {
    let activeOdds = document.querySelectorAll('.odd.active');
    if (activeOdds.length > 0) {
        detailBets.classList.remove('hidden');
        earningsWrapper.classList.remove('hidden');
        detailBets.innerHTML = detailBets.innerHTML + `<div>`+matchHTML+`</div>`;
    } else {
        detailBets.classList.add('hidden');
        earningsWrapper.classList.add('hidden');
    }
    yourBets.innerHTML = `Your bets (${activeOdds.length})`
}
totalBets(matchHTML)

//dark mode
const darkModeToggle = document.getElementById('darkModeToggle');

// Add click event listener to the dark mode toggle icon
darkModeToggle.addEventListener('click', toggleDarkMode);

// Function to toggle dark mode
function toggleDarkMode() {
    // Toggle the 'dark-mode' class on the body element
    document.body.classList.toggle('dark-mode');
}

function selectRandomImage() {
    // List of image filenames in the folder
    const imageFilenames = [
        'bg1.webp',
        'bg2.webp',
        'bg3.webp',
    ];
  
    // Choose a random index from the list of filenames
    const randomIndex = Math.floor(Math.random() * imageFilenames.length);
  
    // Get the randomly chosen image filename
    const randomImageFilename = imageFilenames[randomIndex];
  
    // Create an <img> element
    const imgElement = document.createElement('img');
  
    imgElement.src = 'images' + randomImageFilename;
  
    // Append the <img> element to a container in your HTML
    document.getElementById('image').appendChild(imgElement); 
  }
  
  // Call the function to select a random image
  selectRandomImage();

  button.addEventListener('click', function(){
    // Get the input value from the '.mise' element
    let userInput = parseFloat(document.querySelector('.mise').value);

    // Get the value of 'cote' element
    let coteValue = parseFloat(cote.innerHTML); // Assuming cote is a DOM element containing the value

    // Calculate the gain
    let calculatedGain = userInput * coteValue;

    // Display the calculated gain in the 'gain' element
    gain.innerHTML = calculatedGain + '€';
});
