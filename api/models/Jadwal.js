/* eslint-disable camelcase */
/**
 * Jadwal.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'jadwal',
  attributes: {
    tanggal_ujian: {
      type: 'ref',
      columnType: 'datetime',
      columnName: 'tanggal_ujian',
    },
    waktu_mulai: {
      type: 'ref',
      columnType: 'time',
      columnName: 'waktu_mulai',
    },
    waktu_selesai: {
      type: 'ref',
      columnType: 'time',
      columnName: 'waktu_selesai',
    },
    lokasi_ujian: {
      type: 'string',
      columnName: 'lokasi_ujian',
    }
  },
};

