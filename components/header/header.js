function renderHeader(){
    const currentPage = window.location.pathname;
    const page = pages[currentPage] ?? pages["/index.html"];

    document.getElementById("header").innerHTML =
        `
        <div class="title">
            <h1 id="page-title">${page.title}</h1>
            <img src="/images/assets/ornament-3.svg" width="500px">
        </div>
        <div id="navbar"></div>
    `;

    getNavigationBar();
}