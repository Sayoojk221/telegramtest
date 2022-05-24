import React from "react";
import { Provider } from "react-redux";


import store from "./store/store";
import Account from "./components/Account";
import Summary from "./components/Summary";
import { telegramClient } from "./api/config";



function App() {

 
  return (
    <Provider store={store}>
      <div className="container">
        <div className="row mt-5">
          <Account />
          <Summary />
          

        </div>
      </div>
    </Provider>
  );
}

export default App;
