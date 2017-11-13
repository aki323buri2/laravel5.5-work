<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class MainServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        \App\Http\Controllers\MainController::routes();
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
