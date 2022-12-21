/* eslint-disable camelcase */
module.exports = {

    friendlyName: 'Register',

    description: 'Register Panitia.',

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
        nomor_telepon: {
            type: 'string',
        },
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'Panitia telah berhasil dibuat',
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

            let newPanitia = await Panitia.create({
                nama: inputs.nama,
                email: newEmailAddress,
                password: inputs.password,
                nomor_telepon: inputs.nomor_telepon,
            });

            return exits.success({
                message: `Akun dengan email ${inputs.email} telah berhasil dibuat`,
                data: newPanitia
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
