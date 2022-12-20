module.exports = {

    friendlyName: 'Delete',

    description: 'Delete Pendaftar',

    inputs: {
        pendaftarId: {
            type: 'string',
        },
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'Success update',
        },
        error: {
            statusCode: 500,
            description: 'Error',
        },
        notRole: {
            statusCode: 404,
            description: 'Role not pendaftar or panitia'
        },
        onlyPanitia: {
            statusCode: 404,
            description: 'only panitia access'
        }
    },


    fn: async function (inputs, exits) {
        try {
            let credential = this.req.headers.authorization.split(' ');

            let token = credential[1];
            const data = await sails.helpers.decodeJwtToken(token);

            if (inputs.pendaftarId) {
                if (data.role === 'panitia') {
                    await Pendaftar.destroyOne({ id: inputs.pendaftarId });
                } else {
                    return exits.onlyPanitia({
                        message: `Hanya Panitia yang bisa akses`,
                        error: error.message + `Hanya Panitia yang bisa akses`
                    });
                }
            } else {
                await Pendaftar.destroyOne({ id: data.id });
            }

            return exits.success({
                message: `Success delete Pendaftar`
            });

        } catch (error) {
            return exits.error({
                message: `Error delete Pendaftar`,
                error: error.message
            });
        }
    }
};
