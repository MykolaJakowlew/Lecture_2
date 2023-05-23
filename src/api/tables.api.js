const { Router } = require('express');
const { TableHandlers } = require('./handlers');
const { wrapperApi } = require('../shared/wrapperApi');

const router = Router();

router.post('/tables', wrapperApi(TableHandlers.createTable));
router.get('/tables', wrapperApi(TableHandlers.getTables));
router.delete('/tables/:_id', wrapperApi(TableHandlers.deleteTable));
router.patch('/tables/:_id', wrapperApi(TableHandlers.updateTable));
router.delete('/tables/:_id/waiter', wrapperApi(TableHandlers.deleteWaiter));
router.delete('/tables/:_id/order', wrapperApi(TableHandlers.deleteOrder));

module.exports = { router };