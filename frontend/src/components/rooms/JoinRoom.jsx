import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinRoom.scss';

function JoinRoom() {
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  function handleJoinRoom(e) {
    e.preventDefault();
    navigate(`/${room}`);
  }

  return (
    <div className="JoinRoom">
      <form onSubmit={handleJoinRoom}>
        <label>
          Room:
          <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} />
        </label>
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
}

export default JoinRoom;