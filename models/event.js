const mongoose = require('mongoose');

// Define the schema for the certificate request data
const certificateSchema = new mongoose.Schema({
  verID: {
    type: Number,
    required: () => this.status === 'approved',
    unique: true
  },
  eventName: {
    type: String,
    required: () => this.status === 'pending',
  },
  eventType: {
    type: String,
    required: () => this.status === 'pending',
  },
  othereventype: {
    type: String,
    required: () => this.status === 'pending',
  },
  eventVenue: {
    type: String,
    required: () => this.status === 'pending',
  },
  otherVenue: {
    type: String,
    required: () => this.status === 'pending',
  },
  eventcordinator: {
    type: String,
    required: () => this.status === 'pending',
  },
  targetAudience: {
    type: String,
    required: () => this.status === 'pending',
  },
  eventobjective: {
    type: String,
    required: () => this.status === 'pending',
  },
  email: {
    type: String,
    required: () => this.status === 'pending',
  },
  department: {
    type: String,
    required: () => this.status === 'pending',
  },
  rpname: {
    type: String,
    required: () => this.status === 'pending',
  },  
  rpqualification: {
    type: String,
    required: () => this.status === 'pending',
  },
  rpoccupation: {
    type: String,
    required: () => this.status === 'pending',
  },
  rpexpertise: {
    type: String,
    required: () => this.status === 'pending',
  },
  rpexperience: {
    type: String,
    required: () => this.status === 'pending',
  },
  certificateLink: {
    type: String,
    required: () => this.status === 'approved'
  },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
});

// Create the CertificateRequest model
const Certificate = mongoose.model('IQAC Events', certificateSchema);

module.exports = Certificate;