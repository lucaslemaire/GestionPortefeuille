<?php

use App\Depense;
use Illuminate\Database\Seeder;

class DepenseTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('depenses')->delete();
        DB::table('participants')->delete();
        $json = File::get("database/data-sample/depenses.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            Depense::create(array(
                'montant' => $obj->montant,
                'membre_id' => $obj->membre_id,
                'date_depense' => $obj->date_depense,
                'description' => $obj->description,
            ));
            $depense_id = DB::getPdo()->lastInsertId();
            foreach ($obj->participants as $participant)
                DB::table('participants')->insert([
                    'depense_id' => $depense_id,
                    'membre_id' => $participant->membre_id,
                    'quote_part' => $participant->quote_part
                ]);
        }
    }
}
