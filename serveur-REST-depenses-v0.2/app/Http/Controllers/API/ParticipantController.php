<?php

namespace App\Http\Controllers\API;

use App\Depense;
use App\Http\Resources\DepensesResource;
use App\Membre;
use App\Participant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ParticipantController extends Controller {

    public function __construct() {
        $this->middleware('auth:api');
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function store(Request $request) {
        log::info('la requête '.implode(' | ', $request->all()));
        $input = $request->only(['membre_id','depense_id','quote_part' ]);
        Log::info("Les données ".implode(',',$input));
        $membre = Membre::find($request->input('membre_id'));
        $depense = Depense::find($request->input('depense_id'));
        $quote_part = $request->input('quote_part');
        if (!isset($membre) || !isset($depense))
            return response()->json("Invalid resources", 422);
        $participant = Participant::where('membre_id',$request->input('membre_id'))->where('depense_id', $request->input('depense_id'))-> first();
        if (isset($participant))
            return response()->json("Invalid resources", 422);
        $participation = Participant::create(['membre_id' =>$membre->id,'depense_id' =>$depense->id, 'quote_part' => $quote_part]);
        return new DepensesResource(Depense::with('acheteur', 'participants')->where('id', $depense->id)->first());
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $membre_id, $depense_id) {
        log::info('la requête update '.implode(' | ', $request->all()));
        $participant = Participant::where('membre_id',$membre_id)->where('depense_id', $depense_id)-> first();
        if (!isset($participant)) {
            return response()->json(['Invaid participant identifier'], 422);
        }
        $validator = Validator::make($request->all(),
            ['quote_part' => 'required|numeric'
            ]);
        log::info('la requête update après validator');
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        log::info('la requête update ok, valeur de la quote_part : '.$request->input('quote_part'));
        $participant->quote_part = $request->input('quote_part');
        $participant->save();
        Log::info('participant : ' . $participant);
        $depense = Depense::find($depense_id);
        return new DepensesResource($depense);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($membre_id, $depense_id) {
        log::info('la requête destroy ');
        $participant = Participant::where('membre_id',$membre_id)->where('depense_id', $depense_id)-> first();
        if (!isset($participant)) {
            return response()->json(['Invaid participant identifier'], 422);
        }
        Participant::where('membre_id',$membre_id)->where('depense_id', $depense_id) -> delete();
        $depense = Depense::find($depense_id);
        return new DepensesResource($depense);
    }
}
