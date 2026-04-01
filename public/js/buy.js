let openShopping=document.querySelector('.shopping');
let closeShopping=document.querySelector('.closeShopping');
let list=document.querySelector('.list');
let listCard=document.querySelector('.listCard');
let body=document.querySelector('body');
let total=document.querySelector('.total');
let quantity=document.querySelector('.quantity');

openShopping.addEventListener('click',()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click',()=>{
    body.classList.remove('active');
})
let products=[
    {
        id:1,
        name:'Karigari',
        image:'top1.png',
        price:799,
    },
    {
        id:2,
        name:'Athena Tops',
        image:'top3 b.png',
        price:899
    },
    {
        id:3,
        name:'Chocolate Tops',
        image:'top4 a.png',
        price:620
    },
    {
        id:4,
        name:'Poppy Tops',
        image:'top5.png',
        price:800
    },
    {
        id:5,
        name:'TWST',
        image:'top6.png',
        price:300
    },
    {
        id:6,
        name:'No Fuss Tops',
        image:'top7.png',
        price:700
    },
    {
        id:7,
        name:'Desi Mix Tops',
        image:'top8.png',
        price:900
    },
    {
        id:8,
        name:'Jeni Tops',
        image:'top9.png',
        price:699
    },
];
let listCards=[];
function initApp(){
    products.forEach((value,key)=>{
            let newDiv=document.createElement('div');
            newDiv.classList.add('item');
            newDiv.innerHTML=`
                <img src="img/${value.image}"/>
                <div class="title">${value.name}</div>
                <div class="price">${value.price.toLocaleString()}</div>
                <button onclick="addToCard(${key})">Add To Cart</button>
        `;
        list.appendChild(newDiv);
    })
    }
    initApp();
    function addToCard(key){
        if(listCards[key]==null){
            listCards[key]=products[key];
            listCards[key].quantity=1;
        }
        reloadCard();  
    }
    function reloadCard(){
        listCard.innerHTML='';
        let count=0;
        let totalPrice=0;
        listCards.forEach((value,key)=>{
            totalPrice=totalPrice+value.price;
            count=count+value.quantity;
            if(value!=null){
                let newDiv=document.createElement('li');
                newDiv.innerHTML=`
                    <div><img src="img/${value.image}"/></div>
                    <div>${value.name}</div>
                    <div>${value.price.toLocaleString()}</div>
                    <div>${value.quantity}</div>
                    <div>
                        <button onclick="changeQuantity(${key},${value.quantity -1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${key},${value.quantity +1})">+</button>
                    </div>
                 `;
                listCard.appendChild(newDiv);
            }
        })
        total.innerText=totalPrice.toLocaleString();
        quantity.innerText=count;
    }
    function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price; // Recalculate the price based on the new quantity
    }
    reloadCard();
}
