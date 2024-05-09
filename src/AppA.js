import "./a.css";
import { useState } from "react";

// friends list data
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// APp
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // functions for adding friends, selecting friends and showing add friend form

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    // spread operator to add the new friend to the friends list
    setFriends((friends) => [...friends, friend]);
  }

  function handleSelection(friend) {
    // cur receives the current value of the selectedFriend state. The question mark (?) after cur is used for optional chaining. It ensures that if cur is null or undefined, the code doesn't try to access its id property, preventing errors.
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  // rendering the app
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {/* checks if the showaddfriend is true and if it is 
        it renders the form add friend */}
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        {/* conditionally rendering the button with the text as children */}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  // the props are passed as
  // children fas the text on the button
  // onClick as the function to be called when the button is clicked
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

// the friend list component
function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <div>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          // passing the selected friend and onselection from the app through
          // friend list until the friend component
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </div>
  );
}

// the friend component
// receives props for above
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {/* conditionally rendering */}

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      {/* the button for conditionally  */}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    // amkes sure the name and the image are not empty
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    // calls the function from app
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👨🏾‍🤝‍👨🏻 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add Friend</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        // controlled form input
        // cannot introduce a balance that will result in a negative number on the paidByFriend
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👬 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>💸 Who is apying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user"> You </option>
        <option value="friend"> {selectedFriend.name} </option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
