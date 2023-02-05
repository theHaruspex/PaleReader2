function getSlug(url) {
    return url
        .split('/')
        .slice(-2, -1)
        [0]
}

function constructArc(arcElement) {
    let arcTitle = arcElement.innerText
    return {
        title: arcTitle,
        chapters: []
    }
}

function constructChapter(chapterElement) {
    let chapterURL = chapterElement.href
    let chapterTitle = chapterElement.innerText
    let chapterSlug = getSlug(chapterURL)
    return {
        title: chapterTitle,
        slug: chapterSlug
    }
}

function constructTOC(tocJSON) {
    let pageContents = $.parseHTML(json.content)
    let tocElements = $('a, strong:contains("Arc"), strong:contains("Prologue ")', pageContents)
    let toc = []
    for (let i = 0; i < tocElements.length; i++) {
        let element = tocElements[i]
        if (!element.href) {
            let arc = constructArc(element)
            toc.push(arc)
        }
        else {
            let chapter = constructChapter(element)
            toc[toc.length - 1]
                .chapters
                .push(chapter)
        }
    }
    return toc
}

function fetchTOC() {
    let apiURL = "https://public-api.wordpress.com/rest/v1.1/sites/www.palewebserial.wordpress.com/posts/slug:table-of-contents"
    fetch(url)
    .then((response) => response.json())
    .then((json) => constructTOC(json))
}





    

