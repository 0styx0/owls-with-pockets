import  React from 'react';
import { Form, Control } from 'react-redux-form';
import { createUser } from '../create-user-actions';

import { connect } from 'react-redux';
import HomeComponent from './HomeComponent';

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return {}
};

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
interface State {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

class SignupContainer extends React.Component<{}, State> {

  constructor(props: any) {

    super(props);

    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFirstname = this.updateFirstname.bind(this);
    this.updateLastname = this.updateLastname.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  handleSubmit(val:any) {
    console.log(this.state);
    createUser(this.state.username, this.state.firstname, this.state.lastname, this.state.password);
  }

  updateUsername(e: any) {
    this.setState({
      username: e.target.value
    });
  }

  updateFirstname(e: any) {
    this.setState({
      firstname: e.target.value
    });
  }

  updateLastname(e: any) {
    this.setState({
      lastname: e.target.value
    });
  }
  updatePassword(e: any) {

    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
      <Form model="user" onSubmit={this.handleSubmit}>
        <label>UserID</label>
        <input type="text" value={this.state.username} onChange={this.updateUsername} />
        <label>First Name</label>
        <input type="text" value={this.state.firstname} onChange={this.updateFirstname} />
        <label>Last Name</label>
        <input type="text" value={this.state.lastname} onChange={this.updateLastname} />
        <label>Password</label>
        <input type="password" value={this.state.password} onChange={this.updatePassword} />
        <button>Submit!</button>
      </Form>
    );
  }
}

export default SignupContainer;

