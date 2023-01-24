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

function renderPage(elements) {
    while (elements.length > 0) {
        let element = elements.shift();
        $(".content").last().append(element);
        
        if (isOverflowing()) {
            $(".content").children().last().remove();
            $("#chapterContainer").append(newPage);
            $(".content").last().append(element);
        };
    }
}

$(document).ready(function() {
    let paleElements = []
    fetch('resources/pale.html')
        .then(response => response.text())
        .then(text => paleElements = text.split('\n'))
        .then(() => renderPage(paleElements));
})