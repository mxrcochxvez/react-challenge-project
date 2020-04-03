import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { loginUser } from '../../../redux/actions/authActions';
import { withRouter } from 'react-router-dom';

const mapActionsToProps = dispatch => ({
  commenceLogin(email, password) {
    dispatch(loginUser(email, password))
  }
})

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  }

  login(e) {
    e.preventDefault();
    this.props.commenceLogin(this.state.email, this.state.password);
    //I am having a bug where the user has to log into twice to get authorization to use the application
    //I believe this is because the user is being sent to the new route before they are authenticated
    //So it redirects them back to the /login route. I attempted to resolve that here by
    //moving the props.history.push from the login.js file and into this document but it is stil
    //happening. 
    this.props.history.push("/order");
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input type="text" className="form-control"  placeholder="test@test.com" value={this.state.email} onChange={e => this.onChange('email', e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input type="password" className="form-control" id="inputPassword" value={this.state.password} onChange={e => this.onChange('password', e.target.value)}></input>
        </div>
        <div className="d-flex justify-content-center">
            <button onClick={e => this.login(e)} type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    );
  }
}

export default connect(null, mapActionsToProps)(withRouter(LoginForm));