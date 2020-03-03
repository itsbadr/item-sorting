const express = require('express');

const Discord = require('discord.js')
const client = new Discord.Client();

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`) );

app = express();

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/roles', (req, res) => {
    
    const guild = client.guilds.get("");

    const colorsStart = guild.roles.get("");

    roles = []

    for (i=colorsStart.position - 1; i >= 0; i--) {
        
        guild.roles.
        forEach(role => {

            if (role.position === i) {
                roles.push({
                    id: role.id,
                    name: role.name,
                    color: role.hexColor,
                    position: role.position
                })      
            }
        }) 
    }

    res.json(roles);

})

app.post('/role', (req, res) => {
    const guild = client.guilds.get("");

    const role = guild.roles.get(req.body.role.id)

    role.setPosition(req.body.newPosition)
    .then(updated => console.log(`Role position: ${updated.position}`))
    .catch(console.error);

    console.log(req.body)
})

app.listen(5000, 
    () => console.log("listening on port 5000!"))

client.login(''); 
