import pic from "./person.jpg";

const friends = [
  {
    id: 1,
    name: "Clark",
    balance: "You owe $10",
    picture: pic,
  },
  {
    id: 2,
    name: "Bruce",
    balance: "Bruce owes you $20",
    picture: pic,
  },
  {
    id: 3,
    name: "Diana",
    balance: "You and Diana are even",
    picture: pic,
  },
];

export default function App() {
  return (
    <div className="App">
      <FriendList />
    </div>
  );
}

function FriendList() {
  const friendsLs = friends.map((friend) => (
    <Friend
      key={friend.id}
      name={friend.name}
      balance={friend.balance}
      pic={friend.pic}
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
  return (
    <div className="friend-wrap">
      <img className="friend-avatar" src={pic} alt="friend" />
      <h1 className="friend-title">{name}</h1>
      <p className="friend-details">{balance}</p>
      <button className="friend-select">Select</button>
    </div>
  );
}
function AddFriend() {
  return <form className="add-friend-form"></form>;
}
function Split() {
  return <form>? split</form>;
}
