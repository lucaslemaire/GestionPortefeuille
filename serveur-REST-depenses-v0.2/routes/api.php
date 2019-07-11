<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

// Register Routes
Route::post('register', 'API\AuthController@register');
Route::post('login', 'API\AuthController@login');
Route::post('logout', 'API\AuthController@logout');

Route::apiResources([
    'membres' => 'API\MembreController',
    'depenses' => 'API\DepenseController',
    ]);

Route::post('depenses/participant', 'API\ParticipantController@store')->name('participant.store');
Route::delete('depenses/participant/{membre_id}/{depense_id}', 'API\ParticipantController@destroy')->name('participant.destroy');
Route::match(['put', 'patch'], 'depenses/participant/{membre_id}/{depense_id}', 'API\ParticipantController@update')->name('participant.update');

Route::get('depenses/acheteur/{id}', 'API\DepenseController@depensesByAcheteurId')->name('depenses.acheteur');

Route::middleware('jwt.auth')->get('me', function(Request $request){
    return auth()->user();
});