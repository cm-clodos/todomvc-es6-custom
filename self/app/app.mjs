

class View {
    constructor(store) {
        this.store = store
        this.input = document.querySelector('.new-todo')
        this.list = document.querySelector('.todo-list')
        this.errorDiv = document.createElement('div')
        this.errorDiv.classList.add('error')

        this.input.addEventListener('keyup', (ev) => {
            if (ev.code === 'Enter') {
                const text = this.input.value
                this.onAddItem(text)

                }

        })

        this.list.addEventListener("click", (event) =>{
            if (event.target.classList.contains('destroy')){
                const id = Number(event.target.closest('[data-id]').dataset.id)
                this.onRemoveItem(id)
                event.target.closest('li').remove()
            }
            })
    }
    renderItem(item){
        this.errorDiv.remove()
        this.input.value = ''
        const li = view.createListItem(item)
        this.list.appendChild(li)
    }
    renderError(text){
        this.errorDiv.innerText =
        this.input.parentNode.appendChild(this.errorDiv)
    }
    setOnAddItemCallback(fn){
        this.onAddItem = fn
    }

    setOnRemoveItemCallback(fn){
        this.onRemoveItem = (fn)
    }

    createListItem(item) {
        const li = document.createElement('li')
        li.innerHTML = `<div class="view" data-id="${item.id}" >
      <input class="toggle" />
      <label>${item.text}</label>
      <button class="destroy" />
      </div>`

        return li
    }

    renderTodos(todos){
        for (const todo of todos) {
            const li = view.createListItem(todo)
            this.list.appendChild(li)
        }
    }
}

class Store {
    #todos

    constructor() {
        this.todos = this.loadAllTodos()
    }

    loadAllTodos() {
        const todos = JSON.parse(localStorage.getItem("todos") || "[]")
        return todos;
    }

    storeTodos() {
        localStorage.setItem("todos", JSON.stringify(this.todos))
    }

    add(todo) {
        todo.id = new Date().getTime()  // unix timestamp
        this.todos.push(todo)
        this.storeTodos()
        return todo.id
    }
    remove(id){
        const itemIdx = this.todos.findIndex(i => i.id === id)
        this.todos.splice(itemIdx, 1)
        this.storeTodos()
    }

}
class Controller {

    constructor(store, view) {
        this.store = store
        this.view = view

        const todos = this.store.loadAllTodos();
        this.view.renderTodos(todos)
        this.view.setOnAddItemCallback((...a) => this.onAddItem(...a))

        this.view.setOnRemoveItemCallback((...a) => this.onRemoveItem(...a))

    }
    onAddItem(text){
        if (text.length === 0) {
            this.view.renderError("Dieser Text darf nicht leer sein")
        }else{
            const newId = this.store.add({text})
            this.view.renderItem({newId, text})
        }
    }
    onRemoveItem(id){
        this.store.remove(id)
    }
}



const store = new Store()
const view = new View(store)
const ctrl = new Controller(store,view)





