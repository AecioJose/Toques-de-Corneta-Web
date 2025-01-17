const dropdownlabel = document.querySelector("#dropdown-label")
const themes = document.querySelector("#themes")

const mode = document.querySelector("#slideButton")
const modeLabel = document.querySelector("#modeLabel")

const addCard = document.querySelector("#addCards")

/*Menu dropdown*/
dropdownlabel.addEventListener("mouseenter", () => themes.style.display = "flex");
themes.addEventListener("mouseenter", () => themes.style.display = "flex");

dropdownlabel.addEventListener("mouseleave", () => themes.style.display = "none");
themes.addEventListener("mouseleave", () => themes.style.display = "none");

dropdownlabel.addEventListener ("click", () =>{
    themes.style.display = themes.style.display === "flex" ? "none" : "flex";
});
themes.addEventListener("click", (event) => {

    if (event.target.tagName === "LI") {
        const theme = event.target.dataset.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');

        document.documentElement.style.setProperty('--background', `var(--background-${theme})`);
        document.documentElement.style.setProperty('--card', `var(--card-${theme})`);
        document.documentElement.style.setProperty('--text', `var(--text-${theme})`);
        document.documentElement.style.setProperty('--border', `var(--border-${theme})`);

        dropdownlabel.textContent = event.target.dataset.value;

        themes.style.display = "none";
    }
});

/*Slider button*/
mode.addEventListener("click", () => {
    modeLabel.textContent = modeLabel.textContent === "Normal" ? "Modo Descrição" : "Normal";

    /*change slider color*/
    document.documentElement.style.setProperty("--slider-background", modeLabel.textContent === "Normal" ? "#1f1f1f" : "#037e03");

    /*change circle color*/
    document.querySelector("#circle3").style.backgroundColor = modeLabel.textContent === "Normal" ? "#4a4c50" : "#ffffff";

    /*change circle position*/
    document.querySelector("#circle3").style.marginLeft = modeLabel.textContent === "Normal" ? "-6vh" : "-3vh";
});

/*Add Card Button*/
addCard.addEventListener("click", ()=> {
    /*Alguma coisa true */
})
