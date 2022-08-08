import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentForm from "./pages/StudentForm";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/student-form">
          <StudentForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
