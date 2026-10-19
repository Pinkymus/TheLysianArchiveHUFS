// Generate the HTML for the featured artwork slides
function getFeaturedFanart(artworks) {
    return artworks.map(art => `
        <div style="background-image: url('${art.img}');">
            <div class="positioned-bottom-left">
                <h2>${art.title}</h2>
                <h3>by ${art.artist.name}</h3>
            </div>
        </div>
    `);
}

// Generate the HTML for one artist spotlight
function getFeaturedArtist(artist) {
    return `
        ${getDecoratedTitle("Artist Spotlight")}
        <h2>${artist.name}</h2>
        <p>${artist.description}</p>
    `;
}

function renderFeaturedArtist(parent, artist) {
    parent.innerHTML = artist ? getFeaturedArtist(artist) : "";
}


function renderFeaturedFanart(parent, artistParent, artworks) {
    const slides = getFeaturedFanart(artworks);

    // Get the reusable single carousel rendered on the page
    // the slides are what are displayed
    const carousel = renderSingleCarousel(parent, slides);

    renderFeaturedArtist(artistParent, artworks[0]?.artist);

    initFeaturedFanart(carousel, artistParent, artworks);
}

// Listen for the carousel event and update the artist panel
function initFeaturedFanart(carousel, artistParent, artworks) {
    carousel.addEventListener("carouselchange", event => {
        const index = event.detail.index;

        renderFeaturedArtist(
            artistParent,
            artworks[index].artist
        );
    });
}