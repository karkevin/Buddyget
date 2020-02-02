import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import Home from "./Home";
import Welcome from "./Welcome";
import Form from "./Form";
import Activity from "./Activity";
import Loading from "./Loading";

// load user dispatch function
import { loadUser } from "../redux/actions/authActions";
import { connect } from "react-redux";

// const PrivateRoute = props => {
//   const { path, authenticated } = props;
//   console.log(props);
//   return (
//     <Route
//       path={path}
//       authenticated={authenticated}
//       render={() => (authenticated ? <Home /> : <Welcome />)}
//     />
//   );
// };

export class App extends Component {
  componentDidMount() {
    if (this.props.auth.token) {
      this.props.loadUser();
    }
  }

  renderApp = Component => {
    if (this.props.authLoading || this.props.groupLoading) {
      return <Loading />;
    } else if (!this.props.auth.authenticated) {
      return <Welcome />;
    } else {
      return <Component />;
    }
  };
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route
            path="/login"
            render={() => <Form title="Login" items={["Email", "Password"]} />}
          />
          <Route
            path="/sign-up"
            render={() => (
              <Form
                title="Sign Up"
                items={["Name", "Email", "Password", "Group"]}
              />
            )}
          />
          <Route path="/app" render={() => this.renderApp(Home)} />
          <Route
            path="/activity"
            render={() =>
              window.innerWidth < 768
                ? this.renderApp(Activity)
                : this.renderApp(Home)
            }
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  authLoading: state.auth.loading,
  groupLoading: state.group.loading,
  itemsLoading: state.item.loading
});

export default connect(mapStateToProps, { loadUser })(App);
