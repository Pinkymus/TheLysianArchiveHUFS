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

function getHeader(active_element) {
    let page_title = "The Lysian Archive";
    switch (active_element) {
        case "home-link":
            page_title = "The Lysian Archive";
            break;
        case "world-link":
            page_title = "The World of Lysies"
            break;
        case "magic-link":
            page_title = "Aura";
            break;
        case "characters-link":
            page_title = "Characters from the Lysian Universe";
            break;
        case "community-link":
            page_title = "The Lysian Archive";
            break;
        case "forums-link":
            page_title = "Forum";
            break;
        case "login-link":
            page_title = "Login"
            break;
    }
    document.getElementById("header").innerHTML =
        `
        <div class="title">
            <h1 id="page-title">${page_title}</h1>
            <img src="/images/assets/ornament-3.svg" width="500px">
        </div>
        <div id="navbar"></div>
    `;
    getActiveNavigation(active_element)
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