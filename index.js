var sharedkey = require('./signing/sharedkey.js');

var key = new sharedkey('jongiothubdeviceexport', 'R+Jdx5k+O7bIjCJD8zQF3/bCALFyZjqZWz/prpHzgNM/mFrnOzVSYukHVdtNZqn2O/+HA+0CAZGVuKz3tqh7Lw==');

var startDate = new Date();
var expiryDate = new Date(startDate);
expiryDate.setMinutes(startDate.getMinutes() + 5);

var sharedAccessPolicy = {
    AccessPolicy: {
        Permissions: "rwd",
        Start: startDate,
        Expiry: expiryDate
    }
};

var serviceType = 'blob';
var path = '';
var container = 'devices';
var blob = '';
var resourceType = 'c';
var resourceName = createResourceName(container, blob, true);
var sasVersion = '2013-08-15';

var signedQueryString = key.generateSignedQueryString(serviceType, resourceName, sharedAccessPolicy, null, {resourceType: resourceType});


console.log(signedQueryString);


/**
* Create resource name
* @ignore
*
* @param {string} containerName Container name
* @param {string} blobName      Blob name
* @return {string} The encoded resource name.
*/
function createResourceName(containerName, blobName, forSAS) {
  // Resource name
  if (blobName && !forSAS) {
    blobName = encodeURIComponent(blobName);
    blobName = blobName.replace(/%2F/g, '/');
    blobName = blobName.replace(/%5C/g, '/');
    blobName = blobName.replace(/\+/g, '%20');
  }

  // return URI encoded resource name
  if (blobName) {
    return containerName + '/' + blobName;
  }
  else {
    return containerName;
  }
}