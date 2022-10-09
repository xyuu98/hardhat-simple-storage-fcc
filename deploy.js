const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcBatchProvider(
    process.env.RPC_URL
  );
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet = await wallet.connect(provider);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying···Please Wait···");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  console.log(`Contract Address: ${contract.address}`);

  // console.log("Here's the deployment transaction:");
  // console.log(contract.deployTransaction);
  // console.log("Here's the transaction receipt:");
  // console.log(transactionReceipt);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store("6");
  const transactionReceipt = await transactionResponse.wait(1);
  const updateFavoriteNumber = await contract.retrieve();
  console.log(`update Favorite Number:${updateFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
