module.exports = {

    friendlyName: 'Check account',

    description: 'Check Account',

    inputs: {
        token: {
            type: 'string',
            required: true,
        }
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'Check account successful',
        },
        error: {
            statusCode: 500,
            description: 'Something went wrong',
        },
        notRole: {
            statusCode: 400,
            description: 'Not role',
        }
    },

    fn: async function (inputs, exits) {
        try {
            const data = await sails.helpers.decodeJwtToken(inputs.token);

            if (data.role !== 'pendaftar' && data.role !== 'panitia') {
                return exits.notRole({
                    message: 'Tidak dapat akses karena Role'
                });
            }

            return exits.success({
                message: 'Cek Akun berhasil',
                data
            });

        } catch (error) {
        return exits.error({
            message: error.message
        });
        }
    }
};
