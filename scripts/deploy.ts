import hre from "hardhat";
// const hre = require("hardhat");

async function main() {
  const mytoken = await hre.ethers.deployContract("MyToken", ["https://coral-genetic-sparrow-90.mypinata.cloud/ipfs/QmehY4rPC4dc7WuFMTxnUbNHCTGZNax3w18NX3HAJsemrx", 1000]);
  await mytoken.waitForDeployment();

  console.log("Contract deployed at address: ", await mytoken.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



// 0x88F55B077805f063B8ECcA3F6028865c18a67a54