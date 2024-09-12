import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const { login , session} = useContext(UserContext);
  function handleLogine(e) {
    e.preventDefault();
    const [username, password] = e.target.elements;
    login(username.value, password.value);
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <p>{session}</p>
        <form
          action=""
          onSubmit={handleLogine}
          className="flex flex-col gap-8 mt-5 text-black"
        >
          <input placeholder="username" type="text" name="username" />
          <input placeholder="password" type="password" name="password" />
          <input type="submit" value="login" className="text-white" />
        </form>
      </div>
    </div>
  );
}
