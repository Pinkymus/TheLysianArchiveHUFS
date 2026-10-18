const applicationData = {
    characters: null,
    posts: null
};

const randomUsernames = [
    "AuraWhisperer",
    "LysianLegend",
    "SolskeldSunshine",
    "LeopoldsBiggestFan",
    "DefinitelyNotASlave",
    "TheFifthCandidate",
    "OverherreChampion",
    "SecretMindReader",
    "RunawayFromEarth",
    "KalarieKnight",
    "AuraStoneCollector",
    "TheQueensFavorite",
    "SamirsLastFlame",
    "LianKnowsEverything",
    "KatharinasChaos",
    "RoyalTeaSpiller",
    "MoonlitSorceress",
    "TinyDragonLord",
    "ChaosGoblin",
    "SleepyNecromancer",
    "WanderingMage",
    "CertifiedPotionTaster",
    "MushroomWizard",
    "DragonEggThief",
    "SuspiciouslyMagical",
    "PocketSizedVillain",
    "ProfessionalSideQuest",
    "CursedButCute",
    "TheLastSpellcaster",
    "AccidentalHero",
    "NyanCatLover3000",
    "NinjaCat2000",
    "SirMeowsALot",
    "StrawberryGremlin",
    "ToastGoblin",
    "SleepyPotato",
    "PrincessPickle",
    "FrogInDisguise",
    "MochiMonster",
    "CosmicCupcake",
    "AngryMarshmallow",
    "TinyChaosBean",
    "WaffleOverlord",
    "ProfessionalNapTaker",
    "DuckWithASword",
    "EmotionalSupportFrog",
    "SuspiciousPigeon",
    "BootyLicker69",
    "NikoSpo"
];

function generateUsername(element_id) {
    const randomIndex = Math.floor(Math.random() * randomUsernames.length);

    document.getElementById(element_id).value =
        randomUsernames[randomIndex];
}

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
        title: "Forum",
        active: "community-link"
    },
    "/pages/login.html": {
        title: "Login",
        active: "login-link"
    }
};

async function loadData() {
    const [characters, posts] = await Promise.all([
        getData("/data/characters.json"),
        getData("/data/posts.json")
    ]);

    applicationData.characters = characters.characters;
    applicationData.posts = posts.posts;
}

async function getData(path) {
    const response = await fetch(path);
    const json_result = await response.json();
    return json_result;
}

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

