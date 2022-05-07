import { create } from "apisauce";
const TronWeb = require("tronweb");


const base = "https://nile.trongrid.io";
const telegramBotKey = '';
const tron_api_key = '7ba3648b-fa3c-40bf-ac36-afacebbbf5cf'

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
