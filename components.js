function getHeader() {

}

function getActiveNavigation(active_element) {
    fetch("/components/navigationbar.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("navbar").innerHTML = html;
            document.getElementById(active_element).classList.add("active");
        });
}

function getFooter() {
    fetch("/components/footer.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("footer").innerHTML = html;
        });
}

async function getCharacterCards() {
    const response = await fetch("/data/characters.json");
    const characters = await response.json();

    const groups = new Map();

    characters.characters.forEach(character => {
        if (!groups.has(character.group)) {
            groups.set(character.group, []);
        }

        groups.get(character.group).push(character);
    });

    let all_cards = "";

    groups.forEach((characters, group) => {
        all_cards += `
        <section>
            <h2>${group}</h2>
            ${characters.map(createCharacterCard).join("")}
        </section>
    `;
    });

    document.getElementById("characters-display").innerHTML = all_cards;
}

// Helper function to create the HTML for each character card
function createCharacterCard(character) {
    return `
        <article id="${character.name}-card" class="character-card">
            ${character.image ? `<img src="${character.image}" alt="${character.name}">` : ""}
            <div>
                <h3>${character.name}</h3>
                ${character.bio.map(element => `<p>${element}</p>`).join("")}
            </div>
        </article>
    `;
}
