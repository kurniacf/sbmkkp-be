/* eslint-disable camelcase */
module.exports = {

    friendlyName: 'Register',

    description: 'Register Pendaftar.',

    inputs: {
        nama: {
            type: 'string',
            required: true,
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            isEmail: true,
        },
        password: {
            type: 'string',
            required: true,
            minLength: 6,
        },
        nik: {
            type: 'string',
            required: true,
            unique: true,
        },
        jenis_kelamin: {
            type: 'string',
            isIn: ['pria', 'perempuan'],
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
            description: 'New Employee created',
        },
        emailAlreadyInUse: {
            statusCode: 400,
            description: 'Email address already in use',
        },
        error: {
            description: 'Something went wrong',
        },
    },


    fn: async function (inputs, exits) {
        try {
            const newEmailAddress = inputs.email.toLowerCase();

            let newPendaftar = await Pendaftar.create({
                nama: inputs.nama,
                email: newEmailAddress,
                password: inputs.password,
                nik: inputs.nik,
                jenis_kelamin: inputs.jenis_kelamin,
                tempat_lahir: inputs.tempat_lahir,
                tanggal_lahir: inputs.tanggal_lahir,
                edukasi: inputs.edukasi,
                nomor_telepon: inputs.nomor_telepon,
            });

            return exits.success({
                message: `Akun dengan email ${inputs.email} telah berhasil dibuat`,
                data: newPendaftar
            });

        } catch (error) {
            if (error.code === 'E_UNIQUE') {
                return exits.emailAlreadyInUse({
                    message: 'Maap telah terjadi error :)',
                    error: 'Email ini udah ada yang pakai',
                });
            }
            return exits.error({
                message: 'Maap telah terjadi error :)',
                error: error.message,
            });
        }
    }
};
