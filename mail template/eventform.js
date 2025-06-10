const event_form = (eventdetails) => {
    const today = new Date();

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Event Form</title>
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }
    @media print {
      body {
        margin: 0;
        box-shadow: none;
      }
    }
    body {
      font-family: Arial, sans-serif;
      background: white;
      color: black;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 190mm;
      margin: auto;
      padding: 10mm;
      box-sizing: border-box;
    }
    h1, h2, h3 {
      text-align: center;
      margin: 5px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
    }
    th, td {
      border: 1px solid #000;
      padding: 8px;
      vertical-align: top;
    }
    .section-title {
      font-weight: bold;
      margin-top: 20px;
    }
    .no-border td {
      border: none;
    }
    .underline {
      display: inline-block;
      border-bottom: 1px solid #000;
      min-width: 200px;
    }
    .note {
      font-size: 0.9em;
      margin-top: 10px;
    }
    .spacer {
      height: 30px;
    }
    ul {
      margin: 0;
      padding-left: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>ACHARYA INSTITUTE OF GRADUATE STUDIES</h2>
    <h3>(NAAC Re-Accredited ‘A+’ and Affiliated to Bengaluru City University)</h3>
    <h3>Soladevanahalli, Bengaluru-560107</h3>

    <h2>EVENT FORM</h2>

    <table>
      <tr>
        <td><strong>Event Type:</strong></td><td>${eventdetails.eventType}</td>
      </tr>
      <tr><td>Topic</td><td>${eventdetails.eventName}</td></tr>
      <tr><td>Name of Organizing Department/College</td><td>${eventdetails.department}</td></tr>
      <tr><td>Target Audience</td><td>${eventdetails.targetAudience}</td></tr>
      <tr><td>Date</td><td>${eventdetails.ventType}</td></tr>
      <tr><td>Time</td><td>${eventdetails.ventType}</td></tr>
      <tr><td>Venue</td><td>${eventdetails.eventVenue}</td></tr>
      <tr><td>Duration of the Event</td><td>${eventdetails.ventType}</td></tr>
      <tr><td>Objective(s) of the Event</td><td style="height: 60px;">${eventdetails.eventobjective}</td></tr>
    </table>

    <div class="section-title">Event Co-Ordinator</div>
    <table>
      <tr><td>DEPT</td><td>${eventdetails.department}</td></tr>
      <tr><td>Name</td><td>${eventdetails.eventcordinator}</td></tr>
      <tr><td>Event No</td><td>${eventdetails.ventType}</td></tr>
    </table>

    <div class="section-title">Resource Person(s) Details</div>
    <table>
      <tr><td>Name</td><td>${eventdetails.rpname}</td></tr>
      <tr><td>Qualification</td><td>${eventdetails.rpqualification}</td></tr>
      <tr><td>Occupation</td><td>${eventdetails.rpoccupation}</td></tr>
      <tr><td>Expertise in</td><td>${eventdetails.rpexpertise}</td></tr>
      <tr><td>Years of Experience</td><td>${eventdetails.rpexperience}</td></tr>
    </table>

    <div class="section-title">Enclosures Required</div>
    <table>
      <tr><td>
        <ul>
          <li>Circular</li>
          <li>Invite Letter/Permission Letter</li>
          <li>Acceptance Letter</li>
          <li>Brochure/Poster (Excluding Industrial Visit)</li>
          <li>Report in Prescribed Format</li>
          <li>Students Attendance Sheet</li>
          <li>Feedback Form</li>
          <li>Copy of CV (Resource Person)</li>
          <li>Budget Copy / Appreciation Letter / Certificate (If Any)</li>
        </ul>
      </td></tr>
    </table>

    <p>Ref No: AIGS/ IQAC/EF/2024-25/${eventdetails.verID} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Academic Year: __________</p>

    <p class="note">
      <strong>Note:</strong> Organizers are required to Email the Verified Soft copy of the Event Report within span of 3 days of the event (without fail) to
      <strong>iqac.aigs@acharya.ac.in</strong> and <strong>patoprincipalaigs@acharya.ac.in</strong>
    </p>

    <hr>
    <h3>Committee Use Only</h3>

    <table>
      <tr><td>Ref. No. AIGS/NEWS/EVENT/2024-25/ODD/EVEN SEM/No:</td></tr>
      <tr><td>File name:</td><td>File No:</td></tr>
    </table>

    <p><strong>IQAC Remarks:</strong></p>
    <table><tr><td style="height: 60px;"></td></tr></table>

    <p><strong>HOD Remarks:</strong></p>
    <table><tr><td style="height: 60px;"></td></tr></table>
  </div>
</body>
</html>`;
};

module.exports = event_form;
