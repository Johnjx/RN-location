import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const db = SQLite.openDatabase("places.db");

// image stays on file system where it was stored by image picker
// don't store files in dbs, but paths
// _ don't need transaction for this

// promisify these functions

export function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`,
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, err) => reject(err)
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];
          for (const place of result.rows._array) {
            places.push(
              new Place(
                place.title,
                place.imageUri,
                { address: place.address, lat: place.lat, lng: place.lng },
                place.id
              )
            );
          }
          resolve(places);
        },
        (_, err) => reject(err)
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(placeId) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [placeId],
        (_, result) => {
          const dbPlace = result.rows._array[0];
          const place = new Place(
            dbPlace.title,
            dbPlace.imageUri,
            { address: dbPlace.address, lat: dbPlace.lat, lng: dbPlace.lng },
            dbPlace.id
          );
          resolve(place);
        },
        (_, err) => reject(err)
      );
    });
  });

  return promise;
}
