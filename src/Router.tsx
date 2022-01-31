import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps{
  theme : string;
}

function Router({ theme}:IRouterProps) {
  return (
    <BrowserRouter> 
      <Switch>
        <Route path={process.env.PUBLIC_URL + '/:coinId'}>
          <Coin theme={theme} />
        </Route>
        <Route path={process.env.PUBLIC_URL +'/'}>
          <Coins/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
