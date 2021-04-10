const searchParams = new URLSearchParams(window.location.search);

const articleId = searchParams.get("article");

fetch(
  "https://kea21s-6eb0.restdb.io/rest/theme9posts/" +
    articleId +
    "?fetchchildren=true",
  {
    method: "GET",
    headers: {
      "x-apikey": "606d606af55350043100752e",
    },
  }
)
  .then((res) => res.json())
  .then((response) => {
    showPost(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPost(data) {
  console.log(data.commentkids);
  document.querySelector("h1").textContent = data.title;
  document.querySelector("h2 span").textContent = data.username;
  document.querySelector("p").textContent = data.content;

  //data.commentkids would be an array

  //grab the template content
  const template = document.querySelector(".commentTemplate").content;

  //loopthrough data.commentkids
  data.commentkids.forEach((comment) => {
    console.log(comment);

    //create a clone
    //populate/change content
    //append it
    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = comment.content;
    clone.querySelector("p").textContent = comment.username;

    document.querySelector(".commentList").appendChild(clone);
  });
  if (data.commentkids.length === 0) {
    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = "no comments yet";
    clone.querySelector("p").textContent = "by you";

    document.querySelector(".commentList").appendChild(clone);
  }
}

const form = document.querySelector("#commentForm");
form.addEventListener("submit", handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  const payload = {
    username: form.elements.username.value,
    email: form.elements.email.value,
    content: form.elements.content.value,
    date: Date.now(),
  };
  console.log(payload);
  fetch(
    `https://kea21s-6eb0.restdb.io/rest/theme9posts/${articleId}/commentkids`,
    {
      method: "POST",
      headers: {
        "x-apikey": "606d606af55350043100752e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const template = document.querySelector(".commentTemplate").content;
      const clone = template.cloneNode(true);
      clone.querySelector("h3").textContent = data.content;
      clone.querySelector("p").textContent = data.username;

      document.querySelector(".commentList").appendChild(clone);
    });
}
