const firstCard = document.getElementById("playerCardOne");
const secondCard = document.getElementById("playerCardTwo");
const darkMode = document.getElementById("darkMode");
var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;
//let cardOne = deck.pop()
//let cardTwo = deck.pop()



//console.log(cardOne)

var hidden;
var deck;
var canHit = true;
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark");
    }
window.onload = function() {
    buildDeck();
    shuffleDeck();
    gameStart()

}
function gameStart() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    console.log(hidden)
    console.log(dealerSum)
    while(dealerSum < 17) {
        //creating an image
        let cardImg = document.createElement("img");
        let card = deck.pop()
        cardImg.src= "./cards/" + card + ".png"
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealerCards").append(cardImg)
        console.log(dealerSum)
    }

    for(i=0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop()
        cardImg.src= "./cards/" + card + ".png"
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("yourCards").append(cardImg)
        console.log(yourSum)
    }
    document.getElementById("hit").addEventListener("click", hit)
    document.getElementById("stay").addEventListener("click", stay)
    if(reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false
    }

}
function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    let message = "";
    if (yourSum > 21) {
        message = "YOU LOSE!"
    }
    else if(dealerSum > 21) {
        message = "YOU WIN!"
    }
    else if(yourSum == dealerSum) {
        message = "TIE!"
    }
    else if(yourSum > dealerSum) {
        message = "YOU WIN!"
    }
    else if (yourSum < dealerSum) {
        message = "YOU LOSE!"
    }
    document.getElementById("results").innerText = message;
    document.getElementById("dealerSum").innerText = dealerSum;
    document.getElementById("yourSum").innerText = yourSum;

}

function hit() {
    if(canHit == false) {
        return
    }
    let cardImg = document.createElement("img");
    let card = deck.pop()
    cardImg.src= "./cards/" + card + ".png"
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("yourCards").append(cardImg)
    console.log(yourSum)
}
function buildDeck() {
    let values = ["ace", "2", "3", "4", "5" ,"6" , "7", "8", "9", "10", "jack", "queen", "king"];
    let types = ["clubs", "diamonds", "hearts", "spades"]; 
    deck = [];

    for (i = 0; i < types.length; i++) {
        for(j = 0; j < values.length; j++) {
            deck.push(values[j] + "_" + "of" + "_" + types[i]);
        }
    }
}

function shuffleDeck() {
    for(i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length)
        let temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }

}

function getValue(card) {
    let data = card.split("_")
    let value = data[0];
    if(isNaN(value)) {
        if(value == "ace") {
            return 11;
        }
        return 10;
    
    }

    return parseInt(value)
}
function checkAce(card) {
    if(card[0] == "a") {
        return 1;
    }
    return 0;
}
function reduceAce(playerSum, playerAceCount) {
    while(playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}