const menuButton = document.querySelector(".menu-button");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    menuButton.addEventListener("click", () => {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});