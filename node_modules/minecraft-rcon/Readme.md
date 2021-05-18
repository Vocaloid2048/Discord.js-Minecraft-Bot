# Minecraft Rcon

## Install
```bash
npm i -g minecraft-rcon
```

## Usage
```bash
rcon --help
```

## Builtin command
```bash
exit
```

## Config
```json
// ~/.config/rcon.json
{
    "default": {
        "host": "example.com",
        "port": 25575,
        "password": "example_password",
        "timeout": 5000
    },
    "serverA": {
        "host": "a.server.com",
        "port": 25575,
        "password": "hoge",
        "timeout": 10000
    },
    "serverB": {
        "host": "b.srever.com",
        "port": 25575,
        "password": "fuga",
        "timeout": 2500
    }
}
```
