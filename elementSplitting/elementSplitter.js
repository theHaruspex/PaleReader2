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
    let elementString = ""
    for (var i in elementsArray) {
        let element = elementsArray[i]
        let word = element[0] + " "
        let tags = element[1]
        let tagTemplate = constructTagString(tags)
        let tagString = tagTemplate.replace('#', word)
        elementString = elementString + tagString
    }
    return elementString
}

function splitElement(inputText) {
    let elements = deconstructElement(inputText)
    let updatedElements = addTag(elements, "<span>")
    let updatedString = reconstructElement(updatedElements)
    return updatedString
    }



const inputText = "<p>Lorem ipsum <i>set amit</i> lenore des.</p>"
const outputText = splitElement(inputText)
console.log(inputText)
console.log(outputText)