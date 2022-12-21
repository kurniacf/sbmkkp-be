module.exports = {

    friendlyName: 'Delete',

    description: 'Delete panitia',

    inputs: {
        panitiaId: {
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
            description: 'Role not Panitia or panitia'
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

            if (inputs.panitiaId) {
                if (data.role === 'panitia') {
                    await Panitia.destroyOne({ id: inputs.panitiaId });
                } else {
                    return exits.onlyPanitia({
                        message: `Hanya Panitia yang bisa akses`,
                        error: error.message + `Hanya Panitia yang bisa akses`
                    });
                }
            } else {
                await Panitia.destroyOne({ id: data.id });
            }

            return exits.success({
                message: `Success delete Panitia`
            });

        } catch (error) {
            return exits.error({
                message: `Error delete Panitia`,
                error: error.message
            });
        }
    }
};
