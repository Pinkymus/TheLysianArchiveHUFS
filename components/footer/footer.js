function renderFooter() {   
    document.getElementById("footer").innerHTML = getFooter();
}

function getFooter(){
return `
<footer class="site-footer">
    <div class="footer-content">
        <h2>The Lysian Archive</h2>
        <p>A guide to the world of <em>Kat & Leo</em></p>

        <nav class="footer-navigation" aria-label="Footer navigation">
            <a href="/index.html">Home</a>
            <a href="/pages/world.html">World</a>
            <a href="/pages/magic.html">Magic</a>
            <a href="/pages/characters.html">Characters</a>
            <a href="/pages/community.html">Community</a>
            <a href="/pages/forums.html">Forums</a>
        </nav>

        <hr>

        <p>Explore more of the universe</p>

        <div class="footer-external-links">
            <a href="https://unvale.io/pinkymus" target="_blank" rel="noopener noreferrer">UnVale</a>
            <span>|</span>
            <a href="https://www.royalroad.com/fiction/124000/kat-leo-servitude-is-a-privilege" target="_blank" rel="noopener noreferrer">Royal Road</a>
        </div>

        <p class="footer-copyright">&copy; 2026 The Lysian Archive</p>
    </div>
</footer>

`
}