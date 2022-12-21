/* eslint-disable camelcase */
module.exports = {

    friendlyName: 'Create',

    description: 'Create Jadwal',

    inputs: {
        tanggal_ujian: {
            type: 'string',
            format: 'date-time',
            required: true,
        },
        waktu_mulai: {
            type: 'string',
            format: 'time',
            required: true,
        },
        waktu_selesai: {
            type: 'string',
            format: 'time',
            required: true,
        },
        lokasi_ujian: {
            type: 'string'
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
                let jadwal = await Jadwal.create({
                    tanggal_ujian: inputs.tanggal_ujian,
                    waktu_mulai: inputs.waktu_mulai,
                    waktu_selesai: inputs.waktu_selesai,
                    lokasi_ujian: inputs.lokasi_ujian
                }).fetch();

                return exits.success({
                    message: `Success create jadwal`,
                    data: jadwal
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
