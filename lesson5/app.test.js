/**
 * @jest-environment jsdom
 */

const app = require('./app')

document.body.innerHTML = `
<table style="width:100%">
  <tr>
    <th class="header">Firstname</th>
    <th class="header">Lastname</th> 
    <th class="header">Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
  <tr>
    <td>John</td>
    <td>Doe</td>
    <td>80</td>
  </tr>
</table>
  `;

let node = document.querySelectorAll('th.header')[2]

test('must be a String', () => {
    expect(typeof app.getPath(node)).toBe('string')
});

test('not empty string', () => {
    expect(app.getPath(node).length).not.toBe(0)
})

test('only one node', () => {
    let selector = app.getPath(node)

    expect(document.querySelectorAll(selector).length).toBe(1)
})

test('is same node', () => {
    let selector = app.getPath(node)

    expect(document.querySelector(selector)).toBe(node)
})
