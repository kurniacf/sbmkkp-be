/* eslint-disable camelcase */
module.exports = {

    friendlyName: 'Update',

    description: 'Update Data Pendaftar',

    inputs: {
        pendaftarId: {
            type: 'number',
        },
        nama: {
            type: 'string',
        },
        email: {
            type: 'string'
        },
        nik: {
            type: 'string',
        },
        jenis_kelamin: {
            type: 'string',
            enum: ['pria', 'perempuan']
        },
        tempat_lahir: {
            type: 'string',
        },
        tanggal_lahir: {
            type: 'string',
            format: 'date-time',
        },
        edukasi: {
            type: 'string',
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
            description: 'Role bukan pendaftar atau panitia'
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

            let pendaftarDB;

            if (inputs.pendaftarId) {
                if (!(data.role === 'pendaftar')) {
                    return exits.onlyPanitia({
                        message: `Maap telah terjadi error :)`,
                        error: error.message + `Hanya Panitia yang bisa akses`
                    });
                } else {
                    await Pendaftar.updateOne({ id: inputs.pendaftarId }).set({
                        nama: inputs.nama,
                        email: inputs.email,
                        nik: inputs.nik,
                        jenis_kelamin: inputs.jenis_kelamin,
                        tempat_lahir: inputs.tempat_lahir,
                        tanggal_lahir: inputs.tanggal_lahir,
                        edukasi: inputs.edukasi,
                        nomor_telepon: inputs.nomor_telepon
                    });
                    pendaftarDB = await Pendaftar.findOne({ id: inputs.pendaftarId });
                }
            } else {
                await Pendaftar.updateOne({ id: data.id }).set({
                    name: inputs.name,
                    email: inputs.email,
                    address: inputs.address,
                    place_of_birth: inputs.place_of_birth,
                    date_of_birth: inputs.date_of_birth,
                    position: inputs.position,
                    phone_number: inputs.phone_number
                });
                pendaftarDB = await Pendaftar.findOne({ id: data.id });
            }

            const token = await sails.helpers.generateNewJwtToken(pendaftarDB.email, pendaftarDB.id, 'pendaftar');

            return exits.success({
                message: `Success update Pendaftar Data`,
                data: pendaftarDB,
                role: 'pendaftar',
                token: token
            });

        } catch (error) {
            return exits.error({
                message: `Error update Pendaftar Data`,
                error: error.message
            });
        }
    }
};
