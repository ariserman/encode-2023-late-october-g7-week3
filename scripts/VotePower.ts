import { ethers } from "hardhat";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
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
    const contractAddress = process.env.VOTE_CONTRACT_ADDRESS ?? "";
    const address = params[0];
    
    let tokenizedBallotContract: TokenizedBallot;
    const tokenizedballotFactory = new TokenizedBallot__factory(signer);
    tokenizedBallotContract = tokenizedballotFactory.attach(contractAddress);
    
    const tx = await tokenizedBallotContract.votePower(address);
    console.log(tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});