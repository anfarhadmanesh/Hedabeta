const FALLBACK_POSTS = [
  {
    id: 1,
    title: "اولِ نوشتن؛ در آغوش کشیدن نقص‌ها",
    date: "۱۴۰۵-۰۵-۱۱",
    category: "از نوشتن",
    excerpt: "می‌توانی نوشتن را آغاز کنی حتی با وجود فاصله‌ها و ناهمخوانی‌ها. بیا و زندگی را با نقص‌هایت زندگی کن؛ کلمات جاری می‌شوند وقتی قضاوت‌ها به خاموشی بگراید...",
    avatar: "img/Hedabeta1.jpg",
    coverImage: "img/Hedabeta.jpg"
  },
  {
    id: 2,
    title: "از این تخت ICU تا آن تخت ICU؛ روایت یک کشیک",
    date: "۱۴۰۵-۰۲-۱۸",
    category: "مَکطِبّ | اخلاق بالینی",
    excerpt: "در هفتمین کشیک بخش اطفال، همان‌طور که شب آرامی را پشت سر می‌گذاشتم، در اورژانس مشغول چک کردن ساعت کشیک بعدی‌ام بودم که زنگ احیا به صدا درآمد...",
    avatar: "img/Macteb.png",
    coverImage: "img/Macteb.png"
  },
  {
    id: 3,
    title: "چند سکانس از کشیک جراحی؛ انسان در برابر درد",
    date: "۱۴۰۴-۰۸-۱۲",
    category: "مَکطِبّ | روایت پزشکی",
    excerpt: "از روزهای مهر و آبان وقتی که اینترن جراحی بودم؛ مواجهه با بیماران در اورژانس جراحی همیشه فراتر از یک شرح‌حال ساده پزشکی است...",
    avatar: "img/lifehx.jpg",
    coverImage: "img/lifehx.jpg"
  }
];

function renderPosts(posts, container, searchQuery = "") {
  container.innerHTML = "";
  const filtered = posts.filter(p =>
    p.title.includes(searchQuery) || p.excerpt.includes(searchQuery) || p.category.includes(searchQuery)
  );

  if (filtered.length === 0) {
    container.innerHTML = `<p style="padding:1.5rem; background:#fff; border-radius:12px;">یادداشتی با عبارت «${searchQuery}» یافت نشد.</p>`;
    return;
  }

  filtered.forEach(post => {
    const article = document.createElement("article");
    article.className = "post-card";
    article.innerHTML = `
      <header class="post-header">
        <img src="${post.avatar}" alt="${post.title}" class="post-avatar" onerror="this.src='img/Hedabeta1.jpg'">
        <div class="post-meta">
          <span class="post-category">${post.category}</span>
          <time class="post-date">${post.date}</time>
        </div>
      </header>
      <h2 class="post-title">
        <a href="post.html?id=${post.id}">${post.title}</a>
      </h2>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-footer">
        <a href="post.html?id=${post.id}" class="read-more">مطالعه نوشتار »</a>
      </div>
    `;
    container.appendChild(article);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.querySelector(".posts-feed");
  const searchInput = document.getElementById("search-input");
  if (!postsContainer) return;

  let allPosts = FALLBACK_POSTS;

  fetch("posts.json")
    .then(res => {
      if (!res.ok) throw new Error("Checking js/posts.json");
      return res.json();
    })
    .catch(() => fetch("js/posts.json").then(res => res.json()))
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        allPosts = data;
      }
      renderPosts(allPosts, postsContainer);
    })
    .catch(() => {
      // در صورت باز کردن مستقیم فایل (file:///)، از دیتای پشتیبان استفاده می‌کند
      renderPosts(allPosts, postsContainer);
    });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderPosts(allPosts, postsContainer, e.target.value.trim());
    });
  }
});