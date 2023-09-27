const express = require('express');
const router = express.Router();
const joinTeam = require("../Controller/JoinTeamController")

router.post('/add',joinTeam.addjoinTeam );


router.put('/edit/:id', joinTeam.editjoinTeam);


router.delete('/delete/:id', joinTeam.deletejoinTeam);

router.get('/getjointeam' , joinTeam.getjoinTeam)

router.get('/getjointeam/:id' , joinTeam.getjoinTeamById)




module.exports = router