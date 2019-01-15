
windowfuntion();

function windowfuntion() { 

/*
 * Create a list that holds all of your cards
 */

    let iconArrayHolder = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
 
/* get dom */
    const scorePanel = document.getElementsByClassName("score-panel");
    const movesMade = document.querySelector(".moves");
    const restart = document.querySelector(".restart");
    const newDeck = document.querySelector(".deck");
    const starsCount = document.getElementsByClassName("stars");
    const modal = document.getElementById("idModal");
    const replayButton = document.getElementById("reStartButton"); 
    var keepCountMoves = 0;
    var passed_values_for_id_array = [];
    var keepScore = [];
    var id_check_array = [];
    var numberOfClicks = [];
    var id_check_1;
    var id_check_2;
    var placeClicked;
    var bool = true;
    var values_for_id_array = [];
    var holder_for_correct_clicks = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
    shuffleFunction();

    replayButton.addEventListener("click", function(){ resetFun(); });
    restart.addEventListener("click", resetFun);

    function resetFun() {
            stopCount();
            window.location.reload(false);
    }
    
    function shuffleFunction() {
        const shuffledCards = shuffle(iconArrayHolder);
        for (let i = 0; i < 16; i++) {
            let tagDeck = newDeck.getElementsByTagName("li");
            let tagClass = tagDeck[i].getAttribute("class");
            tagClass = tagDeck[i].removeAttribute(tagClass);
            tagClass = tagDeck[i].setAttribute("class", "card open");
            let icon = newDeck.getElementsByTagName("i");
            let iconClass = icon[i].getAttribute("class");
            iconClass = icon[i].removeAttribute(iconClass);
            iconClass = icon[i].setAttribute("class", shuffledCards[i]);
        }
    }

// Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */ 
    newDeck.addEventListener("click", cardFun, true);
    var if_clicked_correct; 
    var dbclick;  
    function cardFun(evt) {
        if_clicked_correct = false;
        
//  get click location
        placeClicked = evt.target;
// make sure click is on tiles        
        if(placeClicked.hasAttribute("id")) {
//  get the values of dom for comparison push to keep hold of values
            let clickedIcon_1 = placeClicked.getElementsByTagName("i");
            let clickedIcon_1Class = clickedIcon_1[0].getAttribute("class");
            numberOfClicks.push(clickedIcon_1Class);
            startCount();
            id_check_1 = placeClicked.getAttribute("id");
            dbclick = placeClicked.getAttribute("id");
            values_for_id_array.push(dbclick);

            forLoopFunction();    
//  first click event push to regester click and check vales off passed values   
            if(numberOfClicks.length == 1) {
                firstClick(placeClicked);   
                id_check_array.push(id_check_1);
//  second click event 
            }else if(numberOfClicks.length == 2) {
                id_check_2 = placeClicked.getAttribute("id");
                id_check_array.push(id_check_2);
                forLoopFunction();  
/* make srue can not to increment click counter by pressing on same tile get the values array at index -1 -2 for comparison only increment for false values */             
                clickLogicFunction();  
                secondClick(placeClicked);           
// compare vales form dom and array 
                if(numberOfClicks[0] == numberOfClicks[1] && (id_check_array[0] !=  id_check_2)) {
                    passed_values_for_id_array.push(id_check_array[0]);
                    passed_values_for_id_array.push(id_check_2);
// test to make sure tiles that have passed don't get clicked 
                    keepScore.push(true);
                    if(if_clicked_correct) {
                        wrongFunction(placeClicked, id_check_array);
                    }
                    holder_for_correct_clicks.push(clickedIcon_1Class);
                        
                        if(holder_for_correct_clicks.length == 8 ) {
                            callModel();
                            // winner ?
                        }
                    rightFunction(placeClicked, id_check_array);                      
                    }else{
                    wrongFunction(placeClicked, id_check_array);
                }
//  pop arrays to start from one
                var poped = numberOfClicks.pop();
                poped = numberOfClicks.pop();
                poped = id_check_array.pop();
                poped = id_check_array.pop();
                poped = [];       
            }
// end off id has atrr test            
        }
        reset_fall_wrong(placeClicked , id_check_array, passed_values_for_id_array);
    }  

    function clickLogicFunction() {
        if (numberOfClicks.length == 1) {
            if (values_for_id_array[values_for_id_array.length - 2] == values_for_id_array[values_for_id_array.length - 1]) {
            }
            else {
                clickCounterMoves();
            }
        }
        if (numberOfClicks.length == 2) {
            if (values_for_id_array[values_for_id_array.length - 2] == values_for_id_array[values_for_id_array.length - 1]) {
            }
            else {
                clickCounterMoves();
            }
        }
    }

    function forLoopFunction() {
        for (let i = 0; i < passed_values_for_id_array.length; i++) {
            if (id_check_1 == passed_values_for_id_array[i]) {
                if_clicked_correct = true;
            }else{
                if_clicked_correct = false;
            }
        }
    }

// when you call it for a value -1 for the call because you called it
    function clickCounterMoves(){
        keepCountMoves++;
        let displayMoves = document.getElementById("movesMade");
        displayMoves.innerHTML = ` ${keepCountMoves} `;
        return keepCountMoves;
    }
/* got help from https://www.w3schools.com/jsref/met_win_cleartimeout.asp  */    
    var number = 1;
    var timer;
    var timer_is_on = 0;

    function firstClick(placeClicked) { 
        let showFirstClicked = placeClicked;
        let showFirstClass = showFirstClicked.getAttribute("class");
        showFirstClass = showFirstClicked.removeAttribute(showFirstClass);
        showFirstClass = showFirstClicked.setAttribute("class", "card match show");
    }

    function secondClick(placeClicked) {
        let showSecondClicked = placeClicked;
        let showSecondClass = showSecondClicked.getAttribute("class");
        showSecondClass = showSecondClicked.removeAttribute(showSecondClass);
        showSecondClass = showSecondClicked.setAttribute("class", "card match show");
    }

    function rightFunction(placeClicked, id_check_array) {
        let rightIdElement = document.getElementById(id_check_array[0]);
        let rightIdElementClass = rightIdElement.getAttribute("class");
        let rightClicked = placeClicked;
        let rightClass = rightClicked.getAttribute("class");
        setTimeout(function(){
            rightIdElementClass = rightIdElement.removeAttribute(rightIdElementClass);
            rightIdElementClass = rightIdElement.setAttribute("class", "card open show removeClicked");  
            rightClass = rightClicked.removeAttribute(rightClass);
            rightClass = rightClicked.setAttribute("class", "card open show removeClicked");
        },1000);
    }

    function wrongFunction(placeClicked, id_check_array) {
        let wrongIdElement = document.getElementById(id_check_array[0]);
        let wrongIdElementClass = wrongIdElement.getAttribute("class");
        let wrongClicked = placeClicked;
        let wrongClass = wrongClicked.getAttribute("class");
        setTimeout(function(){        
            wrongIdElementClass = wrongIdElement.removeAttribute(wrongIdElementClass);
            wrongIdElementClass = wrongIdElement.setAttribute("class", "card open");
            wrongClass = wrongClicked.removeAttribute(wrongClass);
            wrongClass = wrongClicked.setAttribute("class", "card open");       
        },1000);    
    }

    function timedCount() {
        document.getElementById("timeSpan").innerHTML = ` TIME: ${number}`;
        timer = setTimeout(function(){ timedCount(); }, 1000);
        number++;
        removeStars();
    }

    function startCount() {
        if (!timer_is_on) {
            timer_is_on = 1;
            timedCount();
        }
    }

    function stopCount() {
        clearTimeout(timer);
        timer_is_on = 0;
    }

    function removeStars() {
        if(number  == 60) {
            let takeDown1Star = document.getElementById("firstStar");
            let takeDown1Class = takeDown1Star.getAttribute("class");
            takeDown1Class = takeDown1Star.removeAttribute(takeDown1Class);
            takeDown1Class = takeDown1Star.setAttribute("class", "fa fa-star blackStar");
        }else if(number == 120) {
            let takeDown2Star = document.getElementById("secondStar");
            let takeDown2Class = takeDown2Star.getAttribute("class");
            takeDown2Class = takeDown2Star.removeAttribute(takeDown2Class);
            takeDown2Class = takeDown2Star.setAttribute("class", "fa fa-star blackStar");    
        }
    }

    function callModel() {   
        let valueStars = "Three Stars";
        if(number > 60) {
        valueStars = "Two Stars";
        }
        if(number > 120) {
        valueStars = "One Stars";
        }
        stopCount();
        let displayScore = document.getElementById("displayModal");
        displayScore.innerHTML = `<div class="template"><h2>Congratulations, Your Score</h2><span><h3>Second's Taken <strong>${number-1}</strong></h3><h3> Number of click's <strong>${keepCountMoves}</strong></h3><h3>You Have <strong>${valueStars}</strong></h3></span></div>`;
        modal.style.display = "block";
    }

    modal.querySelector(".endGame").addEventListener("click", closeModel);

    function closeModel() {
        modal.style.display = "none";
    }

//end off widow function
}
