const app = {

    // Поиск уникального селектора CSS
    getPath: function (node, selector = '') {
        let parentNode = node.parentNode

        // Если есть родитель, то проваливаемя к нему
        if(parentNode != null && parentNode.localName !== 'html') {
            selector = this.getPath(parentNode, selector).concat(' ')
        }

        selector = selector.concat(node.localName)

        // Подставляем в селектор класс или id
        if (node.className && node.className !== '') {
            selector = selector.concat('.', node.className.replace(/ /g, '.'))
        } else if (node.id && node.id !== '') {
            selector = selector.concat('#', node.id)
        }

        // Подставляем в селектор child
        if (parentNode && parentNode.localName !== 'html' && parentNode.childElementCount > 1 && parentNode.firstChild === node) {
            selector = selector.concat(':first-child')
        } else if (parentNode && parentNode.localName !== 'html' && parentNode.childElementCount > 1 && parentNode.lastChild === node) {
            selector = selector.concat(':last-child')
        } else if (parentNode && parentNode.localName !== 'html' && parentNode.childElementCount > 1) {
            // Ищем номер дочернего элемента
            let childNum = 0
            for (let i = 0; i < parentNode.childElementCount; i++) {
                if(parentNode.children[i] === node) {
                    childNum = i + 1
                }
            }
            selector = selector.concat(`:nth-child(${childNum})`)
        }

        return selector;
    }
}

module.exports = app;
