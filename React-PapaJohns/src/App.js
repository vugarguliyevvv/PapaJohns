import { Switch, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import About from "./components/pages/about/About";
import Menu from "./components/pages/menu/Menu";
import Branches from "./components/pages/branches/Branches";
import CartContextProvider from "./components/store/CartContextProvider";

function App() {
  return (
    <CartContextProvider>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/branches">
            <Branches />
          </Route>
        </Switch>
      </Layout>
    </CartContextProvider>
  );
}

export default App;
