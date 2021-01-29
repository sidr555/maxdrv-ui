let config = {
    location: 's-home',
    name: [
        'maxdrv'
    ],
    mqtt: {
        host: 'mqtt://maxdrv.ru:9001',
        options: {
            username: "username",
            password: "password",
            clientId: 'maxdrv-ui'
        },
    }
};

export default config;
