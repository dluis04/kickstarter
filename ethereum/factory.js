import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const address = '0x2264c75baC21B11930B48e92117cCDd12C7A03c9';
const abi = CampaignFactory.abi;

export default new web3.eth.Contract(abi, address);
