module.exports = {

    friendlyName: 'Forgot password',

    description: 'Forgot Password Panitia',

    inputs: {
        email: {
            type: 'string',
            required: true,
        }
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'Forgot password successful',
        },
        emailWrong: {
            statusCode: 400,
            description: 'Email panitia salah',
        }
    },

    fn: async function (inputs, exits) {
        try {
            const panitiaDB = await Panitia.findOne({ email: inputs.email });
            if (!panitiaDB) {
                return exits.emailWrong({
                    message: 'Email salah atau belum register'
                });
            }

            const token = await sails.helpers.strings.random('url-friendly');

            await Panitia.update({ id: panitiaDB.id }).set({
                passwordResetToken: token,
                passwordResetTokenExpiresAt:
                Date.now() + sails.config.custom.passwordResetTokenTTL,
            });

            return exits.success({
                message: 'Forgot password successful',
                token: token
            });

        } catch (error) {
            return exits.error({
                message: error.message
            });
        }
    }
};
