<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AchatsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $achats = [];
        $depenses = [];
        foreach ($this->depenses()->get() as $depense) {
            $depenses[] = ['description' => $depense->description, 'date_depense' => $depense->date_depense, 'acheteur_id' => $depense->membre_id, 'quote_part' => $depense->participant->quote_part];
         }
        foreach ($this->achats()->get() as $achat) {
            $achats[] = ['description' => $achat->description, 'montant' => $achat->montant, 'date_achat' => $achat->date_depense];
        }

        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'avatar' => $this->avatar,
            'email' => $this->email,
            'achats' => $achats,
            'depenses' => $depenses,
        ];
     }
}
