module.exports = {

    friendlyName: 'Login',

    description: 'Login pendaftar.',

    inputs: {
        email: {
            type: 'string',
            required: true,
            isEmail: true,
            description: 'Pendaftar email.'
        },
        password: {
            type: 'string',
            required: true,
            description: 'Pendaftar password.'
        }
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'Login successful',
        },
        notPendaftar: {
            statusCode: 404,
            description: 'Pendaftar not found',
        },
        passwordIsWrong: {
            statusCode: 400,
            description: 'Password is wrong',
        },
        error: {
            description: 'Something went wrong',
        },
    },


    fn: async function (inputs, exits) {
        try {
            const pendaftarDB = await Pendaftar.findOne({ email: inputs.email });

            if (!pendaftarDB) {
                return exits.notPendaftar({
                    message: `${inputs.email} belum melakukan pendaftaran`
                });
            }

            await sails.helpers.passwords.checkPassword(inputs.password, pendaftarDB.password)
                .intercept('incorrect', (error) => {
                    return exits.passwordIsWrong({
                        message: error.message
                    });
            });

            const token = await sails.helpers.generateNewJwtToken(pendaftarDB.email, pendaftarDB.id, 'pendaftar');

            return exits.success({
                message: `${pendaftarDB.email} telah berhasil login`,
                data: pendaftarDB,
                role: 'pendaftar',
                token: token
            });

        } catch (error) {
            return exits.error({
                message: 'Maap telah terjadi error :)',
                error: error.message
            });
        }
    }
};
