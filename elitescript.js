const products = [
    { name: "Cardamom Essence", price: 450 },
    { name: "Oud Resin Blend", price: 900 },
    { name: "Rose Garden", price: 550 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(i) {
    cart.push(products[i]);
    saveCart();
    updateUI();
}

function removeItem(i) {
    cart.splice(i, 1);
    saveCart();
    updateUI();
}

function updateUI() {
    const box = document.getElementById("cartItems");
    const totalEl = document.getElementById("totalPrice");

    box.innerHTML = "";

    let total = 0;

    cart.forEach((item, i) => {
        total += item.price;

        box.innerHTML += `
        <div class="item">
            <span>${item.name}</span>
            <span>${item.price} EGP</span>
            <button onclick="removeItem(${i})">x</button>
        </div>`;
    });

    totalEl.innerText = cart.length ? total + " EGP" : "";
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
}

updateUI();
function checkoutWhatsApp() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "🛍️ Elite Scents Order:%0A%0A";
    let total = 0;

    cart.forEach((item, i) => {
        message += `- ${item.name} : ${item.price} EGP%0A`;
        total += item.price;
    });

    message += `%0A💰 Total: ${total} EGP%0A`;

    const phone = "201017850410"; // format international
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, "_blank");
}