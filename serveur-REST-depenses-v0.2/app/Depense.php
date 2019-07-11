<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema()
 *
 * @OA\Property(
 *   property="date_depense",
 *   type="date",
 *   description="La date de la dépense"
 * )
 * @OA\Property(
 *   property="montant",
 *   type="decimal",
 *   description="Le montant de la dépense"
 * )
 * @OA\Property(
 *   property="description",
 *   type="string",
 *   description="Une description de la dépense"
 * )
 * @OA\Property(
 *   property="membre_id",
 *   type="unsignedinteger",
 *   description="Le membre quia fait la dépense"
 * )
 */
class Depense extends Model
{
    protected  $fillable = [
        'date_depense', 'description','montant', 'membre_id',
    ];


    function participants() {
        return $this->belongsToMany('App\Membre', 'participants')->using('App\Participant')->withPivot('quote_part');
    }

    function acheteur() {
        return $this->belongsTo('App\Membre','membre_id');
    }


}

