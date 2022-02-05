import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const address = '0xfC2C9F0A8eC61d1Ec71C377A9b34784c0E6ed256';
const abi = CampaignFactory.abi;

const factory = new web3.eth.Contract(abi, address);

export default factory;
