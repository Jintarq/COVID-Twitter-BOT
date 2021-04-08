const config = require("./config");
const twitter = require("twitter-lite");
const client = new twitter(config);
const fetch = require("node-fetch");
const schedule = require("node-schedule");
var port = process.env.port || 8080;

setInterval(() => {
  fetch("https://coronavirusapi-france.now.sh/FranceLiveGlobalData")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const datas = responseData.FranceGlobalLiveData[0];
      client
        .post("statuses/update", {
          status: `Information(s) COVID-19 en ${datas.nom}.\r\nDate : ${datas.date}.\r\nDonnées --\r\nDécès totaux en hôpital : ${datas.deces}.\r\nPatients hospitalisés : ${datas.hospitalises}. (Nouvelles hospitalisations ce jour -> ${datas.nouvellesHospitalisations}).\r\n Patients en réanimation : ${datas.reanimation}. (Nouvelles réanimations ce jour -> ${datas.nouvellesReanimations}).\r\nSource => ${datas.source.nom}. `,
        })
        .then((result) => {
          console.log('You successfully tweeted this : "' + result.text + '"');
        })
        .catch(console.error);
    });
}, 84600);
