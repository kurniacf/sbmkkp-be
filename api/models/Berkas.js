/* eslint-disable camelcase */
/**
 * Berkas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    foto_ktp: {
      type: 'string',
      columnName: 'foto_ktp',
    },
    foto_formal: {
      type: 'string',
      columnName: 'foto_formal',
    },
    status: {
      type: 'string',
      isIn: ['verified', 'cancelled', 'pending'],
      defaultsTo: 'pending',
      columnName: 'status',
    },
    idPendaftar: {
      model: 'pendaftar',
      columnName: 'id_pendaftar',
      unique: true,
    },
    idJadwal: {
      model: 'jadwal',
      columnName: 'id_jadwal',
    },
    idUjian: {
      type: 'string',
      columnName: 'id_ujian',
      allowNull: true,
    }
  },
};
