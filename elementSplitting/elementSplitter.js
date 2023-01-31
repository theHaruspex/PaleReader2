function getFirstTag(elementString) {
    let beginningIndex = elementString.search("<")
    let endingIndex = elementString.search(">") + 1
    return elementString.substring(beginningIndex, endingIndex)
}

function extractTags(elementString) {
    let extractedTags = []
    let activeTags = []
    let wordsArray = elementString.split(" ")

    for (var i in wordsArray) {
        let word = wordsArray[i]

        if (word.startsWith('<')) {
            let openingTag = getFirstTag(word)
            let newWord = word.replace(openingTag, '')
            extractedTags.push([
                newWord,
                [openingTag].concat(activeTags)
            ])           
            activeTags.push(openingTag) 
        }

        else if (word.endsWith('>')) {
            let closingTag = getFirstTag(word)
            let openingTag = closingTag.replace('/', '')
            let newWord = word.replace(closingTag, '')
            extractedTags.push([
                newWord,
                [].concat(activeTags)
            ])
            let targetIndex = activeTags.indexOf(openingTag)
            activeTags.splice(targetIndex)
        }
        
        else {
            extractedTags.push([
                word,
                [].concat(activeTags)
            ])
        }
    }
}


const inputText = "<p>Lorem ipsum <i>set amit</i> lenore des.</p>"
extractTags(inputText)