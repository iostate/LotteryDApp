const { network, ethers } = require("hardhat");

async function main() {
  if (network.name === "hardhat") {
    console.warn("Use --network localhost otherwise hardhat will close the blockchain \
     immediately after deploying");
  }

  const [owner] = await ethers.getSigners();

  console.log("Deploying contracts with the account: ", owner.address);

  console.log("Account Balance: ", await (await owner.getBalance()).toString());

  const Lottery = await ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy();
  await lottery.deployed().then(console.log("Successfully deployed contract!"));

  console.log("Token Address: ", lottery.address);
}

function moveABIs(lottery) {
  const fs = require("fs");
  const pathContractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(pathContractsDir)) {
    fs.mkDirSync(contractsDir);
  }

  fs.writeFileSync(contractsDir + "/contract-address.json", JSON.stringify({ Lottery: lottery.address }, undefined, 2));

  const LotteryArtifact = artifacts.readArtifactsSync("Lottery");

  fs.writeFileSync(contractsDir + "/Lottery.json", JSON.stringify(LotteryArtifact, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
