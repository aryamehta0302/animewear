// Select necessary elements
const searchInput = document.getElementById("searchInput");
const productsContainer = document.getElementById("productsContainer");
const productCards = Array.from(productsContainer.querySelectorAll(".card"));

// Create "No results" message
const noResultsMessage = document.createElement("p");
noResultsMessage.id = "noResultsMessage";
noResultsMessage.textContent = "No products found 😢";
noResultsMessage.style.textAlign = "center";
noResultsMessage.style.fontSize = "1.5rem";
noResultsMessage.style.marginTop = "2rem";
noResultsMessage.style.opacity = 0;
noResultsMessage.style.transition = "opacity 0.3s ease";
noResultsMessage.style.display = "none";
productsContainer.appendChild(noResultsMessage);

// Filter function
function filterProducts() {
    const query = searchInput.value.toLowerCase();
    let anyVisible = false;

    productCards.forEach(card => {
        const title = card.querySelector(".card-title").textContent.toLowerCase();
        if (title.includes(query)) {
            card.style.display = "block";
            card.style.opacity = 0;
            setTimeout(() => card.style.opacity = 1, 50); // smooth fade in
            anyVisible = true;
        } else {
            card.style.opacity = 0;
            setTimeout(() => card.style.display = "none", 300); // fade out smoothly
        }
    });

    // Hide banner and titles if searching
    const banner = document.getElementById("bannerCarousel");
    const mainTitle = document.querySelector("h1.text-center");
    const mostPopularTitle = document.querySelector("h2.text-center");

    if (query.trim() !== "") {
        if (banner) banner.style.display = "none";
        if (mainTitle) mainTitle.style.display = "none";
        if (mostPopularTitle) mostPopularTitle.style.display = "none";
    } else {
        if (banner) banner.style.display = "block";
        if (mainTitle) mainTitle.style.display = "block";
        if (mostPopularTitle) mostPopularTitle.style.display = "block";
    }

    // Show or hide “No results found”
    if (!anyVisible && query.trim() !== "") {
        noResultsMessage.style.display = "block";
        setTimeout(() => noResultsMessage.style.opacity = 1, 50); // fade in
    } else {
        noResultsMessage.style.opacity = 0;
        setTimeout(() => noResultsMessage.style.display = "none", 300); // fade out
    }
}

// Attach event listener
searchInput.addEventListener("input", filterProducts);


// -------------------- CART FUNCTIONALITY --------------------
let cart = [];

function updateCartUI() {
    const cartList = document.getElementById("cartList");
    const cartCount = document.getElementById("cartCount");
    const cartCountFooter = document.getElementById("cartCountFooter");

    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item bg-dark text-white d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${item}
            <button class="btn btn-sm btn-danger remove-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
        `;
        cartList.appendChild(li);
    });

    cartCount.innerText = cart.length;
    cartCountFooter.innerText = cart.length;

    // Remove item button
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            cart.splice(index, 1);
            updateCartUI();
        });
    });
}

// Add to cart buttons
document.querySelectorAll(".btn-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        const productName = card.querySelector(".card-title").innerText;
        cart.push(productName);
        updateCartUI();
    });
});

// -------------------- SCROLL TO TOP BUTTON --------------------
const scrollBtn = document.getElementById("scrollBtn");
window.onscroll = () => {
    scrollBtn.style.display = document.documentElement.scrollTop > 200 ? "block" : "none";
};

scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
