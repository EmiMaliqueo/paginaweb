document.addEventListener('DOMContentLoaded', function () {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');

 
    function renderCart() {

        cartItemsContainer.innerHTML = '';

     
        cart.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <p class="div-carrito">${product.name} / Talle: ${product.size} /  Color: ${product.color} /  ${product.price} - ${product.quantity} unidades
                    <button class="add-btn" data-id="${product.id}" data-size="${product.size}" data-color="${product.color}">+</button>
                    <button class="remove-btn" data-id="${product.id}" data-size="${product.size}" data-color="${product.color}">-</button>
                    <button class="delete-btn" data-id="${product.id}" data-size="${product.size}" data-color="${product.color}">x</button>
                </p>
            `;
            cartItemsContainer.appendChild(productElement);

       
            const addButton = productElement.querySelector('.add-btn');
            const removeButton = productElement.querySelector('.remove-btn');
            const deleteButton = productElement.querySelector('.delete-btn');

            addButton.addEventListener('click', () => {
                incrementQuantity(product.id, product.size, product.color);
            });

            removeButton.addEventListener('click', () => {
                decrementQuantity(product.id, product.size, product.color);
            });

            deleteButton.addEventListener('click', () => {
                deleteProduct(product.id, product.size, product.color);
            });
        });

       
        const totalPrice = cart.reduce((total, product) => {
            return total + (parseFloat(product.price.replace('$', '')) * product.quantity);
        }, 0);

      
        totalPriceContainer.innerHTML = `<p>Precio Total: $${totalPrice.toFixed(2)}</p>`;
    }

   
    function deleteProduct(productId, size, color) {
        cart = cart.filter(product => !(product.id === productId && product.size === size && product.color === color));

      
        localStorage.setItem('cart', JSON.stringify(cart));

     
        renderCart();
    }

   
    function incrementQuantity(productId, size, color) {
        cart = cart.map(product => {
            if (product.id === productId && product.size === size && product.color === color) {
                return { ...product, quantity: parseInt(product.quantity, 10) + 1 };
            }
            return product;
        });

       
        localStorage.setItem('cart', JSON.stringify(cart));

        
        renderCart();
    }

    function decrementQuantity(productId, size, color) {
        cart = cart.map(product => {
            if (product.id === productId && product.size === size && product.color === color && product.quantity > 1) {
                return { ...product, quantity: parseInt(product.quantity, 10) - 1 };
            }
            return product;
        });

        localStorage.setItem('cart', JSON.stringify(cart));

        
        renderCart();
    }

 
    function generateWhatsAppMessage() {
        
        const phoneNumber = '2994016833';

        
        let message = 'Hola, quiero realizar un pedido con los siguientes productos:\n\n';

        cart.forEach(product => {
            message += `${product.name} - Talle: ${product.size} - Color: ${product.color} - Precio: ${product.price} - Cantidad: ${product.quantity} unidades\n`;
        });

       
        const totalPrice = cart.reduce((total, product) => {
            return total + (parseFloat(product.price.replace('$', '')) * product.quantity);
        }, 0);
        message += `\nPrecio Total: $${totalPrice.toFixed(2)}`;

        
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        
        window.open(whatsappLink, '_blank');
    }

    
    const whatsappButton = document.getElementById('whatsapp-button'); 
    whatsappButton.addEventListener('click', generateWhatsAppMessage);

    
    renderCart();
});