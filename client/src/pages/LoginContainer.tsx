import  React from 'react';
import { Form, Control } from 'react-redux-form';
import { loginUser } from '../login-actions';

class LoginContainer extends React.Component {
  handleSubmit(val:any) {
    loginUser(val.name, val.password);
    console.log(val.name);
  }

  render() {
    return (
      <Form model="user" onSubmit={(val) => this.handleSubmit(val)}>
        <label>UserID</label>
        <Control.text model=".name" />
        <label>Password</label>
        <Control.text model=".password" />
        <button>Submit!</button>
      </Form>
    );
  }
}

export default LoginContainer;