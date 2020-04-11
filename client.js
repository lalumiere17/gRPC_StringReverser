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

function main() {
  const client = new reverser_proto.Reverser('localhost:50051', grpc.credentials.createInsecure());
  let stringToReverse;
  if (process.argv.length >= 3) {
    stringToReverse = process.argv[2];
  } else {
    stringToReverse = 'АрозаупаланалапуАзора';
  }
  client.reverseString({string: stringToReverse}, (err, response) => {
    console.log(`Reverser result: ${stringToReverse} --> ${response.message}`);
  });
}

main();
