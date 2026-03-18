fetch("data/projects.json")
.then(res => res.json())
.then(projects => {

const grid = document.getElementById("portfolio-grid")

projects.forEach(project => {

const card = document.createElement("div")

card.classList.add("project")

card.innerHTML = `
<a href="${project.behance}" target="_blank">
<img src="${project.thumbnail}" alt="${project.title}">
</a>
`

grid.appendChild(card)

})

})
