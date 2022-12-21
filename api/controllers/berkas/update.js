/* eslint-disable camelcase */
module.exports = {

  friendlyName: 'Update',

  description: 'Update berkas.',

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
    },
    status: {
      type: 'string',
      isIn: ['verified', 'cancelled', 'pending'],
    }
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Success Update',
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
        let pendaftarId = data.id;

        let berkas = await Berkas.updateOne({ idPendaftar: pendaftarId})
          .set({
            foto_ktp: inputs.foto_ktp,
            foto_formal: inputs.foto_formal,
            idJadwal: inputs.idJadwal,
            status: inputs.status
          });

        return exits.success({
          message: 'Success Update Berkas',
          data: berkas
        });

      } else if (data.role === 'panitia') {
        if(inputs.idPendaftar){
          if(inputs.status === 'verified'){
            let berkas = await Berkas.updateOne({ idPendaftar: inputs.idPendaftar})
            .set({
              foto_ktp: inputs.foto_ktp,
              foto_formal: inputs.foto_formal,
              idJadwal: inputs.idJadwal,
              status: 'verified',
              idUjian: await sails.helpers.strings.random('url-friendly')
            });
            return exits.success({
              message: 'Success Update Berkas',
              data: berkas
            });
          } else {
            let berkas = await Berkas.updateOne({ idPendaftar: inputs.idPendaftar})
            .set({
              foto_ktp: inputs.foto_ktp,
              foto_formal: inputs.foto_formal,
              idJadwal: inputs.idJadwal,
              status: inputs.status,
              idUjian: null
            });
            return exits.success({
              message: 'Success Update Berkas',
              data: berkas
            });
          }
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
