<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DepensesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'acheteur' => $this->acheteur,
            'participants' => $this->participants,
            'montant' => $this->montant,
            'date_depense' => $this -> date_depense,
        ];
        //return parent::toArray($request);
    }
}
