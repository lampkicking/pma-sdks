<?php 
function validate($request, $response) {
    $query = array();
    
    foreach($request->query as $key => $val) {
        if ($key != 'signature') {
            $query = $query .'&' . $key . '=' . $val;
        }
    }

    $message = hash_hmac('sha256', $query, $secret);

    $request->session->ageVerified = $message == $request->query->signature;
}