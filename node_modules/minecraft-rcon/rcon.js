import R from 'modern-rcon';

export class Rcon {
    /**
     * @param {{host:string,port:number,password:string,timeout:number}} config config
     */
    constructor(config) {
        this.config = config;
    }
    async send(command) {
        const r = new R(this.config.host, this.config.port, this.config.password, this.config.timeout);
        await r.connect();
        return r.send(command);
    }
}
