const tooltip = document.getElementById("tooltip");

// find all posters with a tooltip attribute
const tiles = document.querySelectorAll(".tile");

tiles.forEach(tile => {
    const text = tile.getAttribute("data-tooltip");

    if (!text) return;

    tile.addEventListener("mousemove", (e) => {
        tooltip.textContent = text;
        tooltip.style.opacity = 1;
        tooltip.style.left = e.clientX + 12 + "px";
        tooltip.style.top = e.clientY + 12 + "px";
    });

    tile.addEventListener("mouseleave", () => {
        tooltip.style.opacity = 0;
    });
});
