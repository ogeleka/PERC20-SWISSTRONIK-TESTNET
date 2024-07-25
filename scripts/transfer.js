// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const {
  encryptDataField,
  decryptNodeResponse,
} = require("@swisstronik/swisstronik.js");

// Function to send a shielded transaction using the provided signer, destination, data, and value
const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link from the network configuration
  const rpcLink = hre.network.config.url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpcLink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  // your deployed contract
  const replace_contractAddress = "0x31bC5Fb20396B42C0e0fAe004B80f301c39801f4";

  const [signer] = await hre.ethers.getSigners();

  const replace_contractFactory = await hre.ethers.getContractFactory(
    "PERC20Sample"
  );
  const contract = replace_contractFactory.attach(replace_contractAddress);

  const replace_functionName = "transfer";
  const replace_functionArgs = ["0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1","1",];
  const transaction = await sendShieldedTransaction(
    signer,
    replace_contractAddress,
    contract.interface.encodeFunctionData(
      replace_functionName,
      replace_functionArgs
    ),
    0
  );

  await transaction.wait();

  console.log("Transfer Transaction Hash: ", transaction.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
