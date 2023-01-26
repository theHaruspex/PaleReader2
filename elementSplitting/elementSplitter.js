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
    console.log("running gFT()")
    console.log(`elementString = ${elementString}`)
    let beginningIndex = elementString.search("<")
    let endingIndex = elementString.search(">") + 1
    return elementString.substring(beginningIndex, endingIndex)
}


function updateTags(tagsArray, elementString) {
    // Update name.
    let closingTag = getFirstTag(elementString)
    elementString = elementString.replace(closingTag, '')

    let openingTag = closingTag.replace("/", "")
    let index = tagsArray.indexOf(openingTag)
    tagsArray.splice(index, 1)
    return [tagsArray, elementString]
}


function identifyTags(elementString) {
    // Combine activeTags and element string indo dict.
    let activeTags = []

    let originalString = elementString
    let updatedString = elementString
    for (let i = 0; i < originalString.length; i++) {

        console.log(originalString[i])
        console.log(updatedString)
        console.log(activeTags)

        if (isClosingTag(elementString, i)) {
            activeTags, updatedString = updateTags(activeTags, updatedString)
        }
        
        else if (isOpeningTag(elementString, i)) {
            tag = getFirstTag(updatedString)
            activeTags.push(tag)
            updatedString = updatedString.replace(tag, '')
        }
    }
}


identifyTags(inputText)