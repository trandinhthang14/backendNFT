import Web3 from "web3";
import { config } from "../../config/config.js";
import Abi from "../utils/contract/Marketplace.json" assert { type: "json" };
import { configDotenv } from "dotenv";
configDotenv();
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.WEB3_WEBSOCKET_PROVIDER)
);

const ContractInstance = new web3.eth.Contract(
  Abi,
  process.env.CONTRACT_ADDRESS
);
export { ContractInstance, web3 };
