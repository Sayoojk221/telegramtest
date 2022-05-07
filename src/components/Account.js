import React, { useState, useContext } from "react";

import { WalletContext } from "../contexts/walletContext";

function Account() {
  const { wallet, setWallet,getTransactions } = useContext(WalletContext);

  const handleChange = ({ target: { value, name } }) => {
    const walletInfo = { ...wallet };
    walletInfo[name] = value;
    setWallet(walletInfo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    getTransactions()
  };

  return (
    <div className="col-md-5">
      <div className="card">
        <div className="card-header">Account</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="address">Wallet address</label>
              <input
                type="text"
                className="form-control"
                required
                name="address"
                value={wallet.address}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Get Transactions
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
