const botoncarro = document.querySelector(".container-cart-icon");
const carrodesplegado = document.querySelector(".cart-products");

botoncarro.addEventListener('click', ()=> {
    carrodesplegado.classList.toggle('hidden-cart');
})

const cartinfo = document.querySelector(".cart-product");
const rowproduct = document.querySelector(".row-product");

const listaproductos= document.querySelector(".container-products");
const nombreProducto= document.querySelector(".padreproducto");

let allproducts= [];

const cartEmpty = document.querySelector('.cart-empty'); //recien agregados
const cartTotal = document.querySelector('.total'); //recien agregados

const totalvalue = document.querySelector(".full-payment");

const contador = document.querySelector(".contador");

const iconclose = document.querySelector(".icon-close");
const padreicon = document.querySelector(".info-cart-product");




listaproductos.addEventListener('click', e => {
   if(e.target.classList.contains('add-cart')){
      const productos= e.target.parentElement;
      const nombreProducto = e.target.parentNode.parentNode;
      const infoProductos = {
        quantity : 1,
        title: nombreProducto.firstElementChild.innerText,
        price: productos.firstElementChild.textContent,
        

      }
      const existente= allproducts.some(productos => productos.title === infoProductos.title);
      if(existente){
         const agregado = allproducts.map(productos => {
            if (productos.title === infoProductos.title){
               productos.quantity++;
               
               return productos;
            } else {
               return productos;
            }
         })
         allproducts = [...agregado];
      } else {
         allproducts= [...allproducts,infoProductos];

      }
     
      showHTML();
      
   }


})

rowproduct.addEventListener('click', e => {
   if (e.target.classList.contains("icon-close")){
      const product = e.target.closest(".cart-product");
      const title = product.querySelector('p').innerText;

      allproducts = allproducts.filter(
         productos => productos.title !== title
      
      );
      showHTML()
      
      
      
   }
})


const showHTML = () => {

   if (!allproducts.length) {
		carrodesplegado.innerHTML= `<p class="cart-empty">Cart is empty!</p>`
      cartEmpty.classList.remove('hidden');
		rowproduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowproduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	
   }

    rowproduct.innerHTML="";
    let total = 0;
    let totalproductos = 0;
     
    allproducts.forEach(productos =>{
        const contenedorproductos= document.createElement("div");
        contenedorproductos.classList.add("cart-product");
        contenedorproductos.innerHTML= `
            <div class="cart-product">
              <div class="info-cart-product">
                <span class="cantidad-producto-carrito">
                   ${productos.quantity}
                </span>
                <p class="titulo-carrito-producto">
                   ${productos.title}
                </p>
                <span class="precio-producto-carrito">
                  ${productos.price}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
        
        
        `
        rowproduct.append(contenedorproductos);
        total = Math.round((total + (productos.quantity * productos.price.slice(1)))*100) /100;
        totalproductos = totalproductos + productos.quantity;
     })
     totalvalue.innerText = `$${total}`;
     contador.innerText = totalproductos;
}

