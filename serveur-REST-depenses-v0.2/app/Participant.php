<?php
/**
 * Created by PhpStorm.
 * User: hemery
 * Date: 2019-01-09
 * Time: 16:24
 */

namespace App;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @OA\Schema()
 *
 * @OA\Property(
 *   property="membre_id",
 *   type="unsignedinteger",
 *   description="Le membre qui participe à la dépense."
 * )
 * @OA\Property(
 *   property="depense_id",
 *   type="unsignedinteger",
 *   description="Identification de la dépense."
 * )
 * @OA\Property(
 *   property="quote_part",
 *   type="decimal",
 *   description="La quote-part de la dépense pour le membre."
 * )

 */

class Participant extends Pivot {
    protected $table = 'participants';
    public $timestamps = false;
    protected  $fillable = [
        'membre_id', 'depense_id','quote_part',
    ];


    protected function setKeysForSaveQuery(Builder $query)
    {
        $query
            ->where('membre_id', '=', $this->getAttribute('membre_id'))
            ->where('depense_id', '=', $this->getAttribute('depense_id'));
        return $query;
    }



}