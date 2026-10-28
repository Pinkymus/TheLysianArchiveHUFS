
// The login component also holds the register to the site component
function getLogin() {
        return `
        <section class="login-box">

            <!-- LOGIN -->
            <div id="login">
                <h2>Login</h2>

                <form id="login-form" onsubmit="login(event)">
                    <div class="fancy-lable">
                        <input type="text" id="username"
                            placeholder=" " required>
                        <label for="username">Username</label>
                    </div>

                    <div class="fancy-lable">
                        <input type="password" id="password"
                            name="password" placeholder=" " required>
                        <label for="password">Password</label>
                    </div>

                    <input class="basic" type="submit" value="Login">
                    <input class="basic" type="reset" value="Cancel">
                </form>
            </div>

            <button type="button" class="basic" id="show-sign-up">
                Not yet a member?
            </button>

            <!-- REGISTER -->
            <div id="sign-up" class="hidden">
                <h2>Create an account</h2>

                <form id="register-form">
                    <div class="fancy-lable">
                        <input type="text" id="newusername"
                            placeholder="NinjaCat2000" required>
                        <label for="newusername">New username</label>
                        <button type="button" id="generate-username"
                            title="Generate random username" style="font-size: 28px">
                            &#127922;
                        </button>
                    </div>

                    <div class="fancy-lable">
                        <input type="email" id="email"
                            placeholder="email@example.com" required>
                        <label for="email">Your email</label>
                    </div>

                    <div class="fancy-lable">
                        <input type="password" id="new-password-1"
                            placeholder="*********" required>
                        <label for="new-password-1">New password</label>
                    </div>

                    <div class="fancy-lable">
                        <input type="password" id="new-password-2"
                            placeholder="*********" required>
                        <label for="new-password-2">New password again</label>
                    </div>

                    <input class="basic" type="submit" value="Register">
                    <input class="basic" type="reset" value="Cancel">
                </form>

                <button type="button" class="basic" id="show-login">
                    Already have an account?
                </button>
            </div>

        </section>
    `;
}

function renderLogin(parent) {
    parent.innerHTML = getLogin();
    initLogin(parent);
}

// Init fuction handles all the functionality that should apply to login component
function initLogin(parent) {
    const login = parent.querySelector("#login");
    const signUp = parent.querySelector("#sign-up");

    const showSignUp = parent.querySelector("#show-sign-up");
    const showLogin = parent.querySelector("#show-login");

    const generateButton = parent.querySelector("#generate-username");
    const usernameInput = parent.querySelector("#newusername");

    // Switch to registration
    showSignUp.addEventListener("click", () => {
        login.classList.add("hidden");
        showSignUp.classList.add("hidden");
        signUp.classList.remove("hidden");
    });

    // Switch back to login
    showLogin.addEventListener("click", () => {
        signUp.classList.add("hidden");
        login.classList.remove("hidden");
        showSignUp.classList.remove("hidden");
    });

    // Generate a random username
    generateButton.addEventListener("click", () => {
        usernameInput.value = getRandomUsername();
    });

    // TODO: For now Login does nothing upon submit
    parent.querySelector("#login-form")
        .addEventListener("submit", event => {
            event.preventDefault();
        });
    
    // TODO: For now Register does nothing upon submit
    parent.querySelector("#register-form")
        .addEventListener("submit", event => {
            event.preventDefault();

            // Your new password should be enter indentical both times
            const password1 = parent.querySelector("#new-password-1");
            const password2 = parent.querySelector("#new-password-2");
            if (password1.value !== password2.value) {
                password2.setCustomValidity("Passwords must match.");
                password2.reportValidity();
                return;
            }
            password2.setCustomValidity("");

            // TODO: Implement actual account registration
        });

    // Clear password validation when editing
    parent.querySelector("#new-password-2")
        .addEventListener("input", event => {
            event.target.setCustomValidity("");
        });
}



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

function getRandomUsername() {
    const index =  Math.floor(Math.random() * randomUsernames.length);
    return randomUsernames[index];
}