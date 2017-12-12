# -*- encoding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2017 Lionel BLANCHET
#    All Rights Reserved
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
{
    "name": "Pos Partner French address autocompletion",
    "version": "1.0.1",
    "author": "Lionel BLANCHET",
    "website": "",
    "summary": "French Address autocompletion",
    "sequence": 0,
    "certificate": "",
    "license": "OEEL-1",
    "price": 40,
    "currency": "EUR",
    "depends": [
            "web",
            "base",
            "point_of_sale",
    ],
    "category": "Point of sale,
    "complexity": "easy",
    "description": """
(English) Pos Partner French address autocompletion
====================================
In the form of creating partners, you have the autocompletion of the fields related to the postal address. This module is designed only for postal addresses in France and is based on the French government database address.data.gouv.fr

The search applies to postal codes, the city name but also the names of streets or places.

For example by typing only "Moza 44130" in the Street field, the autocompletion will propose "Rue Wolfgang Amadeus Mozart, 44130 - Fay-de-Bretagne".

(Français) Autocompletion des adresses postales françaises en point de vente
====================================
Dans le formulaire de création des partenaires, vous disposez de l'autocompletion des champs relatifs à l'adresse postale. Ce module est conçu uniquement pour les adresses postales en France et s'appuie sur la base de données du gouvernement francais adresse.data.gouv.fr

La recherche s'applique aux codes postaux, au nom de ville mais aussi aux noms de rues ou lieux-dits.

Par exemple en tapant seulement "Moza 44130" dans le champ Rue, l'autocompletion proposera "Rue Wolfgang Amadeus Mozart, 44130 - Fay-de-Bretagne".
	""",
    "qweb": [
    ],
    "demo": [
    ],
    "images": [
    ],
    "data": [
	     "views/templates.xml"
    ],
    "auto_install": False,
    "installable": True,
    "application": False,
}
# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
