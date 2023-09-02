import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// page & layout imports
import Homepage from './pages/Homepage'
import Product from './pages/Product'

import SiteHeader from "./components/SiteHeader"

function App() {
  return (
    <Router>
      <div className="App">
        <SiteHeader />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route  path="/product/:id">
            <Product />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App
