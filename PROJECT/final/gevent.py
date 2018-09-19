import gevent
import gevent.server
import cPickle as pickle
import struct
import logging
import logging.handlers
from signal import SIGTERM, SIGQUIT, SIGINT

logging.getLogger('')
logging.basicConfig(level = logging.DEBUG,
                    format = "[%(asctime)s] - %(name)s - %(levelname)s: %(message)s",
                    datefmt = "%H:%M:%S")

def log_stream_handler(socket, address):
    """ Handler for receiving pickled log records over the network. The format says
    first 4 bytes determine the length of the record. """

    while True:
        try:
            slen = struct.unpack(">L", socket.recv(4))[0]
        except struct.error as e:
            # Less than 4 bytes received
            break

        try:
            chunk = socket.recv(slen)
        except gevent.socket.error as e:
            logging.error(e)
            break

        if not chunk:
            break

        record = logging.makeLogRecord(pickle.loads(chunk))
        handle_log_record(record)

def handle_log_record(log_record):
    """ Handles the incoming log record """

    logger = logging.getLogger(log_record.name)
    logger.handle(log_record)

def die(server):
    """ Kill the server """
    server.stop()
    
if __name__ == "__main__":
    # Simple example to run the server
    log_server = gevent.server.StreamServer(("localhost", 8000), log_stream_handler)
    
    gevent.signal(SIGTERM, die, log_server)
    gevent.signal(SIGQUIT, die, log_server)
    gevent.signal(SIGINT, die, log_server)
    
    log_server.serve_forever(
