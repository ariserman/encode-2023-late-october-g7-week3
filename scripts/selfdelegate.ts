import { ethers } from "hardhat";
import { MyToken, MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv"; 
dotenv.config();

async function main() {
    const provider = ethers.getDefaultProvider("goerli");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    // const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const signer = wallet.connect(provider);
    console.log(`Connected to the account of address ${signer.address}`);
  

    const tokenContractFactory = new MyToken__factory(signer);
    const tokenContract = tokenContractFactory.attach(process.env.TOKEN_CONTRACT_ADDRESS ?? "");

    const delegateTx = await tokenContract.delegate(wallet.address);
    await delegateTx.wait();

    const votePower = await tokenContract.getVotes(wallet.address);
    console.log(`Wallet account ${wallet.address} has ${votePower} voting power.`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});