// فایل js/post.js
const FALLBACK_POSTS_SINGLE = [
  {
    id: 1,
    title: "اولِ نوشتن؛ در آغوش کشیدن نقص‌ها",
    date: "۱۴۰۵-۰۵-۱۱",
    category: "از نوشتن",
    coverImage: "img/Hedabeta.jpg",
    content: "<p>می‌توانی نوشتن را آغاز کنی حتی با وجود فاصله‌ها و ناهمخوانی‌ها. بیا و زندگی را با نقص‌هایت زندگی کن.</p><p>از سفیدیِ قند تا روپوشِ سفید، مسیر شناختِ خود از میان رنج‌ها و امیدها می‌گذرد. نوشتن برای من نه یک تفنن، بلکه راهی برای التیام و روشن کردن چراغی کوچک در شب‌های تاریک است.</p>"
  },
  {
    id: 2,
    title: "از این تخت ICU تا آن تخت ICU؛ روایت یک کشیک",
    date: "۱۴۰۵-۰۲-۱۸",
    category: "مَکطِبّ | اخلاق بالینی",
    coverImage: "img/Macteb.png",
    content: "<p>اردیبهشت ۱۴۰۵، در هفتمین کشیک بخش اطفال، همان‌طور که شب آرامی را پشت سر می‌گذاشتم، ناگهان مرز میان سکوت و التهاب شکسته شد.</p><p>طبابت در لحظات بحرانی، پیش از آنکه مجموعه‌ای از پروتکل‌های دارویی باشد، مواجهه‌ای عریان با شکنندگی حیات انسان و مسئولیت اخلاقی ما در برابر رنج است.</p>"
  },
  {
    id: 3,
    title: "چند سکانس از کشیک جراحی؛ انسان در برابر درد",
    date: "۱۴۰۴-۰۸-۱۲",
    category: "مَکطِبّ | روایت پزشکی",
    coverImage: "img/lifehx.jpg",
    content: "<p>در شلوغی اورژانس جراحی، هر بیمار با داستانی ناتمام وارد می‌شود. درک ریشه‌ی درد بیمار نیازمند شنیدنِ روایت اوست، نه صرفاً دیدن برگه آزمایش.</p>"
  }
];

function displaySinglePost(posts, postId, container) {
  const post = posts.find(p => p.id === postId) || posts[0];
  if (!post) {
    container.innerHTML = "<p>گوید که: یافت می‌نشود جُسته‌ایم ما!</p>";
    return;
  }

  document.title = `${post.title} – HEDABETA`;
  container.innerHTML = `
    <img src="${post.coverImage}" alt="${post.title}" class="post-cover-image" onerror="this.src='img/Hedabeta1.jpg'">
    <div class="post-header">
      <span class="post-category">${post.category}</span>
      <time class="post-date">${post.date}</time>
    </div>
    <h1 class="post-full-title">${post.title}</h1>
    <div class="post-full-content">
      ${post.content}
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("single-post-container");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id")) || 1;

  fetch("posts.json")
    .then(res => {
      if (!res.ok) throw new Error("Fallback to js/posts.json");
      return res.json();
    })
    .catch(() => fetch("js/posts.json").then(res => res.json()))
    .then(posts => displaySinglePost(posts, postId, container))
    .catch(() => displaySinglePost(FALLBACK_POSTS_SINGLE, postId, container));
});

function submitComment() {
  const authorInput = document.getElementById("comment-author");
  const textInput = document.getElementById("comment-text");
  const list = document.getElementById("comments-list");

  if (!authorInput.value.trim() || !textInput.value.trim()) return;

  const newComment = document.createElement("div");
  newComment.className = "comment-item";
  newComment.innerHTML = `
    <div class="comment-header">
      <span class="comment-author">${authorInput.value}</span>
      <time class="comment-date">لحظاتی پیش</time>
    </div>
    <p class="comment-body">${textInput.value}</p>
  `;

  list.prepend(newComment);
  textInput.value = "";
  authorInput.value = "";
}