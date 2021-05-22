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
}

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
    show.innerHTML = my_list
}

btn_add.addEventListener("click", e=>{
    e.preventDefault()
    let elem = prompt("Ingrese un elemento");
    lista.append(elem);
    showList();
})

btn_add_back.addEventListener("click", e => {
    e.preventDefault();
    let elem = prompt("Ingrese un elemento");
    lista.appendBack(elem);
    showList();
})

btn_add_index.addEventListener("click", e=>{
    e.preventDefault();
    let elem = prompt("Ingrese un elemento");
    let index = prompt("Ingrese la posición de la lista");
    lista.appendIndex(parseInt(index),elem);
    showList();
})

btn_remove.addEventListener("click", e=>{
    e.preventDefault();
    lista.remove()
    showList();
})

btn_remove_index.addEventListener("click", e=>{
    e.preventDefault();
    let index = prompt("Ingrese la posición de la lista a eliminar");
    let v = lista.removeIndex(index);
    showList();
})

btn_remove_element.addEventListener("click" ,e=>{
    e.preventDefault();
    let elem =  prompt("Ingrese el elemento a eliminar")
    let v = lista.removeElement(elem);
    if(v<0)
        alert(`Elemento ${elem} no encontrado`)
    showList();
})