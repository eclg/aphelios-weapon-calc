const optimalSet = new Set([
    "red,white,green,purple,blue",
    "white,red,green,purple,blue"
])

const optimalOrderWG = new Set([
    "white,green,purple,blue,red",
    "green,white,purple,blue,red",
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
    return 0;
}

function bfs() {
    const text = document.getElementById("userInput").value;
    
    const inputArr = text.split(" ");
    const inputStr = inputArr.join(",");

    const queue = [];
    const visited = new Set();
    const res = new Map();

    queue.push(inputStr);

    while (queue.length !== 0) {
        const currStr = queue.shift();
        if (!visited.has(currStr)) {
            const currArr = currStr.split(",");

            if (isOptimalSet(currArr) === "red white") {
                let path = [];
                let stepStr = currStr;

                while (stepStr !== undefined) {
                    const stepArr = stepStr.split(",");
                    path.push(stepArr[4]);
                    stepStr = res.get(stepStr);
                }

                path.reverse();
                path.shift();
                console.log(path);
                break;
            }

            else if (isOptimalSet(currArr) === "white green") {
                path = ["white", "green", "purple", "blue"];
                console.log(path);
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
}
