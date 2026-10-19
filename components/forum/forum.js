function initForumPosts() {
    // TODO: there is no functionality yet :D
}

function renderForumPosts(parent, posts) {
    parent.innerHTML = posts ? getForumPosts(posts): "";
}

function getForumPosts(posts) {
    return posts.map(getPost).join("");
}

function getPost(post) {
    const post_id = `post-${post.id}`;
    let all_comments = "";
    all_comments += post.comments.map(c => getComment(c, post.id)).join("<hr>");

    return `
        <article id="${post_id}" class="forum-post">
            <h2>${post.title}</h2>
            <h3>${post.poster}</h3>
            <div  class="date">${new Date(post.date).toLocaleString("en-GB")}</div>

            <div style="
                text-align:center;
                background-image: linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8)), url(${post.img});
                background-size: cover;
                background-position: center;
                ">${post.img ? `<img src='${post.img}' width='auto' height='500px'>` : ""}</div>

            ${post.content.map(c => "<p>" + c + "</p>").join("")}
            <p class="likes">
                ${getCommentButton(post.comments.length, post_id)}
                ${getLikeButton(post.likes, post_id)}
            </p>
            <div class="forum-comment-section">
                ${all_comments}
                <form onsubmit="submitComment(event, 0)">
                    <textarea id="${post_id}-comment-field" name="comment" rows="3" placeholder="Write a comment..."></textarea>   
                    <button type="submit">Comment</button>
                </form>
            </div>
        </article>
    `
}

function getComment(comment, postid) {
    const comment_id = `comment-${postid}-${comment.id}`;

    return `
    <div id="${comment_id}" class="forum-comment">
        <h4>${comment.poster}</h4>
        <div class="date">${new Date(comment.date).toLocaleString("en-GB")}</div>
        <p>${comment.content}</p>
        <p class="likes">
            ${getLikeButton(comment.likes, comment_id)}
        </p>
    </div>
    `
}

function getLikeButton(likes, parent_id) {
    return `
    <button onClick="
        if(document.getElementById('${parent_id}').classList.contains('liked')){
            document.getElementById('${parent_id}-likes').innerHTML = ${likes};
            document.getElementById('${parent_id}').classList.remove('liked');
        } else {
            document.getElementById('${parent_id}-likes').innerHTML = (${likes} + 1);
            document.getElementById('${parent_id}').classList.add('liked');
            }
        ">
        &hearts; <span id="${parent_id}-likes">${likes}</span>
    </button>
    `
}

function getCommentButton(comments, parent_id) {
    return `
    <button onClick="
        if(document.getElementById('${parent_id}').classList.contains('show')){
            document.getElementById('${parent_id}').classList.remove('show');
        } else {
            document.getElementById('${parent_id}').classList.add('show');
            }
        ">
        &#128488; <span id="${parent_id}-comments">${comments}<span>
    </button>
    `
}

function submitComment(event) {
    // dont reload the page
    event.preventDefault();
    // TODO
}