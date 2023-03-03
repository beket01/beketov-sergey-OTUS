import data from "../data.json"
import "./my-tree.js"

function drawTree(data) {
    document.querySelector("my-tree").setAttribute("data", JSON.stringify(data))
}

drawTree(data)
