function genertateId(m) {
    return Math.round(Math.random()*m)
}
class TodoItem {
    static all = [];
    static active;

    constructor(data){
        this.title = data.title;
        this.description = data.description;
        this.timestamp = data.timestamp;
        this.priority = data.priority;

        this.id = genertateId(500);
        
        while (true) {
            if (TodoItem.all.find(e => e.id == this.id)) {
                this.id = genertateId(500);
            } else {
                break;
            }
        }

        this.node = null;
        this.isDone = false;

        TodoItem.all.push(this);
    }

    show() {
        let html = `
        <li>
        <!-- Top -->
        <div>
            <h2>${this.title} ( ${this.priority} )</h2>
            <div class="btns">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 45Q19.55 45 15.7 43.375Q11.85 41.75 9.05 38.95Q6.25 36.15 4.625 32.3Q3 28.45 3 24Q3 19.5 4.625 15.7Q6.25 11.9 9.05 9.05Q11.85 6.2 15.7 4.575Q19.55 2.95 24 2.95Q28.5 2.95 32.3 4.575Q36.1 6.2 38.95 9.05Q41.8 11.9 43.425 15.7Q45.05 19.5 45.05 24Q45.05 28.45 43.425 32.3Q41.8 36.15 38.95 38.95Q36.1 41.75 32.3 43.375Q28.5 45 24 45ZM21 33.7 35.5 19.2 32.3 15.95 21 27.25 15.5 21.75 12.3 25Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M12.75 43Q10.8 43 9.45 41.675Q8.1 40.35 8.1 38.4V10.95H5.25V6.4H16.6V4.05H31.4V6.4H42.8V10.95H39.95V38.4Q39.95 40.35 38.575 41.675Q37.2 43 35.3 43ZM17.85 34.55H21.55V14.7H17.85ZM26.5 34.55H30.25V14.7H26.5Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M41.15 29.5 36.5 24.85 37.9 23.45Q38.5 22.85 39.475 22.85Q40.45 22.85 41.1 23.45L42.55 24.9Q43.15 25.6 43.15 26.55Q43.15 27.5 42.55 28.1ZM23.25 42.75V38.1L34.25 27.1L38.9 31.75L27.9 42.75ZM5.35 32.8V28.15H22.65V32.8ZM5.35 23.4V18.8H30.5V23.4ZM5.35 14.05V9.5H30.5V14.05Z"/></svg>
            </div>
        </div>
        <!-- Bottom -->
        <div>
            <h5>${this.description}</h5>
            <code>${this.timestamp}</code>
        </div>
        </li>`
        this.node = $(html);
        let scope = this;

        let btns = this.node.find('svg');
        
        $(btns[0]).bind('click', function (e) {
            scope.isDone = !scope.isDone;
            updateAll();
        });
        $(btns[1]).bind('click', function (e) {
            scope.delete();
            updateAll();
        });
        $(btns[2]).bind('click', function (e) {
            TodoItem.active = scope;
            behavior = 1;
            open();
        });

        if (this.isDone) {
            $(`#doneList .todos`).append(this.node);
        } else {
            $(`#taskList .todos`).append(this.node);
        }
    }
    delete(){
        let i = TodoItem.all.findIndex(e => e.id == this.id);
        TodoItem.all.splice(i,1);
        this.node.remove();
        
        delete this;
    }
    set(data){
        this.title = data.title;
        this.description = data.description;
        this.timestamp = data.timestamp;
        this.priority = data.priority;
        if (data.id !== undefined) {
            this.id = data.id;
        }
        if (data.isDone !== undefined) {
            this.isDone = data.isDone;
        }
    }
    toJSON(){
        return {
            title: this.title,
            description: this.description,
            timestamp: this.timestamp,
            priority: this.priority,
            id: this.id,
            isDone: this.isDone
        }
    }
}

var title=$('#title');
var desc=$('#desc');
var pr= $('#pr');
var date=$('#date');

function updateAll() {
    $('.todos').empty();
    if ($("#sort").val() == 'pr') {
        TodoItem.all = TodoItem.all.sort(function(a,b) {
            return b.priority - a.priority;
        })  
    }

    for (let i = 0; i < TodoItem.all.length; i++) {
        const item = TodoItem.all[i];
        item.show();
    }
    save();
}
function save(){
    let allTodos = TodoItem.all.map(e => e.toJSON());
    localStorage.setItem('all', JSON.stringify(allTodos));
}
function load() {
    if (localStorage.getItem('all')) {
        let allTodos = JSON.parse(localStorage.getItem('all'));
        for (let i = 0; i < allTodos.length; i++) {
            const todo = allTodos[i];
            new TodoItem(todo).set(todo);
        }     
    }
    updateAll();
}
$(function() {
    load();
})

function open() {
    if (behavior == 0) {
        $("#t").text("Add Todo")
    } else {
        $("#t").text("Edit Todo")
    }
    empty();
    $('.addTodoContainer').addClass("show");
}
let behavior = 0;
function confirm() {
    if (title.val() == '') {
        alert('Title is required!')
        return;
    }
    if (desc.val() == '') {
        alert('Description is required!')
        return;
    }

    if (behavior == 0) {
        new TodoItem(getData());
    } else {
        TodoItem.active.set(getData());
        behavior = 0;
    }
    updateAll();

    empty();
}
function cancel() {
    empty();
}
function empty() {
    $('.addTodoContainer').removeClass("show");
    title.val('');
    desc.val('');
    pr.val('3');
    date.val(Date());
    
}
function getData() {
    return {
        title: title.val(),
        description: desc.val(),
        timestamp: date.val() || Date(),
        priority: pr.val()
    }
}

$('i').bind('click', function (e) {
    open();
});

$("#cancel").bind('click', function (e) {
    cancel();
});
$("#confirm").bind('click', function (e) {
    confirm();
});
$(document).bind('keypress', function (e) {
    if (e.originalEvent.shiftKey == true) {
        return;
    }
    if (!$('.show').length) {
        return;
    }
    if(e.originalEvent.key=='Enter'){
        confirm();
    }
    
});

