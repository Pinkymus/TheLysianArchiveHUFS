const applicationData = {
    characters: null,
    posts: null,
    fanart: null,
    featuredFanart: null,
};

async function loadData() {
    const [characters, posts, fanart, featured_fanart] = await Promise.all([
        getData("/data/characters.json"),
        getData("/data/posts.json"),
        getData("/data/fanart.json"),
        getData("/data/featured-fanart.json")
    ]);

    applicationData.characters = characters.characters;
    applicationData.posts = posts.posts;
    applicationData.fanart = fanart;
    applicationData.featuredFanart = featured_fanart;
}

async function getData(path) {
    const response = await fetch(path);
    const json_result = await response.json();
    return json_result;
}