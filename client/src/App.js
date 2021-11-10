import "./App.css";
import { Router } from "@reach/router";
import RegAndLogin from "./views/RegAndLogin";
import Wall from "./views/Wall";
import UpdatePost from "./components/UpdatePost";

function App() {
  return (
    <div className="App">
      <Router>
        <RegAndLogin path="/" />
        <Wall path="post/view-posts" />
        <UpdatePost path="post/:id" />
      </Router>
    </div>
  );
}

export default App;
