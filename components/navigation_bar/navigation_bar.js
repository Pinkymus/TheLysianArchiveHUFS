function renderNavigationBar() {
    const currentPage = window.location.pathname;
    const page = pages[currentPage] ?? pages["/index.html"];

    fetch("/components/navigation_bar/navigation_bar.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("navbar").innerHTML = html;
            document.getElementById(page.active).classList.add("active");
        });
}