let roundCounter = 1;
let attemptCounter = 1;
let points = 0;
let userGameInformation = [];
let timeArray = [];

printFirstPage();
const userName = document.getElementById('userName');

function printFirstPage() {
    createElementDiv("userInformation", 'row col justify-content-center mt-3', '', "container");
    createElementHeader('To start the game just enter your nickName', "userInformation");
    createElementInput('text', 'userName', 'mt-4', '', 'userInformation');
    document.getElementById('userName').placeholder = "nickName";
    createElementButton('button', 'enterNickname', 'ml-2 mt-4 btn btn-outline-warning', 'Start', 'Start', 'userInformation');
}

document.getElementById('userInformation').addEventListener('click', value => {
    if (value.target.tagName === "BUTTON" && userName.value != '') {
        printingChooseGameType();
        document.getElementById('userInformation').style.display = "none";
        document.getElementById('rezultsDiv').style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const storeData = window.localStorage.getItem('userGameInformation');
    userGameInformation = JSON.parse(storeData) || [];
    if (userGameInformation.length != 0) {playerStatistics();}
});

function writeToLocalStorage() {
    const roundNumber = document.querySelector('#gameFighters h3').textContent[0];
    let battleTime = Math.abs(timeArray[1]-timeArray[0]);
    userGameInformation.unshift({
        userName: userName.value,
        roundNumber,
        battleTime
    });
    window.localStorage.setItem("userGameInformation", JSON.stringify(userGameInformation));
}

function playerStatistics() {
    userGameInformation.sort(compare);

    const table = document.getElementById('rezultsTable') || document.createElement('TABLE');
    const tr = document.createElement('tr');  
    table.id = "rezultsTable";
    table.className = 'mt-3';    
    
    createElementDiv('rezultsDiv', 'row col justify-content-center mt-5', '', 'container');
    createElementHeader('Players statistics', 'rezultsDiv');
    document.getElementById('rezultsDiv').appendChild(table);
    table.appendChild(tr);
    createElementTableElement('th', "No ", tr);
    createElementTableElement('th', "nickName ", tr);
    createElementTableElement('th', "round numbers ", tr);
    createElementTableElement('th', "battle time ", tr);

    userGameInformation.forEach((contact, index) => {
        const tr = document.createElement('tr');
        var days = Math.floor(contact.battleTime / (1000 * 60 * 60 * 24));
        var hours = Math.floor((contact.battleTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((contact.battleTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((contact.battleTime % (1000 * 60)) / 1000);

        table.appendChild(tr);
        createElementTableElement('td', index + 1 + ". ", tr);
        createElementTableElement('td', contact.userName, tr);
        createElementTableElement('td', contact.roundNumber, tr);
        createElementTableElement('td', days + 'd ' + hours + 'h ' + minutes + 'min ' + seconds + 's', tr);
    });
}

function compare(a, b) {
    if (a.roundNumber > b.roundNumber)
        return -1;
    if (a.roundNumber < b.roundNumber)
        return 1;
    return 0;
}

function timeCounter(time) {
    timeArray.unshift(time);
}

function printingChooseGameType() {
    createElementDiv("forHeader", 'row', '', "container");
    createElementHeader('Hi, ' + userName.value + ', choose your game type :)', "forHeader");
    createElementDiv("fighters", '', '', "container");

    const createForm = document.createElement('FORM');
    createForm.id = 'formForInput';
    document.getElementById('fighters').appendChild(createForm);

    createElementDiv("radioForDogs", '', '', "formForInput");
    createElementInput('radio', 'dog-mouse', '', 'chooseGameType', 'radioForDogs');
    createElementSpan('', ' Dog vs mice', 'radioForDogs');
    createElementDiv("radioForCats", '', '', "formForInput");
    createElementInput('radio', 'cat-flower', '', 'chooseGameType', 'radioForCats');
    createElementSpan('', ' Cat vs flowers', 'radioForCats');
    createElementDiv("fightersImg", '', '', "container");

    document.getElementById("fighters").addEventListener("click", event => {
        if (event.target.tagName === "INPUT") {
            const pickHero = document.getElementById("pickHero");
            const fightersImg = document.getElementById("fightersImg");
            const fighter = event.target.id;
            switch (fighter) {
                case "dog-mouse":
                    fightersImg.innerHTML = "";
                    badAss("images/jpg/mice.jpeg");
                    randomDog('fightersImg', 0);
                    break;
                case "cat-flower":
                    fightersImg.innerHTML = "";
                    badAss("images/jpg/cactus.jpeg");
                    randomCat('fightersImg', 0);
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
}

function badAss(value) {
    createElementImg("fighterBadAss", '', value, 'fightersImg');
}

function randomDog(value, number) {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(result => {
            const dogs = result.message;
           createElementImg("fighterDog" + number, "randomFighterDog", dogs, value);
        })
        .catch(err => console.log(err));
}

function randomCat(value, number) {
    fetch('https://aws.random.cat/meow')
        .then(response => response.json())
        .then(result => {
            const cats = result.file;
            createElementImg("fighterCat" + number, "randomFighterCat", cats, value);
        })
        .catch(err => console.log(err));
}

function pickHeroButton() {
    const pickHeroButton = document.getElementById('pickHeroButton') ? document.getElementById('pickHeroButton') : document.createElement('DIV');
    pickHeroButton.id = "pickHeroButton";
    pickHeroButton.innerHTML = "";

    document.getElementById('container').appendChild(pickHeroButton);
    createElementButton("button", "pickHero", "mt-3 btn btn-outline-warning", "Ok, I'm ready to pick my HERO!", "pick HERO", 'pickHeroButton');

    pickHeroButton.addEventListener("click", value => {
        if (value.target.tagName === "BUTTON") {
            removeElementDiv("chooseFighter");
            removeElementDiv("startBattleButton");
            removeElementDiv("gameFighters");
            removeElementDiv("battleLogger");
            chooseFighter();
            document.getElementById('forHeader').style.display = 'none';
            document.getElementById('fighters').style.display = 'none';
            document.getElementById('fightersImg').style.display = 'none';
            document.getElementById('pickHeroButton').style.display = 'none';
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
        if (fightersImg === "randomFighterDog") {
            randomDog('fighterContainer' + i, i);
        } else if (fightersImg === "randomFighterCat") {
            randomCat('fighterContainer' + i, i);
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
    startBattleButton.id = "startBattleButton";
    startBattleButton.innerHTML = "";

    document.getElementById('container').appendChild(startBattleButton);
    createElementButton("button", "startBattle", "mt-3 btn btn-outline-warning", "Ok, I'm ready to start my BATTLE!", "start BATTLE!", 'startBattleButton');

    startBattleButton.addEventListener("click", value => {
        roundCounter = 1;
        attemptCounter = 1;
        if (value.target.tagName === "BUTTON") {
            if (document.getElementsByClassName("fighterSelected")[0]) {
                document.getElementById('chooseFighter').style.display = "none";
                document.getElementById('startBattleButton').style.display = "none";
                gameFighters();
                removeElementDiv("battleLogger");
                let time = new Date().getTime();
                timeCounter(time);
            } else {
                removeElementDiv("gameFighters");
                removeElementDiv("battleLogger");
                alert("Please select your HERO image :)");
            }
        }
    });
}

function gameFighters() {
    const fighterSelected = document.getElementsByClassName("fighterSelected")[0];
    const fighterSelectedNumber = fighterSelected.id[fighterSelected.id.length - 1];
    const fightersImg = document.getElementById("fightersImg").lastElementChild.className;

    createElementDiv("gameFighters", "row", '', 'container');
    //document.getElementById('gameFighters').innerHTML = "";
    createElementHeader((roundCounter++) + " round :)", "gameFighters");
    createElementDiv("myFighter" + fighterSelectedNumber, "col", '', 'gameFighters');
    createElementImg('', '', fighterSelected.currentSrc, 'myFighter' + fighterSelectedNumber);
    createElementDiv("myFighterHp", '', "HP: ", 'myFighter' + fighterSelectedNumber);
    createElementSpan("myFighterHpValue", "100", 'myFighterHp');
    randomAttributes("myFighter", fighterSelectedNumber);
    document.getElementById("myFighterSpeedValue" + fighterSelectedNumber).textContent = document.getElementById("fighterContainerSpeedValue" + fighterSelectedNumber).textContent;
    document.getElementById("myFighterStrengthValue" + fighterSelectedNumber).textContent = document.getElementById("fighterContainerStrengthValue" + fighterSelectedNumber).textContent;
    document.getElementById("myFighterDefenceValue" + fighterSelectedNumber).textContent = document.getElementById("fighterContainerDefenceValue" + fighterSelectedNumber).textContent;
    createElementButton("button", "myFighterAttackBtn", 'btn btn-outline-warning mr-2 mt-2', "💪", "Attack", 'myFighter' + fighterSelectedNumber);
    createElementButton("button", "myFighterDefenceBtn", 'btn btn-outline-warning mt-2', "✋", "Defend", 'myFighter' + fighterSelectedNumber);
    createElementDiv("versus", "col", '', 'gameFighters');
    createElementImg('', '', "images/jpg/vs.jpg", 'versus');
    createElementDiv("Opponent1", "col", '', 'gameFighters');
    createElementImg('', '', (fightersImg === "randomFighterDog") ? "images/jpg/mice.jpeg" : "images/jpg/cactus.jpeg", 'Opponent1');
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
        //console.log("myFighter:", action, ", opponent:", opponentRandomAction);
        //console.log("myFighterDoubleStr:", myFighterDoubleStr, ", opponentDoubleStr:", OpponentDoubleStr);
        myFighterHp.textContent = (myFighterHpValue >= (OpponentStrength - myFighterDefenceValue).toFixed(1)) ? (myFighterHpValue - (OpponentStrength - myFighterDefenceValue)).toFixed(1) : 0;
        OpponentHp.textContent = (OpponentHpValue >= (myFighterStrength - OpponentDefenceValue1).toFixed(1)) ? (OpponentHpValue - (myFighterStrength - OpponentDefenceValue1)).toFixed(1) : 0;

    } else if (action === "Attack" && opponentRandomAction === "Defence") {
        //console.log("myFighter:", action, ", opponent:", opponentRandomAction);
        //console.log("myFighterDoubleStr:", myFighterDoubleStr, ", opponentDoubleDef:", OpponentDoubleDef);
        if ((myFighterStrengthValue * (myFighterSpeedValue + 1)) >= (OpponentDefenceValue1 * (OpponentSpeedValue1 + 1))) {
            OpponentHp.textContent = (OpponentHpValue >= (myFighterStrength - OpponentDefence).toFixed(1)) ? (OpponentHpValue - (myFighterStrength - OpponentDefence)).toFixed(1) : 0;
        } else {
            myFighterHp.textContent = (myFighterHpValue >= (OpponentDefence - myFighterStrength).toFixed(1)) ? (myFighterHpValue - (OpponentDefence - myFighterStrength)).toFixed(1) : 0;
        }

    } else if (action === "Defence" && opponentRandomAction === "Attack") {
        //console.log("myFighter:", action, ", opponent:", opponentRandomAction);
        //console.log("myFighterDoubleDef:", myFighterDoubleDef, ", opponentDoubleStr:", OpponentDoubleStr);
        if ((OpponentStrengthValue1 * (OpponentSpeedValue1 + 1)) >= (myFighterDefenceValue * (myFighterSpeedValue + 1))) {
            myFighterHp.textContent = (myFighterHpValue >= (OpponentStrength - myFighterDefence).toFixed(1)) ? (myFighterHpValue - (OpponentStrength - myFighterDefence)).toFixed(1) : 0;
        } else {
            OpponentHp.textContent = (OpponentHpValue >= (myFighterDefence - OpponentStrength).toFixed(1)) ? (OpponentHpValue - (myFighterDefence - OpponentStrength)).toFixed(1) : 0;
        }

    } else if (action === "Defence" && opponentRandomAction === "Defence") {
        //console.log("myFighter:", action, ", opponent:", opponentRandomAction);
        //console.log("myFighterDoubleDef:", myFighterDoubleDef, ", opponentDoubleDef:", OpponentDoubleDef);
        myFighterHp.textContent = (myFighterHpValue + (myFighterDefenceValue * myFighterDoubleDef)).toFixed(1);
        OpponentHp.textContent = (OpponentHpValue + (OpponentDefenceValue1 * OpponentDoubleDef)).toFixed(1);
    }

    const myFighterImgSrc = document.querySelector('#myFighter' + fighterSelectedNumber + ' img');
    const OpponentImgSrc = document.querySelector('#Opponent1 img');

    if (myFighterHp.textContent === "0") {
        myFighterImgSrc.src = "images/gif/game-over.gif";
        OpponentImgSrc.src = (OpponentImgSrc.src.match(/mice/i)) ? "images/gif/mouse-win.gif" : "images/gif/flower-win.gif";
        points = 0;
        let time = new Date().getTime();
        timeCounter(time);
        writeToLocalStorage();
    } else if (OpponentHp.textContent === "0") {
        OpponentImgSrc.src = "images/jpg/skull.jpg";
        setTimeout(() => {
            attemptCounter = 1;
            removeElementDiv("battleLogger");
            gameFighters();
            increaseAttributes();
        }, 3000);
    }

    battleLogger(action, opponentRandomAction, myFighterHpValue, OpponentHpValue, myFighterDoubleStr, myFighterDoubleDef, OpponentDoubleStr, OpponentDoubleDef, action, opponentRandomAction);
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

function increaseAttributes() {
    points = Number((points + 0.3).toFixed(1));
    const fighterSelected = document.getElementsByClassName("fighterSelected")[0];
    const fighterSelectedNumber = fighterSelected.id[fighterSelected.id.length - 1];

    createElementDiv('myFighterIncreaseButton', '', '', 'myFighter' + fighterSelectedNumber);
    createElementButton("button", "increaseMyFighterSpeed", 'btn btn-outline-warning mt-2 mr-2', "speed+", "Increase speed by 0.1", 'myFighterIncreaseButton');
    createElementButton("button", "increaseMyFighterStr", 'btn btn-outline-warning mt-2 mr-2', "str+", "Increase str by 0.1", 'myFighterIncreaseButton');
    createElementButton("button", "increaseMyFighterDef", 'btn btn-outline-warning mt-2', "def+", "Increase def by 0.1", 'myFighterIncreaseButton');
    createElementDiv('myFighterPoints', 'text-danger', 'myFighter points: ', 'myFighter' + fighterSelectedNumber);
    createElementSpan('pointsAchieved', ' ' + points, 'myFighterPoints');

    document.getElementById('myFighterIncreaseButton').addEventListener('click', value => {
        const correctButton = value.target.innerHTML;
        if (value.target.tagName === "BUTTON" && points > 0) {
            switch (correctButton) {
                case "speed+":
                    increaseAtt("fighterContainerSpeedValue", "myFighterSpeedValue", 3);
                    break;
                case "str+":
                    increaseAtt("fighterContainerStrengthValue", "myFighterStrengthValue", 1);
                    break;
                case "def+":
                    increaseAtt("fighterContainerDefenceValue", "myFighterDefenceValue", 1);
                    break;
                default:
                    console.log('Error');
            }
        }
    });
}

function increaseAtt(id1, id2, toFixedValue) {
    const fighterSelected = document.getElementsByClassName("fighterSelected")[0];
    const fighterSelectedNumber = fighterSelected.id[fighterSelected.id.length - 1];
    const value = document.getElementById(id1 + fighterSelectedNumber);
    value.textContent = (Number(value.textContent) + 0.1).toFixed(toFixedValue);
    points = Number((points - 0.1).toFixed(1));
    document.getElementById("pointsAchieved").textContent = (points > 0) ? ' ' + points : ' 0';
    document.getElementById(id2 + fighterSelectedNumber).textContent = value.textContent;
}

function battleLogger(action, opponentRandomAction, myFighterHpValue, OpponentHpValue, myFighterDoubleStr, myFighterDoubleDef, OpponentDoubleStr, OpponentDoubleDef, action, opponentRandomAction) {
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

    if (action === "Attack" && myFighterDoubleStr > 1) {
        createElementSpan('myFighterDoubleDMG', ' myFighter double DMG!', "firstAttempt");
    }
    if (action === "Defence" && myFighterDoubleDef > 1) {
        createElementSpan('myFighterDoubleDEF', ' myFighter double DEF!', "firstAttempt");
    }
    if (opponentRandomAction === "Attack" && OpponentDoubleStr > 1) {
        createElementSpan('OpponentDoubleDMG', ' opponent double DMG!', "firstAttempt");
    }
    if (opponentRandomAction === "Defence" && OpponentDoubleDef > 1) {
        createElementSpan('OpponentDoubleDEF', ' opponent double DEF!', "firstAttempt");
    }
}



// Functions for creating and deleting elements
function createElementDiv(divId, divClassName, divTextContent, elementId) {
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
    headerElement.className = "w-100 border-bottom border-secondary m-3";
    headerElement.textContent = headerTextContent;
    document.getElementById(elementId).appendChild(headerElement);
}

function createElementSpan(spanId, spanTextContent, elementId) {
    const spanElement = document.createElement('SPAN');
    spanElement.id = spanId;
    spanElement.textContent = spanTextContent;
    document.getElementById(elementId).appendChild(spanElement);
}

function createElementButton(buttonType, buttonId, buttonClassName, buttonTextContent, buttonTitle, elementId) {
    const button = document.createElement('BUTTON');
    button.type = buttonType;
    button.id = buttonId;
    button.className = buttonClassName;
    button.textContent = buttonTextContent;
    button.title = buttonTitle;
    document.getElementById(elementId).appendChild(button);
}

function createElementInput(inputType, inputId, inputClassName, inputName, elementId) {
    const createInput = document.createElement('INPUT');
    createInput.type = inputType;
    createInput.id = inputId;
    createInput.className = inputClassName;
    createInput.name = inputName;
    document.getElementById(elementId).appendChild(createInput);
}

function createElementImg(imgId, imgClassName, imgCrc, elementId) {
    const image = document.createElement('IMG');
    image.id = imgId;
    image.className = imgClassName;
    image.src = imgCrc;
    document.getElementById(elementId).appendChild(image);
}

function createElementTableElement(createElement, TableElementTextContent, elementId) {
    const TableElement = document.createElement(createElement);
    TableElement.textContent = TableElementTextContent;
    elementId.appendChild(TableElement);
}

function removeElementDiv(elementId) {
    if (document.getElementById(elementId) !== null) {
        const value = document.getElementById(elementId);
        value.parentNode.removeChild(value);
    }
}
// -------------------------------------------