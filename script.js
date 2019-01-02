const fighters = document.getElementById("fighters");
let roundCounter = 1;
let attemptCounter = 1;

function badAss(value) {
    const fightersImg = document.getElementById('fightersImg');
    const image = document.createElement('IMG');
    image.id = "fighterBadAss";
    image.src = value;
    fightersImg.appendChild(image);
}

function randomDog(value, number) {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(result => {
            const dogs = result.message;
            const image = document.createElement('IMG');
            image.id = "fighterDog" + number;            
            image.className = "randomFighterDog";
            image.src = dogs;

            value.appendChild(image);
        })
        .catch(err => console.log(err));
}

function randomCat(value, number) {
    fetch('https://aws.random.cat/meow')
        .then(response => response.json())
        .then(result => {
            const cats = result.file;
            const image = document.createElement('IMG');
            image.id = "fighterCat" + number;
            image.className = "randomFighterCat";
            image.src = cats;            

            value.appendChild(image);
        })
        .catch(err => console.log(err));
}

function pickHeroButton() {
    const pickHeroButton = document.getElementById('pickHeroButton') ? document.getElementById('pickHeroButton') : document.createElement('DIV');
    const button = document.createElement('BUTTON');
    pickHeroButton.id = "pickHeroButton";
    pickHeroButton.innerHTML = "";
    button.type = "button";
    button.id = "pickHero";
    button.className = "mt-3";
    button.textContent = "Ok, I'm ready to pick my HERO!";

    document.getElementById('container').appendChild(pickHeroButton);
    pickHeroButton.appendChild(button);

    pickHeroButton.addEventListener("click", value => {
        if (value.target.tagName === "BUTTON") {
            removeElementDiv("chooseFighter");
            removeElementDiv("startBattleButton");
            removeElementDiv("gameFighters");
            removeElementDiv("battleLogger");
            chooseFighter();
        }
    });
}

function randomAttributes(value, number) {
    createElementDiv(value + "Speed" + number, '', 'Speed: ', value + number);
    createElementSpan(value + "SpeedValue" + number, randomNumber(0.4, 0).toFixed(3), value + "Speed" + number);
    createElementDiv(value + "Strength" + number, '', 'Strength: ', value + number);
    createElementSpan(value + "StrengthValue" + number, randomNumber(3, 6).toFixed(1), value + "Strength" + number);
    createElementDiv(value + "Defence" + number, '', 'Defence: ', value + number);
    createElementSpan(value + "DefenceValue" + number, randomNumber(2, 5).toFixed(1), value + "Defence" + number);
}

function randomNumber(min, max) {
    return ((Math.random() * (max - min + 1)) + min);
}

function chooseFighter() {
    const fightersImg = document.getElementById("fightersImg").lastElementChild.className;
    createElementDiv("chooseFighter", "row", '', 'container');
    createElementHeader("Please select your HERO", "chooseFighter");

    //i <= 3 --> number 3 determines how many photos will be printed after pushing "I am Ready!"
    for (let i = 1; i <= 3; i++) {
        createElementDiv("fighterContainer" + i, "col", '', 'chooseFighter');
        const fighterContainer = document.getElementById('fighterContainer' + i);
        if (fightersImg === "randomFighterDog") {
            randomDog(fighterContainer, i);
        } else if (fightersImg === "randomFighterCat") {
            randomCat(fighterContainer, i);
        }
        randomAttributes("fighterContainer", i);
    }
    startBattleButton();

    const chooseFighter = document.getElementById('chooseFighter');
    chooseFighter.addEventListener("click", value => {
        const fighterImg = document.querySelectorAll("IMG");
        if (value.target.classList[1] === "fighterSelected") {
            value.target.classList.remove("fighterSelected");
        } else if (value.target.localName === "img") {
            fighterImg.forEach(number => {
                number.classList.remove("fighterSelected");
            });
            value.target.classList.add("fighterSelected")
        }
    });
}

