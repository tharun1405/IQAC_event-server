const mail_template = (user) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css" />
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
    
            .background {
                background-color: #fff;
                padding: 60px 0;
            }
    
            .card {
                max-width: 600px;
                margin: 0 auto;
                font-family: Arial, Helvetica, sans-serif;
            }
    
            .card-top {
                background-color: #FFD500;
                text-align: center;
                color: #555555;
                font-weight: bold;
                padding: 10px 0;
                font-size: 1.5rem;
            }
    
            .card-mid {
                background-color: #ffffff;
                color: #132F40;
                padding-bottom: 40px;
            }
    
            .card-mid-top {
                padding: 40px;
                padding-bottom: 0;
            }
    
            .card-heading {
                font-size: 1.5rem;
                margin-bottom: 20px;
            }
    
            .user-name {
                font-weight: bold;
            }
            .card-text-wrapper p{
                margin-top: 20px;
                color: #132F40;
            }
    
            .habba{
                color: #132F40;
                font-weight: bold;
                text-align: right;
                margin-bottom: 15px;
            }
            .habba img{
                width:75px;
            }
    
            @media(max-width: 640px) {
                .card-mid-top{
                    padding: 20px;
                    padding-bottom: 0;
                }
                .user-name-wrapper {
                    display: block;
                }
                .card-mid{
                    padding-bottom: 20px;
                }
                .card-text-wrapper{
                    font-size: small;
                }
            }
        </style>
    </head>
    
    <body>
        <div class="background">
            <div class="card">
                <div class="card-mid">
                    <div class="card-mid-top">
                        <div class="habba">
                        <img src="https://firebasestorage.googleapis.com/v0/b/acharyahabba-21057.firebasestorage.app/o/HabbaLogo.png?alt=media&token=00a5176c-36d0-4c85-818e-09ed7008379a" alt="">
                        </div>
                        <div class="card-heading"><span class="user-name-wrapper">Hey <span
                                    class="user-name">${user.name}</span>,</span> .</div>
                        <h3>You Did It!</h3>
                        <div class="card-text-wrapper">
                            <p>Thank you for being a part of <strong>${user.eventName}</strong> during <strong>Acharya Habba 2025</strong>.</p>
                            <p>Your participation contributed to the success of the event, and we truly appreciate your involvement.</p>
                            <p>Please find your <strong>Certificate of Participation</strong> attached to this email.<br> Certificate ID : <strong>HABBA25-${user.verID}</strong> </p>
                            <p>Warm Regards,<br>Habba Technical Team</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`;
};

module.exports = mail_template;
