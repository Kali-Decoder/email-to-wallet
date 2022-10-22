const express = require("express");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

require("dotenv").config();
let provider = new HDWalletProvider(
  process.env.MNEMONIC,
  `https://goerli.infura.io/v3/${process.env.PROJECT_ID}`
);

let web3 = new Web3(provider);

console.log(web3);
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello Wrold");
});

//Sign a message
router.post("/sign-message", async (req, res) => {
  let message = req.body.message;

  let accounts = await web3.eth.getAccounts();
  message = await web3.utils.utf8ToHex(message);
  let signMessage = await web3.eth.personal.sign(
    message,
    accounts[0],
    "nikku@123"
  );
  res.status(200).json({ signMessage });
});

// recover a sign message address

router.post("/recover-sign", async (req, res) => {
  let { message, sign } = req.body;
  let account = await web3.eth.personal.ecRecover(message, sign);
  res.status(200).json({ account });
});

router.post("/new-account", async (req, res) => {
  let password = req.body.password;
  try {
    let address = await web3.eth.personal.newAccount(password);
    res.status(200).json({ address });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
