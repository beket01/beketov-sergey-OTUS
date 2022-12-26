class HelloComponent extends HTMLElement {

    // Callback при подключении компонента. Вывдоим атрибут
    connectedCallback() {
        alert(this.getAttribute('text'))
    }

    // Что мы рендерим
    render() {
        this.textContent = 'I am custom component'
    }
}

//Регистрация компонента
window.customElements.define('hello-component', HelloComponent)