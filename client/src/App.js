import { Route } from "react-router-dom";
import Landing from "./components/Landing/landing";
import Home from "./components/Home/home";
import Form from "./components/Form/form";
import Detail from "./components/Detail/detail";
import "./App.css";

function App() {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/create" component={Form} />
      <Route path="/pokemons/:id" component={Detail} />
    </div>
  );
}

export default App;
