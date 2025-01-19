import { MdCurrencyExchange } from "react-icons/md";
import { BsGiftFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { CgToolbox } from "react-icons/cg";
import { GoHistory } from "react-icons/go";
import { FaUser } from "react-icons/fa";

export const coins = ['Bitcoin', 'Ethereum', 'USDT', 'TRON', 'BNB']
export const currencies = [
    { name: 'USD', symbol: '$' },
    { name: 'NGN', symbol: '₦' },
]
export const links = [
    { label: 'Dashboard', url: '/user/dashboard' ,icon:MdDashboard},
    { label: 'Crypto Exchange', url: '/user/exchange' ,icon:MdCurrencyExchange},
    { label: 'Gift  Cards', url: '/user/giftcards',icon:BsGiftFill },
    { label: 'Profit Tools', url: '/user/profit_tools',icon:CgToolbox },
    { label: 'Transaction History', url: '/user/transactions_history',icon:GoHistory },
    { label: 'Profile', url: '/user/profile',icon:FaUser }
]
export const blockchainNetworks = [
    { value: "bitcoin", label: "Bitcoin (BTC)" },
    { value: "ethereum", label: "Ethereum (ETH)" },
    { value: "binance-smart-chain", label: "Binance Smart Chain (BSC)" },
    { value: "cardano", label: "Cardano (ADA)" },
    { value: "solana", label: "Solana (SOL)" },
    { value: "the-open-network", label: "The Open Network (TON)" },
    { value: "polkadot", label: "Polkadot (DOT)" },
    { value: "avalanche", label: "Avalanche (AVAX)" },
    { value: "ripple", label: "Ripple (XRP)" },
    { value: "litecoin", label: "Litecoin (LTC)" },
    { value: "tron", label: "Tron (TRX)" },
    { value: "cosmos", label: "Cosmos (ATOM)" },
    { value: "algorand", label: "Algorand (ALGO)" },
    { value: "near-protocol", label: "Near Protocol (NEAR)" },
    { value: "fantom", label: "Fantom (FTM)" },
    { value: "hedera-hashgraph", label: "Hedera Hashgraph (HBAR)" },
    { value: "tezos", label: "Tezos (XTZ)" },
    { value: "arbitrum", label: "Arbitrum" },
    { value: "optimism", label: "Optimism" },
    { value: "polygon", label: "Polygon (MATIC)" },
    { value: "elrond", label: "Elrond (EGLD)" },
    { value: "stellar", label: "Stellar (XLM)" },
    { value: "zilliqa", label: "Zilliqa (ZIL)" },
    { value: "vechain", label: "VeChain (VET)" },
    { value: "eos", label: "EOS" },
    { value: "harmony", label: "Harmony (ONE)" },
    { value: "kadena", label: "Kadena (KDA)" },
    { value: "theta-network", label: "Theta Network (THETA)" },
];

export const instructions = [
    `Third party payments are not allowed. Payments must be made from your personal account.Matching your verified name on your moniequest account profile.`,
    `For a successful transaction, do not enter any crypto related terms (BTC,ETH,USDT) in your payment narration or memo.`,
    `Opening orders without making payments is not allowed.`,
    `Failure to comply with the above stated terms leads to limitation on your moniequest account and total loss of paid amount`
]
export const sellInstruction = [
    'Please note that due to price flunctuations, there may be a slight difference between the amount you receive and the estimated amount.'
]
export const BankAcc = {
    "name": "Access Bank",
    "accountNumber": "1234567890",
    "accountName": "MonieQuest Account",
}