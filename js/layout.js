// javascript code to load header and footer in corresponding language
// called in <head> of each file/page

document.addEventListener("DOMContentLoaded", () => {
    // detect language from <html lang="...">
    const htmlLang = document.documentElement.lang || "en";

    // map HTML lang codes to folder names
    // (directories you actually have: /, /zh, /es)
    let langFolder = "";

    if (htmlLang.startsWith("en")) {
        langFolder = "";          // English lives at root: /
    } else if (htmlLang.startsWith("zh")) {
        // zh, zh-Hant, zh-TW, etc. → /zh
        langFolder = "zh";
    } else if (htmlLang.startsWith("es")) {
        // es, es-MX, es-ES, etc. → /es
        langFolder = "es";
    } else {
        // fallback: no language folder
        langFolder = "";
    }

    const langPrefix = langFolder ? `/${langFolder}` : "";

    // header path: /header.html, /zh/header.html, /es/header.html
    fetch(`${langPrefix}/header.html`)
        .then((response) => response.text())
        .then((html) => {
            const headerElement = document.getElementById("header");
            if (headerElement) headerElement.innerHTML = html;
        })
        .catch((err) => {
            console.error("Error loading header:", err);
        });

    // footer path: /footer.html, /zh/footer.html, /es/footer.html
    fetch(`${langPrefix}/footer.html`)
        .then((response) => response.text())
        .then((html) => {
            const footerElement = document.getElementById("footer");
            if (footerElement) footerElement.innerHTML = html;
        })
        .catch((err) => {
            console.error("Error loading footer:", err);
        });
});

// language toggle
(function () {
    window.switchLanguage = function (lang) {
        // normalize requested language to folder-style codes
        let targetLang = lang || "en";

        if (targetLang.startsWith("zh")) {
            targetLang = "zh";
        } else if (targetLang.startsWith("es")) {
            targetLang = "es";
        } else {
            targetLang = "en";
        }

        // get current URL
        const url = new URL(window.location.href);

        // split the path into parts via /
        const parts = url.pathname.split("/").filter(Boolean);

        // remove current language prefix if it exists
        if (["zh", "es"].includes(parts[0])) {
            parts.shift();
        }

        // build the new path based on the selected language
        let newPath;
        if (parts.length === 0) {
            // homepage
            newPath = targetLang === "en" ? "/" : `/${targetLang}/`;
        } else {
            newPath =
                targetLang === "en"
                    ? "/" + parts.join("/")
                    : "/" + targetLang + "/" + parts.join("/");
        }

        // redirect to the new URL
        window.location.href = newPath + url.search + url.hash;
    };
})();
