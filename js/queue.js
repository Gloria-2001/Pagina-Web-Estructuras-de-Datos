class Queue{
    constructor(){
        this.values = []
    }
    enqueue(e){
        // Agrega un elemento a la lista (cola)
        this.values.push(e)
    }
    dequeue(){
        // Devuelve y elimina el primer elemento de la lista (cola)
        return this.values.splice(0,1);
    }
    getQueue(){
        // Devuelve la lista (cola)
        return this.values;
    }
    setQueue(arr){
        this.values = arr
    }
}

const btn_add = document.getElementById("add")
const btn_remove = document.getElementById("remove")
var show = document.getElementById("show")

var queue = new Queue()

function showQueue(){
    let elems = queue.getQueue()
    let size = elems.length
    my_list = `<li id="head">-></li>`
    if(size === 1){
        my_list += `<li id="last-elem">${elems[size-1]}</li>`
    }else{
        my_list += `<li id="first-elem">${elems[size-1]}</li>`
        for(let i=size-2; i>=1; i--)
            my_list += `<li>${elems[i]}</li>`
            my_list += `<li id="last-elem">${elems[0]}</li>`
    }

    my_list += `<li id="back">-></li>`
    show.innerHTML = my_list
}

btn_add.addEventListener("click",(e)=>{
    e.preventDefault();
    let elem = prompt("Ingrese un elemento");
    queue.enqueue(elem);
    showQueue();
})

btn_remove.addEventListener("click",e => {
    e.preventDefault();
    let elem = queue.dequeue();
    alert(`Elemento sacado ${elem}`)
    showQueue();
})