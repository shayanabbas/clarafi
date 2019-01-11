<?php
/*
    This is the registration page
    which process data to the Clara API
    and fetch results.

*/

// Defining header content type
header('Content-Type: application/json');

// Checking if data is post
if (!count($_POST)) {
    http_response_code(400);
    die(json_encode([
        'type'    => 'alert-danger',
        'message' => 'Something went wrong please report us.'
    ]));
}

// Extra server side validation for data fields.
$first_name = ( !(isset($_POST['first_name']) && !empty($_POST['first_name'])) ) ? false : $_POST['first_name'];
$last_name  = ( !(isset($_POST['last_name']) && !empty($_POST['last_name'])) ) ? false : $_POST['last_name'];
$email      = ( !(isset($_POST['email']) && !empty($_POST['email']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) ) ? false : $_POST['email'];
$phone      = ( empty($_POST['phone']) ) ? false : preg_replace('/\D/', '', $_POST['phone']);

// Checking if required fields are not empty
if (!$first_name || !$last_name || !$email) {
    http_response_code(422);
    die(json_encode([
        'type'    => 'alert-danger',
        'message' => 'Please fill all required fields.'
    ]));
}

$data = json_encode([
    'first_name'  => $first_name,
    'last_name'   => $last_name,
    'email'       => $email,
    'phone'       => $phone,
    'service_id'  => 110062,
    'consents'    => [
        ["consent_text_id" => 14355]
    ]
]);

// Initializing curl to POST request
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://novice.clara.fi/api/2/organization/b698c430416bbafeb99414b5bde494ca/applicants.json');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$result = json_decode(curl_exec($ch));
curl_close($ch);

// Exit and display the message if there is an error.
if (!isset($result->success)) {
    http_response_code($result->status);
    die(json_encode([
        'type'    => 'alert-danger',
        'message' => $result->error,
    ]));
}

// If successful show success message
echo json_encode([
    'type'    => 'alert-success',
    'message' => 'Applicant has been successfully created.',
]);
