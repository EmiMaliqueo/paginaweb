
const productsContainer = document.getElementById('imagenes');


async function cargarProductos() {

    try {

        const response = await fetch('products.json');

        const productos = await response.json();

        productos.forEach(producto => { 
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.id = producto.category.toLowerCase();
            const productLink = document.createElement('a');
            productLink.href = `/producto${producto.id}.html`;
            const productImg = document.createElement('img');
            productImg.src = producto.image;
            productImg.alt = producto.name;

            const productTxt = document.createElement('div');
            productTxt.classList.add('product-txt');

            const productName = document.createElement('h3');
            productName.textContent = producto.name;

            const productPrice = document.createElement('p');
            productPrice.textContent = `$${producto.price}`;

            productTxt.appendChild(productName);
            productTxt.appendChild(productPrice);
            productLink.appendChild(productImg);
            productLink.appendChild(productTxt);
            productDiv.appendChild(productLink);
            productsContainer.appendChild(productDiv);
            
            
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
    productsContainer.getElementsByTagName("button")[0].addEventListener("click", ()=> agregarAlCarrito(producto));
}

cargarProductos();






document.addEventListener('DOMContentLoaded', function () {
    const addToCartButton = document.querySelector('.btn-add-to-cart');

    addToCartButton.addEventListener('click', function () {
        
        const productName = document.querySelector('.container-name p').innerText;
        const productPrice = document.querySelector('.container-price p').innerText;
        const productSize = document.getElementById('size').value;
        const productColor = document.getElementById('colour').value;
        const productQuantity = document.querySelector('.input-quantity').value;

        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

       
        const productId = Math.floor(Math.random() * 1000);

        
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            size: productSize,
            color: productColor,
            quantity: productQuantity,
        };

       
        cart.push(product);

       
        localStorage.setItem('cart', JSON.stringify(cart));

   

       
        window.location.href = 'carrito.html';
    });
});








document.addEventListener('DOMContentLoaded', function () {
    // Obtener elementos del DOM
    var inputCantidad = document.querySelector('.input-quantity');
    var btnIncrement = document.getElementById('increment');
    var btnDecrement = document.getElementById('decrement');
    var btnAddToCart = document.querySelector('.btn-add-to-cart');
    var selectColor = document.getElementById('colour');
    var selectSize = document.getElementById('size');

    // Agregar evento de clic al botón de incremento
    btnIncrement.addEventListener('click', function () {
        incrementarCantidad();
    });

    // Agregar evento de clic al botón de decremento
    btnDecrement.addEventListener('click', function () {
        decrementarCantidad();
    });

    // Agregar evento de clic al botón "Añadir al carrito"
    btnAddToCart.addEventListener('click', function () {
        // Verificar si se ha seleccionado color y talla
        if (selectColor.value && selectSize.value) {
            // Aquí puedes agregar la lógica para añadir al carrito
            // Por ahora, solo mostraremos un mensaje en la consola
            console.log('Producto añadido al carrito');
        } else {
            alert('Por favor, selecciona color y talla antes de añadir al carrito');
        }
    });

    // Agregar evento de cambio al selector de color
    selectColor.addEventListener('change', actualizarEstadoBoton);

    // Agregar evento de cambio al selector de talla
    selectSize.addEventListener('change', actualizarEstadoBoton);

    // Función para actualizar el estado del botón
    function actualizarEstadoBoton() {
        // Habilitar o deshabilitar el botón según la selección de color y talla
        btnAddToCart.disabled = !(selectColor.value && selectSize.value);
    }

    // Función para incrementar la cantidad
    function incrementarCantidad() {
        var cantidadActual = parseInt(inputCantidad.value);
        var maxCantidad = parseInt(inputCantidad.getAttribute('max'));

        if (cantidadActual < maxCantidad) {
            inputCantidad.value = cantidadActual + 1;
        }
    }

    // Función para decrementar la cantidad
    function decrementarCantidad() {
        var cantidadActual = parseInt(inputCantidad.value);
        var minCantidad = parseInt(inputCantidad.getAttribute('min'));

        if (cantidadActual > minCantidad) {
            inputCantidad.value = cantidadActual - 1;
        }
    }

    // Actualizar el estado del botón al cargar la página
    actualizarEstadoBoton();
});
