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
    { label: 'Dashboard', url: '/user/dashboard', icon: MdDashboard },
    { label: 'Crypto Exchange', url: '/user/exchange', icon: MdCurrencyExchange },
    { label: 'Gift  Cards', url: '/user/giftcards', icon: BsGiftFill },
    { label: 'Profit Tools', url: '/user/profit_tools', icon: CgToolbox },
    { label: 'Transaction History', url: '/user/transactions_history', icon: GoHistory },
    { label: 'Profile', url: '/user/profile', icon: FaUser }
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
export const giftCardValidations = [
    { brand: "--select--", length: '', regex: '' },
    { brand: "PAYSAFE", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "PLAYSTATION", length: 12, regex: /^[A-Za-z0-9]{12}$/ },
    { brand: "WALMART 61/62", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "ADIDAS", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "ROBLOX", length: 10, regex: /^[A-Za-z0-9]{10}$/ },
    { brand: "VANILLA/ONE VANILLA MASTERCARD", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "VANILLA/ONE VANILLA VISA", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "VISA 4030", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "VISA 4097", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "HOME DEPOT", length: 19, regex: /^[A-Za-z0-9]{19}$/ },
    { brand: "NETSPEND", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "MICHAEL KORS", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "AMEX SERVE 3777/3751", length: 15, regex: /^[A-Za-z0-9]{15}$/ },
    { brand: "CVS PHARMACY", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "SAKS FIFTH AVENUE", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "BLOOMINGDALES", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "NETFLIX", length: 11, regex: /^[A-Za-z0-9]{11}$/ },
    { brand: "TARGET", length: 15, regex: /^[A-Za-z0-9]{15}$/ },
    { brand: "BEST BUY", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "JC PENNY", length: 19, regex: /^[A-Za-z0-9]{19}$/ },
    { brand: "XBOX", length: 25, regex: /^[A-Za-z0-9]{25}$/ },
    { brand: "GAMESTOP", length: 19, regex: /^[A-Za-z0-9]{19}$/ },
    { brand: "RAZER GOLD", length: 14, regex: /^[A-Za-z0-9]{14}$/ },
    { brand: "VISA", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "NIKE", length: 19, regex: /^[A-Za-z0-9]{19}$/ },
    { brand: "AMERICAN EXPRESS 3779", length: 15, regex: /^[A-Za-z0-9]{15}$/ },
    { brand: "AMAZON", length: 14, regex: /^[A-Za-z0-9]{14}$/ },
    { brand: "FOOTLOCKER", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "NORDSTROM", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "MACY'S", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "EBAY", length: 13, regex: /^[A-Za-z0-9]{13}$/ },
    { brand: "SEPHORA", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "APPLE STORE", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "ITUNES", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
    { brand: "STEAM", length: 15, regex: /^[A-Za-z0-9]{15}$/ },
    { brand: "GOOGLE PLAY", length: 20, regex: /^[A-Za-z0-9]{20}$/ },
    { brand: "OFFGAMERS", length: 16, regex: /^[A-Za-z0-9]{16}$/ },
  ];
   
  