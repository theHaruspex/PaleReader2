// Todo: Rewrite code so as to use JQuery DOM nodes

`<p style="text-align:right;"><strong> </strong><a href="https://palewebserial.wordpress.com/2020/05/09/lost-for-words-1-1/"><strong>Next Chapter</strong></a></p>
<hr />
<p>Louise&#8217;s eyes welled with moisture as an animal cry shook her house, and she found herself shivering as it died away.  She shivered in a very different way when she wiped at one eye and her fingertips came away crimson with blood.</p>
<p><i>It’s the hallucinations</i>, she told herself.  She winced and held a hand to her lower back as she rose to a standing position, blinking the blood out of her eyes.  <i>Has to be.</i></p>
`

function getFirstTag(elementString) {
    let beginningIndex = elementString.search("<")
    let endingIndex = elementString.search(">") + 1
    return elementString.substring(beginningIndex, endingIndex)
}

function deconstructElement(elementString) {
    let elementsArray = []
    let activeTags = []
    let wordsArray = elementString.split(" ")

    for (var i in wordsArray) {
        let word = wordsArray[i]

        if (word.startsWith('<')) {
            let openingTag = getFirstTag(word)
            let newWord = word.replace(openingTag, '')
            elementsArray.push([
                newWord,
                [openingTag].concat(activeTags)
            ])           
            activeTags.push(openingTag) 
        }

        else if (word.endsWith('>')) {
            let closingTag = getFirstTag(word)
            let openingTag = closingTag.replace('/', '')
            let newWord = word.replace(closingTag, '')
            elementsArray.push([
                newWord,
                [].concat(activeTags)
            ])
            let targetIndex = activeTags.indexOf(openingTag)
            activeTags.splice(targetIndex)
        }
        
        else {
            elementsArray.push([
                word,
                [].concat(activeTags)
            ])
        }
    }
    return elementsArray
}

function addTag(elementsArray, tag) {
    let updatedElements = []
    for (var i in elementsArray) {
        let element = elementsArray[i]
        let word = element[0]
        let tags = element[1]
        tags.push(tag)
        updatedElements.push([
            word,
            tags
        ])
    }
    return updatedElements
}

function constructTagString(tagsArray) {
    let openingTagString = ""
    let closingTagString = ""
    for (i in tagsArray) {
        let tag = tagsArray[i]
        if (tag == "<p>") {continue}
        let closingTag = tag.slice(0, 1) + "/" + tag.slice(1)
        openingTagString = openingTagString + tag
        closingTagString = closingTag + closingTagString
    }
    return openingTagString + "#" + closingTagString
}

function reconstructElement(elementsArray) {
    let elementStringsArray = []
    for (var i in elementsArray) {
        let element = elementsArray[i]
        let word = element[0] + " "
        let tags = element[1]
        let tagTemplate = constructTagString(tags)
        let tagString = tagTemplate.replace('#', word)
        elementStringsArray.push(tagString)
    }
    return elementStringsArray
}

function splitElement(inputText) {
    let elements = deconstructElement(inputText)
    let updatedElements = addTag(elements, "<span>")
    let updatedStringsArray = reconstructElement(updatedElements)
    return updatedStringsArray
}

// But what if it's an image, or style?