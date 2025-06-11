import * as Database from './database/data-base'
import path from 'path'

const db = new Database.Database(path.join(__dirname, '/database/teste.json'))

db.removeFromQuery({ name: 'Rogério', second_name: 'Lima' }, true)