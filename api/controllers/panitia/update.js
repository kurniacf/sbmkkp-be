/* eslint-disable camelcase */
module.exports = {

    friendlyName: 'Update',

    description: 'Update Data Panitia',

    inputs: {
        panitiaId: {
            type: 'number',
        },
        nama: {
            type: 'string',
        },
        email: {
            type: 'string'
        },
        nomor_telepon: {
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
            description: 'Role bukan Panitia atau panitia'
        },
        onlyPanitia: {
            statusCode: 404,
            description: 'only panitia access'
        }
    },

    fn: async function (inputs, exits) {
        try {
            let credential = this.req.headers.authorization.split(' ');

            let tokenHeader = credential[1];
            const data = await sails.helpers.decodeJwtToken(tokenHeader);

            let panitiaDB;

            if (inputs.panitiaId) {
                if (!(data.role === 'Panitia')) {
                    return exits.onlyPanitia({
                        message: `Maap telah terjadi error :)`,
                        error: error.message + `Hanya Panitia yang bisa akses`
                    });
                } else {
                    await Panitia.updateOne({ id: inputs.panitiaId }).set({
                        nama: inputs.nama,
                        email: inputs.email,
                        nomor_telepon: inputs.nomor_telepon
                    });
                    panitiaDB = await Panitia.findOne({ id: inputs.panitiaId });
                }
            } else {
                await Panitia.updateOne({ id: data.id }).set({
                    nama: inputs.nama,
                    email: inputs.email,
                    nomor_telepon: inputs.nomor_telepon
                });
                panitiaDB = await Panitia.findOne({ id: data.id });
            }

            const token = await sails.helpers.generateNewJwtToken(panitiaDB.email, panitiaDB.id, 'panitia');

            return exits.success({
                message: `Success update Panitia Data`,
                data: panitiaDB,
                role: 'panitia',
                token: token
            });

        } catch (error) {
            return exits.error({
                message: `Error update Panitia Data`,
                error: error.message
            });
        }
    }
};
