function genertateId(m) {
    return Math.round(Math.random()*m)
}
class TodoItem {
    static all = [];
    constructor(data){
        this.title = data.title;
        this.description = data.description;
        this.timestamp = data.timestamp;

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
            <h2>${this.title}</h2>
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

        if (this.isDone) {
            $(`#doneList .todos`).append(this.node);
        } else {
            $(`#taskList .todos`).append(this.node);
        }
    }
}

new TodoItem({
    title: "Web design",
    description:"create to do and modal with good design",
    timestamp:'11:59 PM'
}).show();