
function getSingleCarousel(slides) {
    return `
        <div class="single-carousel container">
            <div class="single-carousel-display">
                ${slides[0] ?? ""}
            </div>

            <button type="button"
                class="carousel-left positioned-horizon-left basic"
                aria-label="Previous image">
                &#9664;
            </button>

            <button type="button"
                class="carousel-right positioned-horizon-right basic"
                aria-label="Next image">
                &#9654;
            </button>
        </div>
    `;
}

function renderSingleCarousel(parent, slides) {
    parent.innerHTML = getSingleCarousel(slides);

    const carousel = parent.querySelector(".single-carousel");

    initSingleCarousel(carousel, slides);

    return carousel;
}

function initSingleCarousel(carousel, slides) {
    let index = 0;

    const display = carousel.querySelector(".single-carousel-display");
    const left = carousel.querySelector(".carousel-left");
    const right = carousel.querySelector(".carousel-right");

    function changeSingleCarousel(direction) {
        if (slides.length < 2) return;

        index = (index + direction + slides.length) % slides.length;

        display.innerHTML = slides[index];

        carousel.dispatchEvent(new CustomEvent("carouselchange", {
            bubbles: true,
            detail: { index }
        }));
    }

    left.addEventListener("click", () => changeSingleCarousel(-1));
    right.addEventListener("click", () => changeSingleCarousel(1));

    // No navigation needed for a single slide
    left.hidden = slides.length <= 1;
    right.hidden = slides.length <= 1;
}


// const carousels = {};

// function getSingleCarousel(name, children) {
//     carousels[name] = {
//         children: children,
//         displayed_child: 0
//     };

//     return `
//         <div id="${name}" class="single-carousel container">
//             <div id="${name}-carousel-display" class="single-carousel-display">
//                 ${children[0] ?? ""}
//             </div>

//             <button onclick="changeCarousel('${name}', -1)"
//                 class="positioned-horizon-left basic">
//                  &#9664; 
//             </button>

//             <button onclick="changeCarousel('${name}', 1)"
//                 class="positioned-horizon-right basic">
//                  &#9654; 
//             </button>
//         </div>
//     `;
// }

// function changeCarousel(name, direction) {
//     const carousel = carousels[name];
//     if (!carousel || carousel.children.length === 0) return;

//     const max = carousel.children.length;

//     carousel.displayed_child =
//         (carousel.displayed_child + direction + max) % max;

//     document.getElementById(name + "-carousel-display").innerHTML =
//         carousel.children[carousel.displayed_child];

//     document.getElementById(name).dispatchEvent(
//         new CustomEvent(`${name}-carouselchange`, {
//             bubbles: true,
//             detail: {
//                 index: carousel.displayed_child
//             }
//         })
//     );
// }


// function renderSingleCarousel(parent, name, inner) {
//     parent.innerHTML = getSingleCarousel(name, inner);
// }