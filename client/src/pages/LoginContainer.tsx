import { connect } from 'react-redux';
import LoginComponent from './LoginComponent';

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return {}
};
export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);