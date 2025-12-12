(() => {
    const grid = document.querySelector(".bg-grid");
    if (!grid) return;

    // Don’t run on touch devices (avoids weirdness on mobile)
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const SIZE = 100;
    let cols = 0;
    let cells = [];

    function build() {
        grid.innerHTML = "";
        cols = Math.ceil(window.innerWidth / SIZE);
        const rows = Math.ceil(window.innerHeight / SIZE);
        grid.style.gridTemplateColumns = `repeat(${cols}, ${SIZE}px)`;
        grid.style.gridTemplateRows = `repeat(${rows}, ${SIZE}px)`;

        const frag = document.createDocumentFragment();
        cells = [];

        for (let i = 0; i < cols * rows; i++) {
            const cell = document.createElement("div");
            cell.className = "bg-cell";
            cells.push(cell);
            frag.appendChild(cell);
        }
        grid.appendChild(frag);
    }

    let last = -1;
    let lastTime = 0;

    function light(e) {
        const now = performance.now();
        if (now - lastTime < 12) return; // tiny throttle
        lastTime = now;

        const c = Math.floor(e.clientX / SIZE);
        const r = Math.floor(e.clientY / SIZE);
        const idx = r * cols + c;

        if (idx === last || !cells[idx]) return;
        last = idx;

        const cell = cells[idx];
        cell.classList.add("lit");
        setTimeout(() => cell.classList.remove("lit"), 180);
    }

    build();
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", light);
})();
