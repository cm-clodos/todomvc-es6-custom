

const input = document.getElementsByClassName('new-todo')[0]
const list = document.querySelector('.todo-list')
const divError = document.createElement('div')
divError.classList.add('error')


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

            input.value = ""
            //spricht alle buttons mit klasse .destroy an
            li.querySelector('.destroy').addEventListener('click', () => {
                li.remove()
            })
        }


    }
})


