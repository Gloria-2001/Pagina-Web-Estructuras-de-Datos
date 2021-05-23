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
var msg_new = document.getElementById("msg_new");
var show = document.getElementById("show")
var my_code = document.getElementById("c-code");
const btn_save = document.getElementById("save");
const btn_load = document.getElementById("load");
const btn_new = document.getElementById("new");

// Get the modal
var modal = document.getElementById("my-modal");
// Get the <span> element that closes the modal
var span = document.getElementById("close-span");

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

btn_new.addEventListener("click", e => {
    e.preventDefault();
    queue.setQueue([]);
    msg_new.style.display = "block"
    show.innerHTML = "";
})

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

/**
 * Se crea un objeto de llaves donde se guardara el nombre y los
 * datos contenidos en la cola.
 * 
 * Se pregunta si la llave "queue_db" existe, si no existe
 * se creara la llave, de otro modo, se agregara a la lista de
 * la llave queue_db
 */
btn_save.addEventListener('click', e => {
    e.preventDefault()
    let nameStr = prompt("Nombre de la estructura")
    let dirSave = {
        name: nameStr,
        data: queue.getQueue()
    };
    if (localStorage.getItem("queue_db") === null)
        createProWebDB(dirSave);
    else
        saveInDB(dirSave)
    alert(`Configuración guardad con el nombre de ${nameStr}`)
});

/**
 * @breaf Se crea la llave para guardar la configuracion
 * @param dirSave configuracion a guardar
 * 
 */
function createProWebDB(dirSave) {
    // JSON.stringify pasa todo a un JSON que pueda comprender
    // el local storage
    localStorage.setItem("queue_db", JSON.stringify([dirSave]))
}

/**
 * @brief se accede a la llave con la lista y se agrega
 * la nueva configuracion a la lista
 * @param dirSave configuracion a guardar
 */
function saveInDB(dirSave) {
    let listSaved = JSON.parse(localStorage.getItem("queue_db"));
    listSaved.push(dirSave);
    localStorage.setItem("queue_db", JSON.stringify(listSaved));
}

/**
 * @brief Se accede a la llave con la lista de los datos
 * almacenados y se sustituye por otra lista, con un dato
 * menos (el que se desidio eliminar)
 * @param configs lista de configuraciones
 */
function updateAllDB(configs) {
    localStorage.setItem("queue_db", JSON.stringify(configs));
}


/**
 * @breaf Se solicitan todos los datos guardados 
 * en el local storage para visualizar los nombres y
 * elegir la configuración para poder visualizarla de nuevo
 */
btn_load.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById("text-head").innerHTML = "Elegir configuración";

    // Se construye una tabla en html desde js
    txt = "<table><tr><th>No.</th><th>Nombre</th><th>Aciones</th></tr>"
    queue_conf = localStorage.getItem("queue_db")
    if (queue_conf !== null) {
        configs = JSON.parse(queue_conf)
        size = configs.length
        for (let i = 0; i < size; i++) {
            txt += "<tr>"
            txt += `<td>${i+1}</td><td>${configs[i]["name"]}</td>`
            txt += `<td><button class="load-conf" value=${i}>Cargar</button><button class="delete-conf" value=${i}>Eliminar</button></td>`
            txt += "<tr>"
        }
        txt += "</table>"
        document.getElementById("text-modal").innerHTML = txt;

        // Se visualiza el modal
        modal.style.display = "block"

        // Se está a la escucha de cada uno de los botones creados
        // para la tabla
        let btns_load = document.getElementsByClassName("load-conf")
        let size_btns = btns_load.length
            // btns_load son botones para cargar una configuracion 
        for (let i = 0; i < size_btns; i++) {
            btns_load[i].addEventListener("click", e => {
                e.preventDefault()
                queue.setQueue(configs[btns_load[i].value]["data"]);
                // Se oculta el modal
                modal.style.display = "none"
                showQueue();
            })
        }

        // btns_delete son botones para eliminar una configuracion
        let btns_delete = document.getElementsByClassName("delete-conf")
        for (let i = 0; i < size_btns; i++) {
            btns_delete[i].addEventListener("click", e => {
                e.preventDefault()
                configs.splice(btns_load[i].value, 1)
                updateAllDB(configs);
                alert("Elemento eliminado")
                    // Se oculta el modal
                modal.style.display = "none"
            })
        }
    }
})

span.addEventListener("click", e => {
    e.preventDefault();
    modal.style.display = "none";
})