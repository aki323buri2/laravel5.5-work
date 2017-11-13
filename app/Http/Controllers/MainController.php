<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Route;

class MainController extends Controller
{
    public static function routes()
    {
    	Route::prefix('main')
    		-> group(function ($router)
    		{
    			$router->view('/', 'main');
    		});
    }
}
