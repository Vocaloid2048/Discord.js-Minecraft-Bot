import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';

export class Config {
    constructor(name) {
        if (!name || typeof name !== 'string') {
            throw new Error(`want: string, got: ${typeof name}`);
        }
        const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
        this._mkdir(home);
        this._createConfigFile(home, name);
        const conf = JSON.parse(readFileSync(`${home}/.config/${name}.json`, 'utf-8'));
        Object.assign(this, conf);
    }
    _mkdir(home) {
        try {
            readdirSync(`${home}/.config`);
        } catch {
            mkdirSync(`${home}/.config`);
        }
    }
    _createConfigFile(home, name) {
        try {
            statSync(`${home}/.config/${name}.json`);
        } catch {
            writeFileSync(`${home}/.config/${name}.json`, '{}');
        }
    }
}
