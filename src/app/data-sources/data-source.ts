import {DataSource} from 'typeorm'
import {SQLiteService} from "my-lib";
import {Category} from "../entities/category";

const sqliteService = new SQLiteService();
const sqliteConnection = sqliteService.getSqliteConnection();

export default new DataSource({
  type: 'capacitor',
  driver: sqliteConnection,
  database: 'my-lib-sqlite',
  logging: [/*'query',*/ 'error', 'schema'],
  entities: [Category],
  migrationsRun: false,
  mode: 'no-encryption',
  subscribers: [],
  synchronize: false,
});

