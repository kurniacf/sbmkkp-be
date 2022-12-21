module.exports = {

  friendlyName: 'View',

  description: 'View berkas.',

  inputs: {
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Success View',
    },
    error: {
      statusCode: 500,
      description: 'Error',
    }
  },

  fn: async function (inputs, exits) {
    try {
      let credential = this.req.headers.authorization.split(' ');
      let token = credential[1];
      const data = await sails.helpers.decodeJwtToken(token);

      let berkasId = this.req.param('id');

      if(data.role === 'pendaftar') {
        let berkasDB = await Berkas.findOne({idPendaftar: data.id});
        // let pendaftarDB = await Pendaftar.findOne({id: data.id});
        // let jadwalDB = await Jadwal.findOne({id: berkasDB.idJadwal});

        // Object.assign(berkasDB, pendaftarDB, jadwalDB);

        return exits.success({
          message: `Success view Berkas`,
          data: berkasDB
        });
      } else if (data.role === 'panitia') {
        if (berkasId) {
          let berkasDB = await Berkas.findOne({ id: berkasId });
          return exits.success({
            message: `Success view Berkas`,
            data: berkasDB
          });
        } else {
          let berkasDB = await Berkas.find();
          return exits.success({
            message: `Success view all Berkas`,
            data: berkasDB
          });
        }
      }

    } catch (error) {
      return exits.error({
        message: 'Error',
        error: error.message
      });
    }
  }
};
