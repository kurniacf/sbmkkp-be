/* eslint-disable camelcase */
module.exports = {

  friendlyName: 'Create',

  description: 'Create berkas.',

  inputs: {
    foto_ktp: {
      type: 'string',
    },
    foto_formal: {
      type: 'string',
    },
    idPendaftar: {
      type: 'number',
    },
    idJadwal: {
      type: 'number',
      required: true,
    }
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Success Create',
    },
    error: {
      statusCode: 404,
      description: 'Error',
    },
    notRole: {
      statusCode: 404,
      description: 'Role not access'
    }
  },

  fn: async function (inputs, exits) {
    try {
      let credential = this.req.headers.authorization.split(' ');
      let token = credential[1];
      const data = await sails.helpers.decodeJwtToken(token);

      if (data.role === 'pendaftar') {
        pendaftarId = data.id;

        let berkas = await Berkas.create({
          foto_ktp: inputs.foto_ktp,
          foto_formal: inputs.foto_formal,
          idPendaftar: pendaftarId,
          idJadwal: inputs.idJadwal

        }).fetch();
        return exits.success({
          message: 'Success Create Berkas',
          data: berkas
        });
      } else if (data.role === 'panitia') {
        if(inputs.idPendaftar){
          let berkas = await Berkas.create({
            foto_ktp: inputs.foto_ktp,
            foto_formal: inputs.foto_formal,
            id_pendaftar: inputs.idPendaftar,
            id_jadwal: inputs.idJadwal
          }).fetch();

          return exits.success({
            message: 'Success Create Berkas',
            data: berkas
          });
        } else {
          return exits.error({
            message: 'Error Create Berkas, harus ada idPendaftar',
            error: error.message
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
