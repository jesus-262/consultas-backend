const {Router} = require('express');
const router = Router();

const {postConsulta,getConsulta, postConsultaNombre,postConsultaLugarDeVotacion,getConsultaNombre} = require('../controllers/consulta.controllers');

router.post('/', postConsulta);
router.get('/', getConsulta);

router.post('/consulta/nombre', postConsultaNombre);
router.get('/consulta/nombre/:cedula', getConsultaNombre);
router.post('/consulta/lugar', postConsultaLugarDeVotacion);


module.exports = router;