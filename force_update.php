<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// Static force update values
$latestVersion = "2.0.1";
$forceUpdate = true;
$updateUrl = "https://play.google.com/store/apps/details?id=com.yourapp.package";
$message = "A new version is available. Please update to continue.";

// Response object
$response = [
    "force_update" => $forceUpdate,
    "latest_version" => $latestVersion,
    "update_url" => $updateUrl,
    "message" => $message
];

// Return JSON response
echo json_encode($response);
?>
