module.exports = {

  friendlyName: 'View',

  description: 'View jadwal.',

  inputs: {
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

      if (data.role !== 'pendaftar' && data.role !== 'panitia') {
        return exits.notRole({
          message: 'Dont not access role'
        });
      }

      let jadwalId = this.req.param('id');
      let jadwalDB;

      if (jadwalId) {
        jadwalDB = await Jadwal.findOne({ id: jadwalId });
      } else {
        jadwalDB = await Jadwal.find();
      }

      return exits.success({
        message: `Success view jadwal`,
        data: jadwalDB
      });
    } catch (error) {
      return exits.error({
        message: 'Something went wrong',
        error: error.message
      });
    }
  }
};
