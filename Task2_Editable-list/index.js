let item=['первый пункт', 'второй пункт','третий пункт','четвертый пункт'];
let ol=document.createElement("ol");
ol.className="list"; 

function createList (){
    for (let i=0; i<item.length; i++){
        let li= document.createElement("li");
            li.className="item"
            li.innerText= item[i];
            ol.append(li);
    }
}
document.body.append(ol);
createList ();

ol.addEventListener("click", creatInput);
function creatInput(event){
    let target = event.target;
    if (target.tagName != 'LI') return;
    getInput(target);
}

function getInput(li){
    li.innerHTML='<input type="text" value="'+li.textContent+'">';
    let liInput=document.querySelector("li input");
    liInput.className="listInput"
    liInput.onblur= function(){
        li.innerHTML=liInput.value;
    }
}

let div= document.createElement("div");
document.body.append(div);
let form= document.createElement("form");
form.innerHTML='<input type="text" placeholder="Введите значение">';
form.className="mainInput"
div.append(form);

let btnAdd= document.createElement("button");
btnAdd.textContent="Add";
btnAdd.className="btn"
btnAdd.onclick=function(){
    let input=document.querySelector("input");
    if(input.value){
        let li= document.createElement("li");
        li.className="item";
        li.innerText= input.value;
        ol.append(li);
        item.push(`${input.value}`);
    }
    countItem();
}
div.append(btnAdd);

let btnRemove= document.createElement("button");
btnRemove.textContent="Remove";
btnRemove.className="btn"
btnRemove.addEventListener("click",removeItem);
function removeItem(){
    ol.lastChild.remove();
    item.pop();
    countItem();
}
div.append(btnRemove);

function countItem(){
    let input=document.querySelector("input");
    if(item.length===0){
        btnRemove.disabled= "true"; 
    }

    if(item.length>0){
        btnRemove.removeAttribute("disabled"); 
    }
}