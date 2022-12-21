/* eslint-disable camelcase */
/**
 * Panitia.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// username, password, NIK, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, edukasi, nomor_telepon

module.exports = {
    tableName: 'panitia',
    attributes: {
        nama: {
            type: 'string',
            required: true,
            columnName: 'nama'
        },
        email: {
            type: 'string',
            required: true,
            columnName: 'email',
            unique: true
        },
        password: {
            type: 'string',
            required: true,
            columnName: 'password'
        },
        nomor_telepon: {
            type: 'string',
            columnName: 'nomor_telepon'
        },
        passwordResetToken: {
            type: 'string',
            description:
                'A unique token used to verify the admin\'s identity when recovering a password.',
            columnName: 'password_reset_token',
        },
        passwordResetTokenExpiresAt: {
            type: 'number',
            description:
                'A timestamp representing the moment when this admin\'s `passwordResetToken` will expire (or 0 if the admin currently has no such token).',
            example: 1508944074211,
            columnName: 'password_reset_token_expires_at',
        },
    },
    customToJSON: function () {
        return _.omit(this, ['password']);
    },

    // LIFE CYCLE
    beforeCreate: async function (values, proceed) {
        // Hash password
        const hashedPassword = await sails.helpers.passwords.hashPassword(
            values.password
        );
        values.password = hashedPassword;
        return proceed();
    },
};

