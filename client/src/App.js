import "./App.css";
import { Router } from "@reach/router";
import RegAndLogin from "./views/RegAndLogin";
import Wall from "./views/Wall";
import UpdatePost from "./components/UpdatePost";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Register path="/" />
        <Login path="/login" />
        <Wall path="post/view-posts" />
        <UpdatePost path="post/:id" />
      </Router>
    </div>
  );
}

export default App;
