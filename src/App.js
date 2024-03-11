export default function App() {
  return (
    <div className="App">
      <FriendList />
      hi
    </div>
  );
}

function FriendList() {
  return (
    <div className="friend-list">
      <Friend />
      <AddFriend />
    </div>
  );
}
function Friend() {
  return (
    <div className="friend-wrap">
      <img
        className="friend-avatar"
        src="https://via.placeholder.com/100"
        alt="friend"
      />
      <h1 className="friend-title">Friend Name</h1>
      <p className="friend-bill-split">bill details</p>
      <button className="friend-select">select</button>
    </div>
  );
}
function AddFriend() {
  return <form className="add-friend-form">add friend</form>;
}
function Split() {
  return <form>? split</form>;
}
