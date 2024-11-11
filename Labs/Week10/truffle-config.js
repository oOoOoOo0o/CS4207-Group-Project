module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*',
            gas: 6721975, // Can be tuned
            gasPrice: 20000000000, // Can be tuned
        },
    },
    compilers: {
        solc: {
            version: '0.8.0',
        },
    },
};