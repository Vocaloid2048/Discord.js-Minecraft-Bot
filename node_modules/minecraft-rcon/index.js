#!/usr/bin/env node
import readline from 'readline';

import { Config } from 'cli-conf';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { Rcon } from './rcon.js';

const argv = yargs(hideBin(process.argv))
    .locale('en')
    .scriptName('rcon')
    .strictOptions()
    .option('host', {
        alias: ['h'],
        type: 'string',
    })
    .option('port', {
        alias: ['p'],
        type: 'number',
    })
    .option('password', {
        alias: ['P'],
        type: 'string',
    })
    .option('timeout', {
        alias: ['t'],
        type: 'number',
    })
    .positional('id', {
        type: 'string',
        desc: 'host address or identifier declared in ~/.config/rcon.json',
    })
    .argv;

const configData = new Config('rcon');
const config = {
    host: '',
    port: 25575,
    password: '',
    timeout: 5000,
};
if (configData.default) {
    Object.assign(config, configData.default);
}
if (argv._.length > 0) {
    Object.assign(config, configData[argv._[0]]);
}
if (argv.host) {
    config.host = argv.host;
}
if (argv.port) {
    config.port = argv.port;
}
if (argv.password) {
    config.password = argv.password;
}
if (argv.timeout) {
    config.timeout = argv.timeout;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const rcon = new Rcon(config);

rl.on('line', async line => {
    if (/^exit$/.test(line)) {
        rl.close();
        process.exit(0);
    }
    console.log(await rcon.send(line));
    rl.prompt();
});

rl.prompt();
