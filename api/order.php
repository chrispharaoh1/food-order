<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: GET");
    header("Allow: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers,  Authorization, X-Request-With");

    include("../config/config.php"); 

    $requestMethod = $_SERVER['REQUEST_METHOD'];
    if ( $requestMethod == 'GET') {

        echo orderDetails();
    }
    else{
        $data = [
            'status' => 405,
            'message' => $requestMethod . ' Bad request',
        ];
        header("HTTP/1.0 405 Method not allowed");
        echo json_encode($data);
    }

    //get function
    function orderDetails(){
        include("../config/config.php"); 

        $order = $_GET['order'];

        $sql = "SELECT * FROM oder WHERE order_id=$order";
        $query = mysqli_query($db, $sql);
        if ($query) {
            
            if(mysqli_num_rows($query) > 0){

                $orderData = mysqli_fetch_all($query, MYSQLI_ASSOC);

                $data = [
                    'status' => 200,
                    'message' => 'success',
                    'data' => $orderData 
                ];
                header("HTTP/1.0 200 success");
                return json_encode($data);
            }

            else{
                $data = [
                    'status' => 404,
                    'message' => 'No order found',
                ];
                header("HTTP/1.0 404 No order found");
                return json_encode($data);
            }
        }
        else{
            $data = [
                'status' => 500,
                'message' => 'Internal server error',
            ];
            header("HTTP/1.0 500 Internal server error");
            return json_encode($data);
        }
    }
?>