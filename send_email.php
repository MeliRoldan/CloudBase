<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Gmail's SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'meli.rww@gmail.com'; // Your Gmail address for sending
        $mail->Password = 'ysdo rtgi inyi fuwr'; // Your Gmail password or App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
    
        // Recipients
        $mail->setFrom('meli.rww@gmail.com', 'Reservation Notification'); // Sender email (your business email)
        $mail->addAddress('meli.rww@gmail.com'); // Recipient email (also your business email)
    
        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Reservation';
        $mail->Body = ' <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd;">
        <p style="font-size: 16px; color: #007BFF;">A new reservation has been submitted. Check the details below:</p>
        <table style="width: 50%; border-collapse: collapse; margin-top: 20px;">
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Full Name:</td>
                <td style="padding: 10px; color: #333;">' . htmlspecialchars($_POST['name']) . '</td>
            </tr>
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px; color: #333;">' . htmlspecialchars($_POST['email']) . '</td>
            </tr>
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 10px; color: #333;">' . htmlspecialchars($_POST['phone']) . '</td>
            </tr>
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Location:</td>
                <td style="padding: 10px; color: #333;">' . htmlspecialchars($_POST['location']) . '</td>
            </tr>
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Date:</td>
                <td style="padding: 10px; color: #333;">' . htmlspecialchars($_POST['date']) . '</td>
            </tr>
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Number of Persons:</td>
                <td style="padding: 10px; color: #333;">' . htmlspecialchars($_POST['totalPersons']) . '</td>
            </tr>
        </table>
        <p style="font-size: 14px; color: #007BFF; text-align: start;"><em>"If people are doubting how far you can go, go so far that you can’t hear them anymore. :)"</em></p>
    </div>';

    
        if ($mail->send()) {
            echo 'Success';
        } else {
            echo 'Error';
        }
    } catch (Exception $e) {
        echo "Mailer Error: {$mail->ErrorInfo}";
    }
}
?>