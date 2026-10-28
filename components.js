const pages = {
    "/index.html": {
        title: "The Lysian Archive",
        active: "home-link"
    },
    "/pages/world.html": {
        title: "The World of Lysies",
        active: "world-link"
    },
    "/pages/magic.html": {
        title: "Aura",
        active: "magic-link"
    },
    "/pages/characters.html": {
        title: "Characters from the Lysian Universe",
        active: "characters-link"
    },
    "/pages/forums.html": {
        title: "Forum",
        active: "forums-link"
    },
    "/pages/community.html": {
        title: "Community",
        active: "community-link"
    },
    "/pages/login.html": {
        title: "Login",
        active: "login-link"
    }
};

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    const world = document.querySelector(".world-page-background");
    const characters = document.querySelector(".character-page-background");

    if (world) {
        world.style.backgroundPositionY = `${300 - scrollY * 0.1}px`;
    }

    if (characters) {
        characters.style.transform = `translateY(${-scrollY * 0.2}px)`;
    }
});


const button_styles = document.createElement("link");
button_styles.href = `/common-styles/buttons.css`;
button_styles.rel = "stylesheet";
document.head.appendChild(button_styles);


// CHARACTER STUFF
async function initializeCharacterCards() {
    await loadData();
    showCharacterCards();

    /* If accesed from other page 
    through an 'a' that refers to specific character*/
    if (window.location.hash) {
        const id = decodeURIComponent(window.location.hash.slice(1));
        const target = document.getElementById(id);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
            });
        }
    }
}

async function showCharacterCards() {
    const groups = new Map();

    //Get the title of each group, from all unique groups in the data
    applicationData.characters.forEach(character => {
        if (!groups.has(character.group)) {
            groups.set(character.group, []);
        }

        groups.get(character.group).push(character);
    });

    let all_cards = "";

    groups.forEach((characters, group) => {
        all_cards += `
        <section id="${group}-characters" class="main-section">
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

// MAGNIFYER FROM HERE

function initializeMagnifying() {
    // find the relevant elemetns on the page:
    // magnifier is the div contaning the image the effect should act on
    const magnifier = document.querySelector(".magnifier");
    // image selects the image element
    const image = magnifier.querySelector("img");
    // glass is the div that functions as the effect
    const glass = magnifier.querySelector(".magnifier-glass");

    const zoom = 1.5;

    // When the user mouse over the outer container of the image, 
    // the effect should apply
    magnifier.addEventListener("mousemove", (event) => {
        const rect = image.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const glassWidth = glass.offsetWidth;
        const glassHeight = glass.offsetHeight;

        glass.style.display = "block";

        glass.style.left = `${x - glassWidth / 2}px`;
        glass.style.top = `${y - glassHeight / 2}px`;

        glass.style.backgroundImage = `url('${image.src}')`;
        glass.style.backgroundSize =
            `${image.width * zoom}px ${image.height * zoom}px`;

        glass.style.backgroundPosition =
            `${glassWidth / 2 - x * zoom}px ${glassHeight / 2 - y * zoom}px`;
    });

    magnifier.addEventListener("mouseleave", () => {
        glass.style.display = "none";
    });
}



/* Component getters */
const component = {
    header: "header",
    navigationBar: "navigation_bar",
    footer: "footer",
    auraLevels: "aura_levels",
    singleCarousel: "single_carousel",
    featuredFanart: "featured_fanart",
    decoratedTitle: "decorated_title",
    login: "login",
    featuredApply: "featured_apply",
    fanartGallery: "fanart_gallery",

    //TODO:
    characters: "characters",
    forum: "forum",
    magnifier: "magnifier"
}

const styledComponents = new Set([
    "aura_levels",
    "fanart_gallery",
    "footer",
    "header",
    "login",
    "navigation_bar",
    "single_carousel",
]);

async function loadHeader() {
    await loadComponent(component.header);
    renderHeader();
}

async function loadFeaturedFanart() {
    await Promise.all([
        loadComponent(component.singleCarousel),
        loadComponent(component.decoratedTitle),
        loadComponent(component.featuredFanart),
        loadData()
    ]);

    renderFeaturedFanart(
        document.getElementById("featured"),
        document.getElementById("featured-artist"),
        applicationData.featuredFanart
    );
}

async function loadLogin() {
    await loadComponent(component.login);
    renderLogin(document.getElementById("login-container"));
}

async function loadFanart() {
    await loadComponent(component.fanartGallery);
    await loadData();
    renderFanart(
        document.getElementById("fanart-gallery"),
        applicationData.fanart
    );
}

async function loadFeaturedApply() {
    await loadComponent(component.decoratedTitle);
    await loadComponent(component.featuredApply);
    renderFeaturedSubmission(
        document.getElementById("featured-submission")
    );
}

async function loadNavigationBar() {
    await loadComponent(component.navigationBar);
    renderNavigationBar();
}

async function loadFooter() {
    await loadComponent(component.footer);
    renderFooter();
}

async function loadAuraLevels() {
    await loadComponent(component.auraLevels);
    renderAuraLevelCard();
}

async function loadForumPosts() {
    await Promise.all([
        loadComponent(component.forum),
        loadData()
    ]);

    renderForumPosts(
        document.getElementById("post-feed"),
        applicationData.posts
    );
}

/* Helper Functions */
const loadedComponents = new Map();

function loadComponent(name) {
    if (loadedComponents.has(name)) {
        return loadedComponents.get(name);
    }

    /* Some components have funtionality in their respective .js file */
    const scriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src = `/components/${name}.js`;
        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
    });

    /* Component specific styling should be fetched */
    const stylePromise = new Promise((resolve, reject) => {
        if (!styledComponents.has(name)) {
            resolve();
            return;
        }

        const style = document.createElement("link");

        style.href = `/components/${name}.css`;
        style.rel = "stylesheet";
        style.onload = resolve;
        style.onerror = reject;

        document.head.appendChild(style);
    });

    const promise = Promise.all([scriptPromise, stylePromise]);
    loadedComponents.set(name, promise);

    return promise;
}