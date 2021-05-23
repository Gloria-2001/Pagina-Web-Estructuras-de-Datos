class Queue {
    constructor() {
        this.values = []
    }
    enqueue(e) {
        // Agrega un elemento a la lista (cola)
        this.values.push(e)
    }
    dequeue() {
        // Devuelve y elimina el primer elemento de la lista (cola)
        return this.values.splice(0, 1);
    }
    getQueue() {
        // Devuelve la lista (cola)
        return this.values;
    }
    setQueue(arr) {
        this.values = arr
    }


    codeEnqueue() {
        return `
        void enqueue(Queue *q, int a){
            Node *newNodo = (Node *)malloc(Node);
            newNodo->data = elem;
            newNodo->next = NULL;
            if(isEmpty(q)){
                q->ptrInit = newNodo;
                q->ptrLast = newNodo;
            }else{
                newNodo->next = q->ptrInit;
                q->ptrInit = newNodo;
            }
        }
    `
    }
    codeDequeue() {
        return `
        int dequeue(Queue *q){
            int elem = -1;
            if(!isEmpty(q)){
                Node *aux = q->ptrInit;
                elem = q->ptrLast->data
                while(aux->next != q->ptrLast)
                    aux = aux->next;
                q->ptrLast = aux;
                Node *del = aux->next;
                q->ptrLast->ptrBack = NULL;
                free(del);
            }
            return elem;
        }
    `
    }
}
const btn_add = document.getElementById("add")
const btn_remove = document.getElementById("remove")
var show = document.getElementById("show")
var my_code = document.getElementById("c-code");

var queue = new Queue()

function showQueue() {
    let elems = queue.getQueue()
    let size = elems.length
    my_list = `<li id="head">-></li>`
    if (size === 1) {
        my_list += `<li id="last-elem">${elems[size-1]}</li>`
    } else {
        my_list += `<li id="first-elem">${elems[size-1]}</li>`
        for (let i = size - 2; i >= 1; i--)
            my_list += `<li>${elems[i]}</li>`
        my_list += `<li id="last-elem">${elems[0]}</li>`
    }

    my_list += `<li id="back">-></li>`
    show.innerHTML = my_list;
}

btn_add.addEventListener("click", (e) => {
    e.preventDefault();
    let elem = prompt("Ingrese un elemento");
    queue.enqueue(elem);
    my_code.innerText = queue.codeEnqueue();
    showQueue();
})

btn_remove.addEventListener("click", e => {
    e.preventDefault();
    let elem = queue.dequeue();
    my_code.innerText = queue.codeDequeue();
    alert(`Elemento sacado ${elem}`)
    showQueue();
})