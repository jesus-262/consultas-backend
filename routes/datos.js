const {Router} = require('express');
const router = Router();

const {getDatos,createDatos,deleteDatos} = require('../controllers/datos.controllers');

router.get('/persona', getDatos);
router.post('/persona', createDatos);
router.delete('/delete/:id',deleteDatos);
module.exports = router;