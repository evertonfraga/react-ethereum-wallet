import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../stylesheets/navbar.css';
import { HeaderField, NetworkHeader, BalanceHeader } from './elements/navbarFields';
import { DefaultNavFields } from '../constants/FieldConstants.jsx';

const SwitchHeader = ({ field, i, properties }) => {
  if (field.type === 'peerInfo') {
    return <NetworkHeader properties={properties} field={field} key={`navfield-${i}`} />;
  } else {
    return <BalanceHeader properties={properties} field={field} key={`navfield-${i}`}/>;
  }
};

class NavBar extends Component {


  constructor(props){
    super(props)
  }

  render() {
    return (
      <header className="dapp-header dapp-full-header">
        <nav>
          <ul>
            {DefaultNavFields.map(
              (f, i) =>
                f.type === 'link' ? (
                  <HeaderField field={f} key={`navfield-${i}`} />
                ) : (
                  <SwitchHeader properties={this.props} field={f} i={i} key={`navfield-${i}`} />
                )
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  currency: state.currency
});

export default connect(mapStateToProps)(NavBar);
