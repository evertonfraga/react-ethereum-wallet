import React, { Component } from 'react';
import { connect } from 'react-redux';

// import PageHeader from '../elements/PageHeaders.jsx';
// import { AccountPageHeader } from '../../constants/FieldConstants.jsx';
import AccountItem from '../elements/AccountItem.js';
import LatestTransactions from '../elements/LatestTransactions.js';
import { Link } from 'react-router-dom';

class AccountView extends Component {
  renderAccounts() {
    if (this.props.reducers.Wallets !== undefined) {
      const wallets = this.props.reducers.Wallets;
      const icon = 'icon-key';
      return (
        <React.Fragment>
          {Object.keys(wallets).map((address, i) => (
            <AccountItem
              key={address}
              number={i + 1}
              icon={icon}
              address={address}
              wallet={wallets[address]}
              props={this.props}
            />
          ))}
        </React.Fragment>
      );
    }
  }

  renderWalletBoxList() {
    if (this.props.reducers.WalletContracts !== undefined) {
      const walletContractList = this.props.reducers.WalletContracts;
      const icon = 'icon-wallet';
      return (
        <React.Fragment>
          {Object.keys(walletContractList).map((address, i) => (
            <AccountItem
              key={address}
              number={i + 1}
              icon={icon}
              address={address}
              wallet={walletContractList[address]}
              props={this.props}
            />
          ))}
        </React.Fragment>
      );
    }
  }

  routeToDeployContract(e) {
    console.log('here in routeToDeployContract', e);
  }

  render() {
    return (
      <div className="dapp-container account-page">
        <h1>
          <strong>Accounts</strong> Overview
        </h1>
        {this.renderAccounts()}
        <h2>Wallet Contracts</h2>
        <p>
          These contracts are stored on the blockchain and can hold and secure
          Ether. They can have multiple accounts as owners and keep a full log
          of all transactions.
        </p>
        <div className="dapp-clear-fix" />
        <div className="wallet-box-list">{this.renderWalletBoxList()}</div>
        <div className="dapp-clear-fix" />
        <Link
          to={{ pathname: '/account/new' }}
          className="wallet-box create add-contract"
        >
          <div className="account-pattern">+</div>
          <h3>ADD WALLET CONTRACT</h3>
        </Link>
        <div className="dapp-clear-fix" />
        {this.props.reducers.Transactions ? (
          <LatestTransactions transactions={this.props.reducers.Transactions} />
        ) : (
          <div>No transactions found.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(AccountView);