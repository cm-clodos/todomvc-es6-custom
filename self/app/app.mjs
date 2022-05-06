const input = document.querySelector('.new-todo')
const list = document.querySelector('.todo-list')
const errorDiv = document.createElement('div')
errorDiv.classList.add('error')

class View {
    constructor(store) {
        this.store = store
        list.addEventListener("click", (event) =>{
            if (event.target.classList.contains('destroy')){
                const id = Number(event.target.closest('[data-id]').dataset.id)
                this.store.remove(id)
                event.target.closest('li').remove()
            }
            })
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
const store = new Store()
const view = new View(store)


const todos = store.loadAllTodos();
for (const todo of todos) {
    const li = view.createListItem(todo)
    list.appendChild(li)

}


input.addEventListener('keyup', (ev) => {
    if (ev.code === 'Enter') {
        const text = input.value

        if (text.length === 0) {
            errorDiv.innerText = "Text darf nicht leer sein!"
            input.parentNode.appendChild(errorDiv)
        } else {
            errorDiv.remove()
            const newId = store.add({text})
            const li = view.createListItem({id:newId, text})
            list.appendChild(li)


            input.value = ''


        }
    }
})
