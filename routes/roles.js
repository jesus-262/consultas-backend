const {Router} = require('express');
const router = Router();

const {getRoles,createRol} = require('../controllers/roles.controllers');

router.get('/', getRoles);
router.post('/', createRol);

module.exports = router;