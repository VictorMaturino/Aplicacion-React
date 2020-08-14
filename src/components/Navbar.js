import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ShareFacebook from './share-facebook/ShareFacebook';
import WhatsApp from  "../components/whatsapp/WhatsApp";
import Movies from './movies/Movies';
import MovieForm from './movies/MovieForm';
import { StyleSheet, Button } from 'react-native';


export default function App() {
  return (
    <Router>
      <div>
        <table>
          <tr>
            <td>
              <button><Link to="/">Inicio</Link></button>
              
            </td>
            <td>
              <button><Link to="/share">Facebook</Link></button>
              
            </td>
            <td>
              <button class="w"><Link to="/whatsapp">WhatsApp</Link></button>
              
            </td>
          </tr>
          </table>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
         <Switch>
          <Route path="/share">
            <Share/>
          </Route>
          <Route path="/whatsapp">
            <WhatsAppp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
function Home() {
  return <div><h2><MovieForm/></h2></div>;
}

function Share() {
  return <div><h2><ShareFacebook/></h2></div>;
}

function WhatsAppp() {
  return <div><h2><WhatsApp/></h2></div>;
}

const styles = StyleSheet.create({
  button: {

      backgroundColor: 'green'
  }
});