function getFeaturedSubmissionInfo() {
    return `
        ${getDecoratedTitle("Featured Fan Art")}

        <p>Each month we feature amazing artworks from the community.</p>

        <button type="button"
            class="lift-1 orange-button positioned"
            style="left: 15%"
            id="show-feature-application">
            Want to be featured?
        </button>
    `;
}

function getApplyForFeature() {
    return `
    ${getDecoratedTitle("Submit Fan Art")}
    <form id="fanart-form">

        <label for="fanart-file">Choose an image</label>
        <div style="display: flex; height: 100px;">
            <input class="basic" style="border-radius: 10px;" type="file" id="fanart-file" name="image"
            accept="image/png, image/jpeg, image/webp, image/gif" required>
            
            <img id="fanart-preview" alt="Image preview" hidden height="100%" width="auto">
        </div>

        <div class="fancy-lable" style="width: 100%;">
            <input type="text" id="fanart-title" placeholder=" " required>
            <label for="fanart-title">Artwork title</label>
        </div>

        <div class="fancy-lable" style="width: 100%;">
            <input type="text" id="fanart-artist" placeholder=" " required>
            <label for="fanart-artist">Artist name</label>
        </div>

        <div class="fancy-lable" style="width: 100%;">
            <input type="url" id="fanart-link" placeholder=" ">
            <label for="fanart-link">Link to original</label>
        </div>

        <p id="fanart-message" role="status"></p>
        <button type="submit" class="orange-button-small"
            style="width: 60%;">Apply</button>
        <button type="button" id="cancel-feature-application"
            class="basic" style="width: 40%; margin-top: 5px;">
            Cancel
        </button>
    </form>
    `

}

function renderFeaturedSubmission(parent) {
    parent.innerHTML = getFeaturedSubmissionInfo();
    initFeaturedSubmission(parent);
}

function initFeaturedSubmission(parent) {
    parent.querySelector("#show-feature-application")
        .addEventListener("click", () => {
            parent.innerHTML = getApplyForFeature();

            initApplyForFeature(parent);
        });
}

function initApplyForFeature(parent) {
    const fanartInput = parent.querySelector("#fanart-file");
    const fanartPreview = parent.querySelector("#fanart-preview");
    const fanartForm = parent.querySelector("#fanart-form");
    const fanartMessage = parent.querySelector("#fanart-message");

    let previewURL = null;

    // Clear the current image preview
    function clearPreview() {
        if (previewURL) {
            URL.revokeObjectURL(previewURL);
            previewURL = null;
        }

        fanartPreview.hidden = true;
        fanartPreview.removeAttribute("src");
    }

    // Display selected image
    fanartInput.addEventListener("change", () => {
        clearPreview();

        const file = fanartInput.files[0];
        if (!file) return;

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/webp",
            "image/gif"
        ];

        if (!allowedTypes.includes(file.type)) {
            fanartInput.value = "";
            fanartMessage.textContent =
                "Please select a supported image file.";
            return;
        }

        previewURL = URL.createObjectURL(file);
        fanartPreview.src = previewURL;
        fanartPreview.hidden = false;

        fanartMessage.textContent = "";
    });

    // Preview-only submission
    fanartForm.addEventListener("submit", event => {
        event.preventDefault();

        fanartMessage.textContent =
            "Preview only — fanart submissions are not yet available.";
    });

    // Reset image preview and status
    fanartForm.addEventListener("reset", () => {
        clearPreview();
        fanartMessage.textContent = "";
    });

    parent.querySelector("#cancel-feature-application")
    .addEventListener("click", () => {
        renderFeaturedSubmission(parent);
    });
}