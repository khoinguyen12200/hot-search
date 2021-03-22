import './normalize.css';
import './style.scss';
import './phoneStyles.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import {DialogContainer} from './components/Modal';
import HotSearchItem from "./components/HotSearchPage";
import Question from "./components/Question";
import DailyHotSearch from "./components/DailyHotSearch";


export default function App() {
  return (
    <Router>
      <div id="app-root" className="App light-theme">
        <DialogContainer/>
        <Route path="/">
          <Navbar />
        </Route>

        <div className="app-content">
          <Switch>
            <Route path="/hotsearch" component={HotSearchItem} />
            <Route path="/daily-hotsearch" component={DailyHotSearch}/>
            <Route path="/question" component={Question}/>
            <Route path="/" component={MainContent} />
          </Switch>
        </div>


        <Footer />
      </div>
    </Router>

  );
}


