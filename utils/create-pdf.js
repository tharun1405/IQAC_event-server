// pdfGenerator.js
const htmlPDF       = require('html-pdf');
const event_form    = require('../mail template/eventform');    // make sure this file uses module.exports
//const circular_form = require('../mail template/volunteerpdf'); // same here

const eventform_pdf = (eventdetails) =>
  new Promise((resolve, reject) => {
    htmlPDF
      .create(event_form(eventdetails), {
        childProcessOptions: { env: { OPENSSL_CONF: '/dev/null' } },
      })
      .toBuffer((err, buf) => (err ? reject(err) : resolve(buf)));
  });

const circular_pdf = (eventdetails) =>
  new Promise((resolve, reject) => {
    htmlPDF
      .create(circular_form(eventdetails), {
        childProcessOptions: { env: { OPENSSL_CONF: '/dev/null' } },
      })
      .toBuffer((err, buf) => (err ? reject(err) : resolve(buf)));
  });

module.exports = { eventform_pdf, circular_pdf };
