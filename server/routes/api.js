const express = require('express')
const router = express.Router()
const request = require(`request`)

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756",
    "76sixers": "1610612755",
    "magic": "1610612753",
    "knicks": "1610612752"
}

let dreamTeam = []

router.get(`/teams/:teamName`, function (req, res) {
    teamName = req.params.teamName
    let teamId = teamToIDs[teamName]
    request('http://data.nba.net/10s/prod/v1/2018/players.json', function (error, response) {
        console.log('error:', error);
        let leagues = JSON.parse(response.body).league.standard
        let teamPlayers = leagues.filter(f => f.teamId == teamId)
        let activeTeamPlayers = teamPlayers.filter(f => f.isActive == true)
        res.send(activeTeamPlayers)
    });
})

router.put(`/team`, function (req, res) {
    let data = req.body
    teamToIDs[data.teamName] = data["teamId"]
    res.send(teamToIDs)
})

//Dream Team

router.get(`/dreamTeam`, function (req, res) {
    res.send(dreamTeam)
})

router.post(`/roster`, function (req, res) {
    let data = req.body
    if (dreamTeam.length < 5 && !dreamTeam.find(d => d.firstName == data.firstName)) {
        dreamTeam.push(data)
        console.log("dreamTeam");
    }
    res.end()
})

module.exports = router