// CHARACTER STUFF
async function initializeCharacterCards() {
    await loadData();
    showCharacterCards();

    if (window.location.hash) {
        const id = decodeURIComponent(window.location.hash.slice(1));
        const target = document.getElementById(id);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                // block: "center"
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


// FORUM COMPONENTS

async function initializeForum() {
    await loadData();
    showForumPosts();
}

function showForumPosts() {
    const all_posts = applicationData.posts
        .map(createPost)
        .join("");

    document.getElementById("post-feed").innerHTML = all_posts;
}

function createPost(post) {
    const post_id = `post-${post.id}`;
    let all_comments = "";
    all_comments += post.comments.map(c => createComment(c, post.id)).join("<hr>");

    return `
        <article id="${post_id}" class="forum-post">
            <h2>${post.title}</h2>
            <h3>${post.poster}</h3>
            <div  class="date">${new Date(post.date).toLocaleString("en-GB")}</div>

            ${post.img ? "<img src='${post.img}'>" : ""}

            ${post.content.map(c => "<p>" + c + "</p>").join("")}
            <p class="likes">
                ${createCommentButton(post.comments.length, post_id)}
                ${createLikeButton(post.likes, post_id)}
            </p>
            <div class="forum-comment-section">
                ${all_comments}
                <form onsubmit="submitComment(event, 0)">
                    <textarea id="${post_id}-comment-field" name="comment" rows="3" placeholder="Write a comment..."></textarea>   
                    <button type="submit">Comment</button>
                </form>
            </div>
        </article>
    `
}

function createComment(comment, postid) {
    const comment_id = `comment-${postid}-${comment.id}`;

    return `
    <div id="${comment_id}" class="forum-comment">
        <h4>${comment.poster}</h4>
        <div class="date">${new Date(comment.date).toLocaleString("en-GB")}</div>
        <p>${comment.content}</p>
        <p class="likes">
            ${createLikeButton(comment.likes, comment_id)}
        </p>
    </div>
    `
}

function createLikeButton(likes, parent_id) {
    return `
    <button onClick="
        if(document.getElementById('${parent_id}').classList.contains('liked')){
            document.getElementById('${parent_id}-likes').innerHTML = ${likes};
            document.getElementById('${parent_id}').classList.remove('liked');
        } else {
            document.getElementById('${parent_id}-likes').innerHTML = (${likes} + 1);
            document.getElementById('${parent_id}').classList.add('liked');
            }
        ">
        &hearts; <span id="${parent_id}-likes">${likes}</span>
    </button>
    `
}

function createCommentButton(comments, parent_id) {
    return `
    <button onClick="
        if(document.getElementById('${parent_id}').classList.contains('show')){
            document.getElementById('${parent_id}').classList.remove('show');
        } else {
            document.getElementById('${parent_id}').classList.add('show');
            }
        ">
        &#128488; <span id="${parent_id}-comments">${comments}<span>
    </button>
    `
}

function submitComment(event) {
    // dont reload the page
    event.preventDefault();
    // TODO
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
    auraLevels: "aura_levels"
}

async function getHeader() {
    await loadComponent(component.header);
    renderHeader();
}

async function getNavigationBar() {
    await loadComponent(component.navigationBar);
    renderNavigationBar();
}

async function getFooter() {
    await loadComponent(component.footer);
    renderFooter();
}

async function getAuraLevels() {
    await loadComponent(component.auraLevels);
    renderAuraLevelCard();
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

        script.src = `/components/${name}/${name}.js`;
        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
    });

    /* Component specific styling should be fetched */
    const stylePromise = new Promise((resolve, reject) => {
        const style = document.createElement("link");

        style.href = `/components/${name}/${name}.css`;
        style.rel = "stylesheet";
        style.onload = resolve;
        style.onerror = reject;

        document.head.appendChild(style);
    });

    const promise = Promise.all([scriptPromise, stylePromise]);
    loadedComponents.set(name, promise);

    return promise;
}



async function initializeFullBackgrounds() {
    /* This method was written with the help of AI */
    const sections = document.querySelectorAll(".full-background");

    for (const section of sections) {
        const background = getComputedStyle(section)
            .getPropertyValue("--background-image")
            .trim();

        const url = background.match(/url\(["']?(.*?)["']?\)/)?.[1];

        if (!url) continue;

        const image = new Image();
        image.src = url;

        try {
            await image.decode();

            const canvas = document.createElement("canvas");
            canvas.width = 50;
            canvas.height = 50;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, 50, 50);

            const pixels = ctx.getImageData(0, 0, 50, 50).data;

            let brightness = 0;

            for (let i = 0; i < pixels.length; i += 4) {
                brightness +=
                    pixels[i] * 0.2126 +
                    pixels[i + 1] * 0.7152 +
                    pixels[i + 2] * 0.0722;
            }

            brightness /= pixels.length / 4;

            if (brightness > 127) {
                section.style.setProperty("--text-color", "black");
                section.style.setProperty("--shadow-color", "white");
                section.style.setProperty(
                    "--overlay-color",
                    "rgba(255,255,255,0.5)"
                );
            } else {
                section.style.setProperty("--text-color", "white");
                section.style.setProperty("--shadow-color", "#333");
                section.style.setProperty(
                    "--overlay-color",
                    "rgba(0,0,0,0.35)"
                );
            }

        } catch (error) {
            console.warn("Could not analyze background:", url, error);
        }
    }
}

document.addEventListener("DOMContentLoaded", initializeFullBackgrounds);

const button_styles = document.createElement("link");
button_styles.href = `/common-styles/buttons.css`;
button_styles.rel = "stylesheet";
document.head.appendChild(button_styles);
