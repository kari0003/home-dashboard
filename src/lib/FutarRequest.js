import * as request from 'request';

export async function getFutarDataForStop(id) {
  const requestOptions = {
    url: `http://futar.bkk.hu/bkk-utvonaltervezo-api/ws/otp/api/where/arrivals-and-departures-for-stop.json?stopId=BKK_${id}&onlyDepartures=1&minutesBefore=0&minutesAfter=20`,
    json: true,
  };

  // Adatok lekerese a Futartol.
  return new Promise((resolve, reject) => {
    request(requestOptions, (error, response, data) => {
      // nincs API valasz
      if (!response) {
        return reject('Nem sikerult elerni a BKK Futart');
      }

      // hibas API valasz
      if (response.statusCode !== 200) {
        return reject(response.body);
      }

      // nincs menetrend
      if (!data.data || data.data.entry.stopTimes.length) {
        return resolve(null);
      }

      return resolve(data.data);
    });
  });
}

// const utilities = function () {
//   /**
//    * Lekeri egy megallohely jaratait
//    * es a sablonnak szukseges adatokat adja vissza.
//    *
//    * Az adatokat a jarat viszonylata
//    * szerint rendezve adja vissza.
//    *
//    * Egy jarat csak egyszer jelenik meg.
//    *
//    * @param {String}      id
//    */
//   const getRoutesInStop = async function (id, callback) {
//     return getFutarDataForStop(id)
//       .then((data, error) => {
//         const routeIds = {};
//         let tripsInStop = [];

//         if (error || null == data || !data.hasOwnProperty('references')) {
//           errorMsg = new Error(error || 'Nincsenek jaratinformaciok.')
//           console.log('[api] - nincsenek jaratinformaciok');
//           throw errorMsg;
//         }

//         const trips = data.references.trips;
//         const routes = data.references.routes;

//         // jaratok osszegyujtese
//         for (let i in trips) {
//           if (routes.hasOwnProperty(trips[i]['routeId'])) {
//             if (!routeIds.hasOwnProperty(trips[i]['routeId'])) {
//               routeIds[trips[i]['routeId']] = 1;
//               tripsInStop.push({
//                 routeId : trips[i]['routeId'],
//                 shortName : routes[trips[i]['routeId']]['shortName'],
//                 tripHeadsign : trips[i]['tripHeadsign']
//               });
//             }
//           }
//         }

//         // jaratnev szerinti rendezes
//         tripsInStop = tripsInStop.sort(function(a, b) {
//           const x = parseInt(a['shortName']);
//           const y = parseInt(b['shortName']);
//           return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//         });

//         return tripsInStop;
//       });
//   };

//   /**
//    * Lekeri a kovetkezo busz indulasat es visszaadja
//    * a sablonnak szukseges adatokat.
//    *
//    * @param {String}      stopId
//    * @param {String}      routeId
//    * @param {Function}    callback
//    *
//    * @returns {null}
//    */
//   var getNextArrival = function (stopId, routeId, callback) {
//     getFutarDataForStop(stopId, function (error, data) {
//       var stoptime,
//         timestamp = null,
//         time,
//         tripId,
//         tripIds = {},
//         route,
//         i;

//       if (error || data == null) {
//         callback(error, null);
//         return;
//       }

//       // kovetkezo jaratok tripId-ja
//       for (i in data.references.trips) {
//         if (routeId == data.references.trips[i]['routeId']) {
//           tripIds[data.references.trips[i]['id']] = 1;
//         }
//       }

//       // kovetkezo jaratok indulasa
//       if (Object.keys(tripIds).length) {
//         for (i in data.entry.stopTimes) {
//           if (tripIds.hasOwnProperty(data.entry.stopTimes[i]['tripId'])) {
//             stoptime = data.entry.stopTimes[i];
//             time = (stoptime.predictedArrivalTime || stoptime.arrivalTime) * 1000;

//             if (null === timestamp || time < timestamp) {
//               timestamp = time;
//               tripId = data.entry.stopTimes[i]['tripId'];
//             }
//           }
//         }
//       }

//       // a legkorabbi indulast visszaadjuk
//       if (timestamp) {
//         time = moment(timestamp).format('h:m');
//         route = data.references.routes[data.references.trips[tripId]['routeId']];

//         callback(false, {
//           route: route.shortName,
//           time: time,
//           timestamp: timestamp,
//           type: route.type.toString().toLowerCase()
//         });

//         return;
//       }

//       callback(new Error('Nincs menetrend info az adott megallo-viszonylat parosra.'), null);
//     });
//   };

//   return {
//     getRoutesInStop: getRoutesInStop,
//     getNextArrival: getNextArrival
//   };
// }
