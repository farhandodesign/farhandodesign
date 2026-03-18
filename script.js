const data = {
  sports: {
    options: ["All", "Football", "Cricket"],
    items: [
      {
        category: "Football",
        img: "assets/thumbnails/s1.jpg",
        link: "https://behance.net"
      }
    ]
  },

  others: {
    options: ["All", "Posters", "Experiments"],
    items: [
      {
        category: "Posters",
        img: "assets/thumbnails/o1.jpg",
        link: "https://behance.net"
      }
    ]
  },

  freebies: {
    options: ["All", "Wallpaper", "PNGs", "Textures"],
    items: [
      {
        category: "Wallpaper",
        img: "assets/thumbnails/f1.jpg",
        download: "freebies/file1.zip"
      }
    ]
  }
};

let currentSection = "sports";
let currentFilter = "All";

const sidebar = document.getElementById("sidebar");
const gallery = document.getElementById("gallery");
const navItems = document.querySelectorAll(".nav-item");

/* NAV CLICK */
navItems.forEach(item => {
  item.addEventListener("click", () => {
    document.querySelector(".nav-item.active").classList.remove("active");
    item.classList.add("active");

    currentSection = item.dataset.section;
    currentFilter = "All";

    renderSidebar();
    renderGallery();
  });
});

/* SIDEBAR */
function renderSidebar() {
  sidebar.innerHTML = "";

  data[currentSection].options.forEach(option => {
    const el = document.createElement("div");
    el.className = "sidebar-item";
    el.innerText = option;

    if (option === currentFilter) el.classList.add("active");

    el.addEventListener("click", () => {
      currentFilter = option;
      renderSidebar();
      renderGallery();
    });

    sidebar.appendChild(el);
  });
}

/* GALLERY */
function renderGallery() {
  gallery.innerHTML = "";

  let items = data[currentSection].items;

  if (currentFilter !== "All") {
    items = items.filter(i => i.category === currentFilter);
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    if (currentSection === "freebies") {
      card.classList.add("freebie");
    }

    const img = document.createElement("img");
    img.src = item.img;

    img.onload = () => img.classList.add("loaded");

    card.appendChild(img);

    /* CLICK ACTION */
    if (item.link) {
      card.onclick = () => window.open(item.link, "_blank");
    }

    if (item.download) {
      const btn = document.createElement("a");
      btn.className = "download-btn";
      btn.innerText = "Download";
      btn.href = item.download;
      btn.setAttribute("download", "");

      card.appendChild(btn);
    }

    gallery.appendChild(card);
  });
}

/* INIT */
renderSidebar();
renderGallery();
