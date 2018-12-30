const fighters = document.getElementById("fighters");
let roundCounter = 1;

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
            image.src = dogs;
            image.className = "randomFighterDog";

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
            image.src = cats;
            image.className = "randomFighterCat";

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
            chooseFighterDivRemove();
            startBattleButtonDivRemove();
            gameFightersDivRemove();
            chooseFighter();
        }
    });
}

function randomAttributes(value, number) {
    const speed = document.createElement('DIV');
    const speedValue = document.createElement('SPAN');
    const strength = document.createElement('DIV');
    const strengthValue = document.createElement('SPAN');
    const defence = document.createElement('DIV');
    const defenceValue = document.createElement('SPAN');

    speed.id = value + "Speed" + number;
    speed.textContent = "Speed: ";
    speedValue.id = value + "SpeedValue" + number;
    speedValue.textContent = randomNumber(0.4, 0).toFixed(3);

    strength.id = value + "Strength" + number;
    strength.textContent = "Strength: ";
    strengthValue.id = value + "StrengthValue" + number;
    strengthValue.textContent = randomNumber(3, 6).toFixed(1);

    defence.id = value + "Defence" + number;
    defence.textContent = "Defence: ";
    defenceValue.id = value + "DefenceValue" + number;
    defenceValue.textContent = randomNumber(2, 5).toFixed(1);

    document.getElementById(value + number).appendChild(speed);
    document.getElementById(speed.id).appendChild(speedValue);
    document.getElementById(value + number).appendChild(strength);
    document.getElementById(strength.id).appendChild(strengthValue);
    document.getElementById(value + number).appendChild(defence);
    document.getElementById(defence.id).appendChild(defenceValue);
}

function randomNumber(min, max) {
    return ((Math.random() * (max - min + 1)) + min);
}

function chooseFighter() {
    const chooseFighter = document.getElementById('chooseFighter') ? document.getElementById('chooseFighter') : document.createElement('DIV');
    const selectYourHero = document.createElement('H3');
    const fightersImg = document.getElementById("fightersImg").lastElementChild.className;
    chooseFighter.id = "chooseFighter";
    chooseFighter.className = "row";
    selectYourHero.className = "w-100 border-bottom border-dark m-3";
    selectYourHero.textContent = "Please select your HERO";
    document.getElementById('container').appendChild(chooseFighter);
    document.getElementById('chooseFighter').innerHTML = "";
    document.getElementById('chooseFighter').appendChild(selectYourHero);

    //i <= 3 --> number 3 determines how many photos will be printed after pushing "I am Ready!"
    for (let i = 1; i <= 3; i++) {
        const fighterContainer = document.getElementById('fighterContainer') ? document.getElementById('fighterContainer') : document.createElement('DIV');
        document.getElementById('chooseFighter').appendChild(fighterContainer);
        fighterContainer.id = "fighterContainer" + i;
        fighterContainer.className = "col";
        if (fightersImg === "randomFighterDog") {
            randomDog(fighterContainer, i);
        } else if (fightersImg === "randomFighterCat") {
            randomCat(fighterContainer, i);
        }
        randomAttributes("fighterContainer", i);
    }
    startBattleButton();

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
        if (value.target.tagName === "BUTTON") {
            if (document.getElementsByClassName("fighterSelected")[0]) {
                gameFighters();
            } else {
                gameFightersDivRemove();
                alert("Please select your HERO image :)");
            }
        }
    });
}

