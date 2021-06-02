class List{
    constructor(){
        this.values = []
    }
    append(e){
        // Se agrega un elemento al final de la lista
        this.values.splice(0,0,e)
    }
    appendBack(e){
        this.values.push(e);
    }
    appendIndex(index, e){
        if(index > this.values.length-1){
            this.values.push(e);
        }else{
            this.values.splice(index,0,e)
        }
    }
    remove(){
        return this.values.pop();
    }
    removeIndex(index){
        if(index > this.values.length-1){
            return this.remove();
        }else{
            return this.values.splice(index,1);
        }
    }
    removeElement(e){
        let index = this.values.indexOf(e);
        let value = -1
        // Si no se encuentra un elemento a eliminar
        // devuelve -1, sino, se regresa el momento eliminado
        if (index < 0){
            value = this.values.splice(index,1);
        }
        return value;
    }
    getList(){
        // Regresa la lista
        return this.values
    }
    setList(arr){
        this.values = arr;
    }
    
    codeAppendBack (){
        return `
    void appendBack(List *l, int elem){
    Node *newNodo = (Node *)malloc(Node);
    newNodo->data = elem;
    newNodo->next = NULL;
    if(isEmpty(l)){
        l->ptrInit = newNodo;
        l->ptrBack = newNodo;
    }else{
        newNodo->next = l->ptrBack;
        l->ptrBack = newNodo;
    }
      } `
    }
    
    codeAppendFront(){
        return `
    void appendFront(List *l, int elem){
    Node *newNodo = (Node *)malloc(Node);
    newNodo->data = elem;
    newNodo->next = NULL;
    if(isEmpty(l)){
        l->ptrInit = newNodo;
        l->ptrBack = newNodo;
    }else{
        newNodo->next = l->ptrInit;
        l->ptrInit = newNodo;
    }
}`
    } 
    
    codeAppendIndex(){
        return`
void appendIndex(List *l, int elem, int index){
    Node *newNodo = (Node *)malloc(Node);
    newNodo->data = elem;
    newNodo->next = NULL;
    if(isEmpty(l)){
        l->ptrInit = newNodo;
        l->ptrBack = newNodo;
    }else{
        if(index==0){
            newNodo->next = l->ptrInit;
            l->ptrInit = newNodo;
        }else{
            Node *aux = l->ptrInit;
            int i = 1;
            while(aux->next != NULL){
                if(i == index)
                    break;
                aux = aux->next;
                i++;}
            newNodo->next = aux->next
            aux->next = newNodo;
            if(aux == l->ptrBack){
                l->ptrBack = newNodo;}}}}`
    }
    
    codeRemoveBack(){
        return`
    int removeBack(List *l){
    int elem = -1;
    if(isEmpty(l)){
        Node *aux = l->ptrInit;
        while(aux->next != l->ptrBack)
            aux = aux->next;
        elem = l->ptrBack->data;
        l->ptrBack = aux;
        Node *del = aux->next;
        q->ptrLast->ptrBack = NULL;
        free(del);}
    return elem;}`
    }
    
    codeRemoveElement(){
        return`
  int removeElement(Lista *l, int elem){
    int elemReturn = -1;
    int isInList = 0;
    Node *aux = l->ptrInit->next;
    Node *dump = l->ptrInit;
    if(dump->data == elem){
        l->ptrInit = aux;
        dump->next = NULL;
        elemReturn = dump->data;
        free(dump);
        return elemReturn;}
    while(aux != l->ptrBack){
        if(aux->data == elem){
            isInList = 1;
            break;}
        aux = aux->next;
        dump = dump->next;}
    if(isInList){
        elemReturn = aux->data
        dump->next = aux->next;
        aux->next = NULL;
        if(l->ptrBack == aux)
            l->ptrBack = dump;
        free(aux);}
    return elemReturn;}`
    }
    
    codeRemoveIndex(){
        return `
      int removeIndex(List *l, int index){
    int elem = -1, i = 1;
    Node *aux = l->ptrInit;
    if(index == 0){
        elem = aux->data;
        l->ptrInit = aux->next;
        aux->next = NULL;
        free(aux);
    }else{
        Node *dump = l->ptrInit;
        aux = aux->next;
        while(aux->next != NULL){
            if(i == index) break;
            aux = aux->next;
            dump = dump->next;
            i++;}
        elem = aux->data
        dump->next = aux->next;
        if(aux == l->ptrBack){
            l->ptrBack = dump;}
        aux->next = NULL;
        free(aux);}
    return elem;}`
    }
    
    
    
}

