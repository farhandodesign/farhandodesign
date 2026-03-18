fetch("data/projects.json")
.then(res => res.json())
.then(data => {

const grid = document.getElementById("portfolio-grid")

data.forEach(project => {

const card = document.createElement("div")

card.classList.add("project")

card.innerHTML = `
<a href="${project.link}" target="_blank">
<img src="${project.image}">
</a>
`

grid.appendChild(card)

})

})
