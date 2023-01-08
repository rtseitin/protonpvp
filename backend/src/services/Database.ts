import { connect as MongooseConnect, Connection, Mongoose, connection } from 'mongoose';
import { IDatabaseConfigurationType } from '../config';
import logging from '../config/logging';

export class DatabaseService {
    private _dbConfig: IDatabaseConfigurationType;
    private NAMESPACE: string = 'Mongoose';

    constructor(databaseConfig: IDatabaseConfigurationType) {
        this._dbConfig = databaseConfig;
        this.connect();

        this.connection().on('connected', () => logging.info(this.NAMESPACE, 'Successfully established connection to MongoDB server'));
        this.connection().on('error', (err) => logging.error(this.NAMESPACE, `Mongoose Connection Error:\n${err.stack}`));
        this.connection().on('disconnected', () => logging.info(this.NAMESPACE, 'Mongoose Connection has been Disconnected'));
    }

    private async connect(): Promise<Mongoose> {
        return await MongooseConnect(`mongodb${this._dbConfig.databaseDetails.dbUsername ? '+srv' : ''}://${this._dbConfig.databaseDetails.dbUsername ? `${this._dbConfig.databaseDetails.dbUsername}:${this._dbConfig.databaseDetails.dbPassword}@` : ''}${this._dbConfig.databaseDetails.dbAddress}/${this._dbConfig.databaseDetails.dbName}`, this._dbConfig.databaseSettings);
    }

    private connection(): Connection {
        return connection;
    }
}
