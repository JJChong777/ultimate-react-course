import { useState } from "react";

const initialToys = [
  {
    id: 118836,
    name: "Teddy Bear",
    image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf",
    desc: "Introducing our timeless Teddy Bear, the cuddliest companion you'll ever meet. Made with the softest, highest quality materials, this plush bear is irresistibly huggable. With its charming features, gentle embroidered eyes, and velvety nose, it captures hearts instantly. Generously stuffed for optimal comfort, it becomes a cherished friend for playtime adventures and bedtime snuggles. Whether as a gift or a personal keepsake, our Teddy Bear brings warmth, joy, and a lifetime of love. Order now and experience the enchantment of this lovable companion.",
    price: 20,
  },
  {
    id: 933372,
    name: "Toy Car",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f",
    desc: "Introducing our dynamic Toy Car, a thrilling vehicle that brings endless excitement and imaginative play to young adventurers. Designed with sleek lines and vibrant colors, this toy car is ready to zoom into action. Its sturdy construction ensures durability for all the high-speed races and daring stunts. With its easy-to-grasp size and smooth-rolling wheels, children can navigate any terrain with ease. Whether they're racing through the living room or creating thrilling racetracks, our Toy Car sparks creativity and fosters hours of thrilling fun. Buckle up and let the adventures begin!",
    price: 12.5,
  },
  {
    id: 499476,
    name: "Lego",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
    desc: "Welcome to the world of endless creativity with our incredible LEGO building blocks! Unleash your imagination and embark on extraordinary adventures as you construct, design, and bring your wildest dreams to life. With a vast assortment of colorful bricks and specialized pieces, the possibilities are limitless. Build towering skyscrapers, construct fantastical creatures, or recreate famous landmarks—the choice is yours. Each LEGO set is meticulously designed for precision and quality, ensuring a seamless building experience. Discover the joy of problem-solving, spatial awareness, and teamwork as you assemble and play with these iconic interlocking bricks. From novice builders to seasoned enthusiasts, LEGO sparks curiosity, inspires innovation, and guarantees countless hours of fun for all ages. Unleash your inner builder today and let your imagination take flight with LEGO!",
    price: 15,
  },
];

// function Button({ children, onClick }) {
//   return (
//     <button className="button" onClick={onClick}>
//       {children}
//     </button>
//   );
// }

export default function App() {
  const toys = initialToys;
  const [selectToy, setSelectToy] = useState(null);
  const [selectCart, setSelectCart] = useState(false);

  const [shoppingCart, setShoppingCart] = useState([]);

  let totalCost = 0;
  shoppingCart.forEach(
    (cartItem) => (totalCost += cartItem.price * cartItem.quantity)
  );

  function handleSelectToy(toy) {
    setSelectToy((cur) => (cur?.id === toy?.id ? null : toy));
    setSelectCart(false);
  }

  function addToyToCart(quantity, toy) {
    const orderObject = {
      name: toy.name,
      price: toy.price,
      quantity,
      id: crypto.randomUUID(),
    };
    setShoppingCart([...shoppingCart, orderObject]);
    alert(`${quantity} ${toy.name} has been added to the cart`);
    setSelectToy(null);
    setSelectCart(false);
  }

  function handleSelectCart() {
    if (shoppingCart.length <= 0) {
      alert("Warning: No items have been added to cart!");
      return;
    }
    setSelectToy(null);
    setSelectCart(!selectCart);
  }

  function handleClearAll() {
    if (window.confirm("Do you really want to clear all items from cart?")) {
      setSelectToy(null);
      setSelectCart(false);
      setShoppingCart([]);
    }
  }

  function handleBuyAll(totalCost) {
    if (window.confirm("Do you really want to buy all items from cart?")) {
      alert(`$${totalCost} has been deducted`);
      setSelectToy(null);
      setSelectCart(false);
      setShoppingCart([]);
    }
  }

  return (
    <div className="app">
      <div className="sidebar">
        <TotalList
          toys={toys}
          onSelectToy={handleSelectToy}
          selectToy={selectToy}
          onSelectCart={handleSelectCart}
        />
      </div>
      {selectToy && <ToyPage toy={selectToy} addToyToCart={addToyToCart} />}
      {selectCart && (
        <CartPage
          shoppingCart={shoppingCart}
          totalCost={totalCost}
          onClearAll={handleClearAll}
          onBuyAll={handleBuyAll}
        />
      )}
      {!selectToy && !selectCart && <WelcomePage />}
    </div>
  );
}

