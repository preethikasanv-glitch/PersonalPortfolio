fetch("http://localhost:5000/projects")
  .then((response) => response.json())
  .then((projects) => {
    const projectList = document.getElementById("project-list");

    projectList.innerHTML = "";

    projects.forEach((project) => {
      const card = document.createElement("div");

      card.className = "card";

      card.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <p><strong>Technologies:</strong> ${project.technologies.join(", ")}</p>

        <a href="${project.github}" target="_blank">GitHub</a><br><br>

        <a href="${project.demo}" target="_blank">Live Demo</a>
      `;

      projectList.appendChild(card);
    });
  })
  .catch((error) => console.error(error));