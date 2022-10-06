function  maxItemAssociation(transactions) {

    // Составляем таблицу частоты появления товара
    let items = []
    transactions.forEach(transaction => {
        transaction.forEach(item => {
            let found = items.find(i => i.name === item)
            if (found) {
                found.frequency++
                transaction.forEach(t => {
                    if (!found.associationItems.includes(t)) found.associationItems.push(t)
                })
            } else {
                items.push({name: item, frequency: 1, associationItems: [...transaction]})
            }
        })
    })

    // Убираем из таблицы значения покупок меньше 2
    items = items
        .filter(f => f.frequency > 1)

    // Состовляем все возможные ассоциациативные ряды
    let associations = []
    transactions.forEach(transaction => {
        let association = new Set()
        items.forEach(item => {
            if(transaction.includes(item.name)) {
                item.associationItems.forEach(ai => {
                    association.add(ai)
                })
            }
        })
        if(association.size > 0) associations.push(Array.from(association).sort())
    })

    // Сортируем ассоциации по длинне и в алфавитном порядке
    associations.sort((a, b) => {
        if(b.length === a.length) return a.join().localeCompare(b.join())
        return b.length - a.length
    })

    return associations[0]
}


// Тесты
const transactions = [
    ['a', 'b'],
    ['a', 'c'],
    ['q', 'e'],
    ['q', 'r'],
    ['q', 'w', 'a'],
]

const transactions2 = [
    ['e', 'm'],
    ['a', 'b'],
    ['a', 'c'],
    ['d', 'e'],
]

console.log(maxItemAssociation(transactions))
console.log(maxItemAssociation(transactions2))