<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @OA\Schema()
 *
 * @OA\Property(
 *   property="nom",
 *   type="string",
 *   description="Le nom du membre"
 * )
 * @OA\Property(
 *   property="prenom",
 *   type="string",
 *   description="Le prénom du membre"
 * )
 * @OA\Property(
 *   property="avatar",
 *   type="binary",
 *   description="Une représentation graphique du membre"
 * )
 * @OA\Property(
 *   property="email",
 *   type="string",
 *   description="L'adresse mail du membre. Valeur unique"
 * )
 * @OA\Property(
 *   property="password",
 *   type="string",
 *   description="Le mot de passe crypté du membre."
 * )
 */
class Membre extends Authenticatable implements JWTSubject
{
    use  Notifiable;
    protected  $fillable = [
        'nom', 'prenom','avatar', 'email', 'password',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected  $hidden = [
        'password', 'remember_token',
    ];

    function achats() {
        return $this->hasMany('App\Depense') ;

    }
    function depenses() {
        return $this->belongsToMany('App\Depense', 'participants') ->using('App\Participant')->as('participant') ->withPivot('quote_part');

    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return  $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
