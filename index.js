function getdata() {
  fetch("https://kea21s-6eb0.restdb.io/rest/theme9posts", {
    method: "GET",
    headers: {
      "x-apikey": "606d606af55350043100752e",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      showPosts(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

getdata();

function showPosts(posts) {
  console.log(posts);

  const template = document.querySelector("template.frontpagelist").content;
  posts.forEach((post) => {
    const copy = template.cloneNode(true);

    template.querySelector("h2").textContent = post.title;
    template.querySelector("h3 span").textContent = post.username;
    template.querySelector(
      "a.readmore"
    ).href = `article.html?article=${post._id}`;

    document.querySelector("main").appendChild(copy);
  });
}
