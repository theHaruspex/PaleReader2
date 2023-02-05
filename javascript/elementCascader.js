function calcDepth(rootElement) {
    let children = $(rootElement).children()
    let depth = 0
    while (children.length > 0) {
        children = children.children()
        depth += 1
    }
    return depth
} 

function traverseDOM(node, func) {
    console.log(node.innerText)
    node = node.firstChild
    while (node) {
        traverseDOM(node, func)
        node = node.nextSibling
    }
}

function deconstructElement(elementString) {
    let elementDepth = calcDepth(elementString)
    let elementNode = $.parseHTML(elementString)[0]
    let parentTag = elementNode.nodeName.toLowerCase()
    traverseDOM(elementNode)    
}

const sampleElement = "<span>There's a <strong>thing behind</strong> the thing, <em>even <strong>though</strong> I can't see it.</em></span>"
let item = deconstructElement(sampleElement)
console.log(item)