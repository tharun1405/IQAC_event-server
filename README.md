# Certificate Generator

Certificate Generator is a web application designed to automate the process of generating and managing certificates for various courses. The application allows users to request certificates, which can then be approved and generated in PDF format. The generated certificates are stored on Google Drive and can be accessed via a link.


## Features

- **CRUD Operations**: Full create, read, update, and delete functionality for certificate generation management.
- **Certificate Request**: Users can request certificates by providing necessary details.
- **Certificate Approval**: Admins can approve or reject certificate requests.
- **PDF Generation**: Generate certificate PDFs with dynamic user data.
- **Google Drive Integration**: Store generated certificates on Google Drive.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

### Backend

- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM for MongoDB.
- **Google APIs**: Node.js client library for using Google APIs.
- **Google Drive API**: Integration with Google Drive for storing PDFs.
- **PDF-Lib**: Library for creating and modifying PDF documents.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Mongoose

### Google Drive API Setup

To enable Google Drive integration, you need to set up Google Drive API credentials.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Navigate to **API & Services** > **Credentials**.
4. Click **Create Credentials** and select **Service Account**.
5. Follow the prompts to create a new service account and download the JSON key file.
6. Enable the Google Drive API for your project by navigating to **API & Services** > **Library** and searching for "Google Drive API", then enabling it.

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/certificate_generator.git
   cd certificate_generator/server

2. Install dependencies:
```npm install```
OR
```yarn```

3. Configure environment variables: Create a .env file in the server directory with the following variables:

   - MONGODB_URI=<your_mongodb_uri>
   - GOOGLE_CLIENT_EMAIL=<your_google_client_email>
   - GOOGLE_PRIVATE_KEY=<your_google_private_key>
   - GOOGLE_DRIVE_FOLDER_ID=<your_google_drive_folder_id>
   - CERTIFICATE_TEMPLATE_URL=<your_certificate_template_url>
   - PORT=<PORT_NO>

4. Start the server:
```npm start```
OR
```yarn start```

## API Endpoints

- GET `/api/certificates/all`: Get all approved certificates.

- GET `/api/certificates/requests`: Get all pending certificates.

- POST `/api/certificates/request`: Create a new certificate request.

- PUT `/api/certificates/create/:id`: Approve a certificate request and generate the certificate PDF, saving the PDF on Google Drive.

- DELETE `/api/certificates/reject/:id`: Reject a certificate request.
