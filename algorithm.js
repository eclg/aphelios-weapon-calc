const optimalSet = new Set([
  "white,green,purple,blue,red",
  "green,white,purple,blue,red",
  "green,purple,blue,red,white",
  "purple,green,blue,red,white",
  "purple,blue,red,white,green",
  "blue,purple,red,white,green",
  "blue,red,white,green,purple",
  "red,blue,white,green,purple",
  "red,white,green,purple,blue",
  "white,red,green,purple,blue"
]);

function isOptimal(arr) {
    const text = arr.join(",");
    return optimalSet.has(text);
}

function bfs() {
    const text = document.getElementById("userInput").value;
    
    const inputArr = text.split(" ");
    console.log(inputArr);

    const queue = [];
    const visited = new Set();

    while (queue.length !== 0) {
        if () {}
    }
}