function gameFighters() {
    const gameFighters = document.getElementById('gameFighters') ? document.getElementById('gameFighters') : document.createElement('DIV');
    const battleLabel = document.createElement('H3');
    const myFighter = document.createElement('DIV');
    const myFighterImg = document.createElement('IMG');
    const myFighterHp = document.createElement('DIV');
    const myFighterHpValue = document.createElement('SPAN');
    const myFighterAttackBtn = document.createElement('BUTTON');
    const myFighterDefenceBtn = document.createElement('BUTTON');
    const versus = document.createElement('DIV');
    const versusImg = document.createElement('IMG');
    const Opponent = document.createElement('DIV');
    const OpponentImg = document.createElement('IMG');
    const OpponentHp = document.createElement('DIV');
    const OpponentHpValue = document.createElement('SPAN');
    const fighterSelected = document.getElementsByClassName("fighterSelected")[0];
    const fighterSelectedNumber = fighterSelected.id[fighterSelected.id.length - 1];
    const fightersImg = document.getElementById("fightersImg").lastElementChild.className;

    gameFighters.id = "gameFighters";
    gameFighters.className = "row";
    battleLabel.className = "w-100 border-bottom border-dark m-3";    
    battleLabel.textContent = (roundCounter++) + " round :)";
    myFighter.id = "myFighter" + fighterSelectedNumber;
    myFighter.className = "col";
    myFighterImg.src = fighterSelected.currentSrc;
    myFighterHp.id = "myFighterHp";
    myFighterHp.textContent = "HP: ";
    myFighterHpValue.id = "myFighterHpValue";
    myFighterHpValue.textContent = "100";
    myFighterAttackBtn.type = "button";
    myFighterAttackBtn.id = "myFighterAttackBtn";
    myFighterAttackBtn.textContent = "💪";
    myFighterAttackBtn.title = "Attack";
    myFighterDefenceBtn.type = "button";
    myFighterDefenceBtn.id = "myFighterDefenceBtn";
    myFighterDefenceBtn.textContent = "✋";
    myFighterDefenceBtn.title = "Defence";
    versus.id = "versus";
    versus.className = "col";
    versusImg.src = "vs.jpg";
    Opponent.id = "Opponent1";
    Opponent.className = "col";
    OpponentImg.src = (fightersImg === "randomFighterDog") ? "mice.jpeg" : "cactus.jpeg";
    OpponentHp.id = "OpponentHp";
    OpponentHp.textContent = "HP: ";
    OpponentHpValue.id = "OpponentHpValue";
    OpponentHpValue.textContent = "100";

    document.getElementById('container').appendChild(gameFighters);
    document.getElementById('gameFighters').innerHTML = "";
    document.getElementById('gameFighters').appendChild(battleLabel);
    document.getElementById('gameFighters').appendChild(myFighter);
    document.getElementById('myFighter' + fighterSelectedNumber).appendChild(myFighterImg);
    document.getElementById('myFighter' + fighterSelectedNumber).appendChild(myFighterHp);
    document.getElementById('myFighterHp').appendChild(myFighterHpValue);
    randomAttributes("myFighter", fighterSelectedNumber);
    document.getElementById("myFighterSpeedValue" + fighterSelectedNumber).textContent = document.getElementById("fighterContainerSpeedValue" + fighterSelectedNumber).textContent;
    document.getElementById("myFighterStrengthValue" + fighterSelectedNumber).textContent = document.getElementById("fighterContainerStrengthValue" + fighterSelectedNumber).textContent;
    document.getElementById("myFighterDefenceValue" + fighterSelectedNumber).textContent = document.getElementById("fighterContainerDefenceValue" + fighterSelectedNumber).textContent;
    document.getElementById('myFighter' + fighterSelectedNumber).appendChild(myFighterAttackBtn);
    document.getElementById('myFighter' + fighterSelectedNumber).appendChild(myFighterDefenceBtn);
    document.getElementById('gameFighters').appendChild(versus);
    document.getElementById('versus').appendChild(versusImg);
    document.getElementById('gameFighters').appendChild(Opponent);
    document.getElementById('Opponent1').appendChild(OpponentImg);
    document.getElementById('Opponent1').appendChild(OpponentHp);
    document.getElementById('OpponentHp').appendChild(OpponentHpValue);
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
        setTimeout( () => { gameFighters(); 
    }, 3000);
    } 
}

function opponentRandomActionbtn() {
    const action = ["Attack", "Defence"];
    randomAction = action[Math.floor(Math.random() * action.length)];
    return randomAction;
}

function double() {
    const action = [1, 1, 1, 1, 2];
    randomAction = action[Math.floor(Math.random() * action.length)];
    return randomAction;
}

function chooseFighterDivRemove() {
    if (document.getElementById('chooseFighter') !== null) {
        const chooseFighter = document.getElementById('chooseFighter');
        chooseFighter.parentNode.removeChild(chooseFighter);
    }
}

function startBattleButtonDivRemove() {
    if (document.getElementById('startBattleButton') !== null) {
        const startBattleButton = document.getElementById('startBattleButton');
        startBattleButton.parentNode.removeChild(startBattleButton);
    }
}

function gameFightersDivRemove() {
    if (document.getElementById('gameFighters') !== null) {
        const gameFighters = document.getElementById('gameFighters');
        gameFighters.parentNode.removeChild(gameFighters);
    }
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

        chooseFighterDivRemove();
        startBattleButtonDivRemove();
        gameFightersDivRemove();
        !pickHero && pickHeroButton();

    }
});