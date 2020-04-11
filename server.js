const PROTO_PATH = __dirname + '/reverser.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
const reverser_proto = grpc.loadPackageDefinition(packageDefinition).reverser;

/**
 * Implements the ReverseString RPC method.
 */
function reverseString(call, callback) {
  callback(null, {message: getReversed(call.request.string)});
}

function getReversed (string) {
  return string.split("").reverse().join("");
}

/**
 * Starts an RPC server that receives requests for the Reverser service at the
 * sample server port
 */
function main() {
  const server = new grpc.Server();
  server.addService(reverser_proto.Reverser.service, {ReverseString: reverseString});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Server started listening to ...");
}

main();
