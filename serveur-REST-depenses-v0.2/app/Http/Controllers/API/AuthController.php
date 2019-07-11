<?php

namespace App\Http\Controllers\API;

use App\Membre;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

/**
 * @OA\Tag(
 *     name="Authentification",
 *     description="Operations d'authentification",
 *     @OA\ExternalDocumentation(
 *         description="Find out more about",
 *         url="http://swagger.io"
 *     )
 * )
 */
class AuthController extends Controller {


    /**
     * @OA\Post(
     *      path="/register",
     *      operationId="register",
     *      tags={"Membres"},
     *      summary="Enregistrement d'un membre",
     *      description="Enregistrement d'un membre",
     *      @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="nom",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="prenom",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 example={"nom": "Duchmol", "prenom": "Robert", "email": "robert.duchmol@domain.com", "password": "secret"}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *          response=200,
     *          description="successful operation"
     *       ),
     *      @OA\Response(response=400, description="Bad request"),
     *      @OA\Response(response=422, description="SQL Error or Missing mandatory field"),
     *      @OA\Response(response=404, description="Not Found"),
     * )
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' =>
                'required|string|email|max:255|unique:users',
            'nom' => 'required',
            'password' => 'required',
            'prenom' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        try {
            $user = Membre::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'avatar' => $request->avatar,
            ]);
        } catch (QueryException $e) {
            return response()->json(['error' => 'SQL Error: '.$e->getMessage()], 422);
        }
        $token = auth()->login($user);
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ], 201);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * * @OA\Post(
     * path="/login",
     * tags={"Membres"},
     * summary="connexion d'un membre",
     *      @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="email",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 example={"email": "robert.duchmol@domain.com", "password": "secret"}
     *             )
     *         )
     *      ),
     * @OA\Response(
     * response=200,
     * description="Success: operation Successfully" * ),
     * @OA\Response(
     * response=401,
     * description="Refused: Invalid Credentials"
     * ),
     * @OA\Response(
     * response="422",
     * description="Missing mandatory field"
     * ),
     * @OA\Response(
     * response="404",
     * description="Not Found"
     *)
     * ),
     */
    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Invalid Credentials'], 401);
        }
        $current_user = $request->email;
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'current_user' => $current_user,
            'expires_in' => auth()->factory()->getTTL() * 60], 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * * @OA\Post(
     * path="/logout",
     * tags={"Membres"},
     * summary="déconnexion d'un membre",
     * @OA\SecurityScheme(
     *          securityScheme="default",
     *          type="http",
     *          in="header",
     *          name="Authorization"
     *      ),
     *
     * @OA\Response(
     * response=200,
     * description="Success: operation Successfully" * ),
     * @OA\Response(
     * response=401,
     * description="Refused: Unauthenticated"
     * ),
     *        security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function logout(Request $request) {
        try {
            auth()->logout(true); // Force token to blacklist
        } catch (TokenExpiredException $e1) {
            return response()->json(['error' => 'Token has expired.'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token could not be parsed from the request.'], 401);
        }
        return response()->json(['success' => 'Logged out Successfully.'], 200);
    }

}
