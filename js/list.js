class List {
    constructor() {
        this.values = []
    }
    append(e) {
        // Se agrega un elemento al final de la lista
        this.values.splice(0, 0, e)
    }
    appendBack(e) {
        this.values.push(e);
    }
    appendIndex(index, e) {
        if (index > this.values.length - 1) {
            this.values.push(e);
        } else {
            this.values.splice(index, 0, e)
        }
    }
    remove() {
        return this.values.pop();
    }
    removeIndex(index) {
        if (index > this.values.length - 1) {
            return this.remove();
        } else {
            return this.values.splice(index, 1);
        }
    }
    removeElement(e) {
        let index = this.values.indexOf(e);
        let value = -1
            // Si no se encuentra un elemento a eliminar
            // devuelve -1, sino, se regresa el momento eliminado
        if (index >= 0) {
            value = this.values.splice(index, 1);
        }
        return value;
    }
    getList() {
        // Regresa la lista
        return this.values
    }
    setList(arr) {
        this.values = arr;
    }

    codeAppendBack() {
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

    codeAppendFront() {
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

    codeAppendIndex() {
        return `
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

    codeRemoveBack() {
        return `
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

    codeRemoveElement() {
        return `
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

    codeRemoveIndex() {
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

btn_add.addEventListener("click", e => {
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

btn_add_index.addEventListener("click", e => {
    e.preventDefault();
    let elem = prompt("Ingrese un elemento");
    let index = prompt("Ingrese la posición de la lista");
    lista.appendIndex(parseInt(index), elem);
    my_code.innerText = lista.codeAppendIndex();
    showList();
})

btn_remove.addEventListener("click", e => {
    e.preventDefault();
    lista.remove()
    my_code.innerText = lista.codeRemoveBack();
    showList();
})

btn_remove_index.addEventListener("click", e => {
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