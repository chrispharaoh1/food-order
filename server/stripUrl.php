<?php
    $data = json_decode(file_get_contents('php://input'), true);

    $baseUrl = $data['image'];

    if(!empty($baseUrl)){
        $maigebaseurl = basename($baseUrl);

        echo json_encode(['Url' => 'img/' . $maigebaseurl]);
    
    }

?>