module.exports = {

    friendlyName: 'Login',

    description: 'Login Panitia.',

    inputs: {
        email: {
            type: 'string',
            required: true,
            isEmail: true,
            description: 'Panitia email.'
        },
        password: {
            type: 'string',
            required: true,
            description: 'Panitia password.'
        }
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'Login successful',
        },
        notPanitia: {
            statusCode: 404,
            description: 'Panitia tidak ditemukan',
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
            const panitiaDB = await Panitia.findOne({ email: inputs.email });

            if (!panitiaDB) {
                return exits.notPanitia({
                    message: `${inputs.email} belum melakukan register`
                });
            }

            await sails.helpers.passwords.checkPassword(inputs.password, panitiaDB.password)
                .intercept('incorrect', (error) => {
                    return exits.passwordIsWrong({
                        message: error.message
                    });
            });

            const token = await sails.helpers.generateNewJwtToken(panitiaDB.email, panitiaDB.id, 'panitia');

            return exits.success({
                message: `${panitiaDB.email} telah berhasil login`,
                data: panitiaDB,
                role: 'panitia',
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
