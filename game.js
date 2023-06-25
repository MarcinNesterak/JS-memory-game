const cardsColor = ["red", "red", "green", "green", "gray", "gray", "lightgreen", "lightgreen", "yellow", "yellow", "violet", "violet", "cadetblue", "cadetblue", "brown", "brown", "blue", "blue"];

let cards = document.querySelectorAll("div");
cards = [...cards]; //divy - 18

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;


//mini gra
const clickCard = function() {
    activeCard = this;

    //zabezpieczenie przed kliknięciem w ten sam div dwa razy
    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden");

    // pierwsze kliknięcie
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        console.log("1")
        return;
    }

    // drugie kliknięcie
    else {
        console.log('2');
        cards.forEach(card => card.removeEventListener("click", clickCard))
        activeCards[1] = activeCard;

        setTimeout(function() {
            if (activeCards[0].className === activeCards[1].className) {
                console.log('wygrana')
                activeCards.forEach(card => card.classList.add("off"))
                gameResult++;

                // zabezpieczenie przed kliknięciem w odgadnięte pary
                cards = cards.filter(card => !card.classList.contains('off'))


                if (gameResult === gamePairs) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000;
                    alert(`BRAWO. Twój czas to:  ${gameTime} sekund`);
                    location.reload()
                }
            } else {
                console.log('przegrana')
                activeCards.forEach(card => card.classList.add("hidden"))
            }

            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickCard))
        }, 1000)


    }
}

//.............................


const init = function() {
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);
    })

    setTimeout(function() {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 2000);
}

init()