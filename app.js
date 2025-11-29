document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("CART") || "[]");

  function saveCart() {
    localStorage.setItem("CART", JSON.stringify(cart));
  }

  // ADD TO CART
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);

      let item = cart.find(i => i.name === name);
      if (item) item.qty++;
      else cart.push({ name, price, qty: 1 });

      saveCart();
    });
  });

  // CART PAGE
  const cartBody = document.getElementById("cartBody");
  if (cartBody) {
    const empty = document.getElementById("emptyCart");
    const table = document.getElementById("cartTable");
    const totalBox = document.getElementById("cartTotalBox");

    if (cart.length === 0) {
      empty.classList.remove("hidden");
    } else {
      empty.classList.add("hidden");
      table.classList.remove("hidden");
      totalBox.classList.remove("hidden");

      let total = 0;

      cart.forEach((item, index) => {
        const row = document.createElement("tr");
        const itemTotal = item.price * item.qty;

        total += itemTotal;

        row.innerHTML = `
          <td>${item.name}</td>
          <td>₹${item.price}</td>
          <td>${item.qty}</td>
          <td>₹${itemTotal}</td>
          <td><button class="btn remove" data-index="${index}">X</button></td>
        `;

        cartBody.appendChild(row);
      });

      document.getElementById("cartTotal").textContent = total;

      document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", () => {
          cart.splice(btn.dataset.index, 1);
          saveCart();
          location.reload();
        });
      });
    }
  }

  // CHECKOUT PAGE
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.removeItem("CART");
      alert("Order Placed Successfully!");
      window.location.href = "index.html";
    });
  }

});
