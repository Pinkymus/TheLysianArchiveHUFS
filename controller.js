function getCurrentUser() {
    return sessionStorage.getItem("loggedInUser");
}

function isLoggedIn() {
    return getCurrentUser() !== null;
}

function logout() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "/login.html";
}


const loaded = new Map();

function loadScript(name) {
    if (loaded.has(name)) {
        return loaded.get(name);
    }

    // TODO: This is kind of idiotic, as it only fectches in the root
    const scriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src = `/${name}.js`;
        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
    });

    const promise = Promise.all([scriptPromise, stylePromise]);
    loadedComponents.set(name, promise);

    return promise;
}