import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTransactions } from "../store/selectors";
import { changeAddress, loadTransactions } from "../store/slices/transactions";
import { dailyReport } from "../utils/func_";

function Account() {
  const { list } = useSelector(getTransactions);
  const [address, setAddress] = useState("TSaJqQ1AZ2bEYyqBwBmJqCBSPv8KPRTAdv");
  const handleChange = ({ target: { value } }) => setAddress(value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    changeAddress(address);
    loadTransactions();
  };

  const handleDailyReport = () => {
    if (list.length == 0)
      return alert("please get transaction details of entered wallet address");
    dailyReport(list, address);
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
                value={address}
                onChange={handleChange}
              />
            </div>
            <div className="col-xl-4 d-flex">
              <button type="submit" className="btn btn-primary mr-3 btn-sm">
                Get Latest Transactions
              </button>
              <span onClick={handleDailyReport} className="btn btn-primary ">
                Send daily report
              </span>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <p>Welcome</p>
        <p>
          "nile.trongrid.io" API endpoint used for getting transactions
          details.So only use Tron Nile testnet node on tronlink application if
          you want send tron tokens to wallet address
        </p>
        <p>
          Telegram group link:{" "}
          <a href="https://t.me/+2k5xFOu4HBpiNjM1" target={"_blank"}>
            https://t.me/+2k5xFOu4HBpiNjM1
          </a>
        </p>
        <p>This group used to receive transaction reports</p>
      </div>
    </div>
  );
}

export default Account;
