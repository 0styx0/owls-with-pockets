import { connect } from 'react-redux';
import FeatureComponent from './FeatureComponent';

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return {}
};
export const FeatureContainer = connect(mapStateToProps, mapDispatchToProps)(FeatureComponent);