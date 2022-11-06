import { Contract, providers, utils, BigNumber } from "ethers";
import {
  EXCHANGE_CONTRACT_ABI,
  EXCHANGE_CONTRACT_ADDRESS,
} from "../constants";

/**
 * removeLiquidity: Removes the `removeLPTokensWei` amount of LP tokens from
 * liquidity and also the calculated amount of `ether` and `CD` tokens
 */
export const removeLiquidity = async (signer, removeLPTokensWei) => {
    // Create a new instance of the exchange contract
    const exchangeContract = new Contract(
        EXCHANGE_CONTRACT_ADDRESS,
        EXCHANGE_CONTRACT_ABI,
        signer
    );
    const tx = await exchangeContract.removeLiquidity(removeLPTokensWei);
    await tx.wait();
};