const Certificate = require('../models/event');
const { generator_unique_verID } = require('../utils/id-generator');
const { registration_mail } = require('../utils/registration_mail_template');
const { eventform_pdf } = require('../utils/create-pdf');
const { send_mail } = require('../utils/send_mail');

// Controller for creating a new certificate request
exports.createCertificateRequest = async (req, res) => {
  try {
    const {
      email, eventType, othereventype, eventName, department, eventcordinator,
      targetAudience, eventVenue, otherVenue, eventobjective,
      rpname, rpqualification, rpoccupation, rpexpertise, rpexperience // ✅ Add this line
    } = req.body;

    const existingCertificate = await Certificate.findOne({
      email, eventType, othereventype, eventName, department, eventcordinator,
      targetAudience, eventVenue, otherVenue, eventobjective,
      rpname, rpqualification, rpoccupation, rpexpertise, rpexperience
    });

    if (existingCertificate) {
      return res.status(409).json({
        error: existingCertificate.status === 'pending'
          ? 'Request already exists for the Event!'
          : 'Request already generated for the Event!'
      });
    }

    const verID = await generator_unique_verID(Certificate);

    // ✅ Include resourcePersons in new certificate request
    const request = new Certificate({
      email, eventType, othereventype, eventName, department, eventcordinator,
      targetAudience, eventVenue, otherVenue, eventobjective,
      rpname, rpqualification, rpoccupation, rpexpertise, rpexperience, verID
    });

    await request.save();

    res.status(201).json('Request submitted successfully.');
 } catch (error) {
  console.error('Certificate generation error:', error);  // <- Add this
  res.status(500).json({ error: 'Failed to issue event!' });
}

};

// Controller for retrieving all certificate requests whose status are 'pending'
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Certificate.find({ status: 'pending' });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve requests!' });
  }
};

// Controller for retrieving all certificate requests whose status are 'pending'
exports.getAlladminRequests = async (req, res) => {
  try {
    const requests = await Certificate.find({ status: 'pending' });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve requests!' });
  }
};

// Controller for approving and generating the certificate requested by User
exports.generateCertificate = async (req, res) => {
  try {
    const { _id } = req.params;

    // Get the certificate record
    const existingCertificate = await Certificate.findById(_id);
    if (!existingCertificate) {
      return res.status(404).json({ error: 'Event not found!' });
    }

    // Destructure all required fields from the record
    const {
      email, eventType, othereventype, eventName, department, eventcordinator,
      targetAudience, eventVenue, otherVenue, eventobjective,
      rpname, rpqualification, rpoccupation, rpexpertise, rpexperience,
      verID
    } = existingCertificate;

    if (existingCertificate.status === 'IQAC Approved') {
      return res.status(400).json({ error: 'Certificate already approved!' });
    }

    const eventdetails = {
      email, eventType, othereventype, eventName, department, eventcordinator,
      targetAudience, eventVenue, otherVenue, eventobjective,
      rpname, rpqualification, rpoccupation, rpexpertise, rpexperience, verID
    };

    // Call the mail generator function
    send_mail(
      eventdetails,
      {
        subject: "Event Registration Confirmation",
        text: "Your event has been successfully registered. We will notify you once the event is approved.",
      },
      registration_mail(eventdetails),
      await eventform_pdf(eventdetails) // Assuming create_pdf is a function that generates the PDF
    );

    const approvalDate = new Date();
    const updatedCertificate = await Certificate.findByIdAndUpdate(
      _id,
      { approvalDate, status: 'IQAC Approved' },
      { new: true }
    );

    res.status(201).json({ message: 'Event generated successfully.' });

  } catch (error) {
    console.error('Certificate generation error:', error);
    res.status(500).json({ error: 'Failed to issue event!' });
  }
};


// Controller for retrieving all certificates whose status are 'approved'
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ status: 'IQAC Approved' });
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve certificates!' });
  }
};

// Controller for retrieving all certificates whose status are 'approved'
exports.approvedevents = async (req, res) => {
  try {
    const certificates = await Certificate.find({ status: 'awaiting' });
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve certificates!' });
  }
};

// Controller for rejecting(deleting) a certificate request
exports.rejectCertificateRequest = async (req, res) => {
  try {
    const { _id } = req.params;
    await Certificate.findByIdAndDelete(_id);
    res.status(200).json('Certificate deleted successfully.');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the certificate!' });
  }
};