import axios from "axios";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import StaffList from "./pages/stafflist";

class App extends Component {
  constructor() {
    super();
    this.state = {
      staff: []
    }
  }

  componentDidMount() {
    axios.get('http://144.217.242.22:1337/staff/users/website', {
      headers: {
        'Authorization': 'qR:zt;5h%^',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({staff: res.data.response})
    })
  }
  render() {
    return (
      <Router>
        <div className="App">
        <NavBar />
          <Route
            exact
            path='/staff'
            render={props => (
              <StaffList staff={this.state.staff}/>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
