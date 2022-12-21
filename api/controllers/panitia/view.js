module.exports = {

    friendlyName: 'View',

    description: 'View Panitia',

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
            description: 'Role bukan pendaftar atau panitia'
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

            let panitiaId = this.req.param('id');

            if (panitiaId) {
                let panitiaDB = await Panitia.findOne({ id: panitiaId });

                return exits.success({
                    message: `Success view Panitia`,
                    data: panitiaDB
                });
            } else {
                let panitiaDB = await Panitia.find();

                return exits.success({
                    message: `Success view all Panitia`,
                    data: panitiaDB
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
