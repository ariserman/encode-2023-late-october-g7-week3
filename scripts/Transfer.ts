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
  
    const args = process.argv;
    const params = args.slice(2);
    const contractAddress = params[0];
    const targetAccount = params[1];
    const amount = params[2];
    
    let erc20Contract: MyToken;
    const erc20Factory = new MyToken__factory(signer);
    erc20Contract = erc20Factory.attach(contractAddress);
    
    const tx = await erc20Contract.transfer(targetAccount, ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    console.log(receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});