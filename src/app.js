import "bootstrap";
import "./style.css";

/* Retrieving the DOM elements that we will be using in our code. */
let cardDiv = document.querySelector(".card");
let random = document.querySelector("#random");
let differentSuit = document.querySelector("#differentSuit");
let noRepeat = document.querySelector("#noRepeat");

/* Declaring the suits, values, and deck as global variables. */
const suits = ["suitdiamonds", "suithearts", "suitclubs", "suitspades"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const deck = [];

/**
 * The Card function creates a new object with three properties: suit, value, and dealt.
 * @param suit - The suit of the card.
 * @param value - The value of the card.
 * @param dealt - a boolean value that tells us whether or not the card has been dealt.
 */
function Card(suit, value, dealt) {
  this.suit = suit;
  this.value = value;
  this.dealt = dealt;
}

/**
 * It takes an empty array and populates it with 52 Card objects
 * @param deck - an array of Card objects
 * @returns A deck of cards
 */
function populateDeck(deck) {
  for (let suit of suits) {
    for (let value of values) {
      deck.push(new Card(suit, value, false));
    }
  }
  return deck;
}

/**
 * Return a random card from the deck.
 * @param deck - an array of cards
 * @returns A random card from the deck.
 */
function randomCard(deck) {
  return deck[Math.floor(Math.random() * (deck.length - 1))];
}

/**
 * It removes the current class from the card div and adds the suit of the card that was passed in as
 * an argument
 * @param card - the card object that was passed in from the deck array
 */
function displayCard(card) {
  cardDiv.classList.remove(cardDiv.classList[1]);
  cardDiv.classList.add(card.suit);
  cardDiv.innerHTML = `<p>${card.value}</p>`;
}

/**
 * Generate a random card and display it.
 */
function generateCard() {
  displayCard(randomCard(deck));
}

/* Adding an event listener to the random button. When the button is clicked, it will call the
generateCard function. */
random.addEventListener("click", () => {
  generateCard();
});

/* Filtering the deck array to only include cards that do not have the same suit as the current card. */
differentSuit.addEventListener("click", () => {
  let filteredDeck = deck.filter(card => card.suit !== cardDiv.classList[1]);
  displayCard(randomCard(filteredDeck));
});

/* Filtering the deck array to only include cards that have not been dealt. */
noRepeat.addEventListener("click", () => {
  let filteredDeck = deck.filter(card => card.dealt !== true);
  let card = randomCard(filteredDeck);

  filteredDeck.length !== 0
    ? (displayCard(card), (card.dealt = true))
    : alert("You have shuffled the entire deck!");
});

/* Calling the populateDeck function and the generateCard function when the window loads. */
window.onload = function() {
  populateDeck(deck);
  generateCard();
};
