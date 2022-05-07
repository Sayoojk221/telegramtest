import React, { useState } from "react";

import { apiClient, telegramClient, tronWeb } from "./api/request";
import Account from "./components/Account";
import Summary from "./components/Summary";
import { WalletContext } from "./contexts/walletContext";
import "./style/style.css";

const chat_id = '';



function App() {
  const initial = { address: "TSaJqQ1AZ2bEYyqBwBmJqCBSPv8KPRTAdv" };
  const [wallet, setWallet] = useState(initial);
  const [transactions, setTransactions] = useState([]);

  let lastBlockID = localStorage.getItem('lastBlockID')

  const getTransactions = async () => {
    const { data, ok } = await apiClient.get(
      `accounts/${wallet.address}/transactions`
    );
    if (ok) {
      const info = [];
      const latestTime = data.data[0].raw_data.timestamp 
      let transObj = {}
      data.data.map((item) => {
        const obj = {};
        const transTime = item.raw_data.timestamp;
        const hexAddress = tronWeb.address.toHex(wallet.address);
        const fullDate = new Date(transTime);
        obj["date"] = `${fullDate.toString()}`;
        obj["amount"] = `${item.raw_data.contract[0].parameter.value.amount / 1000000} TRX`
        obj["mode"] =
          item.raw_data.contract[0].parameter.value.to_address === hexAddress
            ? "Credit"
            : "Debit";
        info.push(obj);


        //here its  store latest transation details
        if (transTime >= latestTime) {
          obj['owner'] = item.raw_data.contract[0].parameter.value.owner_address
          obj['blockNumber'] = item.blockNumber
          transObj = obj
          
        }

      });


      if((Object.keys(transObj).length > 0) && (lastBlockID != transObj.blockNumber)){
        let text = `You have ${transObj.mode} ${transObj.amount} on ${transObj.date} from ${transObj.owner} address`
        await telegramClient.post('sendMessage',{text,chat_id})
        localStorage.setItem('lastBlockID',transObj.blockNumber)
      }

      setTransactions(info);
      
    }
  };

  const contextProps = {
    wallet,
    setWallet,
    transactions,
    setTransactions,
    getTransactions,
  };


  return (
    <WalletContext.Provider value={contextProps}>
      <div className="container">
        <div className="row mt-5">
          <Account />
          <Summary />
        </div>
      </div>
    </WalletContext.Provider>
  );
}

export default App;
