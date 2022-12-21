module.exports = {
  friendlyName: 'Delete',

  description: 'Delete jadwal.',

  inputs: {
    jadwalId: {
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
        return exits.notRole({
          message: 'Role harus Panitia'
        });
      } else if (data.role === 'panitia') {
        await Jadwal.destroyOne({ id: inputs.jadwalId });
        return exits.success({
          message: 'Success Delete Jadwal'
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
