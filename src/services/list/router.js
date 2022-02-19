const router = require('express').Router();

const ListController = require('./controllers');

router.route('/').get(ListController.getList);
router.route('/').post(ListController.addList);
router.route('/:id').delete(ListController.deleteContent);

module.exports = router;
