const hashmap = new Map([
    ["green", "images/green.webp"],
    ["red", "images/red.webp"],
    ["purple", "images/purple.webp"],
    ["blue", "images/blue.webp"],
    ["white", "images/white.webp"]
])

let weaponQueue = new Set();

function addToQueue(weapon) {
    if (weaponQueue.has(weapon) || weaponQueue.size === 5) {
        return;
    }

    weaponQueue.add(weapon);

    const queueContainer = document.getElementById('weapon-queue');

    const newButton = document.createElement('button');
    newButton.className = "weapon-btn";
    newButton.id = '${weapon}';

    const weaponImg = document.createElement('img');
    weaponImg.src = hashmap.get(weapon);
    weaponImg.alt = weapon;
    
    newButton.appendChild(weaponImg);

    newButton.onclick = function() {
        weaponQueue.delete(weapon);
        newButton.remove();
    }

    queueContainer.appendChild(newButton);
}
