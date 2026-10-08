export let weaponQueue = new Set();

function addToQueue(weapon) {
    if (weaponQueue.has(weapon) || weaponQueue.size === 5) {
        return;
    }

    weaponQueue.add(weapon);

    const queueContainer = document.getElementById('weapon-queue');

    const newButton = document.createElement('button');
    newButton.className = "weapon-btn";
    newButton.id = `${weapon}`;

    const weaponImg = document.createElement('img');
    weaponImg.src = `images/${weapon}.webp`;
    weaponImg.alt = weapon;
    
    newButton.appendChild(weaponImg);

    newButton.onclick = function() {
        weaponQueue.delete(weapon);
        newButton.remove();
        const selectorImg = document.querySelector(`.weapon-btn[data-weapon="${weapon}"] img`);
        selectorImg.style.filter = '';
    }

    queueContainer.appendChild(newButton);
}

document.querySelectorAll('.weapon-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const weapon = button.getAttribute('data-weapon');

        const img = button.querySelector('img');
        img.style.filter = 'grayscale(100%)';
        addToQueue(weapon);
    });
});