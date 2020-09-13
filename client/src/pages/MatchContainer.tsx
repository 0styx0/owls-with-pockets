import { connect } from 'react-redux';
import MatchComponent from './MatchComponent';

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return {}
};
export const MatchContainer = connect(mapStateToProps, mapDispatchToProps)(MatchComponent);