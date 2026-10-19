function getFanart(fanart) {
    const all_fanart = fanart.map(e => `
        <article class="gallery-element bordered container">
            <a ${e.link ? `href="${e.link}"` : ""} target="_blank">
                <img class="gallery-element-img"
                    src="${e.img}"
                    alt="${e.description}">
            </a>

            <div class="gallery-element-text">
                <h4>${e.description}</h4>
                <p>by ${e.artist}</p>
            </div>
        </article>
    `).join("");

    return `
        <div class="fanart-gallery">
            ${all_fanart}
        </div>
    `;
}

function renderFanart(parent, fanart) {
    parent.innerHTML = getFanart(fanart);
}
