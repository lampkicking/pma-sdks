<?php
$query = $_GET;
ksort($query);
unset($query['signature']);
$message = hash_hmac('sha256', $query['cid'] . 'GET&/validate/?' . http_build_query($query), PMA_SECRET);

 if ($message == $_GET['signature']) {
  // Passed age check...
}
