const {Router} = require('express');
const router = Router();

const { postConsultaNombre,postConsultaLugarDeVotacion,postnombreperfecto} = require('../controllers/consulta.controllers');




router.post('/consulta/nombre', postConsultaNombre);
router.post('/consulta/no', postnombreperfecto);
router.post('/consulta/lugar', postConsultaLugarDeVotacion);


module.exports = router;