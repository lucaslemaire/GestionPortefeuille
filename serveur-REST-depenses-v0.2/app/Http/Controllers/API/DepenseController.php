<?php

namespace App\Http\Controllers\API;

use App\Depense;
use App\Http\Resources\DepensesResource;
use App\Participant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

/**
 * Class DepenseController
 * @package App\Http\Controllers\API
 *
 *
 */

/**
 * @OA\Tag(
 *     name="depense",
 *     description="Operations about depense",
 *     @OA\ExternalDocumentation(
 *         description="Find out more about",
 *         url="http://swagger.io"
 *     )
 * )
 * @OA\ExternalDocumentation(
 *     description="Find out more about Swagger",
 *     url="http://swagger.io"
 * )
 *
 * @OA\Get(
 *      path="/depenses",
 *      operationId="show",
 *      tags={"Depenses"},
 *      summary="Renvoie les informations de toutes les dépenses",
 *      description="Renvoie les dépenses",
 *      @OA\Response(
 *          response=200,
 *          description="dépense response",
 *          @OA\JsonContent(type="object", allOf={
 *                  @OA\Schema(
 *                      @OA\Property(property="data", type="array",
 *                         @OA\Items(
 *                           @OA\Property(property="id", format="int64", type="integer"),
 *                           @OA\Property(property="description", type="string"),
 *                           @OA\Property(property="date_depense", type="string"),
 *                           @OA\Property(property="montant", type="number", format="float") ,
 *                           @OA\Property(property="acheteur", type="object", allOf={
 *                              @OA\Schema(
 *                                 @OA\Property(property="id", format="int64", type="integer"),
 *                                 @OA\Property(property="email", type="string"),
 *                                 @OA\Property(property="nom", type="string"),
 *                                 @OA\Property(property="prenom", type="string"),
 *                                 @OA\Property(property="avatar", type="string"),
 *                              )
 *                           }),
 *                           @OA\Property(property="participants", type="array",
 *                              @OA\Items(
 *                                 @OA\Property(property="id", format="int64", type="integer"),
 *                                 @OA\Property(property="nom", type="string" ) ,
 *                                 @OA\Property(property="prenom", type="string" ) ,
 *                                 @OA\Property(property="avatar", type="string" ) ,
 *                                 @OA\Property(property="created_at", type="string" ) ,
 *                                 @OA\Property(property="updated_at", type="string" ) ,
 *                                 @OA\Property(property="pivot", type="object", allOf={
 *                                    @OA\Schema(
 *                                      @OA\Property(property="depense_id", format="int64", type="integer"),
 *                                      @OA\Property(property="membre_id", format="int64", type="integer"),
 *                                      @OA\Property(property="quote_part", format="float", type="integer"),
 *                                    )
 *                                 })
 *                              )
 *                           )
 *                         )
 *                     )
 *                  )
 *          })
 *      ),
 *      @OA\Response(response=400, description="Bad request"),
 *      @OA\Response(response=404, description="Resource Not Found"),
 *      security={
 *         {
 *             "oauth2_security_example": {"write:membres", "read:membres"}
 *         }
 *     }
 * )
 *
 * @OA\Get(
 *      path="/depenses/{id}",
 *      operationId="show",
 *      tags={"Depenses"},
 *      summary="Renvoie les informations d'une dépense",
 *      description="Renvoie les informations d'une dépense",
 *      @OA\Parameter(
 *          name="id",
 *          description="id d'une dépense",
 *          required=true,
 *          in="path",
 *          @OA\Schema( type="integer")
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="response: les données d'une dépense",
 *          @OA\JsonContent( type="object", allOf={
 *                  @OA\Schema(
 *                      @OA\Property(property="id", format="int64", type="integer"),
 *                      @OA\Property(property="description", type="string"),
 *                      @OA\Property(property="date_depense", type="string"),
 *                      @OA\Property(property="montant", type="number", format="float") ,
 *                      @OA\Property(property="acheteur", type="object", allOf={
 *                         @OA\Schema(
 *                               @OA\Property(property="id", format="int64", type="integer"),
 *                               @OA\Property(property="email", type="string"),
 *                               @OA\Property(property="nom", type="string"),
 *                               @OA\Property(property="prenom", type="string"),
 *                               @OA\Property(property="avatar", type="string"),
 *                         )
 *                      }),
 *                      @OA\Property(property="participants", type="array",
 *                         @OA\Items(
 *                            @OA\Property(property="id", format="int64", type="integer"),
 *                            @OA\Property(property="nom", type="string" ) ,
 *                            @OA\Property(property="prenom", type="string" ) ,
 *                            @OA\Property(property="avatar", type="string" ) ,
 *                            @OA\Property(property="created_at", type="string" ) ,
 *                            @OA\Property(property="updated_at", type="string" ) ,
 *                            @OA\Property(property="pivot", type="object", allOf={
 *                                @OA\Schema(
 *                                  @OA\Property(property="depense_id", format="int64", type="integer"),
 *                                  @OA\Property(property="membre_id", format="int64", type="integer"),
 *                                  @OA\Property(property="quote_part", format="float", type="integer"),
 *                                )
 *                            })
 *                         )
 *                      )
 *                  )
 *          })
 *      ),
 *      @OA\Response(response=400, description="Bad request"),
 *      @OA\Response(response=404, description="Resource Not Found"),
 *      security={
 *         {
 *             "oauth2_security_example": {"write:membres", "read:membres"}
 *         }
 *     },
 * )
 * @OA\Get(
 *      path="/depenses/acheteur/{id}",
 *      operationId="depensesByAcheteurId",
 *      tags={"Depenses"},
 *      summary="Renvoie les dépenses d'un acheteur",
 *      description="Renvoie les dépenses d'un acheteur",
 *      @OA\Parameter(
 *          name="id",
 *          description="id de l'acheteur",
 *          required=true,
 *          in="path",
 *          @OA\Schema( type="integer" )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="dépense response",
 *          @OA\JsonContent(type="object", allOf={
 *             @OA\Schema(
 *                @OA\Property(property="data", type="array",
 *                   @OA\Items(
 *                      @OA\Property(property="id", format="int64", type="integer"),
 *                      @OA\Property(property="description", type="string"),
 *                      @OA\Property(property="date_depense", type="string"),
 *                      @OA\Property(property="montant", type="number", format="float") ,
 *                      @OA\Property(property="acheteur", type="object", allOf={
 *                         @OA\Schema(
 *                               @OA\Property(property="id", format="int64", type="integer"),
 *                               @OA\Property(property="email", type="string"),
 *                               @OA\Property(property="nom", type="string"),
 *                               @OA\Property(property="prenom", type="string"),
 *                               @OA\Property(property="avatar", type="string"),
 *                         )
 *                      }),
 *                      @OA\Property(property="participants", type="array",
 *                         @OA\Items(
 *                            @OA\Property(property="id", format="int64", type="integer"),
 *                            @OA\Property(property="nom", type="string" ) ,
 *                            @OA\Property(property="prenom", type="string" ) ,
 *                            @OA\Property(property="avatar", type="string" ) ,
 *                            @OA\Property(property="created_at", type="string" ) ,
 *                            @OA\Property(property="updated_at", type="string" ) ,
 *                            @OA\Property(property="pivot", type="object", allOf={
 *                               @OA\Schema(
 *                                  @OA\Property(property="depense_id", format="int64", type="integer"),
 *                                  @OA\Property(property="membre_id", format="int64", type="integer"),
 *                                  @OA\Property(property="quote_part", format="float", type="integer"),
 *                               )
 *                            })
 *                         )
 *                      )
 *                   )
 *                )
 *             )
 *          })
 *      ),
 *      @OA\Response(response=400, description="Bad request"),
 *      @OA\Response(response=404, description="Resource Not Found"),
 *      security={
 *         {
 *             "oauth2_security_example": {"write:membres", "read:membres"}
 *         }
 *     },
 * )
 *
 *
 *
 */
