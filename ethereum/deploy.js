const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require("../ethereum/build/CampaignFactory.json");

const provider = new HDWalletProvider(
  'drum security wheat few manage review bag version foot hammer walnut symbol',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/18ebf5f3af9544c2a6ec2a18c7a7db1a'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '2000000', from: accounts[0] });
	
  console.log('Contract deployed to', result.options.address);
  //console.log(JSON.stringify(compiledFactory.abi));
  provider.engine.stop();
};
deploy();