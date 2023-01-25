const inputText = "<p>Lorem ipsum <i>set amit</i> lenore des.</p>"

function isClosingTag(elementString, i) {
    return (
        elementString[i] == "<"
        && elementString[i+1] == "/"
)}

function isOpeningTag(elementString, i) {
    return (
        elementString[i] == "<"
        && !isClosingTag(elementString, i)
)}

function getFirstTag(elementString) {
    let beginningIndex = elementString.search("<")
    let endingIndex = elementString.search(">") + 1
    return elementString.substring(beginningIndex, endingIndex)
}

function identifyTags(elementString) {
    let activeTags = []
    for (let i = 0; i < elementString.length; i++) {

        if (isClosingTag(elementString, i)) {
            let closingTag = getFirstTag(elementString)
            let openingTag = closingTag.replace("/", "")
            let targetIndex = activeTags.indexOf(openingTag)
            activeTags.splice(targetIndex, 1)
            elementString = elementString.replace(closingTag, '')
        }
        
        else if (isOpeningTag(elementString, i)) {
            tag = getFirstTag(elementString)
            activeTags.push(tag)
            elementString = elementString.replace(tag, '')
        }
    }
}


identifyTags(inputText)