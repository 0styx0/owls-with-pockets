import { connect } from 'react-redux';
import GameListComponent from './GameListComponent';

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return {}
};
export const GameList = connect(mapStateToProps, mapDispatchToProps)(GameListComponent);