class DepenseController extends Controller {
    /**
     * DepenseController constructor.
     */
    public function __construct() {
        $this->middleware('auth:api');
    }


    /**
     * Display a listing of the resource.
     *
     */
    public function index() {
        return DepensesResource::collection(Depense::with('acheteur', 'participants')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(),
            ['date_depense' => 'required',
                'description' => 'required',
                'montant' => 'required|numeric',
                'membre_id' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $depense = Depense::create($request->all());
        Log::info('depense : ' . $depense);
        return new DepensesResource($depense);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     */
    public function show($id) {
        Log::info("requête show: ".$id);
        $depense = Depense::find($id);
        if (!isset($depense)) {
            return response()->json(['Invaid depense identifier'], 422);
        }
        return new DepensesResource(Depense::with('acheteur', 'participants')->where('id', $id)->first());
    }

    public function depensesByAcheteurId($id) {
        return DepensesResource::collection(Depense::with('acheteur', 'participants')->where('membre_id', $id)->get());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        $depense = Depense::find($id);
        if (!isset($depense)) {
            return response()->json(['Invaid depense identifier'], 422);
        }
        $validator = Validator::make($request->all(),
            ['date_depense' => 'required',
                'description' => 'required',
                'montant' => 'required|numeric',
                'membre_id' => 'required',
            ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $depense->fill($request->all());
        $depense->save();
        Log::info('depense : ' . $depense);
        return new DepensesResource($depense);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $depense = Depense::with('acheteur', 'participants')->where('id', $id)->first();
        if (!isset($depense)) {
            return response()->json(['Invaid depense identifier'], 422);
        }

        foreach ($depense->participants as $participant) {
            Participant::where('membre_id',$participant->membre_id)->where('depense_id', $participant->depense_id) -> delete();
        }

        $depense = Depense::findOrFail($id)->delete();
        return response()->json([], 204);
    }
}
