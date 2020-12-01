<?php


namespace App\Application\Workers;

use App\Application\Useful;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class StoreWorkers
{
    public function add (Request $request, Response $response) {
        return Useful::makeJson(array('name' => 'Bob', 'age' => 40), $response);
    }
}