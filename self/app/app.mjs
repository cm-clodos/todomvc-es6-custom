const input = document.querySelector('.new-todo')
const list = document.querySelector('.todo-list')
const errorDiv = document.createElement('div')
errorDiv.classList.add('error')

class View {
    createListItem(text) {
        const li = document.createElement('li')
        li.innerHTML = `<div class="view">
      <input class="toggle" />
      <label>${text}</label>
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
        this.todos.push(todo)
        this.storeTodos()
    }
}

const view = new View()
const store = new Store()

const todos = store.loadAllTodos();
for (const todo of todos) {
    const li = view.createListItem(todo.text)
    list.appendChild(li)
    li.querySelector('.destroy').addEventListener('click', () => {
        li.remove()
    })
}


input.addEventListener('keyup', (ev) => {
    if (ev.code === 'Enter') {
        const text = input.value

        if (text.length === 0) {
            errorDiv.innerText = "Text darf nicht leer sein!"
            input.parentNode.appendChild(errorDiv)
        } else {
            errorDiv.remove()
            const li = view.createListItem(text)
            list.appendChild(li)
            store.add({text})

            input.value = ''

            li.querySelector('.destroy').addEventListener('click', () => {
                li.remove()
            })
        }
    }
})
