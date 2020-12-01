<?php


namespace App\Application\Workers;

use App\Application\Useful;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class GroupsWorkers
{
    public function get (Request $request, Response $response) {}
    public function getAll (Request $request, Response $response) {
        $data = json_decode(file_get_contents(__DIR__ . '/../../Data/config.json'));
        return Useful::makeJson($data, $response);
    }
    public function add (Request $request, Response $response) {}
    public function update (Request $request, Response $response) {}
    public function delete (Request $request, Response $response) {}
}