function startBattleButton() {
    const startBattleButton = document.getElementById('startBattleButton') ? document.getElementById('startBattleButton') : document.createElement('DIV');
    const button = document.createElement('BUTTON');
    startBattleButton.id = "startBattleButton";
    startBattleButton.innerHTML = "";
    button.type = "button";
    button.id = "startBattle";
    button.className = "mt-3";
    button.textContent = "Ok, I'm ready to start my BATTLE!";

    document.getElementById('container').appendChild(startBattleButton);
    startBattleButton.appendChild(button);

    startBattleButton.addEventListener("click", value => {
        roundCounter = 1;
        attemptCounter = 1;
        if (value.target.tagName === "BUTTON") {
            if (document.getElementsByClassName("fighterSelected")[0]) {
                document.getElementById('chooseFighter').style.display = "none";
                document.getElementById('startBattleButton').style.display = "none";
                gameFighters();
                removeElementDiv("battleLogger");
            } else {
                removeElementDiv("gameFighters");
                removeElementDiv("battleLogger");
                alert("Please select your HERO image :)");                
            }
        }
    });
}

function gameFighters() {
    const myFighterImg = document.createElement('IMG');
    const myFighterAttackBtn = document.createElement('BUTTON');
    const myFighterDefenceBtn = document.createElement('BUTTON');
    const versusImg = document.createElement('IMG');
    const OpponentImg = document.createElement('IMG');
    const fighterSelected = document.getElementsByClassName("fighterSelected")[0];
    const fighterSelectedNumber = fighterSelected.id[fighterSelected.id.length - 1];
    const fightersImg = document.getElementById("fightersImg").lastElementChild.className;

    myFighterImg.src = fighterSelected.currentSrc;
    myFighterAttackBtn.type = "button";
    myFighterAttackBtn.id = "myFighterAttackBtn";
    myFighterAttackBtn.textContent = "💪";
    myFighterAttackBtn.title = "Attack";
    myFighterDefenceBtn.type = "button";
    myFighterDefenceBtn.id = "myFighterDefenceBtn";
    myFighterDefenceBtn.textContent = "✋";
    myFighterDefenceBtn.title = "Defend";
    versusImg.src = "vs.jpg";
    OpponentImg.src = (fightersImg === "randomFighterDog") ? "mice.jpeg" : "cactus.jpeg";

    createElementDiv("gameFighters", "row", '', 'container');
    //document.getElementById('gameFighters').innerHTML = "";
    createElementHeader((roundCounter++) + " round :)", "gameFighters");
    createElementDiv("myFighter" + fighterSelectedNumber, "col", '', 'gameFighters');
    document.getElementById('myFighter' + fighterSelectedNumber).appendChild(myFighterImg);
    createElementDiv("myFighterHp", '', "HP: ", 'myFighter' + fighterSelectedNumber); 
    createElementSpan("myFighterHpValue", "100", 'myFighterHp');
    randomAttributes("myFighter", fighterSelectedNumber);
    document.getElementById("myFighterSpeedValue" + fighterSelectedNumber).textContent = document.getElementById("fighterContainerSpeedValue" + fighterSelectedNumber).textContent;
    document.getElementById("myFighterStrengthValue" + fighterSelectedNumber).textContent = document.getElementById("fighterContainerStrengthValue" + fighterSelectedNumber).textContent;
    document.getElementById("myFighterDefenceValue" + fighterSelectedNumber).textContent = document.getElementById("fighterContainerDefenceValue" + fighterSelectedNumber).textContent;
    document.getElementById('myFighter' + fighterSelectedNumber).appendChild(myFighterAttackBtn);
    document.getElementById('myFighter' + fighterSelectedNumber).appendChild(myFighterDefenceBtn);
    createElementDiv("versus", "col", '', 'gameFighters');
    document.getElementById('versus').appendChild(versusImg);
    createElementDiv("Opponent1", "col", '', 'gameFighters');
    document.getElementById('Opponent1').appendChild(OpponentImg);
    createElementDiv("OpponentHp", '', 'HP: ', 'Opponent1');
    createElementSpan("OpponentHpValue", "100", 'OpponentHp');
    randomAttributes("Opponent", "1");    

    let myFighterHpCheck = document.getElementById("myFighterHpValue");
    let OpponentHpCheck = document.getElementById("OpponentHpValue");

    document.getElementById('myFighter' + fighterSelectedNumber).addEventListener("click", value => {
        if (value.target.tagName === "BUTTON") {
            if (value.target.textContent === "💪" && myFighterHpCheck.textContent > 0 && OpponentHpCheck.textContent > 0) {
                actionButtons("Attack");
            } else if (value.target.textContent === "✋" && myFighterHpCheck.textContent > 0 && OpponentHpCheck.textContent > 0) {
                actionButtons("Defence");
            }
        }
    });
}

