const app = require('electron').app;

if (!app.isReady()) {
  throw new Error('Can not initialize protocol module before app is ready');
}

const session = require('electron').session;

// Returns the protocol property for default session.
const protocol = session.defaultSession.protocol;

// Warn about removed APIs.
var logAndThrow = function(callback, message) {
  console.error(message);
  if (callback) {
    return callback(new Error(message));
  } else {
    throw new Error(message);
  }
};

protocol.fromPartition = function(partition) {
  return session.fromPartition(partition).protocol;
};

protocol.registerProtocol = function(scheme, handler, callback) {
  return logAndThrow(callback, 'registerProtocol API has been replaced by the register[File/Http/Buffer/String]Protocol API family, please switch to the new APIs.');
};

protocol.isHandledProtocol = function(scheme, callback) {
  return logAndThrow(callback, 'isHandledProtocol API has been replaced by isProtocolHandled.');
};

protocol.interceptProtocol = function(scheme, handler, callback) {
  return logAndThrow(callback, 'interceptProtocol API has been replaced by the intercept[File/Http/Buffer/String]Protocol API family, please switch to the new APIs.');
};

module.exports = protocol;
