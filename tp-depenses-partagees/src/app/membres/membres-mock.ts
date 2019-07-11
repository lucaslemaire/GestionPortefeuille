export const MEMBRES = [
    {
        'id': 1,
        'nom': 'Duchmol',
        'prenom': 'Robert',
        'avatar': 'une image',
        'email': 'robert.duchmol@domain.com',
        'solde': 7,
        'achats': [{'id': 1, 'description': 'Bonbons', 'montant': '12.00', 'date_achat': '2018-12-24'}],
        'depenses': [{
            'id': 1,
            'description': 'Bonbons',
            'date_depense': '2018-12-24',
            'acheteur_id': 1,
            'acheteur': 'Robert Duchmol',
            'quote_part': '4.00'
        }, {
            'id': 2,
            'description': 'Pates',
            'date_depense': '2018-12-24',
            'acheteur_id': 2,
            'acheteur': 'G\u00e9rard Martin',
            'quote_part': '1.00'
        }]
    }, {
        'id': 2,
        'nom': 'Martin',
        'prenom': 'G\u00e9rard',
        'avatar': 'une image',
        'email': 'gerard.martin@domain.com',
        'solde': -6,
        'achats': [{'id': 2, 'description': 'Pates', 'montant': '3.00', 'date_achat': '2018-12-24'}],
        'depenses': [{
            'id': 1,
            'description': 'Bonbons',
            'date_depense': '2018-12-24',
            'acheteur_id': 1,
            'acheteur': 'Robert Duchmol',
            'quote_part': '4.00'
        }, {
            'id': 2,
            'description': 'Pates',
            'date_depense': '2018-12-24',
            'acheteur_id': 2,
            'acheteur': 'G\u00e9rard Martin',
            'quote_part': '1.00'
        }, {
            'id': 3,
            'description': 'Vin',
            'date_depense': '2018-12-24',
            'acheteur_id': 3,
            'acheteur': 'Julie Degile',
            'quote_part': '4.00'
        }]
    }, {
        'id': 3,
        'nom': 'Degile',
        'prenom': 'Julie',
        'avatar': 'une image',
        'email': 'julie.Degile@domain.com',
        'solde': -1,
        'achats': [{'id': 3, 'description': 'Vin', 'montant': '8.00', 'date_achat': '2018-12-24'}],
        'depenses': [{
            'id': 1,
            'description': 'Bonbons',
            'date_depense': '2018-12-24',
            'acheteur_id': 1,
            'acheteur': 'Robert Duchmol',
            'quote_part': '4.00'
        }, {
            'id': 2,
            'description': 'Pates',
            'date_depense': '2018-12-24',
            'acheteur_id': 2,
            'acheteur': 'G\u00e9rard Martin',
            'quote_part': '1.00'
        }, {
            'id': 3,
            'description': 'Vin',
            'date_depense': '2018-12-24',
            'acheteur_id': 3,
            'acheteur': 'Julie Degile',
            'quote_part': '4.00'
        }]
    }
];
