function isRoot(node) {
    return node.parentNode.nodeName == "#document-fragment"
}

function getAncestorTags(node) {
    let ancestorTags = []
    while (true) {
        if (isRoot(node)) {
            break}
        node = node.parentNode
        ancestorTags.push(node.nodeName.toLowerCase())
    }
    return ancestorTags
}

function hasChildren(node) {
    return node.firstChild
}

function extractTags(node) {

    let tagPairs = []
    let decendant = node.firstChild
    while (decendant) {
        if (!hasChildren(decendant)) {
            let text = decendant.data
            let ancestorTags = getAncestorTags(decendant)
            tagPairs.push([text, ancestorTags])
        }
        let recursiveTagPair = extractTags(decendant)
        tagPairs.push(recursiveTagPair)
        decendant = decendant.nextSibling
    }
    tagPairs = tagPairs.flat()
    return tagPairs
}

function splitOnSpace(text) {
    let textArray = text.split(' ')
    for (var i in textArray) {
        let word = textArray[i]
        if (!word) {textArray.splice(i, 1)}
    }
    return textArray
}

function expandTagPairs(words, tags) {
    let tagPairs = []
    for (var i in words) {
        let word = words[i]
        tagPairs.push([word, tags])
    }
    return tagPairs
}

function formatExtract(extractArray) {
    let formattedPairs = []
    for (let i = 0; i < extractArray.length; i += 2) {
        let words = splitOnSpace(extractArray[i])
        let tags = extractArray[i+1]
        let tagPairs = expandTagPairs(words, tags)
        formattedPairs = formattedPairs.concat(tagPairs)
    }
    return formattedPairs
}

function deconstructElement(elementString) {
    let elementNode = $.parseHTML(elementString)[0]
    let tagPairs = extractTags(elementNode)
    return formatExtract(tagPairs)
}

function addTag(tagPairs, newTag) {
    let updatedPairs = []
    for (var i in tagPairs) {
        let pair = tagPairs[i]
        let word = pair[0]
        let tags = pair[1]
        let updatedTags = tags.concat(newTag)
        updatedPairs.push([word, updatedTags])
    }
    return updatedPairs
}

function constructTagString(tagPair) {
    let word = tagPair[0]
    let tags = tagPair[1]
    let prefix = ""
    let suffix = ""
    for (i in tags) {
        let tag = tags[i]
        let openTag = `<${tag}>`
        let closeTag = `</${tag}>`
        prefix = prefix + openTag
        suffix = closeTag + suffix
    }
    let tagString = prefix + word + suffix
    return tagString
}

// To-do: Rename things. Wtf is a formatted pair.
// To-do: factor out the removing the o tag from tag pairs
function reconstructElement(tagPairs) {
    let updatedPairs = addTag(tagPairs, 'span')
    let reconstructedElement = ''
    for (var i in updatedPairs) {
        let pair = updatedPairs[i]
        let word = pair[0]
        let tags = pair[1]

        let elementString = word + ' '
        for (var ii in tags) {
            let tag = tags[ii]
            if (tag == "p") {continue}
            let openingTag = `<${tag}>`
            let closingTag = `</${tag}>`
            elementString = openingTag + elementString + closingTag    
        }
        reconstructedElement = reconstructedElement + elementString + " "
    }
    return reconstructedElement
}

// After, make the homepage. 