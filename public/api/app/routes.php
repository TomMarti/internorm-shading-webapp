<?php
declare(strict_types=1);

use App\Application\Workers\GroupsWorkers;
use App\Application\Workers\StoreWorkers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app) {
    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write('Hello world!');
        return $response;
    });

    $app->group('/store', function(RouteCollectorProxy $group) {
        $group->post('/', StoreWorkers::class . ':add');
        $group->post('', StoreWorkers::class . ':add');
    });

    $app->group('/groups', function (RouteCollectorProxy $group) {
        $group->get('/', GroupsWorkers::class . ':getAll');
        $group->get('', GroupsWorkers::class . ':getAll');
        $group->post('/', GroupsWorkers::class . ':add');
        $group->post('', GroupsWorkers::class . ':add');
        $group->get('/{id}', GroupsWorkers::class . ':get');
        $group->put('/{id}', GroupsWorkers::class . ':update');
        $group->delete('/{id}', GroupsWorkers::class . ':delete');
    });
};
