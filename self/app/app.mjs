

const input = document.getElementsByClassName('new-todo')[0]
const list = document.querySelector('.todo-list')
const divError = document.createElement('div')
divError.classList.add('error')

// im JSON.parse ( String [{Objekte}] || "[]") sind beides strings
//holt Json von localstorage parsen in [{text:"value"}
const todos = JSON.parse(localStorage.getItem("todos") || "[]")

for (const todo of todos){
    console.log(todo)
    //*todoo.text => key  greift auf das Value zu vom geparsten todos
    const li = document.createElement('li')
    li.innerHTML = `<div class=view>
            <input class=toggle />
            <label>${todo.text}</label>
            <button class="destroy"></button>
            </div>`
    list.appendChild(li)
    //*****Anzeige aller Todos die sich bereits im  LocalStorage befinden****

    li.querySelector('.destroy').addEventListener('click', () => {
        li.remove()

    })
}

//***** Kreiiren von neuen Todos *****
input.addEventListener('keyup', (ev) => {
    if (ev.code === 'Enter') {
        const text = input.value



        if (text.length === 0) {
            divError.innerText = "Text darf nicht leer sein!"
            input.parentNode.appendChild(divError)
        } else {
            divError.remove()
            const li = document.createElement('li')
            li.innerHTML = `<div class=view>
            <input class=toggle />
            <label>${text}</label>
            <button class="destroy"></button>
            </div>`
            list.appendChild(li)
            //******Todos in LocalStorage speichern ******
            //key und value sind das gleiche wenn nur ein objekt gespeichert wird
            todos.push({text})
            localStorage.setItem("todos", JSON.stringify(todos))

            input.value = ""
            //spricht alle buttons mit klasse .destroy an
            li.querySelector('.destroy').addEventListener('click', () => {
                li.remove()

            })
        }


    }
})


