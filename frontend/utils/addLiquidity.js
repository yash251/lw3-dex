import { Contract, utils } from "ethers";
import {
  EXCHANGE_CONTRACT_ABI,
  EXCHANGE_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ABI,
  TOKEN_CONTRACT_ADDRESS,
} from "../constants";
/**
 * addLiquidity helps add liquidity to the exchange,
 * If the user is adding initial liquidity, user decides the ether and CD tokens he wants to add
 * to the exchange. If he is adding the liquidity after the initial liquidity has already been added
 * then we calculate the Crypto Dev tokens he can add, given the Eth he wants to add by keeping the ratios
 * constant
 */
 export const addLiquidity = async (
    signer,
    addCDAmountWei,
    addEtherAmountWei
  ) => {
    try {
        // create a new instance of the token contract
        const tokenContract = new Contract(
            TOKEN_CONTRACT_ADDRESS,
            TOKEN_CONTRACT_ABI,
            signer
        );
        // create a new instance of the exchange contract
        const exchangeContract = new Contract(
            EXCHANGE_CONTRACT_ADDRESS,
            EXCHANGE_CONTRACT_ABI,
            signer
        );
        // Because CD tokens are an ERC20, user would need to give the contract allowance
        // to take the required number CD tokens out of his contract
        let tx = await tokenContract.approve(
            EXCHANGE_CONTRACT_ADDRESS,
            addCDAmountWei.toString()
        );
        await tx.wait();
        // After the contract has the approval, add the ether and cd tokens in the liquidity
        tx = await exchangeContract.addLiquidity(addCDAmountWei, {
            value: addEtherAmountWei,
        });
        await tx.wait();
    }
    catch (err) {
        console.error(err);
    }
};