function TotalList({ toys, onSelectToy, selectToy, onSelectCart }) {
  return (
    <ul>
      {toys.map((toy) => (
        <Toy
          toy={toy}
          key={toy.id}
          onSelectToy={onSelectToy}
          selectToy={selectToy}
        />
      ))}
      <Cart onSelectCart={onSelectCart} />
    </ul>
  );
}

function Cart({ onSelectCart }) {
  function handleSelectCart(e) {
    e.preventDefault();
    onSelectCart();
  }
  return (
    <li onClick={handleSelectCart}>
      <img
        src="https://icon-library.com/images/cart-icon/cart-icon-20.jpg"
        alt="Shopping Cart icon"
      />
      <h3>Cart</h3>
      <p>View your shopping cart here!</p>
    </li>
  );
}

function Toy({ toy, onSelectToy, selectToy }) {
  const isSelected = selectToy?.id === toy.id;
  return (
    <li
      className={isSelected ? "selected" : ""}
      onClick={() => {
        onSelectToy(toy);
      }}
    >
      <img src={toy.image} alt={toy.name} />
      <h3>{toy.name}</h3>
      <p>
        Price: <strong>${toy.price}</strong>
      </p>
    </li>
  );
}

function WelcomePage() {
  return (
    <div className="page">
      <h2>Welcome to Brickland Toys!</h2>
      <br></br>
      <p>
        Welcome to the enchanting world of "Brickland Toys," where joy and
        wonder abound. Our carefully curated collection of toys caters to every
        child's imagination, offering a diverse range of classic favorites and
        trendy delights. With a focus on safety and quality, we provide trusted
        brands and meticulously crafted toys that inspire creativity and provide
        endless entertainment. Let our friendly staff guide you through our
        colorful aisles, where you'll find imaginative playsets, educational
        toys, and cuddly companions to capture the hearts of children of all
        ages. Step into "Brickland Toys" and unlock the power of play, creating
        magical memories that will last a lifetime.
      </p>
      <br></br>
      <h3>
        Please feel free to browse our toys catalogue on the left sidebar!
      </h3>
    </div>
  );
}

function ToyPage({ toy, addToyToCart }) {
  const [quantity, setQuantity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!quantity) return;

    addToyToCart(quantity, toy);
  }
  return (
    <div className="page">
      <h2>{toy.name}</h2>
      <br></br>
      <img src={toy.image} alt={toy.name} />
      <p>{toy.desc}</p>
      <br></br>
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <label>Order {toy.name} </label>
        <input
          type="text"
          value={quantity}
          placeholder={`Quantity of ${toy.name}`}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button className="button">Submit</button>
      </form>
    </div>
  );
}

function CartPage({ shoppingCart, totalCost, onClearAll, onBuyAll }) {
  return (
    <div className="page">
      <h2>Shopping Cart</h2>
      <br></br>
      <ul>
        {shoppingCart.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </ul>
      <br></br>
      <h3>The total cost is: ${totalCost}</h3>
      <br></br>
      <button className="button" onClick={() => onBuyAll(totalCost)}>
        Buy all
      </button>
      <br></br>
      <button className="button" onClick={onClearAll}>
        Clear cart items
      </button>
    </div>
  );
}
function CartItem({ cartItem }) {
  return (
    <li>
      {cartItem.quantity} &times; {cartItem.name}
      <br></br>
      Cost: ${cartItem.quantity * cartItem.price}
    </li>
  );
}
