import { telegramClient, telegramGroupId, tronWeb } from "../api/config";

export const convertData = async (transactions, address, setTransaction) => {
  let lastBlockID = localStorage.getItem("lastBlockID");
  const info = [];
  const latestTime = transactions[0].raw_data.timestamp;
  let transObj = {};
  transactions.map((item) => {
    if (item.ret[0].contractRet === "SUCCESS") {
      const obj = {};
      const transTime = item.raw_data.timestamp;
      const hexAddress = tronWeb.address.toHex(address);
      const fullDate = new Date(transTime);
      obj["date"] = `${fullDate.toString()}`;
      obj["amount"] = `${
        item.raw_data.contract[0].parameter.value.amount / 1000000
      } TRX`;
      obj["mode"] =
        item.raw_data.contract[0].parameter.value.to_address === hexAddress
          ? "Credit"
          : "Debit";
      info.push(obj);

      //here its  store latest transation details
      if (transTime >= latestTime) {
        obj["owner"] = item.raw_data.contract[0].parameter.value.owner_address;
        obj["blockNumber"] = item.blockNumber;
        transObj = obj;
      }
    }
  });

  if (Object.keys(transObj).length > 0 && lastBlockID != transObj.blockNumber) {
    let text = `Transaction details of wallet ( ${address} ) - ${transObj.mode} ${transObj.amount} on ${transObj.date} from ${transObj.owner} address`;
    await telegramClient.post("sendMessage", {
      text,
      chat_id: telegramGroupId,
    });
    localStorage.setItem("lastBlockID", transObj.blockNumber);
  }
  setTransaction(info);
};


export const dailyReport = async (transactions, address) => {
  let totalIn = 0;
  let totalOut = 0;
  let net = 0
  const todayDate = new Date();
  transactions?.map(trans => {
    if (trans.ret[0].contractRet === "SUCCESS") {
      const transTime = trans.raw_data.timestamp;
      const hexAddress = tronWeb.address.toHex(address);
      const fullDate = new Date(transTime);
      const amount = parseFloat(trans.raw_data?.contract[0].parameter.value.amount / 1000000)
      let toAddress = trans.raw_data.contract[0].parameter.value.to_address

      let isCredit = trans.raw_data.contract[0].parameter.value.to_address === hexAddress ? true : false
      


      if(todayDate.getDate() == fullDate.getDate()){
        if(isCredit){
          totalIn += amount;
        }else{
          totalOut += amount
        }
      }



      if(isCredit){
        net += amount;
      }else{
        net -= amount;
      }
    }
  })

  let text = `Daily report of wallet ( ${address} ) - Date- (${todayDate.getDate()}/${todayDate.getMonth()}/${todayDate.getFullYear()}) ,Amount In - ${totalIn}TRX , Amount Out - ${totalOut}TRX, Net - ${parseInt(net)}TRX `;
  await telegramClient.post("sendMessage", {
    text,
    chat_id: telegramGroupId,
  });

}