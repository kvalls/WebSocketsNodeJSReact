import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const params = useParams();

  const ws = useRef();

  useEffect(() => {
    const WS_URL = process.env.REACT_APP_URL;
    console.log(WS_URL);

    ws.current = new WebSocket(process.env.REACT_APP_URL);

    ws.current.onopen = () => {
      console.log("Connection established");
    }

    ws.current.onmessage = (message) => {
      console.log(message);
    }

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    ws.current.send(JSON.stringify({message}));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="message">Message:</label>
      <input type="text" placeholder="Enter message" name="message" id="message" />
      <button type="submit">Send it</button>
    </form>
  );
}

export default ChatPage;