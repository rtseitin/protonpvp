import { ConnectionOptions } from 'mongoose';

export interface IDatabaseConfigurationType {
    databaseDetails: {
        dbAddress: string | undefined;
        dbName: string | undefined;
        dbUsername?: String;
        dbPassword?: String;
    };
    databaseSettings: ConnectionOptions;
}

export interface IServerConfigurationType {
    hostname: string;
    port: string
}

export const DatabaseConfiguration: IDatabaseConfigurationType = {
    databaseDetails: {
        dbAddress: process.env.DB_ADDRESS,
        dbName: process.env.DN_NAME,
        dbUsername: '',
        dbPassword: ''
    },
    databaseSettings: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }
}

export const ServerConfiguration = {
    hostname: process.env.SERVER_HOSTNAME || 'localhost',
    port: process.env.SERVER_PORT || '1337'
}