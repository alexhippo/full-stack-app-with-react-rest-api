'use strict';

const promiseFinally = require('promise.prototype.finally');
const Database = require('./database');
const data = require('./data.json');

const enableLogging = process.env.DB_ENABLE_LOGGING === 'true';
const database = new Database(data, enableLogging);

promiseFinally.shim();

database.init()
  .catch(err => console.error(err))
  .finally(() => process.exit());
