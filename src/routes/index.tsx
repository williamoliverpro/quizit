import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Quantity from '../pages/Quantity/Index';
import Quiz from '../pages/Quiz';
import Results from '../pages/Results';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/results" exact component={Results} />
    <Route path="/quantity" exact component={Quantity} />
    <Route path="/quiz" exact component={Quiz} />
  </Switch>
);

export default Routes;