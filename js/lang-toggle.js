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
})()

