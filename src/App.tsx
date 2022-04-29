import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Board from './components/Board/Board';
import TimelinePage from './pages/TimelinePage';
import AddNewCardPage from './pages/AddNewCardPage';
import NotFoundPage from './pages/NotFoundPage';

import styles from './App.module.css';

import { loadAccounts, addAccount } from './redux/accounts/actions';

class App extends Component<any, any> {
  componentDidMount() {
    this.fetchAccounts();
  }

  fetchAccounts = () => this.props.loadAccounts();

  handleSubmit = newAccount => this.props.addAccount(newAccount);

  renderTimelinePage = routeProps => (
      <TimelinePage {...routeProps} accounts={this.props.accounts} />
  );

  renderAddNewCardPage = routeProps => (
      <AddNewCardPage {...routeProps} handleSubmit={this.handleSubmit} />
  );

  render() {
    return (
        <Router>
          <Board accounts={this.props.accounts} />
          <div className={styles.pageContent}>
            <Switch>
              <Route
                  path="/account/:accountId"
                  render={this.renderTimelinePage}
              />
              <Route
                  path="/actions/add_card"
                  render={this.renderAddNewCardPage}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
    );
  }
}

const mapStateToProps = state => ({ accounts: state.accounts });
const mapDispatchToProps = dispatch => ({
  loadAccounts: () => dispatch(loadAccounts()),
  addAccount: payload => dispatch(addAccount(payload)),
});

export { App };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
