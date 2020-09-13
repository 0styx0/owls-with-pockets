import  React from 'react';
import { Form, Control } from 'react-redux-form';
import { loginUser } from '../login-actions';
import './signup.css';

interface State {
  username: string;
  password: string;
}

class LoginContainer extends React.Component<{}, State> {

  constructor(props: any) {

    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  handleSubmit(val:any) {
    console.log(this.state);
    loginUser(this.state.username, this.state.password);
  }

  updateUsername(e: any) {

    this.setState({
      username: e.target.value
    });
  }

  updatePassword(e: any) {

    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
      <Form className="create-user" model="user" onSubmit={this.handleSubmit}>
        <div>
          <label>UserID</label>
          <input type="text" value={this.state.username} onChange={this.updateUsername} />
        </div>
        <div>
        <label>Password</label>
        <input type="password" value={this.state.password} onChange={this.updatePassword} />
        </div>
        <button>Submit!</button>
      </Form>
    );
  }
}

export default LoginContainer;
