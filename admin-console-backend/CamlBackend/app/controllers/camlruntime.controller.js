var zmq = require("zeromq"),
  sock = zmq.socket("req");

sock.connect("tcp://127.0.0.1:5555");


// Start caml runtime
exports.start = (req, res) => {

    // Send a message to zmq
    sock.send("start_caml_runtime");
    
    resJson = {
        "status": "SUCCESS",
        "data": {},
        "msg": "Started caml runtime",
        "errormsg": "",

    }
    res.send(resJson);
};



// Stop caml runtime
exports.stop = (req, res) => {

    // Send a message to zmq
    sock.send("stop_caml_runtime");

    resJson = {
        "status": "SUCCESS",
        "data": {},
        "msg": "Stopped caml runtime",
        "errormsg": "",

    }
    res.send(resJson);


};