var par = document.getElementById("show");
var msg_new = document.getElementById("msg_new");
var my_code = document.getElementById("c-code");

// Add
const btn_add = document.getElementById("add")
const btn_add_back = document.getElementById("add-back")
const btn_add_index = document.getElementById("add-index")

// Remove
const btn_remove = document.getElementById("remove")
const btn_remove_index = document.getElementById("remove-index")
const btn_remove_element = document.getElementById("remove-element")
const btn_save = document.getElementById("save");
const btn_load = document.getElementById("load");
const btn_new = document.getElementById("new");

// Get the modal
var modal = document.getElementById("my-modal");
// Get the <span> element that closes the modal
var span = document.getElementById("close-span");


var show = document.getElementById("show")

var lista = new List()

function showList() {
    let elems = lista.getList()
    let my_list = `<li id="head">-></li>`
    
    elems.forEach(e => {
        my_list += `<li>${e}</li>`
    });
    
    my_list += `<li id="back">_</li>`
    par.innerHTML = my_list
}

btn_new.addEventListener("click", e => {
    e.preventDefault();
    lista.setList([]);
    msg_new.style.display = "block"
    show.innerHTML = "";
})



btn_add.addEventListener("click", e=>{
    e.preventDefault()
    let elem = prompt("Ingrese un elemento");
    lista.append(elem);
    my_code.innerText = lista.codeAppendFront();
    showList();
})

btn_add_back.addEventListener("click", e => {
    e.preventDefault();
    let elem = prompt("Ingrese un elemento");
    lista.appendBack(elem);
    my_code.innerText = lista.codeAppendBack();
    showList();
})

btn_add_index.addEventListener("click", e=>{
    e.preventDefault();
    let elem = prompt("Ingrese un elemento");
    let index = prompt("Ingrese la posición de la lista");
    lista.appendIndex(parseInt(index),elem);
    my_code.innerText = lista.codeAppendIndex();
    showList();
})

btn_remove.addEventListener("click", e=>{
    e.preventDefault();
    lista.remove()
    my_code.innerText = lista.codeRemoveBack();
    showList();
})

btn_remove_index.addEventListener("click", e=>{
    e.preventDefault();
    let index = prompt("Ingrese la posición de la lista a eliminar");
    let v = lista.removeIndex(index);
    my_code.innerText = lista.codeRemoveIndex();
    showList();
})

btn_remove_element.addEventListener("click", e => {
    e.preventDefault();
    let elem = prompt("Ingrese el elemento a eliminar")
    let v = lista.removeElement(elem);
    if (v < 0)
        alert(`Elemento ${elem} no encontrado`)
    my_code.innerText = lista.codeRemoveElement();
    showList();
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
        data: lista.getList()
    };
    if (localStorage.getItem("list_db") === null)
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
    localStorage.setItem("list_db", JSON.stringify([dirSave]))
}

/**
 * @brief se accede a la llave con la lista y se agrega
 * la nueva configuracion a la lista
 * @param dirSave configuracion a guardar
 */
function saveInDB(dirSave) {
    let listSaved = JSON.parse(localStorage.getItem("list_db"));
    listSaved.push(dirSave);
    localStorage.setItem("list_db", JSON.stringify(listSaved));
}

/**
 * @brief Se accede a la llave con la lista de los datos
 * almacenados y se sustituye por otra lista, con un dato
 * menos (el que se desidio eliminar)
 * @param configs lista de configuraciones
 */
function updateAllDB(configs) {
    localStorage.setItem("list_db", JSON.stringify(configs));
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
    list_conf = localStorage.getItem("list_db")
    if (list_conf !== null) {
        configs = JSON.parse(list_conf)
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
                lista.setList(configs[btns_load[i].value]["data"]);
                // Se oculta el modal
                modal.style.display = "none"
                showList();
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