import { weaponQueue } from './script.js'

const optimalSet = new Set([
    "red,white,green,purple,blue",
    "white,red,green,purple,blue"
])

const optimalOrderWG = new Set([
    "white,green,purple,blue,red",
    "green,white,purple,blue,red",
])

const starter = new Set([
    "green,red,purple,blue,white",
    "red,green,purple,blue,white"
])

const optimalOrderPB = new Set([
    "purple,blue,red,white,green",
    "blue,purple,red,white,green"
])

const discardGreen = new Set([
    "red,purple,blue,white,green",
    "purple,red,blue,white,green"
])

function pushBack(arr, idx) {
    const temp = arr.splice(idx, 1)[0];
    arr.push(temp);
    return arr;
}

function isOptimalSet(arr) {
    const text = arr.join(",");
    if (optimalOrderWG.has(text)) {
        return "white green";
    }
    else if (optimalSet.has(text)) {
        return "red white";
    }
    else if (starter.has(text)) {
        return "starter";
    }
    else if (optimalOrderPB.has(text)) {
        return "purple blue"
    }
    else if (discardGreen.has(text)) {
        return "discard green"
    }
    return 0;
}

function showOnScreen(stepStr, path, res) {
    while (stepStr !== undefined) {
        const stepArr = stepStr.split(",");
        path.push(stepArr[4]);
        stepStr = res.get(stepStr);
    }
        path.pop();
}

function bfs() {
    const messageText = document.getElementById('messageID');
    if (weaponQueue.size !== 5) {
        messageText.textContent  = "Select All Weapons";
        return;
    }
    messageText.innerHTML = ``;
    const weaponQueueArray = [...weaponQueue];
    const inputStr = weaponQueueArray.join(",");

    const queue = [];
    const visited = new Set();
    const res = new Map();
    let path = [];

    queue.push(inputStr);

    while (queue.length !== 0) {
        const currStr = queue.shift();
        if (!visited.has(currStr)) {
            const currArr = currStr.split(",");
            let stepStr = currStr;

            if (isOptimalSet(currArr) === "red white") {
                showOnScreen(stepStr, path, res);
                break;
            }

            else if (isOptimalSet(currArr) === "white green") {
                path.push("blue", "purple", "green", "white");
                showOnScreen(stepStr, path, res);
                break;
            }

            else if (isOptimalSet(currArr) === "starter") {
                path.push("blue", "purple", "green", "red");
                showOnScreen(stepStr, path, res);
                break;
            }

            else if (isOptimalSet(currArr) === "purple blue") {
                path.push("blue", "purple");
                showOnScreen(stepStr, path, res);
                break;
            }

            else if (isOptimalSet(currArr) === "discard green") {   
                path.push("white", "blue", "purple", "red");             
                showOnScreen(stepStr, path, res);
                break;
            }

            const nextArr1 = pushBack([...currArr], 0);
            const nextStr1 = nextArr1.join(","); 
            
            if (!visited.has(nextStr1)) {
                queue.push(nextStr1);
                res.set(nextStr1, currStr);
            }

            const nextArr2 = pushBack([...currArr], 1);
            const nextStr2 = nextArr2.join(","); 
            queue.push(nextStr2);

            if (!visited.has(nextStr2)) {
                queue.push(nextStr2);
                res.set(nextStr2, currStr);
            }

            visited.add(currStr);
        }
    }

    const resultContainer = document.getElementById('result-display');
    resultContainer.innerHTML = '';

    // Note: path is in reversed order!

    for (let i = path.length - 1; i >= 0; i--) {
        const newImg = document.createElement('img');
        newImg.className = "weapon-btn";
        newImg.src = `images/${path[i]}.webp`;
        newImg.alt = path[i];
        resultContainer.appendChild(newImg);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', bfs);
    }
    else {
        console.error("calculateBtn not found!");
    }
});
