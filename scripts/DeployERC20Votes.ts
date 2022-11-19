import { ethers } from "hardhat";
import { MyToken, MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv"; 
dotenv.config();

async function main() {
    const provider = ethers.getDefaultProvider("goerli");

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    // const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const signer = wallet.connect(provider);
    const balanceBN = await signer.getBalance();
    console.log(`Connected to the account of address ${signer.address}`);
    console.log(`The balance of this account is ${balanceBN.toString()} Wei`);

    console.log("Deploying ERC20Votes contract");
    
    let erc20Contract: MyToken;
    const erc20Factory = new MyToken__factory(signer);
    erc20Contract = await erc20Factory.deploy() as MyToken;
    await erc20Contract.deployed();

    console.log(`The ballot contract was deployed at the address ${erc20Contract.address} `)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});