const Certificate = require( '../models/event' );
const certificateGenerator = require( '../utils/certificateGenerator' );
const { generator_unique_verID } = require( '../utils/id-generator' );

// Controller for creating a new certificate request
exports.createCertificateRequest = async ( req, res ) => {
  try {
    const { email, eventType, othereventype, department, eventcordinator, targetAudience, eventVenue, otherVenue, eventobjective } = req.body;

    // Search for a certificate with the matching eventType, eventName, and email
    const existingCertificate = await Certificate.findOne( { email, eventType, othereventype, department, department, targetAudience, eventVenue, otherVenue, eventobjective } );

    if ( existingCertificate ) {
      return res.status( 409 ).json( {
        error: existingCertificate.status === 'pending'
          ? 'Request already exists for the Event!'
          : 'Request already generated for the Event!'
      } );
    }
    const verID = await generator_unique_verID(Certificate);

    // If no existing certificate is found for the same eventType, eventName, with same email, create a new request
    const request = new Certificate( { email, eventType, othereventype, department, eventcordinator, targetAudience, eventVenue, otherVenue, eventobjective, verID} );
    await request.save();

    res.status( 201 ).json( 'Request submitted successfully.' );
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Failed to submit request!' } );
  }
};

// Controller for retrieving all certificate requests whose status are 'pending'
exports.getAllRequests = async ( req, res ) => {
  try {
    const requests = await Certificate.find( { status: 'pending' } );
    res.status( 200 ).json( requests );
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Failed to retrieve requests!' } );
  }
};

// Controller for approving and generating the certificate requested by User
exports.generateCertificate = async ( req, res ) => {
  try {
    const { _id } = req.params;
    const { name, eventType, eventName, email, college, verID } = req.body;

    // Find the existing certificate
    const existingCertificate = await Certificate.findById( _id );
    if ( !existingCertificate ) {
      return res.status( 404 ).json( { error: 'Event not found!' } );
    }

    // Check if the name, eventType, eventName, or email matches the existing values
    if ( name !== existingCertificate.name || eventType !== existingCertificate.eventType || email !== existingCertificate.email ) {
      return res.status( 400 ).json( { error: 'Name, eventType, eventName, or email do not match the existing certificate details!' } );
    }

    // Generate the certificate PDF
    const certificateLink = await certificateGenerator.generateCertificate( name, eventType, eventName, college, verID, email );

    // Update the existing certificate document with status 'approved'
    const approvalDate = new Date();
    const updatedCertificate = await Certificate.findByIdAndUpdate(
      _id,
      { approvalDate, certificateLink, status: 'approved' },
      { new: true }  // returns updated document
    );
    if ( !updatedCertificate ) {
      return res.status( 404 ).json( { error: 'Failed to update certificate!' } );
    }

    res.status( 201 ).json( { message: 'Event generated successfully.', certificateLink } );
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Failed to issue certificate!' } );
  }
};

// Controller for retrieving all certificates whose status are 'approved'
exports.getAllCertificates = async ( req, res ) => {
  try {
    const certificates = await Certificate.find( { status: 'approved' } );
    res.status( 200 ).json( certificates );
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Failed to retrieve certificates!' } );
  }
};

// Controller for rejecting(deleting) a certificate request
exports.rejectCertificateRequest = async ( req, res ) => {
  try {
    const { _id } = req.params;
    await Certificate.findByIdAndDelete( _id );
    res.status( 200 ).json( 'Certificate deleted successfully.' );
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Failed to delete the certificate!' } );
  }
};