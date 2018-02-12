import React, { Component } from 'react';
import ConsumerContainer from '../ConsumerContainer';
import CandidateContainer from '../CandidateContainer';
import ManageTokensContainer from '../ManageTokensContainer';
import TokenHolderContainer from '../TokenHolderContainer';
import ListingContainer from '../ListingContainer';
import {
  CONSUMER,
  APPLICANT,
  CANDIDATE,
  MANAGE_TOKENS,
  TOKEN_HOLDER
} from '../../constants/Navigation';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

class MainContainer extends Component {
  render () {
    return (
      <Route>
        <Switch>
          <Redirect path='/' to={CONSUMER} exact />
          <Route path={MANAGE_TOKENS} render={(props) => (
            <ManageTokensContainer />
          )} />
          <Route path={CONSUMER} render={(props) => (
            <ConsumerContainer />
          )} />
          <Route path={APPLICANT} render={() => (
            <CandidateContainer />
          )} />
          <Route path={TOKEN_HOLDER} render={(props) => (
            <TokenHolderContainer />
          )} />
          <Route path={CANDIDATE} render={(props) => (
            <ListingContainer />
          )} />
          <Route path='/' exact component={ConsumerContainer} />
          <Route component={NoMatch}/>
        </Switch>
      </Route>
    );
  }
}

export default MainContainer;
