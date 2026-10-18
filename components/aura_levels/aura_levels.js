const aura_level = [
    {
        front : "level-1-front",
        center : "level-1-center",
        back : "level-1-back",
        rank: 1,
        name : "Inward",
        description: "Control of aura within the body."
    }, {
        front : "level-2-front",
        center : "level-2-center",
        back : "level-2-back",
        rank: 2,
        name : "Outward",
        description: "Using aura to affect objects when in direct contact."
    }, {
        front : "level-3-front",
        center : "level-3-center",
        back : "level-3-back",
        rank: 3,
        name : "Projective",
        description: "Projecting aura beyond the body."
    }, {
        front : "level-4-front",
        center : "level-4-center",
        back : "level-4-back",
        rank: 4,
        name : "Extractive",
        description: "Drawing aura from others."
    }, {
        front : "level-5-front",
        center : "level-5-center",
        back : "level-5-back",
        rank: 5,
        name : "Transcendental",
        description: "Rare, highly individual abilities."
    }
]

function renderAuraLevelCard() {
    

    let aura_cards = aura_level.map(level => getAuraLevel(level)).join("");

    console.log(aura_cards)

    let html = `
    <h2>The Five Levels Of Aura Control</h2>
    <p style="text-align:center">Within the Lysian Empire Aura is traditionally divided into five levels.</p>
    <div class="container carousel">
        ${aura_cards}
    </div>

    `
    document.getElementById("aura-levels").innerHTML = html;
    initializeAuraAnimations()
}

function getAuraLevel(level) {

    return `
    <div class="container level-card">
        <h3 class="base12">${level.rank}</h3>
        <div class="swirl-container">${getAuraSwirl(level)}</div>
        <div class="aura-description">
            <h3>${level.name}</h3>
            <h4 class="lysian">(${level.name})</h4>
            <p>${level.description}</p>
        </div>
    </div>
    `
}

function getAuraSwirl(level){
    let html = `
    <img src="/images/assets/aura/${level.back}.png" class="swirl-back">
    <img src="/images/assets/aura/${level.center}.png" class="swirl-center">
    <img src="/images/assets/aura/${level.front}.png" class="swirl-front">
    `


    return html
}


function initializeAuraAnimations() {
    document.querySelectorAll(".level-card").forEach(card => {

        const swirls = card.querySelectorAll(
            ".swirl-back, .swirl-center, .swirl-front"
        );

        const animations = Array.from(swirls).flatMap(
            swirl => swirl.getAnimations()
        );

        let speed = 0;
        let targetSpeed = 0;
        let lastTime = 0;
        let frameId = null;

        function update(time) {
            const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
            lastTime = time;

            // Smoothly approach the target playback speed
            const easing = 1 - Math.exp(-4 * dt);
            speed += (targetSpeed - speed) * easing;

            animations.forEach(animation => {
                animation.playbackRate = speed;
            });

            if (targetSpeed === 0 && speed < 0.005) {
                speed = 0;
                animations.forEach(animation => {
                    animation.pause();
                });
                frameId = null;
                lastTime = 0;
                return;
            }

            frameId = requestAnimationFrame(update);
        }

        card.addEventListener("mouseenter", () => {
            targetSpeed = 1;

            animations.forEach(animation => {
                animation.playbackRate = speed;
                animation.play();
            });

            if (frameId === null) {
                frameId = requestAnimationFrame(update);
            }
        });

        card.addEventListener("mouseleave", () => {
            targetSpeed = 0;
        });

    });
}

document.addEventListener("DOMContentLoaded", initializeAuraAnimations);