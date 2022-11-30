const {Router} = require('express');
const router = Router();

const { postConsultaNombre,postConsultaLugarDeVotacion,getConsultaNombre} = require('../controllers/consulta.controllers');




router.post('/consulta/nombre', postConsultaNombre);

router.post('/consulta/lugar', postConsultaLugarDeVotacion);


module.exports = router;