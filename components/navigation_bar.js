function renderNavigationBar() {
    const currentPage = window.location.pathname;
    const page = pages[currentPage] ?? pages["/index.html"];

    const html = getNavigationBar()
    document.getElementById("navbar").innerHTML = html;
    document.getElementById(page.active).classList.add("active");
}


function getNavigationBar(){
    return `
    <nav>
    <div class="nav-menu">

        <div class="nav-dropdown">
            <a href="/index.html">
                <div id="home-link" class="nav-menu-button">
                    Home
                </div>
            </a>
        </div>

        <!-- World dropdown -->
        <div class="nav-dropdown">
            <a href="/pages/world.html">
                <div id="world-link" class="nav-menu-button">
                    World
                </div>
            </a>
            <div class="nav-dropdown-content">
                <a href="/pages/world.html#regions">Regions</a>
                <a href="/pages/world.html#cities">Cities</a>
                <a href="/pages/world.html#politics">Politics</a>
                <a href="/pages/world.html#culture">Culture</a>
            </div>
        </div>

        <!-- Magic dropdown -->
        <div class="nav-dropdown">
            <a href="/pages/magic.html">
                <div id="magic-link" class="nav-menu-button">
                    Magic
                </div>
            </a>
            <div class="nav-dropdown-content">
                <a href="/pages/magic.html#aura">Aura</a>
                <a href="/pages/magic.html#stones">Stones</a>
                <a href="/pages/magic.html#brands">Brands</a>
            </div>
        </div>

        <!-- Character Dropdown -->
        <div class="nav-dropdown" style="width: 170px;">
            <a href="/pages/characters.html">
                <div id="characters-link" class="nav-menu-button">
                    Characters
                </div>
            </a>
            <div class="nav-dropdown-content" style="min-width: 170px;">
                <a href="/pages/characters.html#Earth-characters">Earth</a>
                <a href="/pages/characters.html#The Imperial Family-characters">The Imperial Family</a>
                <a href="/pages/characters.html#Companions-characters">Katharina's Companions</a>
                <a href="/pages/characters.html#Ravnsund Manor-characters">Ravnsund Manor</a>
            </div>
        </div>

        <!-- Community dropdown -->
        <div class="nav-dropdown" style="width: 120px;">
            <a href="/pages/community.html">
                <div id="community-link" class="nav-menu-button">
                    Community
                </div>
            </a>
            <div class="nav-dropdown-content" style="min-width: 120px;">
                <a href="/pages/community.html#fanart">Fanart</a>
                <a href="/pages/community.html#member-content">&star; Exclusive</a>
            </div>
        </div>

        <div class="nav-dropdown">
            <a href="/pages/forums.html">
                <div id="forums-link" class="nav-menu-button">
                    Forums
                </div>
            </a>
        </div>

        <div class="nav-dropdown">
            <a href="/pages/login.html">
                <div id="login-link" class="nav-menu-button">
                    Login
                </div>
            </a>
        </div>

    </div>
</nav>
    `
}