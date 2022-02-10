const express = require('express');
const router = express.Router();
const { webGuildId } = require('../../src/config');
const noblox = require('noblox.js');

module.exports = client => {
  
  router.get('/stock', async (req, res) => {
    const groupId = req.body.groupId;
    const db = client.database.guildsData;
    const data = await db.get(webGuildId);
    
    noblox.setCookie(data.system.cookies).then((user) => {
      noblox.getGroup(data.system.group).then(async(group) => {
        let funds = await noblox.getGroupFunds(parseInt(data.system.group));
        return res.json({ stock: funds });
      }).catch((err) => {
        console.error(err);
        return res.json({ err: err.message, stock: 0 });
      });
    }).catch((err) => {
      console.error(err);
      return res.json({ err: err.message, stock: 0 });
    });
  });
  
  router.get('/balance/:userID', async(req, res) => {
    const db = client.database.usersData;
    const data = await db.get(`${webGuildId}${req.params.userID}`);
    
    if (!data) return res.json({ balance: 0 });
    
    return res.json({ balance: data.profile.coins && data.profile.coins.filter(e => e.server == webGuildId).length });
  });
  
  return router;
}