function actionButtons(action) {
    const fighterSelected = document.getElementsByClassName("fighterSelected")[0];
    const fighterSelectedNumber = fighterSelected.id[fighterSelected.id.length - 1];

    let myFighterHp = document.getElementById("myFighterHpValue");
    let OpponentHp = document.getElementById("OpponentHpValue");

    const myFighterHpValue = Number(myFighterHp.textContent);
    const myFighterSpeedValue = Number(document.getElementById("myFighterSpeedValue" + fighterSelectedNumber).textContent);
    const myFighterStrengthValue = Number(document.getElementById("myFighterStrengthValue" + fighterSelectedNumber).textContent);
    const myFighterDefenceValue = Number(document.getElementById("myFighterDefenceValue" + fighterSelectedNumber).textContent);

    const OpponentHpValue = Number(OpponentHp.textContent);
    const OpponentSpeedValue1 = Number(document.getElementById("OpponentSpeedValue1").textContent);
    const OpponentStrengthValue1 = Number(document.getElementById("OpponentStrengthValue1").textContent);
    const OpponentDefenceValue1 = Number(document.getElementById("OpponentDefenceValue1").textContent);

    const opponentRandomAction = opponentRandomActionbtn();
    const myFighterDoubleStr = double();
    const myFighterDoubleDef = double();
    const OpponentDoubleStr = double();
    const OpponentDoubleDef = double();

    const myFighterStrength = (myFighterStrengthValue * (myFighterSpeedValue + 1) * myFighterDoubleStr);
    const myFighterDefence = (myFighterDefenceValue * (myFighterSpeedValue + 1) * myFighterDoubleDef);
    const OpponentStrength = (OpponentStrengthValue1 * (OpponentSpeedValue1 + 1) * OpponentDoubleStr);
    const OpponentDefence = (OpponentDefenceValue1 * (OpponentSpeedValue1 + 1) * OpponentDoubleDef);

    if (action === "Attack" && opponentRandomAction === "Attack") {
        console.log("myFighter:", action, ", opponent:", opponentRandomAction);
        console.log("myFighterDoubleStr:", myFighterDoubleStr, ", opponentDoubleStr:", OpponentDoubleStr);
        myFighterHp.textContent = (myFighterHpValue >= (OpponentStrength - myFighterDefenceValue).toFixed(1)) ? (myFighterHpValue - (OpponentStrength - myFighterDefenceValue)).toFixed(1) : 0;
        OpponentHp.textContent = (OpponentHpValue >= (myFighterStrength - OpponentDefenceValue1).toFixed(1)) ? (OpponentHpValue - (myFighterStrength - OpponentDefenceValue1)).toFixed(1) : 0;

    } else if (action === "Attack" && opponentRandomAction === "Defence") {
        console.log("myFighter:", action, ", opponent:", opponentRandomAction);
        console.log("myFighterDoubleStr:", myFighterDoubleStr, ", opponentDoubleDef:", OpponentDoubleDef);
        if ((myFighterStrengthValue * (myFighterSpeedValue + 1)) >= (OpponentDefenceValue1 * (OpponentSpeedValue1 + 1))) {
            OpponentHp.textContent = (OpponentHpValue >= (myFighterStrength - OpponentDefence).toFixed(1)) ? (OpponentHpValue - (myFighterStrength - OpponentDefence)).toFixed(1) : 0;
        } else {
            myFighterHp.textContent = (myFighterHpValue >= (OpponentDefence - myFighterStrength).toFixed(1)) ? (myFighterHpValue - (OpponentDefence - myFighterStrength)).toFixed(1) : 0;
        }

    } else if (action === "Defence" && opponentRandomAction === "Attack") {
        console.log("myFighter:", action, ", opponent:", opponentRandomAction);
        console.log("myFighterDoubleDef:", myFighterDoubleDef, ", opponentDoubleStr:", OpponentDoubleStr);
        if ((OpponentStrengthValue1 * (OpponentSpeedValue1 + 1)) >= (myFighterDefenceValue * (myFighterSpeedValue + 1))) {
            myFighterHp.textContent = (myFighterHpValue >= (OpponentStrength - myFighterDefence).toFixed(1)) ? (myFighterHpValue - (OpponentStrength - myFighterDefence)).toFixed(1) : 0;
        } else {
            OpponentHp.textContent = (OpponentHpValue >= (myFighterDefence - OpponentStrength).toFixed(1)) ? (OpponentHpValue - (myFighterDefence - OpponentStrength)).toFixed(1) : 0;
        }

    } else if (action === "Defence" && opponentRandomAction === "Defence") {
        console.log("myFighter:", action, ", opponent:", opponentRandomAction);
        console.log("myFighterDoubleDef:", myFighterDoubleDef, ", opponentDoubleDef:", OpponentDoubleDef);
        myFighterHp.textContent = (myFighterHpValue + (myFighterDefenceValue * myFighterDoubleDef)).toFixed(1);
        OpponentHp.textContent = (OpponentHpValue + (OpponentDefenceValue1 * OpponentDoubleDef)).toFixed(1);
    }

    const myFighterImgSrc = document.querySelector('#myFighter' + fighterSelectedNumber + ' img');
    const OpponentImgSrc = document.querySelector('#Opponent1 img');

    if (myFighterHp.textContent === "0") {
        myFighterImgSrc.src = "game-over.gif";
        OpponentImgSrc.src = (OpponentImgSrc.src.match(/mice/i)) ? "mouse-win.gif" : "flower-win.gif";
    } else if (OpponentHp.textContent === "0") {
        OpponentImgSrc.src = "skull.jpg";
        setTimeout( () => {
            attemptCounter = 1;
            removeElementDiv("battleLogger");
            gameFighters(); 
    }, 3000);
    }

    battleLogger(action, opponentRandomAction, myFighterHpValue, OpponentHpValue, myFighterDoubleStr, myFighterDoubleDef, OpponentDoubleStr, OpponentDoubleDef);
}

