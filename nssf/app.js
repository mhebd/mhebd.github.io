
/*
*On scroll top nav animation script
*/
window.addEventListener('scroll', scorolling);

function scorolling(){
    let nav = document.getElementById('main-navbar');
    let pgo = pageYOffset;
    if(pgo > 250){
        nav.classList.add('scroll');
    } else {
        nav.classList.remove('scroll');
    }
}





/**
 * cart list display toggle class
 */

const cartIcon = document.querySelector('.cart-icon'),
    cartDrop = document.querySelector('.cart');
    cartIcon.addEventListener('click', clicked);
function clicked(){
    cartDrop.classList.toggle('display');
}













/**
 * Make a cart list
 */

//variabls
const cartList = document.getElementById('carts'),
    clearAll = document.querySelector('.clear-all'),
    cartBadge = document.getElementById('cart-badge');

let   productList = document.querySelectorAll('.products');
    
//event listener
    eventsListener();
function eventsListener(){
    productList.forEach(function(product){
        product.addEventListener('click', byeProduct);
    })
    cartList.addEventListener('click', removeItem);
    document.addEventListener('DOMContentLoaded', takeFromLS);
    clearAll.addEventListener('click', removeAll);
}
    



//functions
function byeProduct(e){
    e.preventDefault();
    if(e.target.classList.contains('add-to-cart')){
        let parent = e.target.parentElement.parentElement;
            takeInfo(parent);
    } 
}


function takeInfo(parent){
    const itemInfo = {
        image: parent.querySelector('img').src,
        title: parent.querySelector('.product-name').textContent,
        price: parent.querySelector('.price span').textContent,
        id: parent.querySelector('.add-to-cart').getAttribute('data-id')
    }
    setIntoCart(itemInfo);
    setIntoLS(itemInfo);
    
}


function setIntoCart(itemInfo){
    let tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>
                <img src="${itemInfo.image}" class="img-fluid" />
            </td>
            <td> 
                <h6  class="checkout text-uppercase text-success">${itemInfo.title}</h6>
            </td>
            <td> TK ${itemInfo.price} </td>
            <td>
                <a class="remove btn btn-success" data-id="${itemInfo.id}">X</a>
            </td>
            
        `;

        cartList.appendChild(tr);
}



function removeItem(e){
    if(e.target.classList.contains('remove')){
        let par = e.target.parentElement.parentElement;
        let id = par.querySelector('.remove').getAttribute('data-id');
        par.remove();
        removeFromLS(id)
    }
}


function removeFromLS(id){
    let foods = getEmptyArry();
        foods.forEach(function(food, index){
            if(food.id === id){
                foods.splice(index, 1);
            }
        });
    localStorage.setItem('foods', JSON.stringify(foods));
 
}

function setIntoLS(itemInfo){
    let foods = getEmptyArry();
        foods.push(itemInfo);
    localStorage.setItem('foods', JSON.stringify(foods));
}


function getEmptyArry(){
    let foods;
    if( localStorage.getItem('foods') === null){
        foods = [];
    } else {
        foods = JSON.parse(localStorage.getItem('foods'));
    }
    return foods;
}


function takeFromLS(){
    let foods = getEmptyArry();

        foods.forEach(function(food){
            let tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                    <img src="${food.image}" class="img-fluid" />
                </td>
                <td> 
                    <h6  class="checkout text-uppercase text-success">${food.title}</h6>
                </td>
                <td>TK ${food.price} </td>
                <td>
                    <a class="remove btn btn-success" data-id="${food.id}">X</a>
                </td>
            `;
            cartList.appendChild(tr);
        })
}


function removeAll(e){
    e.preventDefault();
    while(cartList.firstChild){
        cartList.removeChild(cartList.firstChild);
    };

    localStorage.clear();
}







//cart list badge
setInterval(function(){
    let cartListN = getEmptyArry().length;
    cartBadge.innerText = cartListN;
},000)




























