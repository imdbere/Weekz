<?php

$contact = $_POST['email'];
$name = $_POST['name'];
$subject = 'Website Contact';
$message = $_POST['message'];

// Genera un boundary
$mail_boundary = "=_NextPart_" . md5(uniqid(time()));

$to = "putzer.daniel@rolmail.net";
$sender = "contact@weekz.cloud";

$send_msg = "$contact\n\n\n $name\n\n $subject\n $message";

$headers = "From: $sender\n";
$headers .= "MIME-Version: 1.0\n";
$headers .= "Content-Type: multipart/alternative;\n\tboundary=\"$mail_boundary\"\n";
$headers .= "X-Mailer: PHP " . phpversion();

// Boundary di terminazione multipart/alternative
$msg .= "\n--$mail_boundary--\n";

// Imposta il Return-Path (funziona solo su hosting Windows)
ini_set("sendmail_from", $sender);

// Invia il messaggio, il quinto parametro "-f$sender" imposta il Return-Path su hosting Linux
mail($to, $subject, $send_msg, $headers, "-f$sender")

?>
