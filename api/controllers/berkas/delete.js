module.exports = {

  friendlyName: 'Delete',

  description: 'Delete berkas.',


  inputs: {
    berkasId: {
      type: 'number',
    }
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Success delete',
    },
    error: {
      statusCode: 404,
      description: 'Error',
    }
  },


  fn: async function (inputs, exits) {
    try {
      let credential = this.req.headers.authorization.split(' ');
      let token = credential[1];
      const data = await sails.helpers.decodeJwtToken(token);

      if (data.role === 'panitia') {
        await Berkas.destroyOne({ id: inputs.berkasId });
        return exits.success({
          message: 'Success Delete Berkas'
        });
      } else if (data.role === 'pendaftar') {
        berkasDB = await Berkas.findOne({ idPendaftar: data.id });
        await Berkas.destroyOne({ id: berkasDB.id });

        return exits.success({
          message: 'Success Delete Berkas'
        });
      }
    } catch (error) {
      return exits.error({
        message: 'Error',
        error: error.message
      });
    }
  }
};
