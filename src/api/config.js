import { create } from "apisauce";
const TronWeb = require("tronweb");


const base = "https://nile.trongrid.io";
const telegramBotKey = process.env.REACT_APP_telegram_bot_key;
const tron_api_key = process.env.REACT_APP_tron_api_key
export const telegramGroupId = process.env.REACT_APP_telegramGroupId;


const tronWeb = new TronWeb({
  fullHost: base,
  headers: {
    "TRON-PRO-API-KEY": tron_api_key,
    "Content-Type": "application/json",
  },
});

const apiClient = create({
  baseURL: base + "/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

const telegramClient = create({
  baseURL:`https://api.telegram.org/bot${telegramBotKey}/`,
  headers: {
    "Content-Type": "application/json",
  },
})

export {apiClient,tronWeb,telegramClient};
