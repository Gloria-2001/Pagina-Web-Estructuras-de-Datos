class Stack {
    constructor() {
        this.values = []
    }
    push(e) {
        // Agrega un valor a la lista (pila)
        this.values.push(e)
    }
    pop() {
        // Si es que no hay elementos, devuelve cero
        if (this.values.length === 0)
            return -1
                // Sino, se regresa el ultimo elemento ingresado
        return this.values.pop()
    }
    getStack() {
        // Se devuelve la pila en forma de array
        return this.values
    }
    setStack(arr) {
        this.values = arr;
    }
    codePush() {
        return `
        void push(Stack *s, int elem){
            Node *newNodo = (Node *)malloc(Node);
            newNodo->data = elem;
            newNodo->next = NULL;
            if(isEmpty(s)){
                s->ptr = newNodo
            }else{
                newNodo->next = s->ptr;
                s->ptr = newNodo;
            }
        }
        `
    }
    codePop() {
        return `
        int pop(Stack *s){
            int elem = -1;
            if(!isEmpty(s)){
                elem = s->ptr->data;
                s->ptr = s->ptr->next;
            }
            return elem;
        }
        `
    }
}

var par = document.getElementById("show");
var msg_new = document.getElementById("msg_new");
var my_code = document.getElementById("c-code");

const btn_push = document.getElementById("push");
const btn_pop = document.getElementById("pop");
const btn_save = document.getElementById("save");
const btn_load = document.getElementById("load");
const btn_new = document.getElementById("new");

// Get the modal
var modal = document.getElementById("my-modal");
// Get the <span> element that closes the modal
var span = document.getElementById("close-span");

var stack = new Stack();

function showStack() {
    msg_new.style.display = "none";
    let elems = stack.getStack()
    let size = elems.length
    new_list = `<li id="head">_</li><li class="first-elem" id="first-stack">${elems[size-1]}</li>`
    arrow_up = `<img src="../img/flecha-hacia-abajo.png" id="flechaAbajo">`
    for (let i = size - 2; i >= 0; i--) {
        new_list += arrow_up
        new_list += `<li>${elems[i]}</li>`
    }
    par.innerHTML = new_list;
}

btn_new.addEventListener("click", e => {
    e.preventDefault();
    stack.setStack([]);
    msg_new.style.display = "block"
    par.innerHTML = "";
})

btn_push.addEventListener('click', (e) => {
    e.preventDefault();
    let element = prompt("Ingrese un elemento");
    stack.push(element)
    my_code.innerText = stack.codePush();
    showStack();
});

// Se realiza el método de pop
async function waitPop() {
    let elem = stack.pop();
    alert(`Elemento sacado: ${elem}`);
    showStack();
}

btn_pop.addEventListener('click', async(e) => {
    e.preventDefault();
    var out = document.getElementById("first-stack");
    // Cambiamos ID
    out.id = "last-stack"
    my_code.innerText = stack.codePop();
    // Retrasamos la actualización de los datos
    await setTimeout(waitPop, 2000);
})


/**
 * Se crea un objeto de llaves donde se guardara el nombre y los
 * datos contenidos en la pila.
 * 
 * Se pregunta si la llave "stack_db" existe, si no existe
 * se creara la llave, de otro modo, se agregara a la lista de
 * la llave stack_db
 */
btn_save.addEventListener('click', e => {
    e.preventDefault()
    let nameStr = prompt("Nombre de la estructura")
    let dirSave = {
        name: nameStr,
        data: stack.getStack()
    };
    if (localStorage.getItem("stack_db") === null)
        createProWebDB(dirSave);
    else
        saveInDB(dirSave)
    alert(`Configuración guardada con el nombre de ${nameStr}`)
});

/**
 * @breaf Se crea la llave para guardar la configuracion
 * @param dirSave configuracion a guardar
 * 
 */
function createProWebDB(dirSave) {
    // JSON.stringify pasa todo a un JSON que pueda comprender
    // el local storage
    localStorage.setItem("stack_db", JSON.stringify([dirSave]))
}

/**
 * @brief se accede a la llave con la lista y se agrega
 * la nueva configuracion a la lista
 * @param dirSave configuracion a guardar
 */
function saveInDB(dirSave) {
    let listSaved = JSON.parse(localStorage.getItem("stack_db"));
    listSaved.push(dirSave);
    localStorage.setItem("stack_db", JSON.stringify(listSaved));
}

/**
 * @brief Se accede a la llave con la lista de los datos
 * almacenados y se sustituye por otra lista, con un dato
 * menos (el que se desidio eliminar)
 * @param configs lista de configuraciones
 */
function updateAllDB(configs) {
    localStorage.setItem("stack_db", JSON.stringify(configs));
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
    stack_conf = localStorage.getItem("stack_db")
    if (stack_conf !== null) {
        configs = JSON.parse(stack_conf)
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
                stack.setStack(configs[btns_load[i].value]["data"]);
                // Se oculta el modal
                modal.style.display = "none"
                showStack();
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