function opponentRandomActionbtn() {
    const action = ["Attack", "Defence"];
    randomAction = action[Math.floor(Math.random() * action.length)];
    return randomAction;
}

function double() {
    const action = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2];
    randomAction = action[Math.floor(Math.random() * action.length)];
    return randomAction;
}

function battleLogger(action, opponentRandomAction, myFighterHpValue, OpponentHpValue, myFighterDoubleStr, myFighterDoubleDef, OpponentDoubleStr, OpponentDoubleDef) {
    let myFighterHp = document.getElementById("myFighterHpValue");
    let OpponentHp = document.getElementById("OpponentHpValue");
    const myFighterHpCheck = Number(myFighterHp.textContent);
    const OpponentHpCheck = Number(OpponentHp.textContent);
    const myFighterHpRezult = (myFighterHpCheck - myFighterHpValue).toFixed(1);
    const OpponentHpRezult = (OpponentHpCheck - OpponentHpValue).toFixed(1);

    createElementDiv("battleLogger", "row", '', 'container');
    createElementHeader("Battle Logger", "battleLogger");
    createElementDiv("firstAttempt", "col", '', 'battleLogger');
    createElementSpan('', (attemptCounter++) + " attempt || ", "firstAttempt");
    createElementSpan('myFighterAction', "myFighter->" + action + " || ", "firstAttempt");
    createElementSpan('opponentAction', "opponent->" + opponentRandomAction + " || ", "firstAttempt");
    createElementSpan('myFighterHpChange', "myFighterHP-> [" + myFighterHpRezult + "]", "firstAttempt");
    document.getElementById("myFighterHpChange").style.color = (myFighterHpRezult < 0) ? '#cc0000' : '#00cc00';
    createElementSpan('', " || ", "firstAttempt");
    createElementSpan('opponentHpChange', "opponentHP-> [" + OpponentHpRezult + "]", "firstAttempt");
    document.getElementById("opponentHpChange").style.color = (OpponentHpRezult < 0) ? '#cc0000' : '#00cc00';

    if (myFighterDoubleStr > 1) {createElementSpan('myFighterDoubleDMG', ' Your fighter generated double damage!', "firstAttempt");} 
    if (myFighterDoubleDef > 1) {createElementSpan('myFighterDoubleDEF', ' Your fighter generated double defence!', "firstAttempt");} 
    if (OpponentDoubleStr > 1) {createElementSpan('OpponentDoubleDMG', ' Your opponent generated double damage!', "firstAttempt");} 
    if (OpponentDoubleDef > 1) {createElementSpan('OpponentDoubleDEF', ' Your opponent generated double defence!', "firstAttempt");}
    
}

