import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Crispy Chicken",
    description: "Crispy chicken, lettuce, tomato, and creamy mayo.",
    price: 6.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Ultimate Bacon",
    description: "Beef patty, crispy bacon, cheddar cheese, and special sauce.",
    price: 8.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Black Sheep",
    description: "Premium beef, smoked cheese, onions, and signature sauce.",
    price: 8.49,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Vegan Burger",
    description: "Plant-based patty, fresh vegetables, and vegan mayo.",
    price: 7.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=600&q=80",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [confirmed, setConfirmed] = useState(false);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((oldCart) => {
      const found = oldCart.find((item) => item.id === product.id);

      if (found) {
        return oldCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...oldCart, { ...product, quantity: 1 }];
    });
  };

  // CHANGE QUANTITY
  const updateQuantity = (id, amount) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE ITEM
  const removeItem = (id) => {
    setCart((oldCart) => oldCart.filter((item) => item.id !== id));
  };

  // TOTAL ITEMS
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // CUSTOMER FORM
  const handleChange = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  // OPEN CHECKOUT
  const checkout = () => {
    if (cart.length === 0) {
      alert("Please add a burger to your cart first!");
      return;
    }

    setConfirmed(false);
    setModalOpen(true);
  };

  // CONFIRM ORDER
  const submitOrder = (event) => {
    event.preventDefault();
    setConfirmed(true);
  };

  // FINISH ORDER
  const finishOrder = () => {
    setCart([]);
    setCustomer({
      name: "",
      phone: "",
      address: "",
    });
    setModalOpen(false);
    setConfirmed(false);
  };

  return (
    <div className="website">
      {/* HEADER */}
      <header className="navbar">
        <a href="#home" className="brand">
          <span>🍔</span>
          <div>
            <strong>TASTY</strong>
            <strong>BURGER</strong>
          </div>
        </a>

        <nav>
          <a href="#home">HOME</a>
          <a href="#menu">OUR MENU</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <button
          className="cart-icon"
          onClick={() =>
            document
              .getElementById("order-details")
              ?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        >
          🛒 <span>{totalItems}</span>
        </button>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <p className="eyebrow">WELCOME TO TASTY BURGER</p>

        <h1>OUR CRAZY BURGERS</h1>

        <p className="hero-description">
          Get ready for a wild ride of flavor! Enjoy juicy patties,
          fresh toppings, melted cheese, and our irresistible sauces.
          Your next favorite burger is waiting for you!
        </p>

        <a href="#menu" className="hero-button">
          EXPLORE OUR MENU
        </a>
      </section>

      {/* PRODUCTS */}
      <main className="menu" id="menu">
        <div className="menu-heading">
          <div>
            <h2>Our Delicious Menu</h2>
            <p>Fresh ingredients. Unforgettable taste.</p>
          </div>

          <span>{products.length} Products</span>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="badge">FAVORITE</span>
              </div>

              <div className="product-content">
                <div className="rating">
                  <span>★★★★★</span>
                  <small>({product.rating})</small>
                </div>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <div className="product-bottom">
                  <strong>${product.price.toFixed(2)}</strong>
                </div>

                <button
                  className="add-cart"
                  onClick={() => addToCart(product)}
                >
                  🛒 ADD TO CART
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-emoji">🍔</div>

        <div>
          <h2>More Flavor in Every Bite</h2>
          <p>
            At Tasty Burger, we believe every burger should be fresh,
            delicious, and made to satisfy your cravings.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <h3>🍔 TASTY BURGER SHOP</h3>
        <p>Good food. Great mood.</p>
        <p>© 2026 Tasty Burger Shop</p>
      </footer>

      {/* ORDER DETAILS */}
      <aside className="order-details" id="order-details">
        <div className="order-title">
          <h2>ORDER DETAILS</h2>
          <span>{totalItems} items</span>
        </div>

        {cart.length === 0 ? (
          <div className="empty">
            <span>🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add your favorite burger to start your order.</p>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-product" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-product-info">
                    <h4>{item.name}</h4>

                    <div className="quantity">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-price">
                    <strong>
                      ${(item.price * item.quantity).toFixed(2)}
                    </strong>

                    <button
                      className="remove"
                      onClick={() => removeItem(item.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="total">
              <span>Subtotal</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <button className="checkout" onClick={checkout}>
              CHECKOUT →
            </button>
          </>
        )}
      </aside>

      {/* CHECKOUT MODAL */}
      {modalOpen && (
        <div
          className="modal-background"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-x"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>

            {confirmed ? (
              <div className="confirmation">
                <div className="checkmark">✓</div>

                <h2>Thank You!</h2>

                <p>
                  Your order has been confirmed, {customer.name}.
                </p>

                <p className="confirmed-total">
                  Total: ${totalPrice.toFixed(2)}
                </p>

                <button className="checkout" onClick={finishOrder}>
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <span>🍔</span>
                  <h2>Complete Your Order</h2>
                  <p>Enter your information below.</p>
                </div>

                <div className="modal-summary">
                  <h3>Order Summary</h3>

                  {cart.map((item) => (
                    <div className="summary-line" key={item.id}>
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <strong>
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  ))}

                  <div className="summary-total">
                    <span>Total</span>
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </div>
                </div>

                <form onSubmit={submitOrder} className="customer-form">
                  <label htmlFor="name">Full Name</label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={customer.name}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="phone">Phone Number</label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={customer.phone}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="address">Delivery Address</label>

                  <textarea
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    value={customer.address}
                    onChange={handleChange}
                    rows="3"
                    required
                  />

                  <button className="checkout" type="submit">
                    CONFIRM ORDER — ${totalPrice.toFixed(2)}
                  </button>

                  <small className="demo-text">
                    Demo only. No real payment or delivery is processed.
                  </small>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;