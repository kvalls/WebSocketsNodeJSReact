import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    const username = event.target.username.value;
    navigate(`/chat/${username}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" placeholder="Enter username" name="username" id="username" />
      <button type="submit">This is my last chat</button>
    </form>
  );
}


export default LoginPage;