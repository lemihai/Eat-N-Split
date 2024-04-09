import pic from "./person.jpg";

const friends = [
  {
    id: 1,
    name: "Clark",
    balance: 10,
    picture: pic,
  },
  {
    id: 2,
    name: "Bruce",
    balance: -20,
    picture: pic,
  },
  {
    id: 3,
    name: "Diana",
    balance: 0,
    picture: pic,
  },
];

export default function App() {
  return (
    <div className="App">
      <FriendList />
      <Split />
    </div>
  );
}

function FriendList() {
  const friendsLs = friends.map((friend) => (
    <Friend
      key={friend.id}
      name={friend.name}
      balance={friend.balance}
      pic={pic}
    />
  ));

  return (
    <div className="friend-list">
      {friendsLs}
      <AddFriend />
    </div>
  );
}

function Friend({ name, balance, pic }) {
  let balanceShow = "1";

  if (balance > 0) {
    balanceShow = `You owe ${name} ${balance}`;
  } else if (balance < 0) {
    balanceShow = `Owes you ${name} ${balance}`;
  } else if (balance === 0) {
    balanceShow = `You and ${name} are even`;
  }

  return (
    <div className="friend-wrap">
      <img className="friend-avatar" src={pic} alt="friend" />
      <h1 className="friend-title">{name}</h1>
      <p
        className={`friend-details 
        ${balance < 0 ? `red` : ""} 
        ${balance > 0 ? `green` : ""}`}
      >
        {balanceShow}
      </p>
      <button className="friend-select">Select</button>
    </div>
  );
}

function AddFriend() {
  return (
    <form className="add-friend-form">
      <label className="form-label">Friend name</label>
      <input
        className="form-input"
        type="text"
        name="friendName"
        placeholder="Name"
      />
      <label className="form-label">Image URL</label>
      <input
        className="form-input"
        type="text"
        name="imageUrl"
        placeholder="Image URL"
      />
      <button className="form-add" type="submit">
        Add
      </button>
    </form>
  );
}

function Split() {
  return (
    <form className="split-bill-wrap">
      <h1 className="split-bill-title">Split a bill with Ben</h1>
      <label className="split-bill-label">Bill value</label>
      <input className="wplit-bill-input" type="text" />
      <label className="split-bill-label">Your expense</label>
      <input className="wplit-bill-input" type="text" />
      <label className="split-bill-label">ben's expense</label>
      <p className="wplit-bill-input noinput" type="text" />
      <label className="split-bill-label">Who is paying the bill</label>
      <select>
        <option>Ben</option>
        <option>You</option>
      </select>
      <button className="split-bill-button">Split Bill</button>
    </form>
  );
}
