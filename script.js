const contentData = {
    Freebies: {
        options: ["All", "Wallpaper", "PNGs", "Textures"],
        items: [
            { title: "Wall 1", type: "Wallpaper", class: "tall", link: "#" },
            { title: "Asset 1", type: "PNGs", class: "wide", link: "#" },
            { title: "Grain 1", type: "Textures", class: "", link: "#" },
            { title: "Wall 2", type: "Wallpaper", class: "", link: "#" }
        ]
    },
    Sports: {
        options: ["All", "Football", "F1", "Basketball"],
        items: [
            { title: "Goal", type: "Football", class: "wide", link: "#" },
            { title: "Race", type: "F1", class: "tall", link: "#" }
        ]
    },
    Others: {
        options: ["All", "3D", "Photography"],
        items: [
            { title: "Render", type: "3D", class: "tall", link: "#" }
        ]
    }
};

const navItems = document.querySelectorAll('.nav-item');
const contextMenu = document.getElementById('context-menu');
const gallery = document.getElementById('gallery');

function updatePage(category, subFilter = "All") {
    // 1. Update Sidebar
    contextMenu.innerHTML = '';
    contentData[category].options.forEach(opt => {
        const li = document.createElement('li');
        li.className = `sidebar-link ${opt === subFilter ? 'active' : ''}`;
        li.textContent = opt;
        li.onclick = () => updatePage(category, opt);
        contextMenu.appendChild(li);
    });

    // 2. Update Gallery
    gallery.innerHTML = '';
    const filteredItems = contentData[category].items.filter(item => 
        subFilter === "All" || item.type === subFilter
    );

    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = `card ${item.class}`;
        
        // Add Download button if Freebies
        const downloadHtml = category === "Freebies" ? `<button class="download-btn">Download</button>` : '';
        
        card.innerHTML = `
            <div style="width:100%; height:100%; background:#333; display:flex; align-items:center; justify-content:center; color:#555">
                ${item.title}
            </div>
            ${downloadHtml}
        `;
        
        card.onclick = () => window.open('https://behance.net', '_blank');
        gallery.appendChild(card);
    });
}

// Initial Load
navItems.forEach(btn => {
    btn.addEventListener('click', (e) => {
        navItems.forEach(node => node.classList.remove('active'));
        e.target.classList.add('active');
        updatePage(e.target.dataset.target);
    });
});

// Start with Freebies
updatePage("Freebies");
