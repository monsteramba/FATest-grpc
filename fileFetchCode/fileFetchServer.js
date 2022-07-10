/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
var PROTO_PATH = __dirname + '/../protoFiles/fileFetch.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase:true,
        longs:String,
        enums:String,
        defaults:true,
        oneofs:true
    });
var file_proto = grpc.loadPackageDefinition(packageDefinition).fileFetcher;


function fetchFile(call,callback){
    callback(null, {})
}

/**
 * Starts an RPC server that receives requests for the File Checker service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(file_proto.FileStream.service, {fetchFile: fetchFile});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
