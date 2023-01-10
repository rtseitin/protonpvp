require("dotenv").config()
import { DatabaseConfiguration, ServerConfiguration } from './config';
import { DatabaseService } from './services/Database';
import { ServerService } from './services/Server';

new DatabaseService(DatabaseConfiguration);
new ServerService(ServerConfiguration);