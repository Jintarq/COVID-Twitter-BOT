const config = require("./config");
const twitter = require("twitter-lite");
const client = new twitter(config);
const fetch = require("node-fetch");
const schedule = require("node-schedule");

const job = schedule.scheduleJob({ hour: 20, minute: 25 }, () => {
  fetch("https://coronavirusapi-france.now.sh/FranceLiveGlobalData")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const datas = responseData.FranceGlobalLiveData[0];
      client
        .post("statuses/update", {
          status: `Information(s) COVID-19 en ${datas.nom}.\r\nDate : ${datas.date}.\r\nDonnées :\r\nDécès totaux en hôpital : ${datas.deces}.\r\nHospitalisations totales : ${datas.hospitalises}. (Nouvelles hospitalisations ce jour -> ${datas.nouvellesHospitalisations})\r\nRéanimations totales : ${datas.reanimation} (Nouvelles réanimations ce jour -> ${datas.nouvellesReanimations}).\r\nSource => ${datas.source.nom}. `,
        })
        .then((result) => {
          console.log('You successfully tweeted this : "' + result.text + '"');
        })
        .catch(console.error);
    });
});
