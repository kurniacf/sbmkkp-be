module.exports = {

    friendlyName: 'View',

    description: 'View Pendaftar',

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
        },
        notRole: {
            statusCode: 404,
            description: 'Role not admin or Pendaftar'
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

            let pendaftarId = this.req.param('id');

            if (pendaftarId) {
                let pendaftarDB = await Pendaftar.findOne({ id: pendaftarId });

                return exits.success({
                    message: `Success view Pendaftar`,
                    data: pendaftarDB
                });
            } else {
                let pendaftarDB = await Pendaftar.find();

                return exits.success({
                    message: `Success view all Pendaftar`,
                    data: pendaftarDB
                });
            }
        } catch (error) {
            return exits.error({
                message: 'Something went wrong',
                error: error.message
            });
        }
    }
};
