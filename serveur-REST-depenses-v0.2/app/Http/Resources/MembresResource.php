<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class MembresResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $montant = 0;
        $achats = [];
        $depenses = [];
        foreach ($this->depenses()->get() as $depense) {
            $montant -= $depense->participant->quote_part;
            $depenses[] = ['id' => $depense->id, 'description' => $depense->description, 'date_depense' => $depense->date_depense, 'acheteur_id' => $depense->membre_id, 'acheteur' => $depense->acheteur->prenom.' '.$depense->acheteur->nom, 'quote_part' => $depense->participant->quote_part];
        }
        foreach ($this->achats()->get() as $achat) {
            $achats[] = ['id' => $achat->id,'description' => $achat->description, 'montant' => $achat->montant, 'date_achat' => $achat->date_depense];
            $montant += $achat->montant;
        }

        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'avatar' => $this->avatar,
            'email' => $this->email,
            'solde' => $montant,
            'achats' => $achats,
            'depenses' => $depenses,
        ];
        //return parent::toArray($request);
    }
}
