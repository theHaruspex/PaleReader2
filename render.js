// Adapted from https://stackoverflow.com/questions/9305198/transfer-overflow-from-one-div-to-another

const newPage = `<div class="page"><div class="runningHeader header">Hard Pass - 22.6<hr></div><div class="contentContainer"><div class="content"></div></div></div>`

function getContentContainerHeight() {
    return $(".contentContainer")
        .last()
        .css('height')
        .slice(0, -2);
}

function getContentHeight() {
    return $(".content")
        .last()
        .css("height")
        .slice(0, -2);
}

function isOverflowing() {
    return (getContentContainerHeight() - getContentHeight()) < 0
}

function renderOverflow(element) {
    let updatedElementsArray = splitElement(element)
    for (i in updatedElementsArray) {
        let updatedElement = updatedElementsArray[i]
        $(".content").last().append(updatedElement);
        if (isOverflowing()) {
            $(".content").children().last().remove();
            $("#chapterContainer").append(newPage);
            $(".content").last().append(updatedElement);
        }
    }
}

function renderPage(elements) {
    let title = elements[0]
    console.log(title)
    let content = elements[1]
    $("#chapterHeader").html(title)
    while (content.length > 0) {
        let element = content.shift();
        $(".content").last().append(element);
        if (isOverflowing()) {
            $(".content").children().last().remove();
            renderOverflow(element)
        }
    }
}


$(document).ready(function() {
    let apiURL = "https://public-api.wordpress.com/rest/v1.1/sites/www.palewebserial.wordpress.com/posts"
    let paleElements = []
    fetch(apiURL)
        .then(response => response.json())
        .then(json => extractLatestChapter(json))
        .then(chapter => paleElements = [
            chapter[0],
            chapter[1].split(`\n`)])
        .then(() => renderPage(paleElements));
})