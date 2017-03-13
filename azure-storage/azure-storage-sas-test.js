var AzureStorageSas = require('./azure-storage-sas.js');

var accountName = process.argv[2];
var accountKey = process.argv[3]; 
var containerName = process.argv[4]; 

var storageSas = new AzureStorageSas(accountName, accountKey);

var options = {
  expiryPeriod: 60,
  permissions: 'rwd',
  serviceType: 'blob',
  container: containerName,
  blob: '',
  resourceType: 'c',
  sasVersion: '2016-05-31'
};

var signedQueryString = storageSas.getSignedQueryString(options);

console.log(signedQueryString);