fighters.addEventListener("click", event => {
    if (event.target.tagName === "INPUT") {
        const pickHero = document.getElementById("pickHero");
        const fightersImg = document.getElementById("fightersImg");
        const fighter = event.target.id;
        switch (fighter) {
            case "dog-mouse":
                fightersImg.innerHTML = "";
                badAss("mice.jpeg");
                randomDog(fightersImg, 0);
                break;
            case "cat-flower":
                fightersImg.innerHTML = "";
                badAss("cactus.jpeg");
                randomCat(fightersImg, 0);
                break;
            default:
                console.log("error");
        }

        removeElementDiv("chooseFighter");
        removeElementDiv("startBattleButton");
        removeElementDiv("gameFighters");
        removeElementDiv("battleLogger");
        !pickHero && pickHeroButton();

    }
});

// Functions for creating and deleting elements
function createElementDiv(divId, divClassName, divTextContent, elementId){
    let divElement = '';
    if (elementId === "container") {
        divElement = document.getElementById(divId) ? document.getElementById(divId) : document.createElement('DIV');
    } else {
        divElement = document.createElement('DIV');
    }
    divElement.id = divId;
    divElement.className = divClassName;
    divElement.textContent = divTextContent;
    document.getElementById(elementId).appendChild(divElement);
}

function createElementHeader(headerTextContent, elementId) {
    const headerElement = document.createElement('H3');
    headerElement.className = "w-100 border-bottom border-dark m-3";
    headerElement.textContent = headerTextContent;
    document.getElementById(elementId).appendChild(headerElement);
}

function createElementSpan(spanId, spanTextContent, elementId) {
    const spanElement = document.createElement('SPAN');
    spanElement.id = spanId;
    spanElement.textContent = spanTextContent;
    document.getElementById(elementId).appendChild(spanElement);
}

function removeElementDiv(elementId) {
    if (document.getElementById(elementId) !== null) {
        const value = document.getElementById(elementId);
        value.parentNode.removeChild(value);
    }
}
// -------------------------------------------