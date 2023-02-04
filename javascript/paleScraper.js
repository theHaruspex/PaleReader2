
const apiURL = "https://public-api.wordpress.com/rest/v1.1/sites/www.palewebserial.wordpress.com/posts/slug:"
const bloodRunColdSlug = "blood-run-cold-0-0"

function constructURL(chapterSlug) {
    return apiURL + chapterSlug
}


function getNextChapterSlug(json) {
    let chapterContents = $.parseHTML(json.content)
    let nextChapterElement = $('a:contains("Next Chapter")', chapterContents)[0]
    let nextChapterURL = nextChapterElement.href
    console.log(nextChapterURL)
    let nextChapterSlug = nextChapterURL
        .split('/')
        .slice(-2, -1)
        [0]
    console.log(nextChapterSlug)
    return nextChapterSlug
}



function logChapterSlugs() {
    let url = constructURL(bloodRunColdSlug)
    for (let i = 0; i < 100; i++) {
        fetch(url)
            .then((response) => response.json())
            .then((json) => getNextChapterSlug(json))
            .then((chapterSlug) => constructURL(chapterSlug))
            .then((apiURL) => (url = apiURL))
    }
}

console.log(1)
logChapterSlugs()




    

