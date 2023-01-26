const inputText = "<p>Lorem ipsum <i>set amit</i> lenore des.</p>"

function isClosingTag(elementString, index) {
    return (
        elementString[index] == "<"
        && elementString[index+1] == "/"
)}

function isOpeningTag(elementString, index) {
    return (
        elementString[index] == "<"
        && !isClosingTag(elementString, index)
)}

function getFirstTag(elementString) {
    let beginningIndex = elementString.search("<")
    let endingIndex = elementString.search(">") + 1
    return elementString.substring(beginningIndex, endingIndex)
}

function identifyTags(elementString) {
    // This is a very long function...
    let activeTags = []
    updatedElementString = elementString
    for (let i = 0; i < elementString.length; i++) {

        if (isClosingTag(elementString, i)) {
            let closingTag = getFirstTag(updatedElementString)
            let openingTag = closingTag.replace("/", "")

            let index = activeTags.indexOf(openingTag)
            activeTags.splice(index, 1)

            updatedElementString = updatedElementString.replace(closingTag, '')
        }
        
        else if (isOpeningTag(elementString, i)) {
            tag = getFirstTag(updatedElementString)
            activeTags.push(tag)
            updatedElementString = updatedElementString.replace(tag, '')
        }
    }
}


identifyTags(inputText)