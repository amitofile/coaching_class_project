/**
 * Clustering technique is used to utilize maximum cpu power. Number of child processes 
 * (workers) we can create is depends on CPU cores.<br> These child processes share same 
 * TCP connection and Port. Each child process handles server instance and work parallely.
 * <br>
 * 
 * @namespace cluster-main
 * @author Amit P
 * @since 20210116
 * 
 */

// Load global modules
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const config = require('config');

// Load local modules
const app = require('./routers/app');

// Set few configurations
const params = config.get('default');
const env = process.env.NODE_ENV || params.env;

/**
 * Cluster master-slave 
 */
if (parseInt(params.server_instance) === 1) {

    let server = app.listen((process.env.PORT || params.port), () => {
        console.log(`${params.api} server sterted in ${env} mode at http://${server.address().address}:${server.address().port} @${process.pid}`);
    });

} else {
    let instances = numCPUs;
    if (parseInt(params.server_instance) === 0 || parseInt(params.server_instance) > numCPUs) {
        instances = numCPUs;
    } else {
        instances = parseInt(params.server_instance);
    }

    if (cluster.isMaster) {
        console.log('Server (Re)started');
        console.log(`Cluster master is running @${process.pid}`);

        // Create fork(s) for child process(es).
        let i = 0;
        for (i = 0; i < instances; i++) {
            cluster.fork();
        }
        console.log(`${i} instances created`);

        // If worker process got killed
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker process ${worker.process.pid} was killed`, null, null, ['error', 'warning', 'trace']);
        });
    } else {
        let server = app.listen((process.env.PORT || params.port), () => {
            console.log(`${params.api} server (instance) sterted in ${env} mode at http://${server.address().address}:${server.address().port} @${process.pid}`);
        });
    }
}