function  maxItemAssociation(transactions) {

    // Составляем таблицу частоты появления товара
    let frequencies = []
    transactions.forEach(transaction => {
        transaction.forEach(item => {
            let found = frequencies.find(f => f.name === item)
            if (found) {
                found.count++
                transaction.forEach(t => {
                    if (!found.associations.includes(t)) found.associations.push(t)
                })
            } else {
                frequencies.push({name: item, count: 1, associations: transaction})
            }
        })
    })

    // Убираем из таблицы значения покупок меньше 2 и сортируем в порядке убывания
    frequencies = frequencies
        .filter(f => f.count > 1)
        .sort((a, b) => b.count - a.count)

    // Выделяем первую максимальную ассоциацию из списка
    return frequencies[0] ? frequencies[0].associations.sort() : []
}


// Тесты
const transactions = [
    ['q', 'w', 'a'],
    ['a', 'b'],
    ['a', 'c'],
    ['q', 'e'],
    ['q', 'r'],
]

const transactions2 = [
    ['a', 'b'],
    ['a', 'c'],
    ['d', 'e'],
]

console.log(maxItemAssociation(transactions))
console.log(maxItemAssociation(transactions2))