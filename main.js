import db from './db.js';
import Items from './components/Items.js';
(async function() {

    let DB_KEY = 'kanban';

    let data = await db.get(DB_KEY) || {};
    console.log('data', data);

    const todoDiv = document.querySelector("#todo");
    const doingDiv = document.querySelector("#doing");
    const doneDiv = document.querySelector("#done");
    const addTodoInput = document.querySelector("#addTodo");
    const addTodoBtn = document.querySelector("#addTodoBtn");
    let todoItems = new Items(todoDiv, data['todo'] || [], async (todo) => {
        data['todo'] = todo;
        await db.set(DB_KEY, data);
    });
    let doingItems = new Items(doingDiv, data['doing'] || [], async (doing) => {
        data['doing'] = doing;
        await db.set(DB_KEY, data);
    });
    let doneItems = new Items(doneDiv, data['done'] || [], async (done) => {
        data['done'] = done;
        await db.set(DB_KEY, data);
    });

    document.querySelector("#divider1 .leftArrow").addEventListener("click", function() {
        todoItems.appendItems(doingItems.removeSelectItems());
    });

    document.querySelector("#divider1 .rightArrow").addEventListener("click", function() {
        doingItems.appendItems(todoItems.removeSelectItems());
    });
    
    document.querySelector("#divider2 .leftArrow").addEventListener("click", function() {
        doingItems.appendItems(doneItems.removeSelectItems());
    });

    document.querySelector("#divider2 .rightArrow").addEventListener("click", function() {
        doneItems.appendItems(doingItems.removeSelectItems());
    });

    addTodoBtn.addEventListener("click", function() {
        let newItemStr = addTodoInput.value.trim();
        addTodoInput.value = "";

        if (newItemStr) {
            todoItems.appendItem(newItemStr);
        }
    });



})();
