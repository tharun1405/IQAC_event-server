const { PDFDocument, cmyk } = require( 'pdf-lib' );
const fontkit = require( '@pdf-lib/fontkit' );
const fs = require( 'fs' );
const { google } = require( 'googleapis' );
const { formattedDate } = require( './formattedDate' );
const { send_mail } = require( '../utils/send_mail.js' );
const mail_template = require('../utils/mail_template.js');
require( 'dotenv' ).config();

// Use dynamic import for fetch (node-fetch v3+ is ESM-only)
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const fontUrls = [
  'https://www.1001fonts.com/download/font/poppins.semibold.ttf',
  'https://www.1001fonts.com/download/font/roboto.medium.ttf',
];

// function to fetch and embed fonts concurrently using Promise.all()
const fetchAndEmbedFonts = async (pdfDoc) => {
  const { default: fetch } = await import('node-fetch');

  const [font1Bytes, font2Bytes] = await Promise.all(
    fontUrls.map((url) => fetch(url).then((res) => res.arrayBuffer()))
  );
  const [font1, font2] = await Promise.all(
    [font1Bytes, font2Bytes].map((bytes) => pdfDoc.embedFont(bytes))
  );
  return { font1, font2 };
};


// Helper function to fetch the PDF from URL
const fetchPdfFromUrl = async ( url ) => {
  const res = await fetch( url );
  if ( !res.ok ) {
    throw new Error( `Failed to fetch PDF: ${ res.statusText }` );
  }
  return await res.arrayBuffer();
};

// Configure the Google Drive API credentials
// console.log( 'Private KEY  =>  ', process.env.GOOGLE_PRIVATE_KEY.replace( /\\n/g, '\n' ) );
const auth = new google.auth.GoogleAuth( {
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/drive']
} );

// Function to generate the certificate PDF
exports.generateCertificate = async ( name, eventType, eventName, college, verID, email ) => {
  // temp file created in root directory for writing
  const tempFilePath = 'Certificate.pdf';

  try {
    // Fetch the certificate template from the URL
    const templateUrl = process.env.CERTIFICATE_TEMPLATE_URL;
    const templateBytes = await fetchPdfFromUrl( templateUrl );

    // Create a new PDF document
    const pdfDoc = await PDFDocument.load( templateBytes );
    // Get the content of certificate template PDF
    const page = pdfDoc.getPage( 0 );

    // Get the width and height of the first page
    const { width, height } = page.getSize();

    pdfDoc.registerFontkit( fontkit );

    // Fetch and embed fonts concurrently
    const { font1, font2 } = await fetchAndEmbedFonts( pdfDoc );

    // texts to be inserted in PDF
    const text1 = name;
    const text2 = college;
    const text3 = eventName;
    const text4 = 'HABBA25 - ' + Number(verID);
    // Width of Text contents to be inserted, req. for calculating coordinates
    const widthOfText1 = font1.widthOfTextAtSize( text1, 20 );
    const widthOfText2 = font2.widthOfTextAtSize( text2, 20 );
    const widthOfText3 = font2.widthOfTextAtSize( text3, 20 );
    const widthOfText4 = font2.widthOfTextAtSize( text4, 20 );

    page.moveTo( ( 565 - ( widthOfText1 / 2 )), 276 );
    page.drawText( text1, { size: 19, font: font2 } );
    page.moveTo( ( 235 - ( widthOfText2 / 2 )), 240 );
    page.drawText( text2, { size: 18, font: font2 } );
    page.moveTo( ( 270 - ( widthOfText3 / 2 )), 200 );
    page.drawText( text3, { size: 18, font: font2 } );
    page.moveTo( ( 617 - ( widthOfText4 / 2 )), 74 );
    page.drawText( text4, { size: 14.6, font: font1 } );

    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();
    fs.writeFileSync( tempFilePath, modifiedPdfBytes );

    // Create an authorized client
    const drive = google.drive( { version: 'v3', auth } );

    const fileMetadata = {
      name: `${ name }_${ eventType }_${ tempFilePath }`,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    };
    const media = {
      mimeType: 'application/pdf',
      body: fs.createReadStream( tempFilePath )
    };

    // Upload the certificate PDF to Google Drive
    const file = await drive.files.create( {
      requestBody: fileMetadata,
      media: media,
      fields: 'id'
    } ).catch(err => {
      console.error("❌ Google Drive upload failed:", err.message);
      throw err;
    });

    // Get the link to the uploaded file
    const certificateLink = `https://drive.google.com/file/d/${ file.data.id }/view`;

    await send_mail(
      {
        name: name,
        email: email, 
        verID: verID,
        eventName: eventName,
      },
      {
        subject: "Certificate of Participation in Acharya Habba 2025",
        text: "Horray! You have successfully completed the event and earned a certificate. Click the link below to download your certificate.",
      },
      mail_template({
        name: name,
        email: email, 
        verID: verID,
        eventName: eventName,
      }),
      modifiedPdfBytes
    );

    return certificateLink;

  } catch (error) {
    console.error('❌ Certificate generation error:', error.message);
    console.trace(error);
    throw error;
  }
  
  finally {
    // Cleanup: Delete the temporary PDF file
    if ( fs.existsSync( tempFilePath ) ) {
      fs.unlinkSync( tempFilePath );
    }
  }
};