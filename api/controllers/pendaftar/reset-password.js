module.exports = {

    friendlyName: 'Reset password',

    description: 'Reset password Pendaftar',

    inputs: {
        password: {
            description: 'The new, unencrypted password.',
            example: 'myfancypassword',
            required: true,
        },
        token: {
            description:
                'The password token that was in the forgot-password endpoint',
            example: 'gwa8gs8hgw9h2g9hg29',
            required: true,
        },
    },

    exits: {
        success: {
            description:
                'Password successfully updated, and requesting user agent automatically logged in',
            },
        invalidToken: {
            statusCode: 401,
            description:
                'The provided password token is invalid, expired, or has already been used.',
        },
    },

    fn: async function (inputs, exits) {

        if (!inputs.token) {
            return exits.invalidToken({
                error: 'Tokenmu invalid atau expired',
            });
        }

        let pendaftarDB = await Pendaftar.findOne({ passwordResetToken: inputs.token });

        if (!pendaftarDB || pendaftarDB.passwordResetTokenExpiresAt <= Date.now()) {
            return exits.invalidToken({
                error: 'Tokenmu invalid atau expired',
            });
        }

        const hashedPassword = await sails.helpers.passwords.hashPassword(
            inputs.password
        );

        await Pendaftar.updateOne({ id: pendaftarDB.id }).set({
            password: hashedPassword,
            passwordResetToken: '',
            passwordResetTokenExpiresAt: 0,
        });

        const token = await sails.helpers.generateNewJwtToken(pendaftarDB.email, pendaftarDB.id, 'Pendaftar');

        this.req.pendaftarDB = pendaftarDB;
        return exits.success({
            message: `Password reset successful. ${pendaftarDB.email} has been logged in`,
            data: pendaftarDB,
            role: 'Pendaftar',
            token,
        });
    }
};
