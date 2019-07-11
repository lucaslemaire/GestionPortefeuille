<?php

use App\Membre;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MembreTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('membres')->delete();
        $json = File::get("database/data-sample/membres.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            Membre::create(array(
                'nom' => $obj->nom,
                'prenom' => $obj->prenom,
                'avatar' => $obj->avatar,
                'email' => $obj->email,
                'password' => bcrypt('secret'),
            ));
        }
    }
}
