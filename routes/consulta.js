const {Router} = require('express');
const router = Router();

const { postConsultaNombre,postConsultaLugarDeVotacion,postnombreperfecto} = require('../controllers/consulta.controllers');




router.post('/consulta/no', postConsultaNombre);
router.post('/consulta/nombre', postnombreperfecto);
router.post('/consulta/lugar', postConsultaLugarDeVotacion);


module.exports = router;