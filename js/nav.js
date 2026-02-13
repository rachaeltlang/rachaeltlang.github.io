// mobile drawer nav initializer
// called after header.html has been injected into the page

(function () {
    function initNav() {
        const toggle = document.querySelector(".nav-toggle");
        const drawer = document.querySelector(".nav-drawer");
        const overlay = document.querySelector(".nav-overlay");

        // if the page/header doesn't have the new nav yet, do nothing
        if (!toggle || !drawer || !overlay) return;

        const closeButtons = drawer.querySelectorAll("[data-nav-close]");
        const closeOnClickLinks = drawer.querySelectorAll("a");

        const setOpen = (open) => {
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

            drawer.hidden = false;
            overlay.hidden = false;

            document.documentElement.classList.toggle("nav-open", open);
            document.body.classList.toggle("nav-open", open);

            if (open) {
                const first = drawer.querySelector("a, button, [tabindex]:not([tabindex='-1'])");
                first && first.focus();
            } else {
                toggle.focus();
            }
        };

        // toggle click
        toggle.addEventListener("click", () => {
            const isOpen = toggle.getAttribute("aria-expanded") === "true";
            setOpen(!isOpen);
        });

        // overlay and explicit close buttons
        overlay.addEventListener("click", () => setOpen(false));
        closeButtons.forEach((btn) => btn.addEventListener("click", () => setOpen(false)));

        // close after tapping a link (good UX on mobile)
        closeOnClickLinks.forEach((a) => a.addEventListener("click", () => setOpen(false)));

        // escape closes
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") setOpen(false);
        });

        // start closed (in case HTML shipped without hidden)
        setOpen(false);

        // mark current page in drawer + header
        const path = window.location.pathname.replace(/\/$/, "");
        document.querySelectorAll(".nav-drawer a, .header-nav a").forEach((a) => {
            const href = a.getAttribute("href");
            if (!href) return;

            // normalize href to compare
            const link = new URL(href, window.location.origin).pathname.replace(/\/$/, "");
            if (link === path) a.setAttribute("aria-current", "page");
        });
    }

    // expose globally so layout.js can call after injecting header
    window.initNav = initNav;
})();