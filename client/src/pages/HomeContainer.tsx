import { connect } from 'react-redux';
import HomeComponent from './HomeComponent';

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return {}
};
export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
