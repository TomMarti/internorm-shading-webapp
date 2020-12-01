<?php


namespace App\Application;


class Useful
{
    public static function makeJson ($data, $response) {
        $payload = json_encode($data);

        $response->getBody()->write($payload);
        return $response
            ->withHeader('Content-Type', 'application/json');
    }
}