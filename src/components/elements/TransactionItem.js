import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

import {
  updateSelectedTransaction,
  displayModal,
} from '../../actions/actions.js';

import {
  getMonthName,
  getDate,
  displayPriceFormatter,
} from '../../utils/utils.js';
import LinearProgress from '@material-ui/core/LinearProgress';

import { Identicon } from 'ethereum-react-components';

// snapshotted
const TransactionInfo = props => {
  let cn = props.tx.confirmationNumber;
  return (
    <td className="info">
      {cn === 'Pending'
        ? 'Pending...'
        : cn > 12
        ? '12 of 12 Confirmations'
        : cn + ' of 12 Confirmations'}
    </td>
  );
};

const MinusIcon = () => {
  return (
    <td>
      <i className="icon-arrow-right minus" />
    </td>
  );
};

const DateInfo = props => {
  return (
    <td
      className="time simptip-position-right simptip-movable"
      data-tool-tip={props.tx.dateSent}
    >
      <h2>{getMonthName(props.tx.dateSent)}</h2>
      <p>{getDate(props.tx.dateSent)}</p>
    </td>
  );
};

export class TransactionItem extends Component {
  constructor(props) {
    super(props);
    this.updateToTransaction = this.updateToTransaction.bind(this);
  }

  renderProgressBar(tx) {
    this.state = {
      completed:
        tx.confirmationNumber !== 'Pending' ? tx.confirmationNumber : 0,
    };
    return (
      <React.Fragment>
        {tx.confirmationNumber === 'Pending' ? (
          <LinearProgress />
        ) : (
          <LinearProgress
            variant="determinate"
            value={(100 / 12) * this.state.completed}
          />
        )}
      </React.Fragment>
    );
  }

  updateToTransaction(e) {
    e.stopPropagation();
    console.warn('todo: moved from security icon and need to pudate');
    // this.props.updateTransactionToSend({
    //   name: 'to',
    //   value: props.hash,
    // });
  }

  // snapshotted
  renderTransactionType(tx) {
    //TODO: transaction type
    return (
      <td className="account-name">
        <h2>{tx.transactionType ? tx.transactionType : 'Transaction Type'}</h2>
        <p>
          <span className="address dapp-shorten-text not-ens-name">
            <Identicon
              classes="dapp-identicon dapp-tiny"
              title
              size="tiny"
              address={tx.from}
            />
            <Link
              to={{ pathname: '/send-from/' + tx.from }}
              title={tx.from}
              onClick={e => this.updateToTransaction(e)}
            >
              {tx.from}
            </Link>
          </span>
          <span className="arrow">→</span>
          <span className="address dapp-shorten-text not-ens-name">
            <Identicon
              classes="dapp-identicon dapp-tiny"
              title
              size="tiny"
              address={tx.to}
            />
            <Link
              to={{ pathname: '/send-from/' + tx.to }}
              title={tx.to}
              onClick={e => this.updateToTransaction(e)}
            >
              {tx.to}
            </Link>
          </span>
        </p>
      </td>
    );
  }

  // snapshotted
  renderTransactionAmount(tx) {
    return (
      <td className="transaction-amount minus">
        -
        {this.props.web3 && this.props.web3.web3Instance
          ? displayPriceFormatter(this.props, tx.value, 'ETHER') + ' ETHER'
          : tx.value}
      </td>
    );
  }

  //TODO: snapshot
  // renderTableRow(tx) {
  //   return (
  //     <React.Fragment>
  //       <tr
  //         className={tx.confirmationNumber === 'Pending' ? 'unconfirmed' : ''}
  //         key={shortid.generate()}
  //         data-transaction-hash={tx.transactionHash}
  //         data-block-hash={tx.blockHash}
  //         onClick={e => {
  //           if (e.target.tagName !== 'A') {
  //             this.props.updateSelectedTransaction(tx);
  //             this.props.displayModal('displayTransaction');
  //           }
  //         }}
  //       >
  //         <DateInfo tx={tx} />
  //         {this.renderTransactionType(tx)}
  //         <td>
  //         { tx.confirmationNumber === 'Pending'
  //             ? (
  //                 <React.Fragment>
  //                   <i className="icon-ban" />
  //                   <i className="icon-reload" />
  //                 </React.Fragment>
  //               )
  //             : null
  //          }
  //          </td>
  //         <TransactionInfo tx={tx} />
  //         {this.renderTransactionAmount(tx)}
  //         <MinusIcon />
  //       </tr>
  //     </React.Fragment>
  //   );
  // }

  render() {
    let tx = this.props.transaction;
    return (
      <React.Fragment>
        <tr
          className={tx.confirmationNumber === 'Pending' ? 'unconfirmed' : ''}
          key={shortid.generate()}
          data-transaction-hash={tx.transactionHash}
          data-block-hash={tx.blockHash}
          onClick={e => {
            if (e.target.tagName !== 'A') {
              this.props.updateSelectedTransaction(tx);
              this.props.displayModal('displayTransaction');
            }
          }}
        >
          <DateInfo tx={tx} />
          {this.renderTransactionType(tx)}
          <td>
            {tx.confirmationNumber === 'Pending' ? (
              <React.Fragment>
                <i className="icon-ban" />
                <i className="icon-reload" />
              </React.Fragment>
            ) : null}
          </td>
          <TransactionInfo tx={tx} />
          {this.renderTransactionAmount(tx)}
          <MinusIcon />
        </tr>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  ...state,
});

export default connect(
  mapStateToProps,
  {
    updateSelectedTransaction,
    displayModal,
  }
)(TransactionItem);
