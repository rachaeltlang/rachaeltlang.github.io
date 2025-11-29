// javascript code to load header and footer in corresponding language
// called in <head> of each file/page

document.addEventListener("DOMContentLoaded", () => {
    // detect language from <html lang="...">
    const lang = document.documentElement.lang || "en";

    // to construct /(en), /zh, /es
    const langPrefix = lang === "en" ? "" : `/${lang}`;

    // header path: /header.html, /zh/header.html, /es/header.html
    fetch(`${langPrefix}/header.html`)
        .then((response) => response.text())
        .then((html) => {
            const headerElement = document.getElementById("header");
            if (headerElement) headerElement.innerHTML = html;
        });

    // footer path: /footer.html, /zh/footer.html, /es/footer.html
    fetch(`${langPrefix}/footer.html`)
        .then((response) => response.text())
        .then((html) => {
            const footerElement = document.getElementById("footer");
            if (footerElement) footerElement.innerHTML = html;
        });
});

// language toggle
(function () {
    window.switchLanguage = function (lang) {
        // get current URL
        const url = new URL(window.location.href)

        // split the path into parts via /
        const parts = url.pathname.split('/').filter(Boolean)

        // remove current language prefix if it exists
        if (['zh', 'es'].includes(parts[0])) {
            parts.shift()
        }

        // build the new path based on the selected language
        const newPath =
            lang === 'en'
                // english → no folder prefix
                ? '/' + parts.join('/')
                // append zh/ or es/
                : '/' + lang + '/' + parts.join('/')

        // redirect to the new URL
        window.location.href = newPath + url.search + url.hash
    }
})();
