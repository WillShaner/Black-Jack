const firstCard = document.getElementById("playerCardOne");
const secondCard = document.getElementById("playerCardTwo");
const darkMode = document.getElementById("darkMode");
const restartButton = document.getElementById("restartButton").disabled = true;
var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;
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
    
        //creating an image
        let cardImg = document.createElement("img");
        let card = deck.pop()
        cardImg.src= "./cards/" + card + ".png"
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealerCards").append(cardImg)
    
    for(i=0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop()
        cardImg.src= "./cards/" + card + ".png"
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("yourCards").append(cardImg)
    }
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}
function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    while(dealerSum < 17) {
        //creating an image
        let cardImg = document.createElement("img");
        let card = deck.pop()
        cardImg.src= "./cards/" + card + ".png"
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealerCards").append(cardImg)
    }
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
    document.getElementById("restartButton").disabled = false;
    document.getElementById("hit").disabled = true
}

function hit() {
    let cardImg = document.createElement("img");
    let card = deck.pop()
    cardImg.src= "./cards/" + card + ".png"
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("yourCards").append(cardImg)
    if(reduceAce(yourSum, yourAceCount) >= 21) {
        document.getElementById("hit").disabled = true
        stay()
        return
    }
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