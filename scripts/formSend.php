<?php
    header('Content-type: text/plain');
?>
<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $name = $_POST['full_name'];
        $number = $_POST['phone'];
        $email = $_POST['email'];
        $message = $_POST['comments'];

        $toEmail = 'AdarshPatel249@gmail.com';
        $subject = 'Form Submission on Adarsh Patel\'s Portfolio';

        $emailMessage = "From: $name:\n";
        $emailMessage .= "Number: $number:\n";
        $emailMessage .= "Message: $message:\n";
        $emailMessage = wordwrap($message, 70, "\r\n");
        mail($toEmail, $subject, $emailMessage);
        header("Location: index.html");
        exit();
    }
?>