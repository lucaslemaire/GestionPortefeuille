<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\MembresResource;
use App\Membre;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

/**
 *
 * @OA\Get(
 *      path="/membres/{id}",
 *      operationId="show",
 *      tags={"Membres"},
 *      summary="Renvoie les informations d'un membre",
 *      description="Renvoie les informations d'un membre",
 *      @OA\Parameter(
 *          name="id",
 *          description="id du membre",
 *          required=true,
 *          in="path",
 *          @OA\Schema(
 *              type="integer"
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="membre response",
 *          @OA\JsonContent(
 *              type="object",
 *              allOf={
 *                  @OA\Schema (
 *                      required={"id"},
 *                      @OA\Property(property="id", format="int64", type="integer"),
 *                      @OA\Property(property="email", type="string"),
 *                      @OA\Property(property="nom", type="string"),
 *                      @OA\Property(property="prenom", type="string"),
 *                      @OA\Property(property="avatar", type="string"),
 *                      @OA\Property(property="password", type="string"),
 *                      @OA\Property(property="solde", type="number", format="float"),
 *                      @OA\Property(property="achats",
 *                         type="array",
 *                         @OA\Items(
 *                            @OA\Property(property="id", format="int64", type="integer"),
 *                            @OA\Property(property="description", type="string" ) ,
 *                            @OA\Property(property="montant", type="number", format="float") ,
 *                            @OA\Property(property="date_achat", type="string")
 *                        )
 *                      ),
 *                      @OA\Property(property="depenses",
 *                        type="array",
 *                        @OA\Items(
 *                          @OA\Property(property="id", format="int64", type="integer"),
 *                          @OA\Property(property="acheteur_id", format="int64", type="integer"),
 *                          @OA\Property(property="acheteur", type="string" ) ,
 *                          @OA\Property(property="description", type="string" ) ,
 *                          @OA\Property(property="quote_part", type="number", format="float") ,
 *                          @OA\Property(property="date_depense", type="string")
 *                        )
 *                      )
 *                  )
 *              },
 *          )
 *       ),
 *      @OA\Response(response=400, description="Bad request"),
 *      @OA\Response(response=404, description="Resource Not Found"),
 *      security={
 *         {
 *             "oauth2_security_example": {"write:membres", "read:membres"}
 *         }
 *     },
 * )
 *
 * @OA\Get(
 *      path="/membres",
 *      operationId="index",
 *      tags={"Membres"},
 *      summary="Get list of membres",
 *      description="Renvoie la liste des membres",
 *      @OA\Response(
 *          response=200,
 *          description="successful operation",
 *          @OA\JsonContent(
 *              type="object",
 *              allOf={
 *                  @OA\Schema(
 *                      @OA\Property(property="data",
 *                                 type="array",
 *                                 @OA\Items(
 *                                       @OA\Property(property="id", format="int64", type="integer"),
 *                                       @OA\Property(property="email", type="string"),
 *                                       @OA\Property(property="nom", type="string"),
 *                                       @OA\Property(property="prenom", type="string"),
 *                                       @OA\Property(property="avatar", type="string"),
 *                                       @OA\Property(property="password", type="string"),
 *                                       @OA\Property(property="solde", type="number", format="float"),
 *                                       @OA\Property(property="achats",
 *                                                  type="array",
 *                                                  @OA\Items(
 *                                                           @OA\Property(property="id", format="int64", type="integer"),
 *                                                           @OA\Property(property="description", type="string" ) ,
 *                                                           @OA\Property(property="montant", type="number", format="float") ,
 *                                                           @OA\Property(property="date_achat", type="string")
 *                                                 )
 *                                       ),
 *                                       @OA\Property(property="depenses",
 *                                                  type="array",
 *                                                  @OA\Items(
 *                                                           @OA\Property(property="id", format="int64", type="integer"),
 *                                                           @OA\Property(property="acheteur_id", format="int64", type="integer"),
 *                                                           @OA\Property(property="acheteur", type="string" ) ,
 *                                                           @OA\Property(property="description", type="string" ) ,
 *                                                           @OA\Property(property="quote_part", type="number", format="float") ,
 *                                                           @OA\Property(property="date_depense", type="string")
 *                                                 )
 *                                       ),
 *                                 )
 *                      )
 *                  )
 *              }
 *          )
 *       ),
 *       @OA\Response(response=400, description="Bad request"),
 *       security={
 *           {"api_key_security_example": {}}
 *       }
 *     )
 * Returns list of membres
 */
class MembreController extends Controller {
    public function __construct() {
        // $this->middleware('auth:api')->except(['index']);
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     */
    public function index() {
        Log::info('dans la fonction index');
        return MembresResource::collection(Membre::with('depenses', 'achats')->get());
        /*        $membres = Membre::with(['depenses', 'achats'])->get();
                return $membres;*/
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(),
            ['nom' => 'required',
                'prenom' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                'avatar' => 'required'
            ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $membre = Membre::create($request->all());
        return new MembresResource($membre);
    }

    public function show($id) {
        $membre = Membre::with('achats', 'depenses')->findOrFail($id);
        return new MembresResource($membre);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        //
    }
}
