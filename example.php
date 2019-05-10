<?php
$query = $_GET;
ksort($query);
unset($query['signature']);
$message = hash_hmac('sha256', http_build_query($query), PMA_SECRET);

 if ($message == $_GET['signature']) {
  // Passed age check...
}
