/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // AUTHENTICATION
  'POST /auth/check-account': 'authentication/check-account',

  // PENDAFTAR
  'POST /pendaftar/register': 'pendaftar/register',
  'POST /pendaftar/login': 'pendaftar/login',
  'POST /pendaftar/forgot-password': 'pendaftar/forgot-password',
  'POST /pendaftar/reset-password': 'pendaftar/reset-password',
  'GET /pendaftar/view': 'pendaftar/view',
  'GET /pendaftar/view/:id': 'pendaftar/view',
  'POST /pendaftar/update': 'pendaftar/update',
  'POST /pendaftar/delete': 'pendaftar/delete',

  // PANITIA
  'POST /panitia/register': 'panitia/register',
  'POST /panitia/login': 'panitia/login',
  'POST /panitia/forgot-password': 'panitia/forgot-password',
  'POST /panitia/reset-password': 'panitia/reset-password',
  'GET /panitia/view': 'panitia/view',
  'GET /panitia/view/:id': 'panitia/view',
  'POST /panitia/update': 'panitia/update',
  'POST /panitia/delete': 'panitia/delete',

  // JADWAL
  'POST /jadwal/create': 'jadwal/create',
};
