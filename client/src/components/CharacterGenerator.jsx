import _ from 'lodash';

let verification = {
    gender: ["Male", "Female"],
    personality: ['Lustful','Lazy','Vengeful','Selfish','Deceitful','Arbitrary','Cruel','Proud','Worldly','Reckless','Indulgent','Suspicious','Cowardly','Chaste','Energetic','Forgiving','Generous','Honest','Just','Merciful','Modest','Spiritual','Prudent','Temperate','Trusting','Valorous'],
    period: ["Uther","Anarchy","Boy King","Conquest","Romance","Tournament","Grail Quest","Twilight"],
    region: ['Logres','Saxon','Cambria','Cumbria','The North','Cornwall & Brittany','Ireland','Gaul','France'],
    homeland: [
        'Ailech','Austrasia','Barcelona','Bedegraine','Benoic','Benoit','Brecklands','Broadlands','Brun','Caercolun','Cambenet','Cameliard','Carcassone','Catalonia','Cheshire','Clarence','Connacht','Cornouailles',
        'Dal Araide','Dal Riada','Deira','Delfinat','Devon','Domnonie','Dorset','Escavalon','Escoce','Essex','Estregales','Ganis','Garloth','Gloucester','Gorre',
        'Hampshire','Hertford','Huntington','Isle of Wight','Jagent','Kent','Lambor','Languedoc','Leinster','Leon','Lindsey','Listeneisse','Lonazep','London','Long Isles','Lothian','Lyons',
        'Malahaut','Maris','Marlborough','Marsielles','Meath','Munster','Narbonne','Neustria','Nohaut','Oriel','Orléans','Pomitain','Provence','Rheged','Roestoc','Rydychan',
        'Salisbury','Silchester','Somerset','Sorestan','Southports','Strangorre','Sugales','Surrey','Sussex','Tintagel','Toulouse','Tribuit','Vannetais','Wuerensis',
    ],
    home: ["Ailech","Alcud","Austrasia","Bayeux","Bayonne","Bedegraine","Benoit","Benwick","Bordeaux","Brest","Brigantia","Caercolun","Caerwent","Caistor","Cambenet","Cambridge","Cameliard","Carduel","Carhaix","Carlion",
        "Carmarthen","Castle of Maidens","Catterick","Cheshire","Chichester","Cirencester","Cité d'Orléans","City of Bedegraine","City of Legions","Clarence","Cockermouth","Colchester","Connacht","Cornouailles",
        "Dal Araide","Dal Riada","Deira","Devon","Dol","Domnonie","Dorchester","Dorset","Dover","Eburacum","Edinburgh","Escavalon","Escoce","Essex","Estregales","Exeter","Ganis","Glevum","Gloucester","Gorre",
        "Hampshire","Hantonne","Hertford","Huntingdon","Ilchester","Inverness","Jagent","Kent","La Rochelle","Lambor","Lancashire","Leicester","Leinster","Leon","Lestroite","Lincoln","Lindsey","Listeneisse","Lonazep","Long Isles","London","Lothian",
        "Marlborough","Meath","Metz","Munster","Nantes","Neustria","Norwich","Oriel","Orléans","Oxford","Peterborough","Pomitain","Portchester","Quimper","Rennes","Richmond","Ripon","Rouse","Rydychan",
        "Salisbury","Sarum","Silchester","Silchester City","Soissons","Southports","St Albans","St Brienc","Stafford","Staines","Strangorre","Surluse","Surrey","Thamesmouth","The Orkneys","Tintagel","Totnes","Vannes","Wandborough","Winchester","Wuerensis","Yarmouth",
    ],
    culture: ["Cymric","French","Irish","Pict","Roman","Saxon","Occitanian",],
    religion: [ 'Arian Christian','British Christian','Roman Christian','Heathen','Jewish','British Pagan','Germanic Pagan'],
    passions: ['Loyalty','Love','Hospitality','Honour','Hate'],
    familyTrait: ['Keen on status','Spiritual bent','Knows the commoners','Knows the faerie ways','Good with horses','Excellent voice','Keen-sighted','At home in nature','Sprightly','Natural Healer','Naturally Lovable','Never forgets a face','Surprisingly deductive',
        'Swims like an otter','Natural storyteller','Natural musician','Good with words','Grew up with books','Good with birds','Clever at games','Striking beauty','Healing touch','Good with animals','Beautiful voice','Nimble fingers','Potion brewer',
    ],
    fatherClass: [
        'Lord or Officer','Banneret Knight','Vassal Knight','Bachelor Knight','Mercenary Knight','Knight Errant','Squire','Warrior','Legionnarius','Tribal or clan chieftain','Family chieftain','Free holding knight','Lord','Seneschal','Butler','Marshal','Castellan','Illegitimate',
    ],
    qualification: ["Footsoldier","Warrior","Sergeant","Squire",'Mercenary Knight','Knight Errant','Bachelor Knight','Vassal Knight'],

}

function newChar(preSelects) {
        let buildChar = {}
        if (preSelects) { buildChar = {name:'',player:'',...preSelects} } else {buildChar = {name:'',player:''}}
        let characterData = {}
        let characterSheet = {}
        let n = 0


// Set up random selection tables
// VERIFICATION OBJECT
// let verfication = {
//     gender: ["Male", "Female"],
//     personality: ['Lustful','Lazy','Vengeful','Selfish','Deceitful','Arbitrary','Cruel','Proud','Worldly','Reckless','Indulgent','Suspicious','Cowardly','Chaste','Energetic','Forgiving','Generous','Honest','Just','Merciful','Modest','Spiritual','Prudent','Temperate','Trusting','Valorous'],
//     period: ["Uther","Anarchy","Boy King","Conquest","Romance","Tournament","Grail Quest","Twilight"],
//     region: ['Logres','Saxon','Cambria','Cumbria','The North','Cornwall & Brittany','Ireland','Gaul','France'],
//     homeland: [
//         'Ailech','Austrasia','Barcelona','Bedegraine','Benoic','Benoit','Brecklands','Broadlands','Brun','Caercolun','Cambenet','Cameliard','Carcassone','Catalonia','Cheshire','Clarence','Connacht','Cornouailles',
//         'Dal Araide','Dal Riada','Deira','Delfinat','Devon','Domnonie','Dorset','Escavalon','Escoce','Essex','Estregales','Ganis','Garloth','Gloucester','Gorre',
//         'Hampshire','Hertford','Huntington','Isle of Wight','Jagent','Kent','Lambor','Languedoc','Leinster','Leon','Lindsey','Listeneisse','Lonazep','London','Long','Lothian','Lyons',
//         'Malahaut','Maris','Marlborough','Marsielles','Meath','Munster','Narbonne','Neustria','Nohaut','Oriel','Orléans','Pomitain','Provence','Rheged','Roestoc','Rydychan',
//         'Salisbury','Silchester','Somerset','Sorestan','Southports','Strangorre','Sugales','Surrey','Sussex','Tintagel','Toulouse','Tribuit','Vannetais','Wuerensis',
//     ],
//     home: ["Ailech","Alcud","Austrasia","Bayeux","Bayonne","Bedegraine","Benoit","Benwick","Bordeaux","Brest","Brigantia","Caercolun","Caerwent","Caistor","Cambenet","Cambridge","Cameliard","Carduel","Carhaix","Carlion","Carmarthen","Castle of Maidens","Catterick","Cheshire","Chichester","Cirencester","Cité d'Orléans","City of Bedegraine","City of Legions","Clarence","Colchester","Connacht","Cornouailles",
//         "Dal Araide","Dal Riada","Deira","Devon","Dol","Domnonie","Dorchester","Dorset","Dover","Eburacum","Edinburgh","Escavalon","Escoce","Essex","Estregales","Exeter","Ganis","Glevum","Gloucester","Gorre","Hampshire","Hantonne","Hertford","Huntingdon","Ilchester","Inverness","Jagent","Kent","La Rochelle","Lambor","Lancashire","Leicester","Leinster","Leon","Lestroite","Lincoln","Lindsey","Listeneisse","Lonazep","London","Lothian",
//         "Marlborough","Meath","Metz","Munster","Nantes","Neustria","Norwich","Oriel","Orléans","Oxford","Peterborough","Pomitain","Portchester","Quimper","Rennes","Richmond","Ripon","Rouse","Rydychan","Salisbury","Sarum","Silchester","Silchester City","Soissons","Southports","St Albans","St Brienc","Stafford","Staines","Strangorre","Surluse","Surrey","Thamesmouth","The Orkneys","Tintagel","Totnes","Vannes","Wandborough","Winchester","Wuerensis","Yarmouth",
//     ],
//     culture: ["Cymric","French","Irish","Pict","Roman","Saxon","Occitanian",],
//     religion: [ 'Arian Christian','British Christian','Roman Christian','Heathen','Jewish','British Pagan','Germanic Pagan'],
//     passions: ['Loyalty','Love','Hospitality','Honour','Hate'],
//     familyTrait: ['Keen on status','Spiritual bent','Knows the commoners','Knows the faerie ways','Good with horses','Excellent voice','Keen-sighted','At home in nature','Sprightly','Natural Healer','Naturally Lovable','Never forgets a face','Surprisingly deductive',
//         'Swims like an otter','Natural storyteller','Natural musician','Good with words','Grew up with books','Good with birds','Clever at games','Striking beauty','Healing touch','Good with animals','Beautiful voice','Nimble fingers','Potion brewer',
//     ],
//     fatherClass: [
//         'Lord or Officer','Banneret Knight','Vassal Knight','Bachelor Knight','Mercenary Knight','Knight Errant','Squire','Warrior','Legionnarius','Tribal or clan chieftain','Family chieftain','Free holding knight','Lord','Seneschal','Butler','Marshal','Castellan','Illegitimate',
//     ],
//     qualification: ["Footsoldier","Warrior","Sergeant","Squire",'Mercenary Knight','Knight Errant','Bachelor Knight','Vassal Knight'],

// }


// BONUS OBJECT :: Modifications to stats for gender and culture
let defaultStatBonus = {
    Male: {
        'SIZ':'2d6+6',
        'DEX':'3d6',
        'STR':'3d6',
        'CON':'3d6',
        'APP':'3d6'
    },
    Female: {
        'SIZ':'2d6+3',
        'DEX':'2d6+6',
        'STR':'2d6+2',
        'CON':'3d6',
        'APP':'4d6'
    },
    Cymric: { 'CON': '3'},
    French: {'DEX':'1', 'STR':'1', 'CON':'1'},
    Irish: { 'CON': '3'},
    Pict:  {'SIZ':'-3', 'DEX': '3', 'APP':'-3'},
    Roman: {'DEX':'1', 'APP': '2'},
    Saxon: {'SIZ': '3', 'DEX': '-3', 'STR' : '3'},
    Occitanian: {'DEX': '1', 'CON': '1', 'APP': '1' }
}

// SELECT OBJECT :: Gender selection
let genderSelect = {
    1: 'Female',
    2: 'Male'
}

// LIST OBJECT :: Personality Traits mapped left & right plus empty directed traits array
let personalityTraitList = {
    righthand: ['Lustful','Lazy','Vengeful','Selfish','Deceitful','Arbitrary','Cruel','Proud','Worldly','Reckless','Indulgent','Suspicious','Cowardly'],
    lefthand: ['Chaste','Energetic','Forgiving','Generous','Honest','Just','Merciful','Modest','Spiritual','Prudent','Temperate','Trusting','Valorous'],
    directed: []
}

// LIST ARRAY :: Ordered list of periods
let periodList = [
    "Uther",
    "Anarchy",
    "Boy King",
    "Conquest",
    "Romance",
    "Tournament",
    "Grail Quest",
    "Twilight"
]

// SELECT OBJECT :: random selection object of regions available per time period
let regionSelect = {
    'Uther':{
        28:'Logres',
        32:'Cambria',
        36:'Cumbria',
        38:'Cornwall & Brittany',
        40:'Gaul',
        41:'The North',
        42:'Ireland',
        43:'France'
    },
    'Anarchy':{
        32:'Logres',
        36:'Cambria',
        38:'Cornwall & Brittany',
        40:'Gaul',
        41:'The North',
        42:'Ireland',
        43:'France',
        44:'Cumbria'
    },
    'Boy King':{
        32:'Logres',
        36:'Cambria',
        38:'Cornwall & Brittany',
        40:'Gaul',
        41:'The North',
        42:'Ireland',
        43:'France',
        44:'Cumbria'
    },
    'Conquest':{
        22:'Logres',
        26:'Cambria',
        30:'Cumbria',
        34:'The North',
        38:'Cornwall & Brittany',
        40:'Gaul',
        41:'Ireland',
        42:'France',
        
    },
    'Romance':{
        9:'Logres',
        10:'Saxon',
        12:'Cambria',
        14:'Cumbria',
        15:'The North',
        17:'Cornwall & Brittany',
        18:'Ireland',
        19:'Gaul',
        20:'France',
    },
    'Tournament':{
        6:'Logres',
        8:'Saxon',
        10:'Cambria',
        12:'Cumbria',
        14:'The North',
        16:'Cornwall & Brittany',
        17:'Ireland',
        19:'Gaul',
        20:'France',
    },
    'Grail Quest':{
        9:'Logres',
        10:'Saxon',
        12:'Cambria',
        14:'Cumbria',
        15:'The North',
        16:'Cornwall & Brittany',
        17:'Ireland',
        19:'Gaul',
        20:'France',
    },
    'Twilight':{
        9:'Logres',
        10:'Saxon',
        12:'Cambria',
        14:'Cumbria',
        15:'The North',
        16:'Cornwall & Brittany',
        17:'Ireland',
        19:'Gaul',
        20:'France',
    }

}

// LOCATE OBJECT :: 'Locator' for the homelands arrays
// The selector cross-references region and groups of periods to return two index values
// These indexes point ot the correct homeland/period table in the homelands arrays
let homelandLocate = {
    // dimension 1:
    region: ['Logres','Saxon','Cambria','Cumbria','The North','Cornwall & Brittany','Ireland','Gaul','France'],
    // dimension 2:
    Logres: [['Uther','Anarchy'],['Boy King'],['Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Saxon: [['Uther','Anarchy','Boy King','Conquest'],['Romance','Tournament','Grail Quest','Twilight']],
    Cambria: [['Uther','Anarchy','Conquest','Romance','Tournament','Grail Quest','Twilight'],['Boy King']],
    Cumbria: [['Uther'],['Conquest','Romance','Tournament','Grail Quest','Twilight']],
    'The North':[['Conquest','Romance','Tournament','Grail Quest','Twilight']],
    'Cornwall & Brittany':[['Uther','Anarchy'],['Boy King','Conquest'],['Romance','Tournament','Grail Quest','Twilight']],
    Ireland:[['Uther','Anarchy','Boy King','Conquest'],['Romance','Tournament','Grail Quest','Twilight']],
    Gaul:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    France: [['Romance','Tournament','Grail Quest','Twilight']]
}

// SELECT ARRAY :: array of arrays of random selection tables for character homeland based on region and time period
// the relevant random selection object is at [index1][index2]
// where index 1 is for the region and index 2 is for the period group, as retrieved from the homelandsSelectors object
let homelandSelect = [
    // Logres objects
    [
        // Logres: Uther, Anarchy
        {
            5:'Bedegraine',
            9:'Brecklands',
            15:'Broadlands',
            24:'Caercolun',
            31:'Clarence',
            35:'Dorset',
            43:'Hampshire',
            48:'Hertford',
            50:'Huntington',
            51:'Isle of Wight',
            53:'Jagent',
            55:'Lambor',
            59:'Lindsey',
            61:'Lonazep',
            63:'London',
            67:'Marlborough',
            86:'Salisbury',
            94:'Silchester',
            96:'Somerset',
            97:'Southports',
            98:'Surrey',
            100:'Wuerensis',
        },

        // Logres: Boy King
        {
            5:'Bedegraine',
            1:'Clarence',
            15:'Dorset',
            22:'Hertford',
            23:'Isle of Wight',
            25:'Jagent',
            29:'Lambor',
            37:'Lindsey',
            41:'Lonazep',
            47:'London',
            53:'Marlborough',
            74:'Salisbury',
            84:'Silchester',
            85:'Somerset',
            90:'Southports',
            92:'Surrey',
            100:'Wuerensis',
        },

        // Logres: Conquest, Romance, Tournament, Grail Quest, Twilight
        {
            6:'Bedegraine',
            9:'Brecklands',
            13:'Broadlands',
            16:'Brun',
            4:'Clarence',
            33:'Dorset',
            35:'Essex',
            41:'Hampshire',
            46:'Hertford',
            51:'Huntington',
            53:'Jagent',
            54:'Kent',
            58:'Lindsey',
            61:'Lonazep',
            65:'London',
            66:'Rydychan',
            85:'Salisbury',
            91:'Silchester',
            93:'Somerset',
            94:'Southports',
            96:'Surrey',
            97:'Sussex',
            98:'Tribuit',
            100:'Wuerensis',
        }
    ],

    // Saxon objects:
    [
        // Saxons: Uther, Anarchy, Boy King, Conquest
        {
            15:'Deira',
            32:'Essex',
            46:'Nohaut',
            48:'Sorestan',
            63:'Sussex',
        },
        // Saxons: Romance, Tournament, Grail Quest, Twilight
        {
            15:'Deira',
            32:'Essex',
            35:'Hampshire',
            38:'Isle of Wight',
            50:'Kent',
            57:'Lindsey',
            69:'Malahaut',
            83:'Nohaut',
            85:'Sorestan',
            100:'Sussex',
        }
    ],

    // Cambria objects:
    [
        // Cambria: Uther, Anarchy, Conquest, Romance, Tournament, Grail Quest, Twilight
        {
            25:'Cameliard',
            46:'Cheshire',
            66:'Escavalon',
            72:'Estregales',
            95:'Gloucester',
            100:'Sugales',
        },

        // Cambria: Boy King
        {
            30:'Cameliard',
            63:'Escavalon',
            100:'Gloucester',
        }
    ],

    // Cumbria objects:
    [
        // Cumbria: Uther
        {
            2: 'Listeneisse',
            15:'Cambenet',
            85:'Malahaut',
            93:'Maris',
            100:'Roestoc',
        },

        // Cumbria: Conquest, Romance, Tournament, Grail Quest, Twilight
        {
            2: 'Listeneisse',
            15:'Cambenet',
            25:'Deira',
            70:'Malahaut',
            80:'Nohaut',
            90:'Rheged',
            100:'Roestoc',
        }
    ],
    // The North objects:
    [
        {
            11:'Benoic',
            24:'Escoce',
            40:'Garloth',
            55:'Gorre',
            60:'Long Isles',
            85:'Lothian',
            100:'Strangorre',
        },
        {
            11:'Benoic',
            24:'Escoce',
            40:'Garloth',
            55:'Gorre',
            60:'Long Isles',
            85:'Lothian',
            100:'Strangorre',
        }
    ],

    // Cornwall & Brittany objects:
    [
        // Cornwall & Brittany: Uther, Anarchy
        {
            40:'Devon',
            85:'Isle of Wight',
            90:'Leon',
            100:'Tintagel',
        },
        // Cornwall & Brittany: Boy King, Conquest
        {
            5:'Cornouailles',
            10:'Domnonie',
            60:'Isle of Wight',
            65:'Leon',
            100:'Vannetais',
        },
        // Cornwall & Brittany: Romance, Tournament, Grail, Twilight
        {
            10:'Cornouailles',
            29:'Devon',
            49:'Domnonie',
            69:'Isle of Wight',
            79:'Leon',
            100:'Vannetais',
        },
    ],
    // Ireland objects:
    [
        {
            5:'Ailech',
            10:'Connacht',
            25:'Dal Araide',
            40:'Dal Riada',
            75:'Leinster',
            80:'Meath',
            86:'Munster',
            90:'Oriel',
            100:'Pomitain',
        },
        {
            5:'Ailech',
            10:'Connacht',
            25:'Dal Araide',
            40:'Dal Riada',
            75:'Leinster',
            80:'Meath',
            86:'Munster',
            90:'Oriel',
            100:'Pomitain',
        }
    ],
    // Gaul objects:
    [
        {
            5:'Barcelona',
            27:'Benoit',
            32:'Carcassone',
            37:'Catalonia',
            42:'Delfinat',
            66:'Ganis',
            70:'Languedoc',
            75:'Lyons',
            80:'Marsielles',
            85:'Narbonne',
            90:'Provence',
            100:'Toulouse',
        }
    ],
    // France objects:
    [
        {
            25:'Austrasia',
            66:'Neustria',
            100:'Orléans',
        }
    ],
]

// SELECT OBJECT :: random selection objects for 'home' organised by region and homeland
let homeSelect ={
        Logres: {
            Bedegraine: { 4: 'Bedegraine', 6: 'City of Bedegraine' },
            Caercolun: { 3: 'Caercolun', 4: 'Colchester', 5: 'Norwich', 6: 'Yarmouth' },
            Essex: { 3: 'Essex', 4: 'Colchester', 5: 'Norwich', 6: 'Yarmouth' },
            Clarence: { 2: 'Cirencester', 6: 'Clarence' },
            Dorset: { 2: 'Dorchester', 6: 'Dorset' },
            Hampshire: { 1: 'Chichester', 3: 'Hampshire', 4: 'Hantonne', 5: 'Portchester', 6: 'Winchester' },
            Hertford: { 4: 'Hertford', 6: 'St Albans'},
            Huntingdon: { 2: 'Cambridge', 6: 'Huntingdon' },
            Jagent: { 2: 'Ilchester', 6: 'Jagent' },
            Kent: { 2: 'Dover', 6: 'Kent' },
            Lambor: { 4: 'Lambor', 6: 'Leicester' },
            Lindsey: { 1: 'Caistor', 3: 'Lincoln', 6: 'Lindsey' },
            Lonazep: { 5: 'Lonazep', 6: 'Peterborough' },
            London: { 3: 'London', 6: 'Thamesmouth' },
            Marlborough: { 4: 'Marlborough', 6: 'Wandborough' },
            Rydychan: { 2: 'Oxford', 6: 'Rydychan' },
            Salisbury: { 4: 'Salisbury', 6: 'Sarum' },
            Silchester: { 4: 'Silchester', 6: 'Silchester City' },
            Southports: { 4: 'Southports', 6: 'Portchester' },
            Surrey: { 2: 'Staines', 6: 'Surrey' },
            Wuerensis : { 2: 'Winchester', 6: 'Wuerensis' },
        },
        Cambria: {
            Cameliard: { 5: 'Cameliard', 6: 'Stafford' },
            Cheshire: { 5: 'Cheshire', 6: 'City of Legions' },
            Escavalon: { 1: 'Caerwent', 2: 'Carlion', 6: 'Escavalon' },
            Estregales: { 1: 'Carmarthen', 6: 'Estregales' },
            Gloucester : { 2: 'Glevum', 6: 'Gloucester' },
        },
        Cumbria: {
            Cambenet: { 4: 'Cambenet', 6: 'Carduel' },
            Malahaut: { 1: 'Brigantia', 2: 'Catterick',
                3: ()=>{
                    if (['Uther','Anarchy','Boy King','Conquest'].includes(buildChar.period)) {
                        return 'Eburacum'
                    } else {
                        return 'Deira'}
                    },
                    4: 'Eburacum', 5: 'Richmond', 6: 'Ripon' },
            // Malahaut: {
            //     1: 'Brigantia',
            //     2: 'Catterick',
            //     3: {
            //         period:{
            //             locate:[
            //                 ['Uther','Anarchy','Boy King','Conquest'],
            //                 ['Romance','Tournament','Grail Quest','Twilight']
            //             ],
            //             retrieve:[
            //                 'Eburacum',
            //                 'Deira'
            //             ]
            //         }
            //     },
            //     4: 'Eburacum', 5: 'Richmond', 6: 'Ripon' }
            // },
            Listeneisse: {3:'Listeneisse', 4: 'Lancashire',5:'Lestroite',6:'Rouse'}
        },
        'The North': {
            Escoce: { 5: 'Escoce', 6: 'Inverness' },
            Gorre: { 5: 'Gorre', 6: 'Surluse' },
            // Lothian: { 1: ()=>{
            //     if (['Uther','Anarchy','Boy King','Conquest'].includes(period)) {
                //     return 'Lothian'
                // } else {return 'Castle of Maidens'}}, 2: 'Edinburgh', 5:'Lothian', 6: 'The Orkneys' },
            Lothian: {
                1: {
                    period:{
                        locate:[
                            ['Uther','Anarchy','Boy King','Conquest'],
                            ['Romance','Tournament','Grail Quest','Twilight']
                        ],
                        retrieve:[
                            'Lothian',
                            'Castle of Maidens'
                        ]
                    }
                },
                2: 'Edinburgh',
                5: 'Lothian',
                6: 'The Orkneys'
            },
            Strangorre: { 1: 'Alcud', 6: 'Strangorre' }
        },
        'Cornwall & Brittany': {
            Cornouailles: { 1: 'Carhaix', 5: 'Cornouailles', 6: 'Quimper'},
            Domnonie: { 1: 'Dol', 5: 'Domnonie', 6: 'St Brienc' },
            Devon: { 5: 'Devon', 6: 'Exeter' },
            Leon: { 2: 'Brest', 6: 'Leon' },
            Tintagel: { 4: 'Tintagel', 6: 'Totnes' },
            Vannetais: { 1: 'Nantes', 2: 'Rennes', 3: 'Vannes', 6: 'Vannetais' }
        },
        Gaul:{
            Benoit: { 3: 'Benoit', 5: 'Benwick', 6: 'La Rochelle' },
            Ganis: { 1: 'Bayonne', 2: 'Bordeaux', 5: 'Ganis', 6: 'Trebes' }
        },
        France:{
            Austrasia: { 4: 'Austrasia', 6: 'Metz'},
            Neustria: { 2: "Bayeux", 4: 'Neustria', 6: 'Soissons'},
            Orléans: { 2: "Cité d'Orléans", 6: 'Orléans'}
        },
        Ireland:{
            Ailech:'Ailech',
            Connacht:'Connacht',
            'Dal Araide':'Dal Araide',
            'Dal Riada':'Dal Riada',
            'Leinster':'Leinster',
            'Meath':'Meath',
            'Munster':'Munster',
            'Oriel':'Oriel',
            'Pomitain':'Pomitain',
            'Long Isles':{5: 'Long Isles', 6:'Cockermouth'}
        }
    }

// SELECT OBJECT :: random selection objects for 'culture' organised by home
let cultureSelect = {
        Ailech:'Irish',
        Alcud:'Cymric',
        Austrasia:'French',
        Barcelona:{2:'Occitanian',6:'Roman',},
        Bayeaux:'French',
        Bayonne:{2:'Occitanian',6:'Roman',},
        Bedegraine:'Cymric',
        'City of Bedegraine':'Cymric',
        Benoic:'Pict',
        Benoit:'Occitanian',
        Benwick:{2:'Occitanian',6:'Roman',},
        Bordeaux:{3:'Occitanian',6:'Roman',},
        Brecklands:'Cymric',
        Brest:{5:'Cymric',6:'Roman',},
        Brigantia:'Cymric',
        Broadlands:'Cymric',
        Brun:'Cymric',
        Caercolun:{5:'Cymric',6:'Roman',},
        Caerwent:{1:'Cymric',6:'Roman',},
        Caistor:{5:'Cymric',6:'Roman',},
        Cambenet:'Cymric',
        Cambridge:'Cymric',
        Cameliard:{4:'Cymric',6:'Cymric',},
        Carcassone:{2:'Occitanian',6:'Roman',},
        Carduel:'Cymric',
        Carhaix:{5:'Cymric',6:'Roman',},
        Carlion:{3:'Cymric',6:'Roman',},
        Carmarthen:'Cymric',
        'Castle of Maidens':'Cymric',
        Catalonia:'Occitanian',
        Catterick:'Cymric',
        Cheshire:'Cymric',
        Chichester:{3:'Cymric',6:'Roman',},
        Cirencester:{2:'Cymric',6:'Roman',},
        "Cité d'Orléans":'French',
        'City of Legions':'Cymric',
        Clarence:{5:'Cymric',6:'Roman',},
        Colchester:{3:'Cymric',6:'Roman',},
        Connacht:'Irish',
        Cornouailles:'Cymric',
        'Dal Araide':'Pict',
        'Dal Riada':'Irish',
        Deira:{2:'Cymric',6:'Saxon',},
        Delfinat:'Occitanian',
        Devon:'Cymric',
        Dol:{5:'Cymric',6:'Roman',},
        Domnonie:'Cymric',
        Dorchester:{1:'Cymric',6:'Roman',},
        Dorset:{3:'Cymric',6:'Roman',},
        Dover:{3:'Cymric',6:'Saxon',},
        Dublin:{2:'Cymric',6:'Irish',},
        Eburacum:{2:'Cymric',6:'Roman',},
        Edinburgh:'Cymric',
        Escavalon:{3:'Cymric',6:'Cymric',},
        Escoce:'Pict',
        Essex:{3:'Cymric',4:'Saxon',6:'Saxon',},
        Estregales:{4:'Cymric',6:'Irish',},
        Exeter:'Cymric',
        Ganis:{5:'Occitanian',6:'Roman',},
        Garloth:'Cymric',
        Glevum:{2:'Cymric',6:'Roman',},
        Gloucester:{5:'Cymric',6:'Roman',},
        Gorre:'Cymric',
        Hampshire:{4:'Cymric',6:'Cymric',},
        Hantonne:{5:'Cymric',6:'Cymric',},
        Hertford:'Cymric',
        Huntington:'Cymric',
        Ilchester:{3:'Cymric',6:'Roman',},
        Inverness:'Cymric',
        'Isle of Wight':'Saxon',
        Jagent:{4:'Cymric',5:'Cymric',6:'Roman',},
        Kent:{2:'Cymric',3:'Saxon',6:'Saxon',},
        'La Rochelle':{2:'Occitanian',6:'Roman',},
        Lambor:'Cymric',
        Languedoc:'Occitanian',
        Leicester:'Cymric',
        Leinster:{2:'Cymric',6:'Irish',},
        Leon:{5:'Cymric',6:'Roman',},
        Levcomagus:'Cymric',
        Lincoln:{5:'Cymric',6:'Roman',},
        Lindsey:'Cymric',
        Listeneisse: 'Cymric',
        Lonazep:{4:'Cymric',6:'Cymric',},
        London:{3:'Cymric',6:'Roman',},
        'Long Isles':'Irish',
        'Cockermouth':'Irish',
        Lothian:'Cymric',
        Lyons:'Roman',
        Malahaut:{6:'Cymric'},
        Maris:'Cymric',
        Marlborough:'Cymric',
        Marsielles:'Roman',
        Meath:'Irish',
        Metz:'French',
        Munster:{1:'Irish',6:'Irish',},
        Nantes:{3:'Cymric',6:'Roman',},
        Narbonne:{1:'Occitanian',2:'Occitanian',6:'Roman',},
        Neustria:'French',
        Nohaut:'Saxon',
        Norwich:{3:'Cymric',6:'Roman',},
        Oriel:{1:'Irish',6:'Irish',},
        'The Orkneys':'Pict',
        Orléans:'French',
        Oxford:'Cymric',
        Peterborough:'Cymric',
        Pomitain:'Irish',
        Portchester:{4:'Cymric',5:'Cymric',6:'Roman',},
        Provence:{2:'Occitanian',6:'Roman',},
        Quimper:'Cymric',
        Rennes:{2:'Cymric',6:'Roman',},
        Rheged:'Cymric',
        Richmond:'Cymric',
        Ripon:'Cymric',
        Roestoc:'Cymric',
        Rouse:'Cymric',
        Rydychan:'Cymric',
        Salisbury:{5:'Cymric',6:'Cymric',},
        Sarum:'Cymric',
        Silchester:'Cymric',
        'Silchester City':{3:'Cymric',6:'Roman',},
        Soissons:'French',
        Somerset:{5:'Cymric',6:'Cymric',},
        Sorestan:'Saxon',
        Southports:{4:'Occitanian',6:'Saxon'},
        'St Albans':'Cymric',
        'St Brienc':'Cymric',
        Stafford:'Cymric',
        Staines:{4:'Cymric',6:'Saxon',},
        Strangorre:'Cymric',
        Sugales:'Cymric',
        Surluse:{2:'Cymric',6:'Irish',},
        Surrey:{3:'Saxon',6:'Saxon',},
        Sussex:{3:'Cymric',4:'Saxon',6:'Saxon',},
        Thamesmouth:'Cymric',
        Tintagel:{4:'Cymric',6:'Cymric',},
        Totnes:{4:'Cymric',6:'Cymric',},
        Toulouse:'Occitanian',
        'Cité de Toulouse':{2:'Occitanian',6:'Roman',},
        Trebes:'Occitanian',
        Tribuit:'Cymric',
        Vannes:{3:'Cymric',6:'Roman',},
        Vannetais:{5:'Cymric',6:'Roman',},
        Wandborough:'Cymric',
        Warwick:'Cymric',
        Winchester:{3:'Cymric',6:'Roman',},
        Wuerensis:{3:'Cymric',6:'Cymric',},
        Yarmouth:'Cymric',
    }

// LIST OBJECT :: list of cultural weapons by culture
let culturalWeaponList = {
    Cymric: "Sword",
    French: "Lance",
    Irish: "Spear",
    Pict:  "Great Spear",
    Roman: "Dagger",
    Saxon: "Great Axe",
    Occitanian: "Lance",
}

// SELECT OBJECT :: random selection objects for 'religion' organised by home (maps to entries in culturesObj)
let religionSelect = {
        Ailech:'British Pagan',
        Alcud:'British Pagan',
        Austrasia:'Roman Christian',
        Barcelona:{2:'Arian Christian',6:'Roman Christian',},
        Bayeaux:'Roman Christian',
        Bayonne:{2:'Arian Christian',6:'Roman Christian',},
        Bedegraine:'British Christian',
        'City of Bedegraine':'British Christian',
        Benoic:'British Christian',
        Benoit:'Arian Christian',
        Benwick:{2:'Arian Christian',6:'Roman Christian',},
        Bordeaux:{3:'Arian Christian',6:'Roman Christian',},
        Brecklands:'British Christian',
        Brest:{5:'British Christian',6:'Roman Christian',},
        Brigantia:'British Christian',
        Broadlands:'British Christian',
        Brun:'British Pagan',
        Caercolun:{5:'British Christian',6:'Roman Christian',},
        Caerwent:{1:'British Christian',6:'Roman Christian',},
        Caistor:{5:'British Christian',6:'Roman Christian',},
        Cambenet:'British Christian',
        Cambridge:'British Christian',
        Cameliard:{4:'British Christian',6:'British Pagan',},
        Carcassone:{2:'Arian Christian',6:'Roman Christian',},
        Carduel:'British Christian',
        Carhaix:{5:'British Christian',6:'Roman Christian',},
        Carlion:{3:'British Christian',6:'Roman Christian',},
        Carmarthen:'British Christian',
        'Castle of Maidens':'British Pagan',
        Catalonia:'Arian Christian',
        Catterick:'British Christian',
        Cheshire:'British Christian',
        Chichester:{3:'British Christian',6:'Roman Christian',},
        Cirencester:{2:'British Christian',6:'Roman Christian',},
        "Cité d'Orléans":'Roman Christian',
        'City of Legions':'British Christian',
        Clarence:{5:'British Christian',6:'Roman Christian',},
        Colchester:{3:'British Christian',6:'Roman Christian',},
        Connacht:'British Pagan',
        Cornouailles:'British Christian',
        'Dal Araide':'British Christian',
        'Dal Riada':'British Christian',
        Deira:{2:'British Christian',6:'Germanic Pagan',},
        Delfinat:'Arian Christian',
        Devon:'British Christian',
        Dol:{5:'British Christian',6:'Roman Christian',},
        Domnonie:'British Christian',
        Dorchester:{1:'British Christian',6:'Roman Christian',},
        Dorset:{3:'British Christian',6:'Roman Christian',},
        Dover:{3:'British Christian',6:'British Christian',},
        Dublin:{2:'British Christian',6:'British Christian',},
        Eburacum:{2:'British Christian',6:'Roman Christian',},
        Edinburgh:'British Pagan',
        Escavalon:{3:'British Christian',6:'British Pagan',},
        Escoce:'Heathen',
        Essex:{3:'British Christian',4:'British Christian',6:'Germanic Pagan',},
        Estregales:{4:'British Christian',6:'British Christian',},
        Exeter:'British Christian',
        Ganis:{5:'Arian Christian',6:'Roman Christian',},
        Garloth:'British Pagan',
        Glevum:{2:'British Christian',6:'Roman Christian',},
        Gloucester:{5:'British Christian',6:'Roman Christian',},
        Gorre:'British Pagan',
        Hampshire:{4:'British Christian',6:'British Pagan',},
        Hantonne:{5:'British Christian',6:'British Pagan',},
        Hertford:'British Christian',
        Huntington:'British Christian',
        Ilchester:{3:'British Christian',6:'Roman Christian',},
        Inverness:'British Pagan',
        'Isle of Wight':'Germanic Pagan',
        Jagent:{4:'British Christian',5:'British Pagan',6:'Roman Christian',},
        Kent:{2:'British Christian',3:'British Christian',6:'Germanic Pagan',},
        'La Rochelle':{2:'Arian Christian',6:'Roman Christian',},
        Lambor:'British Pagan',
        Languedoc:'Arian Christian',
        Leicester:'British Christian',
        Leinster:{2:'British Christian',6:'British Christian',},
        Leon:{5:'British Christian',6:'Roman Christian',},
        Levcomagus:'British Christian',
        Lincoln:{5:'British Christian',6:'Roman Christian',},
        Lindsey:'British Christian',
        Listeneisse: 'British Pagan',
        Lonazep:{4:'British Christian',6:'British Pagan',},
        London:{3:'British Christian',6:'Roman Christian',},
        'Long Isles':'British Christian',
        'Cockermouth':'British Christian',
        Lothian:'British Pagan',
        Lyons:'Roman Christian',
        Malahaut:{4:'British Christian',6:'British Pagan'},
        Maris:'British Pagan',
        Marlborough:'British Christian',
        Marsielles:'Roman Christian',
        Meath:'British Christian',
        Metz:'Roman Christian',
        Munster:{1:'British Christian',6:'British Pagan',},
        Nantes:{3:'British Christian',6:'Roman Christian',},
        Narbonne:{1:'Arian Christian',2:'Jewish',6:'Roman Christian',},
        Neustria:'Roman Christian',
        Nohaut:'Germanic Pagan',
        Norwich:{3:'British Christian',6:'Roman Christian',},
        Oriel:{1:'British Christian',6:'British Pagan',},
        'The Orkneys':'British Christian',
        Orléans:'Roman Christian',
        Oxford:'British Christian',
        Peterborough:'British Christian',
        Pomitain:'British Pagan',
        Portchester:{4:'British Christian',5:'British Pagan',6:'Roman Christian',},
        Provence:{2:'Arian Christian',6:'Roman Christian',},
        Quimper:'British Christian',
        Rennes:{2:'British Christian',6:'Roman Christian',},
        Rheged:'British Pagan',
        Richmond:'British Christian',
        Ripon:'British Christian',
        Roestoc:'British Pagan',
        Rouse:'British Pagan',
        Rydychan:'British Christian',
        Salisbury:{5:'British Christian',6:'British Pagan',},
        Sarum:'British Christian',
        Silchester:'British Christian',
        'Silchester City':{3:'British Christian',6:'Roman Christian',},
        Soissons:'Roman Christian',
        Somerset:{5:'British Christian',6:'British Pagan',},
        Sorestan:'Germanic Pagan',
        Southports:{4:'Arian Christian',6:'Germanic Pagan'},
        'St Albans':'British Christian',
        'St Brienc':'British Christian',
        Stafford:'British Christian',
        Staines:{4:'British Christian',6:'British Christian',},
        Strangorre:'British Pagan',
        Sugales:'British Pagan',
        Surluse:{2:'British Pagan',6:'British Pagan',},
        Surrey:{3:'British Christian',6:'Germanic Pagan',},
        Sussex:{3:'British Christian',4:'British Christian',6:'Germanic Pagan',},
        Thamesmouth:'Roman Christian',
        Tintagel:{4:'British Christian',6:'British Pagan',},
        Totnes:{4:'British Christian',6:'British Pagan',},
        Toulouse:'Arian Christian',
        'Cité de Toulouse':{2:'Arian Christian',6:'Roman Christian',},
        Trebes:'Arian Christian',
        Tribuit:'British Christian',
        Vannes:{3:'British Christian',6:'Roman Christian',},
        Vannetais:{5:'British Christian',6:'Roman Christian',},
        Wandborough:'British Christian',
        Warwick:'British Christian',
        Winchester:{3:'British Christian',6:'Roman Christian',},
        Wuerensis:{3:'British Christian',6:'British Pagan',},
        Yarmouth:'Roman Christian',
    }

// LIST OBJECT :: List arrays of religious personaly traits, organised by religion
let religiousTraitList = {
    'Arian Christian': ['Chaste', 'Honest', 'Just', 'Merciful', 'Temperate'],
    'British Christian': ['Chaste', 'Energetic', 'Generous', 'Modest', 'Temperate'],
    'Roman Christian': ['Chaste', 'Forgiving', 'Merciful', 'Modest', 'Temperate'],
    Heathen: ['Vengeful', 'Honest', 'Proud', 'Arbitrary', 'Worldly'],
    Jewish: ['Chaste', 'Energetic', 'Just', 'Prudent', 'Temperate'],
    'British Pagan': ['Lustful', 'Energetic', 'Generous', 'Honest', 'Proud'],
    'Germanic Pagan': ['Generous', 'Proud', 'Worldly', 'Reckless', 'Indulgent'],
}

// BONUS OBJECT :: bonus generator object for default passion values
let defaultPassionBonus = {
    'Loyalty (Lord)': '2d6+6',
    'Love (Family)': '2d6+6',
    'Hospitality': '3d6',
    'Honour': '2d6+3'
}

// SELECT OBJECT :: random selection object for potions (for "Potion Brewer" women's gift)
let potionSelect = {
    1: "Rhiannon's Caress",
    2: "Dona's Kiss",
    3: "Branwens' Brew",
    4: "Arianrod's Song",
    5: "Ceridwen's Embrace",
    6: "72-herbs"
}

// SELECT OBJECT :: random selection objects for family characteristics / women's gifts, organised by gender
let familyTraitSelect = {
    Male: {
        1: 'Keen on status',
        2: 'Spiritual bent',
        3: 'Knows the commoners',
        4: 'Knows the faerie ways',
        5: 'Good with horses',
        6: 'Excellent voice',
        7: 'Keen-sighted',
        8: 'At home in nature',
        9: 'Sprightly',
        10: 'Natural Healer',
        11: 'Naturally Lovable',
        12: 'Never forgets a face',
        13: 'Surprisingly deductive',
        14: 'Swims like an otter',
        15: 'Natural storyteller',
        16: 'Natural musician',
        17: 'Good with words',
        18: 'Grew up with books',
        19: 'Good with birds',
        20: 'Clever at games',
    },
    Female: {
        5: 'Striking beauty',
        10: 'Healing touch',
        15: 'Good with animals',
        17: 'Beautiful voice',
        18: 'Nimble fingers',
        20: 'Potion brewer: ',

    }
}

// LOCATE ARRAY :: time periods Locator arrays for use in the skills array
let defaultSkillLocate = [
    ['Uther','Anarchy','Boy King','Conquest'],
    ['Romance','Tournament','Grail Quest','Twilight']
]

// BONUS ARRAY :: default skills by period (from selector), culture and gender
let defaultSkillBonus = [{
    Occitanian:{
        Male:{
            'skills.Awareness':'6',
            'skills.Boating':'1',
            'skills.Chirurgery':'0',
            'skills.Compose':'5',
            'skills.Courtesy':'8',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'3',
            'skills.First Aid':'2',
            'skills.Flirting':'5',
            'skills.Folklore':'2',
            'skills.Gaming':'3',
            'skills.Heraldry':'0',
            'skills.Hunting':'2',
            'skills.Industry':'0',
            'skills.Intrigue':'3',
            'skills.Orate':'3',
            'skills.Play':'3',
            'skills.Read':'2',
            'skills.Recognise':'4',
            'skills.Religion':'1',
            'skills.Romance':'0',
            'skills.Singing':'2',
            'skills.Stewardship':'2',
            'skills.Swimming':'2',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'2',
            'combatSkills.general.Horsemanship':'4',
            'combatSkills.weapons.Sword':'5',
            'combatSkills.weapons.Lance':'8',
            'combatSkills.weapons.Spear':'2',
            'combatSkills.weapons.Dagger':'2',
        },
        Female:{
            'skills.Awareness':'4',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'3',
            'skills.Courtesy':'6',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'1',
            'skills.Falconry':'2',
            'skills.First Aid':'10',
            'skills.Flirting':'4',
            'skills.Folklore':'1',
            'skills.Gaming':'3',
            'skills.Heraldry':'0',
            'skills.Hunting':'1',
            'skills.Industry':'5',
            'skills.Intrigue':'4',
            'skills.Orate':'2',
            'skills.Play':'4',
            'skills.Read':'2',
            'skills.Recognise':'2',
            'skills.Religion':'1',
            'skills.Romance':'0',
            'skills.Singing':'3',
            'skills.Stewardship':'5',
            'skills.Swimming':'1',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'1',
            'combatSkills.general.Horsemanship':'4',
            'combatSkills.weapons.Sword':'0',
            'combatSkills.weapons.Lance':'0',
            'combatSkills.weapons.Spear':'0',
            'combatSkills.weapons.Dagger':'3',
        }
    },
    Cymric:{
        Male:{
            'skills.Awareness':'6',
            'skills.Boating':'1',
            'skills.Chirurgery':'1',
            'skills.Compose':'0',
            'skills.Courtesy':'3',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'1',
            'skills.Falconry':'3',
            'skills.First Aid':'10',
            'skills.Flirting':'4',
            'skills.Folklore':'2',
            'skills.Gaming':'3',
            'skills.Heraldry':'0',
            'skills.Hunting':'2',
            'skills.Industry':'0',
            'skills.Intrigue':'5',
            'skills.Orate':'3',
            'skills.Play':'3',
            'skills.Read':'0',
            'skills.Recognise':'5',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'2',
            'skills.Stewardship':'2',
            'skills.Swimming':'2',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'4',
            'combatSkills.general.Horsemanship':'4',
            'combatSkills.weapons.Sword':'8',
            'combatSkills.weapons.Lance':'2',
            'combatSkills.weapons.Spear':'2',
            'combatSkills.weapons.Dagger':'4',
        },
        Female:{
            'skills.Awareness':'3',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'1',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'3',
            'skills.Falconry':'2',
            'skills.First Aid':'10',
            'skills.Flirting':'6',
            'skills.Folklore':'2',
            'skills.Gaming':'3',
            'skills.Heraldry':'0',
            'skills.Hunting':'2',
            'skills.Industry':'5',
            'skills.Intrigue':'3',
            'skills.Orate':'2',
            'skills.Play':'3',
            'skills.Read':'0',
            'skills.Recognise':'3',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'3',
            'skills.Stewardship':'5',
            'skills.Swimming':'1',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'1',
            'combatSkills.general.Horsemanship':'3',
            'combatSkills.weapons.Sword':'0',
            'combatSkills.weapons.Lance':'0',
            'combatSkills.weapons.Spear':'0',
            'combatSkills.weapons.Dagger':'3',
        }
    },
    French:{
        Male:{
            'skills.Awareness':'6',
            'skills.Boating':'0',
            'skills.Chirurgery':'0',
            'skills.Compose':'0',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'8',
            'skills.First Aid':'3',
            'skills.Flirting':'2',
            'skills.Folklore':'2',
            'skills.Gaming':'2',
            'skills.Heraldry':'0',
            'skills.Hunting':'8',
            'skills.Industry':'0',
            'skills.Intrigue':'4',
            'skills.Orate':'2',
            'skills.Play':'2',
            'skills.Read':'0',
            'skills.Recognise':'5',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'2',
            'skills.Stewardship':'2',
            'skills.Swimming':'2',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'4',
            'combatSkills.general.Horsemanship':'5',
            'combatSkills.weapons.Sword':'5',
            'combatSkills.weapons.Lance':'8',
            'combatSkills.weapons.Spear':'1',
            'combatSkills.weapons.Dagger':'2',
        },
        Female:{
            'skills.Awareness':'5',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'1',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'2',
            'skills.First Aid':'10',
            'skills.Flirting':'2',
            'skills.Folklore':'2',
            'skills.Gaming':'2',
            'skills.Heraldry':'0',
            'skills.Hunting':'2',
            'skills.Industry':'5',
            'skills.Intrigue':'3',
            'skills.Orate':'2',
            'skills.Play':'2',
            'skills.Read':'0',
            'skills.Recognise':'4',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'3',
            'skills.Stewardship':'5',
            'skills.Swimming':'2',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'1',
            'combatSkills.general.Horsemanship':'4',
            'combatSkills.weapons.Dagger':'3',
        }
    },
    Irish:{
        Male:{
            'skills.Awareness':'5',
            'skills.Boating':'5',
            'skills.Chirurgery':'0',
            'skills.Compose':'4',
            'skills.Courtesy':'2',
            'skills.Dancing':'3',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'1',
            'skills.First Aid':'2',
            'skills.Flirting':'4',
            'skills.Folklore':'5',
            'skills.Gaming':'2',
            'skills.Heraldry':'0',
            'skills.Hunting':'2',
            'skills.Industry':'0',
            'skills.Intrigue':'2',
            'skills.Orate':'10',
            'skills.Play':'5',
            'skills.Read':'0',
            'skills.Recognise':'2',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'3',
            'skills.Stewardship':'2',
            'skills.Swimming':'2',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'3',
            'combatSkills.general.Horsemanship':'2',
            'combatSkills.weapons.Sword':'5',
            'combatSkills.weapons.Lance':'1',
            'combatSkills.weapons.Spear':'8',
            'combatSkills.weapons.Dagger':'3',
        },
        Female:{
            'skills.Awareness':'4',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'3',
            'skills.Courtesy':'2',
            'skills.Dancing':'3',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'1',
            'skills.First Aid':'10',
            'skills.Flirting':'4',
            'skills.Folklore':'4',
            'skills.Gaming':'2',
            'skills.Heraldry':'0',
            'skills.Hunting':'1',
            'skills.Industry':'4',
            'skills.Intrigue':'2',
            'skills.Orate':'2',
            'skills.Play':'5',
            'skills.Read':'0',
            'skills.Recognise':'4',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'4',
            'skills.Stewardship':'4',
            'skills.Swimming':'2',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'2',
            'combatSkills.general.Horsemanship':'2',
            'combatSkills.weapons.Dagger':'3',
        }
    },
    Pict:{
        Male:{
            'skills.Awareness':'10',
            'skills.Boating':'1',
            'skills.Chirurgery':'5',
            'skills.Compose':'0',
            'skills.Courtesy':'1',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'10',
            'skills.Falconry':'0',
            'skills.First Aid':'5',
            'skills.Flirting':'1',
            'skills.Folklore':'5',
            'skills.Gaming':'2',
            'skills.Heraldry':'0',
            'skills.Hunting':'5',
            'skills.Industry':'0',
            'skills.Intrigue':'0',
            'skills.Orate':'1',
            'skills.Play':'0',
            'skills.Read':'2',
            'skills.Recognise':'2',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'2',
            'skills.Stewardship':'2',
            'skills.Swimming':'5',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'3',
            'combatSkills.general.Horsemanship':'1',
            'combatSkills.weapons.Sword':'4',
            'combatSkills.weapons.Lance':'1',
            'combatSkills.weapons.Spear':'1',
            'combatSkills.weapons.Dagger':'1',
            'combatSkills.weapons.Great Spear':'8',
            'combatSkills.weapons.Javelin':'3',
            'combatSkills.weapons.Great Axe':'1',
        },
        Female:{
            'skills.Awareness':'6',
            'skills.Boating':'1',
            'skills.Chirurgery':'10',
            'skills.Compose':'0',
            'skills.Courtesy':'1',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'10',
            'skills.Falconry':'0',
            'skills.First Aid':'10',
            'skills.Flirting':'1',
            'skills.Folklore':'5',
            'skills.Gaming':'2',
            'skills.Heraldry':'0',
            'skills.Hunting':'5',
            'skills.Industry':'5',
            'skills.Intrigue':'0',
            'skills.Orate':'1',
            'skills.Play':'0',
            'skills.Read':'3',
            'skills.Recognise':'5',
            'skills.Religion':'5',
            'skills.Romance':'0',
            'skills.Singing':'5',
            'skills.Stewardship':'2',
            'skills.Swimming':'2',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'2',
            'combatSkills.general.Horsemanship':'1',
            'combatSkills.weapons.Spear':'1',
            'combatSkills.weapons.Dagger':'2',
        }
    },
    Roman:{
        Male:{
            'skills.Awareness':'6',
            'skills.Boating':'0',
            'skills.Chirurgery':'5',
            'skills.Compose':'1',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'2',
            'skills.First Aid':'2',
            'skills.Flirting':'4',
            'skills.Folklore':'2',
            'skills.Gaming':'2',
            'skills.Heraldry':'0',
            'skills.Hunting':'2',
            'skills.Industry':'0',
            'skills.Intrigue':'5',
            'skills.Orate':'2',
            'skills.Play':'2',
            'skills.Read':'5',
            'skills.Recognise':'4',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'2',
            'skills.Stewardship':'3',
            'skills.Swimming':'2',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'5',
            'combatSkills.general.Horsemanship':'3',
            'combatSkills.weapons.Sword':'4',
            'combatSkills.weapons.Lance':'2',
            'combatSkills.weapons.Spear':'2',
            'combatSkills.weapons.Dagger':'8',
        },
        Female:{
            'skills.Awareness':'4',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'1',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'0',
            'skills.First Aid':'10',
            'skills.Flirting':'4',
            'skills.Folklore':'2',
            'skills.Gaming':'2',
            'skills.Heraldry':'0',
            'skills.Hunting':'0',
            'skills.Industry':'5',
            'skills.Intrigue':'7',
            'skills.Orate':'2',
            'skills.Play':'0',
            'skills.Read':'3',
            'skills.Recognise':'5',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'2',
            'skills.Stewardship':'6',
            'skills.Swimming':'2',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'2',
            'combatSkills.general.Horsemanship':'2',
            'combatSkills.weapons.Dagger':'6',
        }
    },
    Saxon:{
        Male:{
            'skills.Awareness':'6',
            'skills.Boating':'10',
            'skills.Chirurgery':'0',
            'skills.Compose':'2',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'2',
            'skills.First Aid':'2',
            'skills.Flirting':'2',
            'skills.Folklore':'2',
            'skills.Gaming':'3',
            'skills.Heraldry':'0',
            'skills.Hunting':'5',
            'skills.Industry':'0',
            'skills.Intrigue':'2',
            'skills.Orate':'3',
            'skills.Play':'0',
            'skills.Read':'0',
            'skills.Recognise':'2',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'3',
            'skills.Stewardship':'2',
            'skills.Swimming':'5',
            'skills.Tourney':'0',
            'combatSkills.general.Battle':'3',
            'combatSkills.general.Horsemanship':'3',
            'combatSkills.weapons.Sword':'4',
            'combatSkills.weapons.Lance':'1',
            'combatSkills.weapons.Spear':'2',
            'combatSkills.weapons.Dagger':'1',
            'combatSkills.weapons.Great Axe':'8',
            'combatSkills.weapons.Axe':'2',
        },
        Female:{
            'skills.Awareness':'5',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'2',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'2',
            'skills.First Aid':'10',
            'skills.Flirting':'3',
            'skills.Folklore':'3',
            'skills.Gaming':'3',
            'skills.Heraldry':'0',
            'skills.Hunting':'2',
            'skills.Industry':'5',
            'skills.Intrigue':'3',
            'skills.Orate':'3',
            'skills.Play':'0',
            'skills.Read':'0',
            'skills.Recognise':'3',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'3',
            'skills.Stewardship':'4',
            'skills.Swimming':'3',
            'Tourney':'0',
            'combatSkills.general.Battle':'2',
            'combatSkills.general.Horsemanship':'2',
            'combatSkills.weapons.Dagger':'2',
        }
    },
},
{
    Occitanian:{
        Male:{
            'skills.Awareness':'5',
            'skills.Boating':'1',
            'skills.Chirurgery':'0',
            'skills.Compose':'5',
            'skills.Courtesy':'8',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'2',
            'skills.First Aid':'2',
            'skills.Flirting':'5',
            'skills.Folklore':'2',
            'skills.Gaming':'2',
            'skills.Heraldry':'5',
            'skills.Hunting':'2',
            'skills.Industry':'0',
            'skills.Intrigue':'3',
            'skills.Orate':'2',
            'skills.Play':'2',
            'skills.Read':'2',
            'skills.Recognise':'2',
            'skills.Religion':'2',
            'skills.Romance':'5',
            'skills.Singing':'2',
            'skills.Stewardship':'2',
            'skills.Swimming':'2',
            'skills.Tourney':'4',
            'combatSkills.general.Battle':'3',
            'combatSkills.general.Horsemanship':'4',
            'combatSkills.weapons.Sword':'4',
            'combatSkills.weapons.Lance':'7',
            'combatSkills.weapons.Spear':'2',
            'combatSkills.weapons.Dagger':'2',
        },
        Female:{
            'skills.Awareness':'2',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'3',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'1',
            'skills.Falconry':'2',
            'skills.First Aid':'7',
            'skills.Flirting':'4',
            'skills.Folklore':'1',
            'skills.Gaming':'2',
            'skills.Heraldry':'5',
            'skills.Hunting':'1',
            'skills.Industry':'6',
            'skills.Intrigue':'4',
            'skills.Orate':'2',
            'skills.Play':'2',
            'skills.Read':'2',
            'skills.Recognise':'2',
            'skills.Religion':'2',
            'skills.Romance':'7',
            'skills.Singing':'2',
            'skills.Stewardship':'5',
            'skills.Swimming':'2',
            'skills.Tourney':'3',
            'combatSkills.general.Battle':'2',
            'combatSkills.general.Horsemanship':'3',
            'combatSkills.weapons.Dagger':'3',
        }
    },
    Cymric:{
        Male:{
            'skills.Awareness':'5',
            'skills.Boating':'1',
            'skills.Chirurgery':'0',
            'skills.Compose':'0',
            'skills.Courtesy':'3',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'1',
            'skills.Falconry':'3',
            'skills.First Aid':'10',
            'skills.Flirting':'3',
            'skills.Folklore':'2',
            'skills.Gaming':'3',
            'skills.Heraldry':'3',
            'skills.Hunting':'2',
            'skills.Industry':'0',
            'skills.Intrigue':'3',
            'skills.Orate':'3',
            'skills.Play':'3',
            'skills.Read':'0',
            'skills.Recognise':'3',
            'skills.Religion':'2',
            'skills.Romance':'2',
            'skills.Singing':'2',
            'skills.Stewardship':'2',
            'skills.Swimming':'2',
            'skills.Tourney':'5',
            'combatSkills.general.Battle':'3',
            'combatSkills.general.Horsemanship':'4',
            'combatSkills.weapons.Sword':'7',
            'combatSkills.weapons.Lance':'2',
            'combatSkills.weapons.Spear':'2',
            'combatSkills.weapons.Dagger':'3',
        },
        Female:{
            'skills.Awareness':'2',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'1',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'3',
            'skills.Falconry':'2',
            'skills.First Aid':'10',
            'skills.Flirting':'5',
            'skills.Folklore':'2',
            'skills.Gaming':'3',
            'skills.Heraldry':'1',
            'skills.Hunting':'2',
            'skills.Industry':'5',
            'skills.Intrigue':'2',
            'skills.Orate':'2',
            'skills.Play':'3',
            'skills.Read':'1',
            'skills.Recognise':'2',
            'skills.Religion':'2',
            'skills.Romance':'2',
            'skills.Singing':'3',
            'skills.Stewardship':'5',
            'skills.Swimming':'1',
            'skills.Tourney':'1',
            'combatSkills.general.Battle':'1',
            'combatSkills.general.Horsemanship':'3',
            'combatSkills.weapons.Dagger':'3',
        }
    },
    French:{
        Male:{
            'skills.Awareness':'5',
            'skills.Boating':'0',
            'skills.Chirurgery':'0',
            'skills.Compose':'0',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'8',
            'skills.First Aid':'2',
            'skills.Flirting':'2',
            'skills.Folklore':'2',
            'skills.Gaming':'2',
            'skills.Heraldry':'5',
            'skills.Hunting':'8',
            'skills.Industry':'0',
            'skills.Intrigue':'4',
            'skills.Orate':'2',
            'skills.Play':'2',
            'skills.Read':'0',
            'skills.Recognise':'2',
            'skills.Religion':'2',
            'skills.Romance':'2',
            'skills.Singing':'2',
            'skills.Stewardship':'2',
            'skills.Swimming':'2',
            'skills.Tourney':'2',
            'combatSkills.general.Battle':'4',
            'combatSkills.general.Horsemanship':'5',
            'combatSkills.weapons.Sword':'3',
            'combatSkills.weapons.Lance':'7',
            'combatSkills.weapons.Spear':'1',
            'combatSkills.weapons.Dagger':'1',
        },
        Female:{
            'skills.Awareness':'4',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'0',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'2',
            'skills.First Aid':'10',
            'skills.Flirting':'2',
            'skills.Folklore':'2',
            'skills.Gaming':'2',
            'skills.Heraldry':'5',
            'skills.Hunting':'1',
            'skills.Industry':'5',
            'skills.Intrigue':'3',
            'skills.Orate':'2',
            'skills.Play':'2',
            'skills.Read':'0',
            'skills.Recognise':'4',
            'skills.Religion':'2',
            'skills.Romance':'2',
            'skills.Singing':'2',
            'skills.Stewardship':'5',
            'skills.Swimming':'2',
            'skills.Tourney':'2',
            'combatSkills.general.Battle':'1',
            'combatSkills.general.Horsemanship':'4',
            'combatSkills.weapons.Dagger':'2',
        }
    },
    Irish:{
        Male:{
            'skills.Awareness':'5',
            'skills.Boating':'5',
            'skills.Chirurgery':'0',
            'skills.Compose':'3',
            'skills.Courtesy':'2',
            'skills.Dancing':'3',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'1',
            'skills.First Aid':'2',
            'skills.Flirting':'3',
            'skills.Folklore':'5',
            'skills.Gaming':'2',
            'skills.Heraldry':'1',
            'skills.Hunting':'2',
            'skills.Industry':'0',
            'skills.Intrigue':'2',
            'skills.Orate':'10',
            'skills.Play':'5',
            'skills.Read':'0',
            'skills.Recognise':'2',
            'skills.Religion':'2',
            'skills.Romance':'2',
            'skills.Singing':'2',
            'skills.Stewardship':'2',
            'skills.Swimming':'2',
            'skills.Tourney':'1',
            'combatSkills.general.Battle':'3',
            'combatSkills.general.Horsemanship':'2',
            'combatSkills.weapons.Sword':'5',
            'combatSkills.weapons.Lance':'1',
            'combatSkills.weapons.Spear':'7',
            'combatSkills.weapons.Dagger':'3',
        },
        Female:{
            'skills.Awareness':'4',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'2',
            'skills.Courtesy':'2',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'1',
            'skills.First Aid':'10',
            'skills.Flirting':'4',
            'skills.Folklore':'4',
            'skills.Gaming':'2',
            'skills.Heraldry':'1',
            'skills.Hunting':'1',
            'skills.Industry':'4',
            'skills.Intrigue':'2',
            'skills.Orate':'2',
            'skills.Play':'4',
            'skills.Read':'0',
            'skills.Recognise':'4',
            'skills.Religion':'2',
            'skills.Romance':'2',
            'skills.Singing':'4',
            'skills.Stewardship':'4',
            'skills.Swimming':'2',
            'skills.Tourney':'1',
            'combatSkills.general.Battle':'2',
            'combatSkills.general.Horsemanship':'1',
            'combatSkills.weapons.Dagger':'3',
        }
    },
    Pict:{
        Male:{
            'skills.Awareness':'10',
            'skills.Boating':'1',
            'skills.Chirurgery':'5',
            'skills.Compose':'0',
            'skills.Courtesy':'1',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'10',
            'skills.Falconry':'0',
            'skills.First Aid':'5',
            'skills.Flirting':'1',
            'skills.Folklore':'5',
            'skills.Gaming':'2',
            'skills.Heraldry':'0',
            'skills.Hunting':'5',
            'skills.Industry':'0',
            'skills.Intrigue':'0',
            'skills.Orate':'1',
            'skills.Play':'0',
            'skills.Read':'2',
            'skills.Recognise':'2',
            'skills.Religion':'2',
            'skills.Romance':'0',
            'skills.Singing':'2',
            'skills.Stewardship':'2',
            'skills.Swimming':'5',
            'skills.Tourney':'2',
            'combatSkills.general.Battle':'3',
            'combatSkills.general.Horsemanship':'1',
            'combatSkills.weapons.Sword':'4',
            'combatSkills.weapons.Lance':'1',
            'combatSkills.weapons.Spear':'1',
            'combatSkills.weapons.Dagger':'1',
            'combatSkills.weapons.Great Spear':'7',
            'combatSkills.weapons.Javelin':'2',
            'combatSkills.weapons.Great Axe':'1',
        },
        Female:{
            'skills.Awareness':'5',
            'skills.Boating':'1',
            'skills.Chirurgery':'10',
            'skills.Compose':'0',
            'skills.Courtesy':'1',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'10',
            'skills.Falconry':'0',
            'skills.First Aid':'10',
            'skills.Flirting':'1',
            'skills.Folklore':'5',
            'skills.Gaming':'1',
            'skills.Heraldry':'0',
            'skills.Hunting':'5',
            'skills.Industry':'5',
            'skills.Intrigue':'0',
            'skills.Orate':'1',
            'skills.Play':'0',
            'skills.Read':'3',
            'skills.Recognise':'5',
            'skills.Religion':'5',
            'skills.Romance':'1',
            'skills.Singing':'5',
            'skills.Stewardship':'2',
            'skills.Swimming':'2',
            'skills.Tourney':'1',
            'combatSkills.general.Battle':'2',
            'combatSkills.general.Horsemanship':'1',
            'combatSkills.weapons.Spear':'1',
            'combatSkills.weapons.Dagger':'2',
        }
    },
    Roman:{
        Male:{
            'skills.Awareness':'5',
            'skills.Boating':'0',
            'skills.Chirurgery':'5',
            'skills.Compose':'0',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'2',
            'skills.First Aid':'2',
            'skills.Flirting':'2',
            'skills.Folklore':'2',
            'skills.Gaming':'2',
            'skills.Heraldry':'5',
            'skills.Hunting':'2',
            'skills.Industry':'0',
            'skills.Intrigue':'4',
            'skills.Orate':'2',
            'skills.Play':'2',
            'skills.Read':'4',
            'skills.Recognise':'2',
            'skills.Religion':'2',
            'skills.Romance':'5',
            'skills.Singing':'2',
            'skills.Stewardship':'2',
            'skills.Swimming':'2',
            'skills.Tourney':'2',
            'combatSkills.general.Battle':'4',
            'combatSkills.general.Horsemanship':'3',
            'combatSkills.weapons.Sword':'4',
            'combatSkills.weapons.Lance':'2',
            'combatSkills.weapons.Spear':'2',
            'combatSkills.weapons.Dagger':'7',
        },
        Female:{
            'skills.Awareness':'3',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'0',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'0',
            'skills.First Aid':'10',
            'skills.Flirting':'2',
            'skills.Folklore':'2',
            'skills.Gaming':'2',
            'skills.Heraldry':'2',
            'skills.Hunting':'0',
            'skills.Industry':'5',
            'skills.Intrigue':'5',
            'skills.Orate':'2',
            'skills.Play':'0',
            'skills.Read':'2',
            'skills.Recognise':'4',
            'skills.Religion':'2',
            'skills.Romance':'4',
            'skills.Singing':'2',
            'skills.Stewardship':'5',
            'skills.Swimming':'2',
            'skills.Tourney':'3',
            'combatSkills.general.Battle':'2',
            'combatSkills.general.Horsemanship':'2',
            'combatSkills.weapons.Dagger':'5',
        }
    },
    Saxon:{
        Male:{
            'skills.Awareness':'5',
            'skills.Boating':'10',
            'skills.Chirurgery':'0',
            'skills.Compose':'2',
            'skills.Courtesy':'5',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'2',
            'skills.First Aid':'2',
            'skills.Flirting':'2',
            'skills.Folklore':'2',
            'skills.Gaming':'3',
            'skills.Heraldry':'2',
            'skills.Hunting':'3',
            'skills.Industry':'0',
            'skills.Intrigue':'2',
            'skills.Orate':'3',
            'skills.Play':'0',
            'skills.Read':'0',
            'skills.Recognise':'2',
            'skills.Religion':'2',
            'skills.Romance':'2',
            'skills.Singing':'3',
            'skills.Stewardship':'2',
            'skills.Swimming':'5',
            'skills.Tourney':'2',
            'combatSkills.general.Battle':'3',
            'combatSkills.general.Horsemanship':'3',
            'combatSkills.weapons.Sword':'4',
            'combatSkills.weapons.Lance':'1',
            'combatSkills.weapons.Spear':'1',
            'combatSkills.weapons.Dagger':'1',
            'combatSkills.weapons.Great Axe':'7',
            'combatSkills.weapons.Axe':'1',
        },
        Female:{
            'skills.Awareness':'4',
            'skills.Boating':'0',
            'skills.Chirurgery':'10',
            'skills.Compose':'2',
            'skills.Courtesy':'4',
            'skills.Dancing':'2',
            'skills.Faerie Lore':'2',
            'skills.Falconry':'2',
            'skills.First Aid':'10',
            'skills.Flirting':'3',
            'skills.Folklore':'2',
            'skills.Gaming':'2',
            'skills.Heraldry':'2',
            'skills.Hunting':'2',
            'skills.Industry':'5',
            'skills.Intrigue':'3',
            'skills.Orate':'2',
            'skills.Play':'0',
            'skills.Read':'0',
            'skills.Recognise':'3',
            'skills.Religion':'2',
            'skills.Romance':'3',
            'skills.Singing':'2',
            'skills.Stewardship':'3',
            'skills.Swimming':'3',
            'skills.Tourney':'2',
            'combatSkills.general.Battle':'2',
            'combatSkills.general.Horsemanship':'2',
            'combatSkills.weapons.Dagger':'2',
        }
    }
}]

// LOCATE OBJECT :: locators object for father's class along three dimensions: period, region and culture
let fatherClassLocate = {
    // dimension 1: Region
    period: [['Uther','Anarchy','Boy King'],['Conquest','Romance','Tournament','Grail Quest','Twilight']],
    region: ['Logres','Saxon','Cambria','Cumbria','The North','Cornwall & Brittany','Ireland','Gaul','France'],
    // Logres Cultures
    Logres: [['Cymric','Occitanian'],['Roman'],['Saxon']],
    // Saxons Cultures
    Saxon: ['Saxon'],
    // Cambria Cultures
    Cambria: [['Cymric'],['Roman']],
    // Cumbria Cultures
    Cumbria: [['Cymric'],['Roman']],
    // The North Cultures
    'The North': [['Cymric'],['Pict','Irish']],
    // Cornwall & Brittany Cultures
    'Cornwall & Brittany': ['Cymric','Roman'],
    // Ireland Cultures
    Ireland: [['Irish'],['Pict']],
    // Gaul Cultures
    Gaul: ['Occitanian','Roman'],
    // France Cultures
    France: ['French']
}

// SELECT OBJECT :: father's class selector arrays by region (object property), culture (selector index 1) and time period (selector index 2)
let fatherClassSelect = {
            Logres:
                [
                    // Cymric & Occitanian
                    [
                        // Early period
                        {
                            1:'Lord or Officer',
                            2:'Banneret Knight',
                            8:'Vassal Knight',
                            10:'Bachelor Knight',
                            13:'Mercenary Knight',
                            16:'Squire',
                            20:'Warrior',
                        },
                        // Late period
                        {
                            1:'Lord or Officer',
                            3:'Banneret Knight',
                            8:'Vassal Knight',
                            12:'Bachelor Knight',
                            14:'Mercenary Knight',
                            20:'Squire',
                        },
                    ],

                    // Roman
                    [
                        {
                            1:'Lord or Officer',
                            2:'Banneret Knight',
                            4:'Vassal Knight',
                            8:'Bachelor Knight',
                            13:'Mercenary Knight',
                            17:'Squire',
                            20:'Legionnarius',
                        },
                        {
                            3:'Lord or Officer',
                            5:'Banneret Knight',
                            10:'Vassal Knight',
                            14:'Bachelor Knight',
                            16:'Mercenary Knight',
                            20:'Squire',
                        },
                    ],
                    // Saxon
                    [
                        {},
                        {
                            3:'Mercenary Knight',
                            7:'Squire',
                            9:'Warrior',
                            20:'Legionnarius',
                        }
                    ],
                ],
            Saxon:[

                {
                    3:'Mercenary Knight',
                    7:'Squire',
                    9:'Warrior',
                    20:'Legionnarius',
                }
            ],
            Cambria:
                [
                    // Cymric
                    [
                        // Early Period
                        {
                            1:'Banneret Knight',
                            3:'Vassal Knight',
                            7:'Bachelor Knight',
                            10:'Mercenary Knight',
                            14:'Squire',
                            20:'Warrior',
                        },
                        // Late Period
                        {
                            1:'Banneret Knight',
                            4:'Vassal Knight',
                            9:'Bachelor Knight',
                            11:'Mercenary Knight',
                            15:'Squire',
                            20:'Warrior',
                        }
                    ],
                    // Roman
                    [
                        // Early Period
                        {
                            1:'Lord or Officer',
                            2:'Banneret Knight',
                            4:'Vassal Knight',
                            8:'Bachelor Knight',
                            12:'Mercenary Knight',
                            16:'Squire',
                            20:'Legionnarius',
                        },
                        // Late Period
                        {
                            1:'Lord or Officer',
                            3:'Banneret Knight',
                            7:'Vassal Knight',
                            11:'Bachelor Knight',
                            15:'Mercenary Knight',
                            20:'Squire',
                        }
                    ]
                ],
            Cumbria:
                [
                    // Cymric
                    [
                        // Early Period
                        {
                            1:'Lord or Officer',
                            2:'Banneret Knight',
                            8:'Vassal Knight',
                            10:'Bachelor Knight',
                            13:'Mercenary Knight',
                            16:'Squire',
                            20:'Warrior',
                        },
                        // Late Period
                        {
                            1:'Lord or Officer',
                            3:'Banneret Knight',
                            8:'Vassal Knight',
                            12:'Bachelor Knight',
                            14:'Mercenary Knight',
                            20:'Squire',
                        },
                    ],
                    // Roman
                    [
                        // Early Period
                        {
                            1:'Lord or Officer',
                            2:'Banneret Knight',
                            4:'Vassal Knight',
                            8:'Bachelor Knight',
                            12:'Mercenary Knight',
                            16:'Squire',
                            20:'Legionnarius',
                        },
                        // Late Period
                        {
                            1:'Lord or Officer',
                            3:'Banneret Knight',
                            7:'Vassal Knight',
                            11:'Bachelor Knight',
                            15:'Mercenary Knight',
                            20:'Squire',
                        }
                    ]
                ],
            'The North':
                [
                    [
                        // Cymric
                        {
                            1:'Banneret Knight',
                            3:'Vassal Knight',
                            6:'Bachelor Knight',
                            12:'Mercenary Knight',
                            15:'Squire',
                            20:'Warrior',
                        },
                    ],
                    [
                        // Pict & Irish
                        {
                            1:'Tribal or clan chieftain',
                            3:'Family chieftain',
                            12:'Mercenary Knight',
                            20:'Warrior',
                        }
                    ]
                ],
            'Cornwall & Brittany':
                [
                    // All cultures
                    [
                        // Early Period
                        {
                            1:'Banneret Knight',
                            4:'Vassal Knight',
                            10:'Bachelor Knight',
                            13:'Mercenary Knight',
                            17:'Squire',
                            20:'Warrior',
                        },
                        // Late Period
                        {
                            1:'Banneret Knight',
                            5:'Vassal Knight',
                            12:'Bachelor Knight',
                            15:'Mercenary Knight',
                            18:'Squire',
                            20:'Warrior',
                        }
                    ]
                ],
            Ireland:
                [
                    // Christian
                    [
                        // Late Period
                        {
                            1:'Banneret Knight',
                            3:'Vassal Knight',
                            6:'Bachelor Knight',
                            12:'Mercenary Knight',
                            15:'Squire',
                            20:'Warrior',
                        }
                    ],
                    // Pagan or Pict
                    [
                        // Late Period
                        {
                            1:'Tribal or clan chieftain',
                            3:'Family chieftain',
                            20:'Warrior',
                        }
                    ],
                ],
            Gaul:
                [
                    // All cultures
                    [
                        // Early Period
                        {
                            2:'Free holding knight',
                            3:'Lord or Officer',
                            5:'Banneret Knight',
                            8:'Vassal Knight',
                            13:'Bachelor Knight',
                            14:'Mercenary Knight',
                            20:'Squire',
                        },
                        // Late Period
                        {
                            2:'Free holding knight',
                            3:'Lord or Officer',
                            5:'Banneret Knight',
                            9:'Vassal Knight',
                            14:'Bachelor Knight',
                            20:'Squire',
                        }
                    ]
                ],
            France:
                [
                    // All cultures
                    [
                        // Early Period
                        {},
                        // Late Period
                        {
                            1:'Lord or Officer',
                            3:'Banneret Knight',
                            8:'Vassal Knight',
                            12:'Bachelor Knight',
                            14:'Mercenary Knight',
                            20:'Squire',
                        },
                    ]
                ]
}

// SELECT OBJECT :: Lord/Officer father's class selector arrays by region (object property), culture (object property) and time period (selector index 2)
let officerSelect = {

    Logres: {
        Cymric: [
            // Early Period
            {
                1:'Lord',
                2:'Seneschal',
                3:'Butler',
                6:'Marshal',
                10:'Castellan',
                20:'Illegitimate'
            },
            // Late Period
            {
                1:'Lord',
                2:'Seneschal',
                3:'Butler',
                4:'Marshal',
                10:'Castellan',
                20:'Illegitimate'
            },
        ],
        Roman: [
            // Early Period
            {
                3:'Lord',
                6:'Seneschal',
                9:'Butler',
                11:'Marshal',
                14:'Castellan',
                20:'Illegitimate'
            },
            // Late Period
            {
                3:'Lord',
                5:'Seneschal',
                8:'Butler',
                10:'Marshal',
                12:'Castellan',
                20:'Illegitimate'
            },
        ],
    },
    Saxon: [

        // Late Period
        {
            1:'Seneschal',
            2:'Butler',
            3:'Marshal',
            4:'Castellan',
            20:'Illegitimate'
        },
    ],
    Cambria: [
        // Early Period
        {
            3:'Lord',
            6:'Seneschal',
            8:'Butler',
            11:'Marshal',
            14:'Castellan',
            20:'Illegitimate'
        },
        // Late Period
        {
            4:'Lord',
            6:'Seneschal',
            8:'Butler',
            10:'Marshal',
            15:'Castellan',
            20:'Illegitimate'
        },
    ],
    Cumbria: [
        // Early Period
        {
            3:'Lord',
            6:'Seneschal',
            8:'Butler',
            11:'Marshal',
            14:'Castellan',
            20:'Illegitimate'
        },
        // Late Period
        {
            4:'Lord',
            6:'Seneschal',
            8:'Butler',
            10:'Marshal',
            15:'Castellan',
            20:'Illegitimate'
        },
    ],
    Gaul:[
        // Early Period
        {
            10:'Lord',
            13:'Seneschal',
            17:'Butler',
            20:'Marshal',
        },
    ],
    France:[
        {
            17:'Lord',
            18:'Seneschal',
            19:'Butler',
            20:'Marshal'
        }
    ]
}

/// BONUS OBJECT :: familiy characteristic bonus setter (to be modified to return the bonus object instead of running a setBonus)
let familyTraitBonus = {
    'Keen on status': ()=>{setBonus('skills.Courtesy', '5');console.log('Courtesy now',getNested(characterData,'skills','Courtesy'))},
    'Spiritual bent': ()=>{setBonus('skills.Religion', '5');console.log('Religion now',getNested(characterData,'skills','Religion'))},
    'Knows the commoners': ()=>{setBonus('skills.Folklore', '5');console.log('Folklore now',getNested(characterData,'skills','Folklore'))},
    'Knows the faerie ways': ()=>{setBonus('skills.Faerie Lore', '5');console.log('Faerie Lore now',getNested(characterData,'skills','Faerie Lore'))},
    'Good with horses': ()=>{setBonus('skills.Horsemanship', '5');console.log('Horsemanship now',getNested(characterData,'combatSkills','general','Horsemanship'))},
    'Excellent voice': ()=>{setBonus('skills.Singing', '10');console.log('Singing now',getNested(characterData,'skills','Singing'))},
    'Keen-sighted': ()=>{setBonus('skills.Awareness', '5');console.log('Awareness now',getNested(characterData,'skills','Awareness'))},
    'At home in nature': ()=>{setBonus('skills.Hunting', '5');console.log('Hunting now',getNested(characterData,'skills','Hunting'))},
    'Sprightly': ()=>{setBonus('skills.Dancing', '10');console.log('Dancing now',getNested(characterData,'skills','Dancing'))},
    'Natural Healer': ()=>{setBonus('skills.First Aid', '5');console.log('First Aid now',getNested(characterData,'skills','First Aid'))},
    'Naturally Lovable': ()=>{setBonus('skills.Flirting', '10');console.log('Flirting now',getNested(characterData,'skills','Flirting'))},
    'Never forgets a face': ()=>{setBonus('skills.Recognise', '10');console.log('Recognise now',getNested(characterData,'skills','Recognise'))},
    'Surprisingly deductive': ()=>{setBonus('skills.Intrigue', '10');console.log('Intrigue now',getNested(characterData,'skills','Intrigue'))},
    'Swims like an otter': ()=>{setBonus('skills.Swimming', '10');console.log('Swimming now',getNested(characterData,'skills','Swimming'))},
    'Natural storyteller': ()=>{setBonus('skills.Orate', '10');console.log('Orate now',getNested(characterData,'skills','Orate'))},
    'Natural musician': ()=>{setBonus('skills.Play (Instrument)', '10');console.log('Play (Instrument) now',getNested(characterData,'skills','Play (Instrument)'))},
    'Good with words': ()=>{setBonus('skills.Compose', '10');console.log('Compose now',getNested(characterData,'skills','Compose'))},
    'Grew up with books': ()=>{setBonus('skills.Read (Latin)', '5');console.log('Read (Latin) now',getNested(characterData,'skills','Read (Latin)'))},
    'Good with birds': ()=>{setBonus('skills.Falconry', '10');console.log('Falconry now',getNested(characterData,'skills','Falconry'))},
    'Clever at games': ()=>{setBonus('skills.Gaming', '10');console.log('Gaming now',getNested(characterData,'skills','Gaming'))},
    'Striking beauty': ()=>{setBonus('statistics.APP', 'd10');console.log('APP now',getNested(characterData,'statistics','APP'))},
    'Healing touch': ()=>{['skills.First Aid','skills.Chirurgery'].forEach(item=>setBonus(item, '10'));console.log('First Aid/Chirurgery now',getNested(characterData,'skills','First Aid'),'/',getNested(characterData,'skills','Chirurgery'))},
    'Good with animals': ()=>{['skills.Falconry','combatSkills.general.Horsemanship'].forEach(item=>setBonus(item, '10'));console.log('Falconry/Horsemanship now',getNested(characterData,'skills','Falconry'),'/',getNested(characterData,'combatSkills','general','Horsemanship'))},
    'Beautiful voice': ()=>{['skills.Singing','skills.Orate'].forEach(item=>setBonus(item, '10'));console.log('Singing/Orate now',getNested(characterData,'skills','Singing'),'/',getNested(characterData,'skills','Orate'))},
    'Nimble fingers': ()=>{setBonus('skills.Industry', '10');console.log('Courtesy now',getNested(characterData,'skills','Industry'))},
    'Potion brewer: ': ()=>{buildChar.familyTrait=buildChar.familyTrait+randomSelect(select.potion).outcome;console.log('Family trait:',getNested(buildChar,'familyTrait'))}
}

// BONUS OBJECT :: bonus generation objects for bonuses inherited from father's class (access by object property)
function fatherClassBonus(fClass, culture, period) {
    let bonusObj = {};

    switch (fClass){
        case 'Legionnarius':
            bonusObj = {
                'Glory': '3d6+50',
                'reserves.skillPoints': '18',
                'skills.Awareness': '1',
                'combatSkills.weapons.Spear': '1',
                'combatSkills.weapons.Sword': '1',
                'combatSkills.weapons.Grapple': '2',
                'combatSkills.weapons.Dagger': '3',
                'personalityPairs.Modest': '-1',
                'personalityPairs.Prudent': '1d3',
                'personalityPairs.Generous': '-1d3-2',
                'personalityPairs.Merciful': '-d6',
                'personalityPairs.Valorous': '1',
                'personalityPairs.Honour': '1d3',
                'passions.Loyalty (Lord)': '1',
                'Equipment':()=>{
                    let eqpt=[];
                    eqpt.push( "Legionnarius Outfit" )
                    let luckItems = rollLuck(1);
                    luckItems.forEach(item=>{eqpt.push(item)})
                    return eqpt;
                }
            }
        break;

        case 'Squire':
            bonusObj = {
                'Glory': '6d6',
                'reserves.skillPoints': '20',
                'personalityPairs.Energetic': '1d3',
                'personalityPairs.Modest': '1d3',
                'personalityPairs.Prudent': '1d3',
                'personalityPairs.Valorous': '1d6',
                'passions.Loyalty (Lord)': '3',
                'Equipment':()=>{
                    let eqpt=[];
                    if (['Irish', 'Pict'].includes(culture)) {
                        eqpt.push( "Footsoldier's Outfit" )
                    } else {
                        eqpt.push ("Outfit 1")
                    }
                    let luckItems = rollLuck(1);
                    luckItems.forEach(item=>{eqpt.push(item)})
                    return eqpt;
                },
            }
        break;

        case 'Mercenary Knight':
            bonusObj = {
                'Glory': '6d6+100',
                'reserves.skillPoints': '20',
                'combatSkills.weapons.Sword': '3',
                'combatSkills.weapons.Other weapon': '3',
                'personalityPairs.merciful': '-1d6',
                'personalityPairs.valorous': '1d3',
                'Equipment':()=>{
                    let eqpt=[];
                    if (['Roman'].includes(culture)) {
                        eqpt.push( "Outfit 3" )
                    } else {
                        eqpt.push ("Outfit 2")
                    }
                    let luckItems = rollLuck(1);
                    luckItems.forEach(item=>{eqpt.push(item)})
                    return eqpt;
                },
            }
        break;

        case 'Warrior':
            bonusObj = {
                'Glory': '6d6+50',
                'reserves.skillPoints': '24',
                'skills.Awareness': '2',
                'combatSkills.weapons.Spear': '2',
                'combatSkills.weapons.Cultural Weapon': '3',
                'personalityPairs.Modest': '-1',
                'personalityPairs.Prudent': '-1d3',
                'personalityPairs.Valorous': '1d3+2',
                'passions.Honour': '1d6',
                'passions.Loyalty (Lord)': '3',
                'Equipment':()=>{
                    let eqpt=[];
                    eqpt.push( "Cultural Warrior Outfit" )
                    let luckItems = rollLuck(1);
                    luckItems.forEach(item=>{eqpt.push(item)})
                    return eqpt;
                },
            }
        break;

        case 'Family Chieftain':
            bonusObj = {
                'Glory': '2d6+100',
                'reserves.skillPoints': '28',
                'combatSkills.weapons.Cultural Weapon': '2',
                'passions.Love (family)': '1d3',
                'personalityPairs.Valorous': '1d3',
                'passions.Honour': '1d3',
                'passions.Loyalty (Lord)': '1d3+3',
                'Equipment':()=>{
                    let eqpt=[];
                    eqpt.push( "Cultural Warrior Outfit" )
                    let luckItems = rollLuck(1);
                    luckItems.forEach(item=>{eqpt.push(item)})
                    return eqpt;
                },
            }

        break;

        case 'Tribal or Clan Chieftain':
            bonusObj = {
                'Glory': '6d6+250',
                'reserves.skillPoints': '30',
                'combatSkills.weapons.Cultural Weapon': '3',
                'personalityPairs.Valorous': '1d3',
                'passions.Loyalty (Clan)': '2d6+6',
                'passions.Honour': '1d6',
                'Equipment':()=>{
                    let eqpt=[];
                    eqpt.push( "Cultural Warrior Outfit" )
                    let luckItems = rollLuck(1);
                    luckItems.forEach(item=>{eqpt.push(item)})
                    return eqpt;
                },
            }
        break;

        case 'Bachelor Knight':
            bonusObj = {
                'Glory': '6d6+250',
                'reserves.skillPoints': '26',
                'personalityPairs.Valorous': '1',
                'passions.Loyalty (Lord)': '3',
                'passions.Honour': '1',
                'Equipment':()=>{
                    let eqpt=[];
                    if (['Irish', 'Pict', 'French', 'Saxon'].includes(culture)) {
                        eqpt.push( "Outfit 2" )
                    } else {
                        eqpt.push ("Outfit 3")
                    }
                    let luckItems = rollLuck(1);
                    luckItems.forEach(item=>{eqpt.push(item)})
                    return eqpt;
                },
            }
        break;

        case 'Vassal Knight':
            bonusObj =  {
                'Glory': '6d6+250',
                'reserves.skillPoints': '30',
                'personalityPairs.Valorous': '2',
                'passions.Loyalty (Lord)': '4',
                'passions.Honour': '1',
                'Equipment':()=>{
                    let eqpt=[];
                    if (['Irish', 'Pict', 'French', 'Saxon'].includes(culture)) {
                        eqpt.push( "Outfit 2" )
                    } else {
                        eqpt.push ("Outfit 3")
                    }
                    let luckItems = rollLuck(1);
                    luckItems.forEach(item=>{eqpt.push(item)})
                    return eqpt;
                }
            }
        break;

        case 'Banneret Knight':
            bonusObj = {
                'Glory': '6d6+250',
                'reserves.skillPoints': '32',
                'personalityPairs.Valorous': '3',
                'passions.Loyalty (Lord)': '5',
                'passions.Honour': '1d3',
                'Equipment':()=>{
                    let eqpt=[];
                    if (['Irish', 'Pict', 'French', 'Saxon'].includes(culture)) {
                        eqpt.push( "Outfit 2" )
                    } else {
                        eqpt.push ("Outfit 3")
                    }
                    let luckItems = rollLuck(2);
                    luckItems.forEach(item=>{eqpt.push(item)})
                    return eqpt;
                },
            }
        break;

        case 'Seneschal':
            bonusObj = {
                'Glory': '6d6+300',
                'reserves.skillPoints': '28',
                'personalityPairs.Valorous': '1',
                'passions.Loyalty (Lord)': '4',
                'passions.Honour': '1d3',
                'skills.Stewardship': '5',
                'skills.Intrigue': '3',
                'passions.Hospitality': '1d3',
                'Equipment':()=>{
                    let eqpt=[];
                    if (['French', 'Saxon'].includes(culture)) {
                        eqpt.push( "Outfit 3" )
                    } else {
                        eqpt.push ("Outfit 4")
                    }
                    let luckItems = rollLuck(1);
                    luckItems.forEach(item=>{eqpt.push(item)})
                    return eqpt;
                },
            }
        break;

        case 'Marshal':
            bonusObj = {
                'Glory': '6d6+300',
                'reserves.skillPoints': '28',
                'personalityPairs.Valorous': '1d3+1',
                'passions.Loyalty (Lord)': '4',
                'passions.Honour': '1d3',
                'skills.Battle': '5',
                'Equipment':()=>{
                    let eqpt=[];
                    if (['French', 'Saxon'].includes(culture)) {
                        eqpt.push( "Outfit 3" )
                    } else {
                        eqpt.push ("Outfit 4")
                    }
                    let luckItems = rollLuck(1);
                    luckItems.forEach(item=>{eqpt.push(item)})
                    return eqpt;
                },
            }
        break;

        case 'Butler':
            bonusObj = {
            'Glory': '6d6+300',
            'reserves.skillPoints': '28',
            'personalityPairs.Generous': '3',
            'personalityPairs.Valorous': '1',
            'passions.Loyalty (Lord)': '4',
            'passions.Honour': '1d3',
            'skills.Courtesy': '2',
            'Equipment':()=>{
                let eqpt=[];
                if (['French', 'Saxon'].includes(culture)) {
                    eqpt.push( "Outfit 3" )
                } else {
                    eqpt.push ("Outfit 4")
                }
                let luckItems = rollLuck(1);
                luckItems.forEach(item=>{eqpt.push(item)})
                return eqpt;
            },
        }
        break;

        case 'Chamberlain':
            bonusObj = {
            'Glory': '6d6+300',
            'reserves.skillPoints': '28',
            'personalityPairs.Valorous': '1',
            'passions.Loyalty (Lord)': '4',
            'passions.Honour': '1d3',
            'skills.Read (Latin)': '5',
            'skills.Heraldry': ()=>{if (['Uther','Anarchy'].includes(period)) { return '0' } else {return '3'}},
            'skills.Recognise': ()=>{if (['Uther','Anarchy'].includes(period)) { return '3' } else {return '0'}},

            'Equipment':()=>{
                let eqpt=[];
                if (['French', 'Saxon'].includes(culture)) {
                    eqpt.push( "Outfit 3" )
                } else {
                    eqpt.push ("Outfit 4")
                }
                let luckItems = rollLuck(1);
                luckItems.forEach(item=>{eqpt.push(item)})
                return eqpt;
            },
        }
        break;

        case 'Constable':
        bonusObj = {
            'Glory': '6d6+300',
            'reserves.skillPoints': '28',
            'personalityPairs.Valorous': '1',
            'passions.Loyalty (Lord)': '4',
            'passions.Honour': '1d3',
            'skills.Tourney': ()=>{if (['Uther','Anarchy'].includes(period)) { return '0' } else {return '5'}},
            'skills.Battle': ()=>{if (['Uther','Anarchy'].includes(period)) { return '3' } else {return '0'}},
            'skills.Horsemanship': '2',
            'Equipment':()=>{
                let eqpt=[];
                if (['French', 'Saxon'].includes(culture)) {
                    eqpt.push( "Outfit 3" )
                } else {
                    eqpt.push ("Outfit 4")
                }
                let luckItems = rollLuck(1);
                luckItems.forEach(item=>{eqpt.push(item)})
                return eqpt;
            },
        }
        break;

        case 'Forester':
            bonusObj = {
            'Glory': '6d6+300',
            'reserves.skillPoints': '28',
            'personalityPairs.Valorous': '1',
            'passions.Loyalty (Lord)': '4',
            'passions.Honour': '1d3',
            'skills.Awareness': '1d6',
            'skills.Falconry': '2',
            'skills.Hunting': '5',
            'Equipment':()=>{
                let eqpt=[];
                if (['French', 'Saxon'].includes(culture)) {
                    eqpt.push( "Outfit 3" )
                } else {
                    eqpt.push ("Outfit 4")
                }
                let luckItems = rollLuck(1);
                luckItems.forEach(item=>{eqpt.push(item)})
                return eqpt;
            },
        }
        break;

        case 'Castellan':
        bonusObj = {
            'Glory': '6d6+300',
            'reserves.skillPoints': '28',
            'personalityPairs.Valorous': '1',
            'passions.Loyalty (Lord)': '4',
            'passions.Honour': '1d3',
            'skills.Battle': '2',
            'skills.Courtesy': '2',
            'skills.Stewardship': '2',
            'Equipment':()=>{
                let eqpt=[];
                if (['French', 'Saxon'].includes(culture)) {
                    eqpt.push( "Outfit 3" )
                } else {
                    eqpt.push ("Outfit 4")
                }
                let luckItems = rollLuck(1);
                luckItems.forEach(item=>{eqpt.push(item)})
                return eqpt;
            },
        }
        break;

        case 'Lord':
            bonusObj = {
            'Glory': '6d6+300',
            'reserves.skillPoints': '32',
            'skills.Courtesy': '2',
            'skills.Heraldry': ()=>{if (['Uther','Anarchy'].includes(period)) { return '0' } else {return '2'}},
            'skills.Recognise': ()=>{if (['Uther','Anarchy'].includes(period)) { return '2' } else {return '0'}},
            'skills.Intrigue': '2',
            'combatSkills.general.Battle': '2',
            'combatSkills.weapons.Sword': '3',
            'combatSkills.weapons.Spear': '2',
            'passions.Loyalty (Lord)': '6',
            'passions.Honour': '3',
            'personalityPairs.Modest': '-1d3',
            'personalityPairs.Valorous': '1d3',
            'Equipment':()=>{
                let eqpt=[];
                if (['Saxon'].includes(culture)) {
                    eqpt.push( "Outfit 3" )
                } else {
                    eqpt.push ("Outfit 4")
                }
                let luckItems = rollLuck(3);
                luckItems.forEach(item=>{eqpt.push(item)})
                return eqpt;
            },
        }
        break;

}

return ( bonusObj)
}

// SELECT OBJECT :: random selection objects for luck tables, organised by culture (access by object property)
let luckSelect = {
    Cymric:{
        1: ()=>{ return (rollDice('3d20')+' denarii.')},
        3: ()=>{ return (rollDice('3d20+120')+' denarii.')},
        6: '1 Librum.',
        7: ()=>{ return (rollDice('1d3')+' Librum.')},
        8: ()=>{ return (rollDice('1d6')+' Librum.')},
        9: ()=>{ return ("Family heirloom: Christian relic, saint's "+randomSelect({1:'finger', 2:'tears', 4:'hair', 5:'bone fragment', 6:'blood'}).outcome)},
        10: 'Family heirloom: Ancient bronze sword (+1 to Sword skill when used). Breaks as a non-sword in combat due to its weak blade. Worth 2L.',
        11: ()=>{let weapon = 'lance'; if ('Uther','Anarchy'.includes(buildChar.period)) {weapon = 'spear'}; return ('Family heirloom: Blessed '+weapon+' (+1 modifier to Spear skill when used, until broken). Worth 120 denarii.')},
        12: 'Family heirloom: Decorated saddle.',
        13: ()=>{let {outcome:material, rollNum} = randomSelect({2:'silver',3:'gold'});let value = randomSelect({2:'120 d.',3:'2 L.'}, rollNum).outcome;return ('Family heirloom: Engraved '+material+' finger ring worth '+value)},
        14: ()=>{let {outcome:material, rollNum} = randomSelect({5:'silver',6:'gold'});let value = randomSelect({2:'1 L.',3:'8 L.'}, rollNum).outcome;return ('Family heirloom: '+material+' armband worth '+value)},
        15: ()=>{let origin = randomSelect({2: 'Byzantine', 3:'German', 5:'Spanish', 6:'Roman'}).outcome;return ('Family heirloom: Valuable '+origin+' cloak worth 1 L.')},
        16: 'A magical healing potion that heals 1d6 damage once. Priceless.',
        18: 'A charger',
        20: 'reroll'
    },
    Occitanian:{
        1: ()=>{ return (rollDice('3d20')+' denarii.')},
        2: 'Money. 1 Librum.',
        4: ()=>{ return (rollDice('1d3')+' Librum.')},
        5: ()=>{ return (rollDice('1d6')+' Librum.')},
        7: ()=>{ setBonus('Glory','100');return 'Your forebear died heroically: +100 Glory.'},
        10: ()=>{ setBonus('Glory','100'); let value = roll(3); let gens = rollDice('d6+2'); return ('Your ancestor was a Visigoth king ('+gens+' generations back): +100 Glory and a jeweled sword worth '+value+' L.')},
        12: 'A sumpter',
        15: 'A rouncy',
        16: 'A charger',
        17: 'A Barb courser',
        18: 'An Andalusian charger',
        19: 'Upgrade your Outfit by 1',
        20: 'reroll'
    },
    French:{
        1: ()=>{ return (rollDice('3d20')+' denarii.')},
        3: 'Money. 1 Librum.',
        4: ()=>{ return (rollDice('1d3')+' Librum.')},
        5: ()=>{ return (rollDice('1d6')+' Librum.')},
        6: ()=>{ setBonus('Glory','100');return 'Your forebear died heroically: +100 Glory.'},
        10: ()=>{let {material, rollNum} = randomSelect({3:'silver',5:'gold',6:'diamond-mounted silver'});let value = randomSelect({3:'1 L.',5:'3 L.',6:'5 L.'}, rollNum).outcome;return ('Family heirloom: '+material+' brooch worth '+value)},
        13: 'A magical healing potion that heals 1d6 damage once. Priceless.',
        15: 'A sumpter',
        16: 'A rouncy',
        17: 'A charger',
        18: 'An Andalusian charger',
        19: 'Upgrade your Outfit by 1',
        20: 'reroll'
    },
    Irish:{
        1: ()=>{ return (rollDice('3d20')+' denarii.')},
        2: 'Money. 1 Librum.',
        4: ()=>{ setBonus('Glory','100');return 'Your forebear died heroically: +100 Glory.'},
        5: 'A Connaght rouncy',
        10: 'A charger',
        11: 'An Irish courser',
        16: ()=>{ setBonus('Glory','150'); let value = roll(3); let gens = rollDice('d6+2'); return ('Your are a descendant of a king ('+gens+' generations back): +150 Glory')},
        17: ()=>{ let num = roll(3); let p; if (num===1){p=''}else{p='s'} return (num+' magical healing potion'+p+' that heal 1d6 damage. Priceless.')},
        18: 'A love potion. Priceless.',
        19: 'Upgrade your Outfit by 1',
        20: 'reroll'
    },
    Pict:{
        3: ()=>{ return (rollDice('3d20')+' denarii.')},
        4: ()=>{ setBonus('Glory','100');return 'Your forebear died heroically: +100 Glory.'},
        5: 'A rouncy',
        10: 'You bear a magical tattoo that provides 2 points of armor',
        11: ()=>{ let num = roll(3); return ( 'You have a magical charger, +1 movement rate and +'+num+' armor' )},
        12: ()=>{ let num = roll(3); let p; if (num===1){p=''}else{p='s'} return (num+' magical healing potion'+p+' that heal 1d6 damage. Priceless.')},
        13: ()=>{ setBonus('Glory','100');return ('The faeries have gifted you with a magical great spear of impressive power, +2 to Spear skill until broken. +100 Glory. Priceless.')},
        15: ()=>{ let num = roll(6); let p; if (num===1){p=''}else{p='s'} return (num+' magical healing potion'+p+' that heal 1d6 damage. Priceless.')},
        16: ()=>{ let num = roll(3); let p; if (num===1){p=''}else{p='s'} return (num+' love potion'+p+'. Priceless.')},
        19: ()=>{ let num = roll(3); let p; if (num===1){p=''}else{p='s'} return (num+' strong healing potion'+p+' that heals 6 points of damage. Priceless.')},
        20: 'reroll'
    },
    Roman:{
        1: ()=>{ return (rollDice('3d20')+' denarii.')},
        3: 'Money. 1 Librum.',
        4: ()=>{ return (rollDice('1d3')+' Librum.')},
        6: ()=>{ return (rollDice('1d6')+' Librum.')},
        10: ()=>{ setBonus('Glory','100'); let value = roll(3); let gens = rollDice('d6+2'); return ('Your ancestors came to Britain from Rome ('+gens+' generations back): +100 Glory.')},
        12: 'A charger',
        13: 'An Andalusian charger',
        14: 'A Barb courser',
        16: 'A magical healing potion that heals 1d6 damage once. Priceless.',
        18: 'A strong healing potion that heals 6 points of damage once. Priceless.',
        19: 'Upgrade your Outfit by 1',
        20: 'reroll'
    },
    Saxon:{
        3: ()=>{ return (rollDice('3d20')+' denarii.')},
        4: ()=>{ return (rollDice('1d3')+' Librum.')},
        7: ()=>{ setBonus('Glory','100'); return ('Wotan is your ancestor: +200 Glory')},
        10: 'A sumpter',
        11: 'A rouncy',
        13: 'A charger',
        14: 'You have a part-share in a ship. Check with the gamemaster for details.',
        15: 'You have a blessed axe. +1 to Great Axe skill when used. Breaks normally. Worth 2 Librum.',
        18: 'A magical healing potion that heals 1d6 damage once. Priceless.',
        19: 'Upgrade your Outfit by 1',
        20: 'reroll'
    },

}

// BONUS OBJECT :: trait and passion bonus generation objects based on culture (access by object property)
let cultureBonus = {

    French:{
       'personalityPairs.Modest': '12',
       'personalityPairs.Prudent': '-2',
       'personalityPairs.Valorous': '2',
       'directedTraits.Indulgent (wine)': 'd6',
       'passions.Loyalty (Lord)': 'd6',
       'passions.Honour': '1',
    },
    Irish:{
       'personalityPairs.Forgiving': '-2',
       'personalityPairs.Temperate': '-2',
       'personalityPairs.Prudent': '-1',
       'passions.Loyalty (Lord)': '-1d6',
       'passions.Love (family)': 'd6',
       'passions.Honour': '-1'
    },
    Pict:{
       'personalityPairs.Spiritual': '2',
       'personalityPairs.Suspicious': '2',
       'personalityPairs.Merciful': '-1',
       'passions.Love (family)': '2',
       'passions.Hospitality': '1',
       'passions.Honour': '-2'
    },
    Roman:{
       'personalityPairs.Honest': '-2',
       'personalityPairs.Spiritual': '-2',
       'personalityPairs.Modest': '-2',
       'directedTraits.Suspicious (non-Romans)': 'd6',
       'passions.Loyalty (City) or (Emperor)': '3d6'
    },
    Saxon:{
       'personalityPairs.Just': '-2',
       'personalityPairs.Merciful': '-1',
       'personalityPairs.Honest': '2',
       'personalityPairs.Energetic': '1',
       'personalityPairs.Valorous': '1',
       'passions.Loyalty (Lord)': 'd6',
       'passions.Honour': '-1'
    },
    Occitanian:{
       'personalityPairs.Forgiving': '-2',
       'personalityPairs.Temperate': '-2',
       'personalityPairs.Modest': '2',
       'personalityPairs.Spiritual': '-2',
       'directedTraits.Suspicious (religious fanatics)': 'd6',
       'passions.Loyalty (Lord)': '-2',
       'passions.Honour': '1'
    },
}

// BONUS OBJECT :: trait and passion bonus generation objects based on region (access by object property)
let regionBonus = {
    Brittany:{
       'personalityPairs.Energetic': '1',
       'personalityPairs.Modest': '2,',
       'personalityPairs.Prudent': '2',
       'personalityPairs.Valorous': '1',
    },
    Cambria:{
       'personalityPairs.Just': '-2',
       'personalityPairs.Trusting': '-2',
       'personalityPairs.Prudent': '1',
       'personalityPairs.Temperate': '1',
    },
    Cumbria:{
       'personalityPairs.Spiritual': '2',
       'personalityPairs.Honest': '1',
       'passions.Loyalty (Cumbrian lord)': '1d6',
       'passions.Loyalty (non-Cumbrian lord)': '-1d6',
    },
    Cornwall:{
       'personalityPairs.Just': '-2',
       'personalityPairs.Trusting': '-2',
       'personalityPairs.Prudent': '2',
    },
    Ireland:{
       'personalityPairs.Chaste': '-1',
       'personalityPairs.Energetic': '1',
       'personalityPairs.Honest': '2',
       'personalityPairs.Temperate': '2',
    },
    Logres:{
       'personalityPairs.Energetic': '1',
       'personalityPairs.Forgiving': '1',
       'personalityPairs.Honest': '1',
       'personalityPairs.Just': '1',
       'personalityPairs.Trusting': '1',
       'personalityPairs.Valorous': '1',
    },
    'The North':{
       'personalityPairs.Prudent': '2',
       'personalityPairs.Selfish': '2',
       'personalityPairs.Pious': '1',
       'personalityPairs.Temperate': '1',
       'passions.Love (family)': 'd3',
    },
}

// LOCATE OBJECT :: locator arrays for home/period-based bonuses stored in homeBonusesObj. Period group arrays located by home (object property)
let homelandBonusLocate = {
    Ailech:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Bedegraine:[['Uther','Anarchy','Boy King','Conquest'],['Romance','Tournament','Grail Quest','Twilight']],
    Benoic:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Benoit:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Brun:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Caercolun:[['Uther','Anarchy'],['Boy King'],['Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Cambenet:[['Uther','Anarchy'],['Boy King','Conquest'],['Romance','Tournament','Grail Quest','Twilight']],
    Cameliard:[['Uther','Anarchy'],['Boy King','Conquest'],['Romance','Tournament','Grail Quest','Twilight']],
    Carhaix:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Clarence:[['Uther','Anarchy','Boy King','Conquest','Romance'],['Tournament','Grail Quest','Twilight']],
    Colchester:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Connacht:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Cornouailles:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    'Dal Riada':[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Devon:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Dorset:[['Uther','Anarchy','Boy King'],['Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Dumnonie:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Escavalon:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Escoce:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Essex:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Estregales:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Ganis:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Garloth:[['Uther','Anarchy'],['Boy King','Conquest'],['Romance','Tournament','Grail Quest','Twilight']],
    Gloucester:[['Uther','Anarchy','Boy King','Conquest','Romance'],['Tournament','Grail Quest','Twilight']],
    Gomeret:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Gorre:[['Uther','Anarchy'],['Boy King','Conquest'],['Romance','Tournament','Grail Quest','Twilight']],
    Hampshire:[['Uther','Anarchy'],['Boy King','Conquest'],['Romance','Tournament','Grail Quest','Twilight']],
    Hertford:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Huntington:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    'Isle of Wight':[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Jagent:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Kent:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Lambor:[['Uther','Anarchy','Boy King','Conquest','Romance'],['Tournament','Grail Quest','Twilight']],
    Leicester:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Leinster:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Leon:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Lindsey:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Listeneisse:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Lonazep:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    London:[['Uther','Anarchy'],['Boy King','Conquest'],['Romance','Tournament','Grail Quest','Twilight']],
    'Long Isles':[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Lothian:[['Uther','Anarchy','Boy King','Conquest','Romance'],['Tournament','Grail Quest','Twilight']],
    Lyonesse:[['Uther','Anarchy','Boy King','Conquest','Romance'],['Tournament','Grail Quest','Twilight']],
    Malahaut:[['Uther','Anarchy'],['Boy King','Conquest','Romance'],['Tournament','Grail Quest','Twilight']],
    Maris:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Meath:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Munster:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Nohaut:[['Uther','Anarchy','Boy King'],['Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Oriel:[['Uther','Anarchy','Boy King','Conquest'],['Romance','Tournament','Grail Quest','Twilight']],
    Pomitain:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Rydychan:[['Uther','Anarchy','Boy King','Conquest','Romance'],['Tournament','Grail Quest','Twilight']],
    Salisbury:[['Uther','Anarchy'],['Boy King','Conquest','Romance'],['Tournament','Grail Quest','Twilight']],
    Silchester:[['Uther'],['Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Somerset:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Strangorre:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Sugales:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Surluse:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Surrey:[['Uther','Anarchy','Boy King'],['Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Sussex:[['Uther','Anarchy','Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Thamesmouth:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Tintagel:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Totnes:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Tribuit:[['Uther','Anarchy'],['Boy King'],['Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Vannetais:[['Uther','Anarchy','Boy King','Conquest','Romance'],['Tournament','Grail Quest','Twilight']],
    Winchester:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
    Wuerensis:[['Uther','Anarchy'],['Boy King','Conquest','Romance','Tournament','Grail Quest','Twilight']],
 }

// BONUS OBJECT :: trait and passion bonus generation objects based on home (access by object property) and time period (index1 from homeBonusesSelector)
let homelandBonus ={
    Ailech:[
       {
          'passions.Hate Orielmen':'3d6',
       }
    ],
    Bedegraine:[
       {
          'directedTraits.Suspicious of Lindsey':'1d6',
       },
       {
          'directedTraits.Suspicious of Lindsey':'1d6',
          'passions.Hate Norgales Knights':'3d6',
       },
    ],
    Benoic:[
       {
          'directedTraits.Suspicious Cymri':'1d6',
          'directedTraits.Suspicious of Pagans':'1d6',
       },
       {
          'directedTraits.Suspicious of Pagans':'1d6',
       }
    ],
    Benoit:[
       {
          'directedTraits.Suspicious Franks':'1d6',
       },
       {},
    ],
    Brun:[
       {
          'directedTraits.Suspicious of Hertford':'1d6',
       },
       {
          'directedTraits.Suspicious of Faeries':'1d6',
       },
    ],
    Caercolun:[
       {
          'directedTraits.Vengeful of Saxons':'1d6',
          'passions.Hate Angles':'3d6',
       },
       {
          'passions.Hate Angles':'3d6',
       },
       {},
    ],
    Cambenet:[
       {
          'passions.Hate Irish':'3d6',
       },
       {},
       {
          'directedTraits.Trusting of Logres knights':'1d6',
       },
    ],
    Cameliard:[
       {
          'passions.Hate Norgales knights':'3d6',
       },
       {},
       {
          'passions.Amor Guenever':'3d6',
       },
    ],
    Carhaix:[
       {
          'directedTraits.Suspicious of all Bretons':'1d6',
       }
    ],
    Clarence:[
       {
          'passions.Hate Gloucestermen':'3d6',
       },
       {},
    ],
    Colchester:[
       {
          'directedTraits.Vengeful of Saxons':'1d6',
       },
       {},
    ],
    Connacht:[
       {
          'passions.Love Hunting':'3d6',
       }
    ],
    Cornouailles:[
       {
          'passions.Loyalty to the King of Cornwall':'3d6',
       }
    ],
    'Dal Riada':[
       {
          'directedTraits.Proud of Dal Riada':'1d6',
       }
    ],
    Devon:[
       {
          'passions.Hate Irish':'3d6',
       }
    ],
    Dorset:[
       {
          'directedTraits.Suspicious of non-Romans':'1d6',
       },
       {},
    ],
    Dumnonie:[
       {
          'passions.Hate Vannetais':'3d6',
       },
       {
          'directedTraits.Suspicious of Vannetais':'1d6',
       },
    ],
    Escavalon:[
       {
          'directedTraits.Suspicious of Estregales':'1d6',
          'directedTraits.Proud of Escavalon':'1d6',
       },
       {
          'directedTraits.Proud of Escavalon':'1d6',
       },
    ],
    Escoce:[
       {
          'passions.Hate Irish':'3d6',
       }
    ],
    Essex:[
       {
          'directedTraits.Indulgent of alcohol':'1d6',
       }
    ],
    Estregales:[
       {
          'directedTraits.Suspicious of Gomeret':'1d6',
       },
    ],
    Ganis:[
       {
          'directedTraits.Suspicious of French':'1d6',
       }
    ],
    Garloth:[
       {
          'passions.Hate Danes':'3d6',
       },
       {},
       {
          'passions.Hate Saracens':'3d6',
       },
    ],
    Gloucester:[
       {
          'passions.Hate Clarence':'3d6',
       },
    ],
    Gomeret:[
       {},
       {
          'directedTraits.Suspicious of Pendragon':'1d6',
       },
    ],
    Gorre:[
       {
          'passions.Hate Irish':'3d6',
          'directedTraits.Trusting of pagans':'1d6',
       },
       {
          'directedTraits.Trusting of pagans':'1d6',
       },
       {
          'directedTraits.Trusting of pagans':'1d6',
          'directedTraits.Trusting of witches':'1d6',
       },
    ],
    Hampshire:[
       {
          'passions.Hate Saxons':'3d6',
       },
       {
          'directedTraits.Merciful of Saxons':'1d6',
       },
    ],
    Hertford:[
       {
          'passions.Hate Saxons':'3d6',
          'directedTraits.Selfish with food':'1d6',
       },
       {
          'directedTraits.Selfish with food':'1d6',
       },
    ],
    Huntington:[
       {
          'directedTraits.Suspicious Saxons':'1d6',
          'passions.Hate Saxons':'3d6',
       },
       {},
    ],
    'Isle of Wight':[
       {
          'directedTraits.Prudent at Sea':'1d6',
          'directedTraits.Valorous at Sea':'1d6',
       }
    ],
    Jagent:[
       {
          'passions.Hate Cornishmen':'3d6',
       },
       {
          'directedTraits.Suspicious of Cornwall':'1d6',
       },
    ],
    Kent:[
       {
          'passions.Hate Danes':'3d6',
       }
    ],
    Lambor:[
       {
          'directedTraits.Suspicious of Lindsey':'1d6',
       },
       {},
    ],
    Leicester:[
       {
          'directedTraits.Suspicious of of Cymri':'1d6',
       }
    ],
    Leinster:[
       {},
       {
          'passions.Hate Irish Pagans':'3d6',
       },
    ],
    Leon:[
       {
          'directedTraits.Trusting of paying customers':'1d6',
       }
    ],
    Lindsey:[
       {
          'directedTraits.Suspicious of Pendragon':'1d6',
       }
    ],
    Listeneisse:[
        {
            'directedTraits.Suspicious of Foreigners':'1d6',
            'directedTraits.Trust Enchanters':'1d6',
        }
    ],
    Lonazep:[
       {
          'directedTraits.Cowardly with marsh monsters':'1d6',
       }
    ],
    London:[
       {
          'passions.Hate Saxons':'3d6',
       },
       {
          'directedTraits.Suspicious of Saxons':'1d6',
       },
       {},
    ],
    'Long Isles':[
       {
          'directedTraits.Suspicious of Cymri':'1d6',
       }
    ],
    Lothian:[
       {
          'directedTraits.Suspicious of Pendragon':'1d6',
       },
       {
          'passions.Hate Pendragon':'3d6',
       },
    ],
    Lyonesse:[
       {
          'passions.Hate Irish':'3d6',
       }
    ],
    Malahaut:[
       {
          'passions.Hate Angles':'3d6',
          'directedTraits.Suspicious of Pendragon':'1d6',
       },
       {
          'directedTraits.Suspicious of Pendragon':'1d6',
       },
       {},
    ],
    Maris:[
       {
          'passions.Hate Angles':'3d6',
          'passions.Hate trolls':'3d6',
       },
       {
          'passions.Hate trolls':'3d6',
       },
    ],
    Meath:[
       {
          'passions.Hate Pagans':'3d6',
       }
    ],
    Munster:[
       {
          'directedTraits.Trusting of Estregales':'1d6',
       }
    ],
    Nohaut:[
       {
          'passions.Hate Malahaut':'3d6',
          'directedTraits.Suspicious of Malahaut':'1d6',
       },
       {
          'directedTraits.Suspicious of Malahaut':'1d6',
       },
    ],
    Oriel:[
       {},
       {
          'directedTraits.Suspicious of Pendragon':'1d6',
       },
    ],
    Pomitain:[
       {
          'directedTraits.Valorous at Sea':'1d6',
       }
    ],
    Rydychan:[
       {
          'directedTraits.Suspicious of Cambrians':'1d6',
       },
       {},
    ],
    Salisbury:[
       {
          'directedTraits.Suspicious of Silchester':'1d6',
          'passions.Hate Saxons':'3d6',},
       {},
    ],
    Silchester:[
       {},
       {
          'passions.Hate Saxons':'3d6',
       },
    ],
    Somerset:[
       {
          'passions.Hate Irish':'3d6',
          'directedTraits.Cowardly of faeries':'1d6',
       },
       {
          'directedTraits.Cowardly of faeries':'1d6',
       },
    ],
    Strangorre:[
       {
          'passions.Hate Irish':'3d6',
       }
    ],
    Sugales:[
       {
          'directedTraits.Trusting of druids':'1d6',
       }
    ],
    Surluse:[
       {
          'directedTraits.Proud of Irish ways':'1d6',
       }
    ],
    Surrey:[
       {
          'passions.Hate Other Saxons':'3d6',
       },
       {},
    ],
    Sussex:[
       {
          'directedTraits.Indulgent of alcohol':'1d6',
       }
    ],
    Thamesmouth:[
       {
          'passions.Hate Saxons':'3d6',
       },
       {
          'directedTraits.Suspicious of Saxons':'1d6',
       },
       {},
    ],
    Tintagel:[
       {
          'passions.Hate Irish':'3d6',
       },
       {
          'directedTraits.Trusting of Morgan le Fay':'1d6',
       },
    ],
    Totnes:[
       {
          'passions.Hate Irish':'3d6',
          'passions.Hate Giants':'3d6',
       },
       {
          'passions.Hate Giants':'3d6',
       },
    ],
    Tribuit:[
       {},
       {
          'directedTraits.Cowardly of Faeries':'1d6',
       },
       {
          'directedTraits.Cowardly of Faeries':'1d6',
          'directedTraits.Indulgent of fine clothes':'1d6',
       },
    ],
    Vannetais:[
       {
          'passions.Hate French':'3d6',
       },
       {
          'passions.Hate French':'3d6',
          'passions.Hate Brittany':'3d6',
       },
    ],
    Winchester:[
       {
          'directedTraits.Proud of Belgae':'1d6',
       },
       {},
    ],
    Wuerensis:[
       {
          'passions.Hate Cambrians':'3d6',
          'directedTraits.Suspicious of religious fanatics':'1d6',
       },
       {
          'directedTraits.Suspicious of religious fanatics':'1d6',
       },
    ],
}

// CHECK OBJECT :: comparison objects for career quialification, organised by career class (object property)
let qualificationCheck = {
    Footsoldier: {
       'combatSkills.weapons.Great Spear': '10',
       'combatSkills.weapons.Other': '5',
       'personalityPairs.Valorous': '10',
       'passions.Loyalty (Lord)': '10'
    },
    Warrior: {
       'combatSkills.weapons.Cultural': '10',
       'skills.First Aid': '6',
       'personalityPairs.Valorous': '12',
       'passions.Loyalty (Lord)': '10',
       'passions.Honour': '8'
       },
    Sergeant:{
        'combatSkills.weapons.Lance': '10',
        'combatSkills.weapons.Spear': '5',
        'combatSkills.weapons.Other': '10',
        'combatSkills.general.Horsemanship': '10',
        'personalityPairs.Valorous': '10',
        'passions.Loyalty (Lord)': '10'
    },
    Squire: {
       'combatSkills.general.Battle': '1',
       'combatSkills.general.Horsemanship': '6',
       'skills.First Aid': '6',
       'skills.Other': '5',
       'personalityPairs.Valorous': '8',
       'passions.Loyalty (Lord)': '10'
    },
    'Mercenary Knight': {
       'skills.First Aid': '6',
       'combatSkills.weapons.Other': '10',
       'combatSkills.weapons.Lance': '10',
       'combatSkills.weapons.Spear': '5',
       'combatSkills.general.Horsemanship': '10',
       'personalityPairs.Valorous': '12',
       'passions.Loyalty (Lord)': '15',
       'passions.Honour': '5'
    },
    'Knight Errant': {
        'skills.First Aid': '6',
        'combatSkills.weapons.Other': '10',
        'combatSkills.weapons.Lance': '10',
        'combatSkills.weapons.Spear': '5',
        'combatSkills.general.Horsemanship': '10',
        'personalityPairs.Valorous': '12',
        'passions.Loyalty (Lord)': '15',
        'passions.Honour': '5'
    },
    'Bachelor Knight': {
        'combatSkills.weapons.Sword': '10',
        'combatSkills.weapons.Lance': '10',
        'combatSkills.general.Battle': '10',
        'combatSkills.general.Horsemanship': '10',
        'skills.First Aid': '10',
        'skills.Other': '10',
        'skills.Other': '10',
        'personalityPairs.Valorous': '15',
        'passions.Loyalty (Lord)': '15',
        'passions.Honour': '5'
    },
    'Vassal Knight': {
        'combatSkills.weapons.Sword': '10',
        'combatSkills.weapons.Lance': '10',
        'combatSkills.general.Battle': '10',
        'combatSkills.general.Horsemanship': '10',
        'skills.First Aid': '10',
        'skills.Other': '10',
        'skills.Other': '10',
        'personalityPairs.Valorous': '15',
        'passions.Loyalty (Lord)': '15',
        'passions.Honour': '5'
    }
}

let list = {
    period: periodList,
    personalityTrait: personalityTraitList,
    religiousTrait: religiousTraitList,
    culturalWeapon: culturalWeaponList,
}

let locate = {
    homeland: homelandLocate,
    homelandBonus: homelandBonusLocate,
    fatherClass: fatherClassLocate,
    defaultSkill: defaultSkillLocate,
}

let select = {
    gender: genderSelect,
    region: regionSelect,
    homeland: homelandSelect,
    home: homeSelect,
    culture: cultureSelect,
    religion: religionSelect,
    fatherClass: fatherClassSelect,
    officer: officerSelect,
    familyTrait: familyTraitSelect,
    luck: luckSelect,
    potion: potionSelect,
}

let bonus = {
    homeland: homelandBonus,
    region: regionBonus,
    culture: cultureBonus,
    defaultStat: defaultStatBonus,
    defaultSkill: defaultSkillBonus,
    familyTrait: familyTraitBonus,
    fatherClass: fatherClassBonus,
    defaultPassion: defaultPassionBonus,
}

let check = {
    qual: qualificationCheck,
}




// define functions
    function getNested(obj, ...args) {
        return args.reduce((obj, level) => obj && obj[level], obj)
    }

    // function mongoObjectId() {
    //     var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    //     return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
    //         return (Math.random() * 16 | 0).toString(16);
    //     }).toLowerCase();
    // }


    function rollLuck(times){
        let luckCount = times || 1;
        console.log("Rolling luck",luckCount,'times.')
        let luckResults = [];
        for (luckCount; luckCount>0 ; luckCount--){
            console.log("Rolling on",buildChar.culture,"table:",select.luck[buildChar.culture])
            let result = randomSelect(select.luck[buildChar.culture]).outcome
            console.log("Result:",result)
            if (result === 'reroll') {
                console.log("Rerolling twice...")
                luckCount += 2
            } else {
                luckResults.push(result)
            }
        }
        return luckResults
    }

    function getfatherClass(char) {
        let fatherClass = ''
        let fatherClassObj = '';
        // let cultureIndex, periodIndex
        let officer = '';

        let findRegion = char.region
        if (char.culture === 'Saxon') {
            findRegion = 'Saxon'
        }
        let cultureIndex = locateSelectObj(locate.fatherClass,findRegion,char.culture)
        console.log("cultureIndex:",cultureIndex)
        let periodIndex = locateSelectObj(locate.fatherClass,"period",char.period)
        console.log("periodIndex:",periodIndex)

        switch (char.region){
            case "Logres":
                console.log("From Logres...")
                // cultureIndex = locateSelectObj(locate.fatherClass,char.region,char.culture)
                // console.log("cultureIndex:",cultureIndex)
                // periodIndex = locateSelectObj(locate.fatherClass,"period",char.period)
                // console.log("periodIndex:",periodIndex)
                console.log("Looking for select.fatherClass[",char.region,"][",cultureIndex,"][",periodIndex,"]")
                fatherClassObj = select.fatherClass[char.region][cultureIndex][periodIndex]
                console.log("fatherClassObj:",fatherClassObj)
                if (getNested(select.office,"Logres",char.culture,periodIndex)){
                    officer = randomSelect(select.officer["Logres"][char.culture][periodIndex]).outcome;
                    if (officer === 'Illegitimate') {
                        while (officer === 'Illegitimate'){
                            officer = randomSelect(select.officer["Logres"][char.culture][periodIndex]).outcome;
                        }
                        officer = officer+'(Illegitimate)'
                    }
                }
                break;
            case "Cambria":
                console.log("From Cambria...")
                if (getNested(char,'home')==='Sugales') {
                    cultureIndex = locateSelectObj(locate.fatherClass,"The North","Pict")
                    // periodIndex = locateSelectObj(locate.fatherClass,"period",char.period)
                    fatherClassObj = select.fatherClass["The North"][cultureIndex][periodIndex];
                } else {
                //     cultureIndex = locateSelectObj(locate.fatherClass,char.region,char.culture)
                //     periodIndex = locateSelectObj(locate.fatherClass,"period",char.period)
                    fatherClassObj = select.fatherClass[char.region][cultureIndex][periodIndex]
                }
                officer = randomSelect(select.officer["Cambria"][periodIndex]).outcome;
                if (officer === 'Illegitimate') {
                    while (officer === 'Illegitimate'){
                        officer = randomSelect(select.officer["Cambria"][periodIndex]).outcome;
                    }
                    officer = officer+'(Illegitimate)'
                }
                break;

            case "Cumbria":
                console.log("From Cumbria...")
                // cultureIndex = locateSelectObj(locate.fatherClass,char.region,char.culture)
                // periodIndex = locateSelectObj(locate.fatherClass,"period",char.period)
                console.log("Looking for class: culture=",cultureIndex,", period=",periodIndex)
                fatherClassObj = select.fatherClass[char.region][cultureIndex][periodIndex]
                officer = randomSelect(select.officer["Cumbria"][periodIndex]).outcome;
                if (officer === 'Illegitimate') {
                    while (officer === 'Illegitimate'){
                        officer = randomSelect(select.officer["Cumbria"][periodIndex]).outcome;
                    }
                    officer = officer+'(Illegitimate)'
                }
                break;

            case "The North":
                console.log("From The North...")
                // cultureIndex = locateSelectObj(locate.fatherClass,char.region,char.culture)
                fatherClassObj = select.fatherClass[char.region][cultureIndex]
                console.log("Father's class:",fatherClassObj," found in",select.fatherClass[char.region],"at index [",cultureIndex,"][0]")
                break;

            case "Ireland":
                console.log("From Ireland...")
                cultureIndex = 0
                if (getNested(char,'home')==='Meath' || getNested(char,'religion')==='British Pagan' || getNested(char,'culture')==='Pict') {
                    cultureIndex = 1
                }
                fatherClassObj = select.fatherClass[char.region][cultureIndex][0]
                break;

            default:

                console.log("From some other place... (period:",periodIndex,")")
                console.log("Looking for select.fatherClass[",char.region,"][0][",periodIndex,"]")
                fatherClassObj = select.fatherClass[char.region][0][periodIndex]
                officer = randomSelect(select.officer[char.region]).outcome
                if (officer === 'Illegitimate') {
                    while (officer === 'Illegitimate'){
                        officer = randomSelect(select.officer[char.region]).outcome;
                    }
                    officer = officer+'(Illegitimate)'
                }
        }
        console.log("Father's class object:",fatherClassObj)
        fatherClass = randomSelect(fatherClassObj).outcome
        console.log("Father's class:",fatherClass)
        if (fatherClass === 'Lord or Officer') {
            fatherClass = officer;
        }
        return fatherClass;
    }


    function locateHome(homeName){
        console.log("Looking for home:",homeName)
        let result = {homeland: '', region: ''}
        for (let R in select.home) {
            // console.log("R:",R)
            for (let H in select.home[R]) {
                // console.log("H:",select.home[R][H])
                for (let h in select.home[R][H]) {
                    // console.log("H[h]:",select.home[R][H][h])
                    if (select.home[R][H][h]===homeName) {
                        console.log("found in homeland:", H,". region:", R)
                        result = {homeland: H, region: R}
                        return result
                        break;
                    }
                }
            }
        }
        return result
    }

    function locateHomeland(homelandName){
        console.log("Looking for homeland:",homelandName)
        let thisRegion = ''
        select.homeland.forEach((R,iR)=>{
            // console.log("R:",R);
            R.forEach((P,iP)=>{
                // console.log("P:",P);
                for (let H in P) {
                    // console.log("Examining H:",P[H]," in P:",P)
                    if (P[H]===homelandName) {
                        console.log("Homeland found in Region index",iR,"(",R,")")
                        // let regionItems =  Object.keys(locate.homeland);
                        // regionItems.shift();
                        // let periodArrays = []
                        // for (let regionObj in locate.homeland) {
                        //     periodArrays.push(locate.homeland[regionObj].length)
                        // }
                        // periodArrays.shift();
                        // // console.log("regionItems:",regionItems,". periodArrays:",periodArrays)

                        // let periodCount = 0;
                        // let thresholds =[];
                        // for (let i = 0; i< periodArrays.length; i++) {
                        //     // console.log("i:",i,"period:",periodArrays[i],"region:",regionItems[i]);
                        //     periodCount+=periodArrays[i];
                        //     thresholds.push(periodCount)
                        // }
                        // let index = -1
                        // do {
                        //     index++
                        // } while (thresholds[index] < iP)
                        // // console.log("index:",index,", threshold:",thresholds[index],"(perod index:",iP,")")
                        // thisRegion = regionItems[index]

                        thisRegion = locate.homeland.region[iR]
                        console.log("Region found:",thisRegion)
                        return thisRegion;
                        break;
                    }
                }
            })
        })

        return thisRegion
    }

    function readDiceString(diceString){
        // const stringPieces=[];
        const diceNums=[];
        let valChange=0;
        let validDiceString = true;

        function splitString(myString){
            console.log("splitting string:",myString)
            let stringPieces = [];
            if (myString.length>0){
               console.log("myString has length. Examining...")

               if (myString.indexOf("+",1)!==-1){
                   console.log("found '+':",myString.indexOf("+",1))
                   stringPieces.push(myString.slice(0,myString.indexOf("+",1)))
                   console.log("piece added:",stringPieces)
                   let rest = myString.slice(myString.indexOf("+",1))
                   if (rest.length>0){
                      console.log("splitting rest:",rest)
                      stringPieces.push(...splitString(rest))
                   }
               } else if (myString.indexOf("-", 1)!==-1){
                   console.log("found '-':",myString.indexOf("-",1))
                   stringPieces.push(myString.slice(0,myString.indexOf("-",1)))
                   console.log("piece added:",stringPieces)
                   let rest = myString.slice(myString.indexOf("-",1))
                   if (rest.length>0){
                      console.log("splitting rest:",rest)
                      stringPieces.push(...splitString(rest))
                   }
               } else {
                  console.log("No more pieces. Pushing remainder",myString,"to array.")
                   stringPieces.push(myString)
               }

               return stringPieces;
            } else {
               console.log("myString has no length. Returning nothing.")
               return ;
            }

        }
        console.log("diceString:",diceString)
        const stringPieces=splitString(diceString)
        console.log("diceString split:",stringPieces)

        stringPieces.forEach(bit=>{
            console.log("examining bit:",bit)
            let dIndex=-1;
            if (bit.includes("d")) {
                dIndex = bit.indexOf("d")
            } else if (bit.includes("D")) {
                dIndex = bit.indexOf("D")
            }
            // console.log("dIndex:",dIndex)
            if (dIndex>-1) {
                console.log("bit",bit," is a die")
                let extractCount = 1
                let plusMinus = 1
                if (dIndex>0) {
                    extractCount = bit.slice(0,dIndex)
                    if (extractCount[0]==="-") {
                        plusMinus = -1;
                        extractCount = extractCount.slice(1)
                    }
                }

                let extractNum = bit.slice(dIndex+1)


                if (!isNaN(extractNum*plusMinus)) {
                    for (let i=0; i<extractCount; i++) {
                        diceNums.push(extractNum*plusMinus)
                    }
                } else {
                    validDiceString=false
                    console.log("invalid dice string:",bit)
                }
            } else {
               console.log("bit",bit," is a bonus")
                if (!isNaN(bit*1)) {
                    valChange=valChange+(bit*1)
                } else {
                    validDiceString=false
                    console.log("invalid dice string:",bit)
                }
            }
        })
        // console.log("dice:",diceNums,", valChange:",valChange)
        return {dice:diceNums,valChange:valChange,valid:validDiceString}
    }

    function setBonus(entry, value){
        const {dice,valChange,valid} = readDiceString(value);
        let currentVal = _.get(characterData,entry,null)
        console.log("Dice:",dice,", bonus:",valChange)
        if (valid) {
            let updateVal = valChange;
            dice.forEach(die=>{
                updateVal += roll(die)
            })

            console.log("Adding",updateVal,"to",entry)

            if (currentVal) {
                // console.log("found current value:",currentVal)
                _.set(characterData,entry, currentVal+updateVal)
            } else {
                // console.log("did not find a current value.")
                _.set(characterData,entry, updateVal)
            }
        } else {
            if (currentVal) {
                // console.log("found current value:",currentVal)
                _.set(characterData,entry, currentVal+value)
            } else {
                // console.log("did not find a current value.")
                _.set(characterData,entry, value)
            }
        }
    }

    function rollDice(diceString){
        const {dice,valChange,valid} = readDiceString(diceString);
        if (valid) {
            let rollVal = valChange;
            dice.forEach(die=>{
                rollVal += roll(die)
            })

            console.log("Dice",diceString,"rolled:",rollVal)

            return rollVal;
        }
    }

    function roll(die){
        let max = die
        let plusMinus = 1
        if (max < 0){
            max = max*-1;
            plusMinus = -1;
        }
        const rollResult = plusMinus*(Math.floor(Math.random()*max)+1)
        console.log("roll result:",rollResult," on ",plusMinus,"d"+max)
        return rollResult;
    }

    function randomSelect(randomSelectObj, preRoll){
        console.log("randomSelectObj:",randomSelectObj)
        console.log("preRoll:",preRoll)


        if (typeof randomSelectObj === 'function') {
            let thisOutcome = randomSelectObj.call()
            return {outcome: thisOutcome, roll:null}
        } else if (Array.isArray(randomSelectObj)) {
            let rollResult = preRoll || roll(randomSelectObj.length-1)
            let thisOutcome = randomSelectObj[rollResult]
            return {outcome: thisOutcome, roll:rollResult}
        } else if (typeof randomSelectObj !== 'object') {
            console.log("randomSelectObj is not an object. Returning value unchanged")
            return {outcome: randomSelectObj, roll:null}
        } else {
            console.log("key[0] is:",Object.keys(randomSelectObj)[0]*1)
            if ((Object.keys(randomSelectObj)[0]*1) === 'NaN'){
                console.log("Returned object is an object with non-numeric keys")
                console.log("Looking for key:",Object.keys(randomSelectObj)[0],".value is:",buildChar[Object.keys(randomSelectObj)[0]])
                let locateIndex = locateSelectObj(randomSelectObj[0], 'locate', buildChar[Object.keys(randomSelectObj)[0]])
                console.log("Located at index:",locateIndex)
                let thisOutcome = randomSelectObj[0].retrieve[locateIndex]
                return {outcome: thisOutcome, roll:null}

            } else {

            const thresholds = Object.keys(randomSelectObj)
            const outcomes = Object.values(randomSelectObj)

            const thisMax = thresholds[thresholds.length-1]
            let thisRoll
            if (preRoll) {
                thisRoll = preRoll
            } else {
                thisRoll = roll(thisMax)
            }

            // console.log("thisRoll:",thisRoll)
            // console.log("typeof thisRoll:",typeof thisRoll)

            let i = -1
            do {
                i++
            } while (thresholds[i] < (thisRoll))
            // console.log("i:",i,", threshold:",thresholds[i],"(roll:",thisRoll,")")
            let thisOutcome = outcomes[i]


            if (typeof thisOutcome === 'function') {
                console.log("outcome is a function. returning result of function")

                thisOutcome = thisOutcome.call()
            // } else if (Array.isArray(thisOutcome)) {
            //     thisOutcome[1].call()
            //     thisOutcome = thisOutcome[0]
            } else if (typeof thisOutcome === 'object'){
                thisOutcome = randomSelect(thisOutcome).outcome
            }

            console.log("thisOutcome:",thisOutcome, ", (rolled:",thisRoll,")")
            return {outcome: thisOutcome, roll: thisRoll}
            }
        }
    }

    function locateSelectObj(selectorObj, dimension, value) {
        console.log("locating...",value)
        let index = -1;
        if (Array.isArray(selectorObj[dimension])){
            console.log("Object to search:",selectorObj[dimension])
            selectorObj[dimension].forEach((group, groupIndex)=>{
                if (group.includes(value)) {index = groupIndex}
            })
        }
        console.log("Located at",index)
        return index;
    }

        function getHomelandObj(myRegion,myPeriod){
        const region = locateSelectObj(locate.homeland,"region",myRegion);
        const period = locateSelectObj(locate.homeland,myRegion,myPeriod);
        console.log("region:",region,". period:",period)

        console.log("Dimension 2 Array:",select.homeland[region])
        return select.homeland[region][period]
    }

    function reduceSelectObj(selectObj, criteria){
        let criteriaArray = []
        if (Array.isArray(criteria)) {
            criteriaArray = criteria
        } else if (typeof criteria === 'string') {
            criteriaArray.push(criteria)
        } else {
            console.log("criteria is neither an array nor a string")
            return selectObj
        }

        let reducedObj = {}
        criteriaArray.forEach(criterion=>{
            for (let home in selectObj) {
                if (typeof selectObj[home] === 'string'){
                    if (selectObj[home] === criterion) {
                        reducedObj[home] = selectObj[home]
                    }
                } else if (Array.isArray(selectObj[home])) {
                    if (selectObj[home].includes(criterion)){
                        reducedObj[home] = selectObj[home]
                    }
                } else if (typeof selectObj[home] === 'object'){
                    // console.log("selectObj[home] is an object:",selectObj[home])
                    for (let entry in selectObj[home]) {
                        // console.log("selectObj[home][entry]:",selectObj[home][entry],", criterion:",criterion)
                        if (selectObj[home][entry] === criterion) {
                            reducedObj[home] = selectObj[home]
                        }
                    }
                }

            }
        })
        return reducedObj
    }

    function separateString(myString){
        console.log("separateString with myString:",myString)
        let stringPieces = [];
        if (myString.indexOf(".")!=-1){
            stringPieces.push(myString.slice(0,myString.indexOf(".")))
            stringPieces.push(...separateString(myString.slice(myString.indexOf(".")+1)))
        } else {
            stringPieces.push(myString);
        }

        console.log("String Pieces found:",stringPieces)
        return stringPieces;
    }


    // Build Character from randomSelect objects:
    // Select GENDER
    if (!(buildChar.hasOwnProperty("gender"))) { buildChar.gender = randomSelect(select.gender).outcome };
    console.log("BUILDCHAR:: Gender:",buildChar.gender)

    
    // If no preset 'culture' or 'religion'...
    if (!(buildChar.hasOwnProperty("culture")) && !(buildChar.hasOwnProperty("religion"))){
        // Select PERIOD
        if (!(buildChar.hasOwnProperty("period"))) { buildChar.period = randomSelect(list.period).outcome };
        console.log("BUILDCHAR:: Period:",buildChar.period)


        // If there is a preset 'home'
        if (buildChar.hasOwnProperty("home")) {
            console.log("Preset home.")
            // has h: find H, find R
            // Locate HOMELAND and REGION
            let location = locateHome(buildChar.home)
            buildChar.region = location.region;
            buildChar.homeland = location.homeland;
            console.log("BUILDCHAR:: Region and homeland located:",buildChar.region,",",buildChar.homeland)
            // Check randomly generated Period is valid gor given region
            // let periodIsValid = false;
            // let validPeriods = [];
            // locate.homeland[buildChar.region].forEach(periodGroup=>{
            //     if (periodGroup.includes(buildChar.period)){
            //         periodIsValid = true;
            //     } else {
            //         periodGroup.forEach(period=>{
            //             validPeriods.push(period)
            //         })
            //     }
            // });
            // if (!periodIsValid){
            //     buildChar.period=randomSelect(validPeriods).outcome
            // }

        } else {
            // If no preset 'home'
            console.log("No preset home.")
            // If preset 'homeland'
            // does not have h. will select h.
            if (buildChar.hasOwnProperty("homeland")) {
                console.log("Preset homeeland.")
                // has H: find R, select h
                // Locate REGION
                buildChar.region = locateHomeland(buildChar.homeland)
                console.log("BUILDCHAR:: Region located:",buildChar.region)
                // Check randomly generated Period is valid for given region
                // let periodIsValid = false;
                // let validPeriods = [];
                // locate.homeland[buildChar.region].forEach(periodGroup=>{
                //     if (periodGroup.includes(buildChar.period)){
                //         periodIsValid = true;
                //     } else {
                //         periodGroup.forEach(period=>{
                //             validPeriods.push(period)
                //         })
                //     }
                // });
                // if (!periodIsValid){
                //     console.log("Period",buildChar.period,"is invalid for region",buildChar.region)
                //     buildChar.period=randomSelect(validPeriods).outcome
                //     console.log("Period changed to",buildChar.period)

                // }
            } else {
                // If no preset 'homeland'
                console.log("No preset homeland.")

                // does not have h or H. Will select.
                // If no preset 'region'
                // Select REGION
                if (!(buildChar.hasOwnProperty("region"))) {
                    console.log("No preset region.")
                    // does not have R: select R
                    let regionObj = getNested(select.region, buildChar.period)
                    if (regionObj) {buildChar.region = randomSelect(regionObj).outcome}
                    console.log("BUILDCHAR:: Region selected:",buildChar.region)

                    // console.log("Region selected:",buildChar.region)
                }
                // Select HOMELAND
                // has R: select H and h
                console.log("Has (pre?)set region.")
                // Check randomly generated Period is valid for given region
                let periodIsValid = false;
                let validPeriods = [];
                locate.homeland[buildChar.region].forEach(periodGroup=>{
                    if (periodGroup.includes(buildChar.period)){
                        periodIsValid = true;
                    } else {
                        periodGroup.forEach(period=>{
                            validPeriods.push(period)
                        })
                    }
                });
                if (!periodIsValid){
                    console.log("Period",buildChar.period,"is invalid for region",buildChar.region)
                    buildChar.period=randomSelect(validPeriods).outcome
                    console.log("Period changed to",buildChar.period)

                }
                let myHomelandObj = getHomelandObj(buildChar.region,buildChar.period);
                if (myHomelandObj) {buildChar.homeland = randomSelect(myHomelandObj).outcome}
                console.log("BUILDCHAR:: Homeland selected:",buildChar.homeland)
            }
        // Select HOME
            console.log("Selecting Home. Region and homeland:",buildChar.region,",",buildChar.homeland)
            let homeObj = getNested(select.home,buildChar.region,buildChar.homeland)
            if (homeObj) {buildChar.home =  randomSelect(homeObj).outcome} else {buildChar.home=buildChar.homeland}
            console.log("BUILDCHAR:: Home selected:",buildChar.home)
            // Handling culture/regligion exception for Isle of Wight
            if (buildChar.home === 'Isle of Wight' && buildChar.period === 'Uther') {
                buildChar.culture = 'Cymric';
                buildChar.religion = randomSelect({5:'British Christian',6:'British Pagan'}).outcome
                console.log("BUILDCHAR:: Culture & Religion assigned:",buildChar.culture,"&",buildChar.religion)
            }
        }

        // Select CULTURE and RELIGION
        if (buildChar.home !== buildChar.homeland) {
            console.log("Home != Homeland. Will select culture/religion based on HOME")
            let myCultureObj = getNested(select.culture, buildChar.home);
            console.log("myCultureObj:",myCultureObj)
            if (myCultureObj) {
                let cultureInfo = randomSelect(myCultureObj)
                buildChar.culture = randomSelect(myCultureObj).outcome
                if (!(buildChar.hasOwnProperty("religion"))) {
                    buildChar.religion = randomSelect(select.religion[buildChar.home], cultureInfo.roll).outcome
                }
            }

        } else {
            console.log("Home = Homeland. Will select culture based on HOMELAND")
            let myCultureObj = getNested(select.culture,buildChar.homeland);
            if (myCultureObj) {
                let cultureInfo = randomSelect(myCultureObj)
                buildChar.culture = cultureInfo.outcome
                if (!(buildChar.hasOwnProperty("religion"))) {
                    let myReligionObj = getNested(select.religion, buildChar.homeland)
                    if (myReligionObj) {buildChar.religion = randomSelect(myReligionObj, cultureInfo.roll).outcome}
                }
            }
        }
        console.log("Culture:",buildChar.culture,", Religion:",buildChar.religion)

    // If preset 'culture' or 'religion'
    // If preset 'culture'
    // } else if (buildChar.hasOwnProperty("culture") || buildChar.hasOwnProperty("religion")) {
    } else {
        let possibleHomes
        if (buildChar.hasOwnProperty("culture") ) {
            console.log("Has preset culture")
            possibleHomes = Object.keys(reduceSelectObj(select.culture,buildChar.culture))
        } else {
            console.log("Has preset religion")
            possibleHomes = Object.keys(reduceSelectObj(select.culture,buildChar.religion))
        }
    // Build a list of possible homes, homelands, regions and periods
            // let possibleHomes = Object.keys(reduceSelectObj(select.culture,chosenCulture))

            let possibleHomelands = [];
            let possibleRegions = [];
            let possiblePeriods = [];

            let reducedHomesObj = {}
            for (let region in select.home){
                console.log("Checking region:",region,"::",select.home[region])
                let reducedHomesRegionObj = reduceSelectObj(select.home[region], possibleHomes)
                console.log("Region",region,"reduced:",reducedHomesRegionObj)
                let propCount = 0
                for (let prop in reducedHomesRegionObj){
                    if (reducedHomesRegionObj.hasOwnProperty(prop)){
                        ++propCount;
                    }
                }
                if (propCount > 0){
                    reducedHomesObj[region] = reducedHomesRegionObj
                }
            }

            for (let region in reducedHomesObj){
                possibleRegions.push(region);
                Object.keys(reducedHomesObj[region]).forEach(homeland=>{
                    possibleHomelands.push(homeland)
                })
            }

            let reducedHomelandLocator = {}
            let reducedHomelands = []
            possibleRegions.forEach((region, regionIndex)=>{
                let allRegionIndex = locate.homeland.region.indexOf(region)
                locate.homeland[region].forEach((allPeriodGroup,allPeriodGroupIndex)=>{
                    console.log("Checking region:",region,"in periodGroup:",allPeriodGroupIndex,"::",select.homeland[allRegionIndex][allPeriodGroupIndex])
                    let reducedHomelandsObj = reduceSelectObj(select.homeland[allRegionIndex][allPeriodGroupIndex], possibleHomelands)
                    console.log("Region",region,"in periodGroup:",allPeriodGroupIndex,"reduced:",reducedHomelandsObj)
                    let propCount = 0
                    for (let prop in reducedHomelandsObj){
                        if (reducedHomelandsObj.hasOwnProperty(prop)){
                            ++propCount;
                        }
                    }
                    if (propCount > 0){
                        if (!getNested(reducedHomelandLocator,region)){
                            reducedHomelandLocator[region] = [locate.homeland[region][allPeriodGroupIndex]]
                        } else {
                            reducedHomelandLocator[region].push(locate.homeland[region][allPeriodGroupIndex])
                        }
                        locate.homeland[region][allPeriodGroupIndex].forEach(period=>{
                            if (!possiblePeriods.includes(period)){
                                possiblePeriods.push(period);
                            }
                        })
                        if (Array.isArray(reducedHomelands[regionIndex])) {
                            reducedHomelands[regionIndex].push(select.homeland[allRegionIndex][allPeriodGroupIndex])
                        } else {
                            reducedHomelands[regionIndex]=[select.homeland[allRegionIndex][allPeriodGroupIndex]]
                        }

                    }
                })
            })
            reducedHomelandLocator.region = possibleRegions;

            // let reducedRegionsObj = {};
            // console.log("possiblePeriods:",possiblePeriods)
            // for (let period in select.region){
            //     console.log("Period:",period)
            //     if (possiblePeriods.includes(period)){
            //         console.log("Period included in possible periods")
            //         reducedRegionsObj[period]=select.region[period]
            //         console.log("reducedRegionsObj:",reducedRegionsObj)
            //     }
            // } bitsnpieces.js:78 Region Ireland in periodGroup: 0 reduced: {25: "Dal Araide"}

            // let selectedPeriod = randomSelect(possiblePeriods).outcome;
            // let selectedRegion = '';
            // let selectedHomeland = '';
            // let selectedHome = '';

            buildChar.period = randomSelect(possiblePeriods).outcome;
            console.log("BUILDCHAR:: Restricted Period selected:",buildChar.period)
            n=0;
            do {
                // console.log("Random region table:",select.region[buildChar.period])
                buildChar.region = randomSelect(select.region[buildChar.period]).outcome
                // console.log("Random region:",buildChar.region)
                n++
            } while (!(possibleRegions.includes(buildChar.region)) && n < 200)
            console.log("BUILDCHAR:: Restricted Region selected:",buildChar.region)

            let regionIndex = reducedHomelandLocator.region.indexOf(buildChar.region);
            let periodIndex
            reducedHomelandLocator[buildChar.region].forEach((pGroup, pIndex)=>{
                if (pGroup.includes(buildChar.period)){
                    periodIndex = pIndex;
                }
            })
            n=0;
            do {
                // console.log("Random homeland table:",reducedHomelands[regionIndex][periodIndex])
                buildChar.homeland = randomSelect(reducedHomelands[regionIndex][periodIndex]).outcome
                // console.log("Random homeland:",buildChar.homeland)
                n++
            } while (!(possibleHomelands.includes(buildChar.homeland)) && n < 200)
            console.log("BUILDCHAR:: Restricted Homeland selected:",buildChar.homeland)
            n=0
            do {
                buildChar.home = randomSelect(reducedHomesObj[buildChar.region][buildChar.homeland]).outcome
                // console.log("Random home:",buildChar.home)
                n++
            } while (!(possibleHomes.includes(buildChar.home)) && n < 200)
            console.log("BUILDCHAR:: Restricted Home selected:",buildChar.home)


            if (!(buildChar.hasOwnProperty('religion'))) {
                console.log("Religion undefined. Deriving from home/culture")
                let rollForCulture
                n = 0;
                do {
                    console.log("select.culture[buildChar.home]:",select.culture[buildChar.home])
                    rollForCulture = randomSelect(select.culture[buildChar.home])
                    n++;
                } while (!(rollForCulture.outcome === buildChar.culture)  && n < 200)
                buildChar.religion = randomSelect(select.religion[buildChar.home],rollForCulture.roll).outcome
                console.log("BUILDCHAR:: Restricted Relgion selected:",buildChar.religion)
            } else if (!(buildChar.hasOwnProperty('culture'))) {
                console.log("Culture undefined. Deriving from home/religion")
                let rollForReligion
                n=0;
                do {
                    console.log("select.culture[buildChar.home]:",select.culture[buildChar.home])
                    rollForReligion = randomSelect(select.culture[buildChar.home])
                    n++;
                } while (!(rollForReligion.outcome === buildChar.culture)  && n < 200)
                buildChar.culture = randomSelect(select.culture[buildChar.home],rollForReligion.roll).outcome
                console.log("BUILDCHAR:: Restricted Culture selected:",buildChar.culture)

            }



    }

    if (!(buildChar.hasOwnProperty("familyTrait"))) { buildChar.familyTrait = randomSelect(select.familyTrait[buildChar.gender]).outcome };

    console.log("Determining father's class")
    if (!(buildChar.hasOwnProperty("fatherClass"))) {
        console.log("Selecting Father's Class")
        buildChar.fatherClass = getfatherClass(buildChar)
        console.log("BUILDCHAR:: Father's Class selected:",buildChar.fatherClass)
    } else {
        console.log("Father's Class found. Not selecting")

    };

    // Set bonuses based on buildChar values
    console.log("Building character sheet bonuses...")
    console.log("Character sheet before:",characterData)

    console.log("Generating gender stat bonuses...")
    for (let stat in bonus.defaultStat[buildChar.gender]) {
        console.log("Generating stat value:", stat,":", bonus.defaultStat[buildChar.gender][stat])
        // let religionObj = getNested(select.religion, buildChar.homeland)
        //     if (religionObj)
        if (!getNested(buildChar,stat)){
            console.log(stat,"stat not found in Presets.")
            setBonus("statistics."+stat, bonus.defaultStat[buildChar.gender][stat])
            console.log("New stat value:", getNested(characterData,'statistics',stat))
        } else {
            console.log(stat,"stat found in Presets:", buildChar[stat])
            setBonus("statistics."+stat, buildChar[stat])
            console.log("New stat value:", getNested(characterData,'statistics',stat))
        }
    }

    console.log("Applying cultural stat bonuses...")
    for (let stat in bonus.defaultStat[buildChar.culture]) {
        console.log("Applying cultural bonus:", stat,":", bonus.defaultStat[buildChar.culture][stat])
        let statObj = getNested(bonus.defaultStat, buildChar.culture, stat)
            if (statObj) {
                setBonus("statistics."+stat, statObj)
                console.log("New stat value:", getNested(characterData,'statistics',stat))
            }
    }

    console.log("Adding default cultural skills...")
    let skillIndex
    locate.defaultSkill.forEach((group, index)=>{
        if (group.includes(buildChar.period)) {
            skillIndex = index
        }
    })
    let skillsCollection = getNested(bonus.defaultSkill,skillIndex, buildChar.culture, buildChar.gender)
    for (let skill in skillsCollection){
        // console.log("Default skill to add:",skill,":",skillsCollection[skill])
        if (skillsCollection[skill]!=='0'){
            setBonus(skill, skillsCollection[skill])
        }
    }

    console.log("Applying family characteristic bonuses... (",buildChar.familyTrait,")")
    familyTraitBonus[buildChar.familyTrait].call()


    console.log("Applying cultural bonuses to traits and passions... ")
    console.log("culturalBonus Object:",bonus.culture[buildChar.culture])
    let culturalBonusObj = Object.assign({}, getNested(bonus.culture,buildChar.culture))
    console.log("culturalBonusObj extracted:",culturalBonusObj)
    if (culturalBonusObj) {
        for (let cultureBonus in culturalBonusObj) {
            console.log("Bonus",cultureBonus,":",culturalBonusObj[cultureBonus])
            setBonus(cultureBonus, culturalBonusObj[cultureBonus])
        }
    }

    console.log("Applying regional bonuses to traits and passions... ")
    console.log("regionalBonusObj:",bonus.region[buildChar.region])
    let regionalBonusObj = getNested(bonus.region,buildChar.region)
    // console.log("regionalBonusObj extracted:",regionalBonusObj)
    if (regionalBonusObj) {
        for (let regionalBonus in regionalBonusObj) {
            console.log("Bonus",regionalBonus,":",regionalBonusObj[regionalBonus])
            setBonus(regionalBonus, regionalBonusObj[regionalBonus])
        }
    }

    console.log("Locating homeland bonuses...")
    console.log("Homeland:",buildChar.homeland,". Period:",buildChar.period)
    let homelandBonusIndex = locateSelectObj(locate.homelandBonus, buildChar.homeland, buildChar.period)
    console.log("homelandBonusIndex:",homelandBonusIndex)
    if (homelandBonusIndex>-1){
        let homelandBonusObj = getNested(bonus.homeland,buildChar.homeland,homelandBonusIndex)
        console.log("homelandBonusObj:",homelandBonusObj)
        if (homelandBonusObj) {
            console.log("Home bonuses located:",homelandBonusObj)
            for (let homelandBonus in homelandBonusObj) {
                console.log("Bonus",homelandBonus,":",homelandBonusObj[homelandBonus])
                setBonus(homelandBonus, homelandBonusObj[homelandBonus])
            }
        }
    }



    // console.log("Applying inherited bonuses & values... (",buildChar.fatherClass,")")
    let fatherClassModifiers = bonus.fatherClass(buildChar.fatherClass,buildChar.culture,buildChar.period)
    for (let classBonus in fatherClassModifiers){
        let inherit
        // console.log("classBonus:",classBonus)
        if (typeof fatherClassModifiers[classBonus] === 'function') {
            // console.log("classBonus is a function")
            inherit = fatherClassModifiers[classBonus].call()
        } else if (typeof fatherClassModifiers[classBonus] === 'object'){
            // console.log("classBonus is an object")
            inherit = randomSelect(fatherClassModifiers[classBonus]).outcome
        } else {
            // console.log("classBonus isn't an object")
            inherit = fatherClassModifiers[classBonus]
        }
        setBonus(classBonus, inherit)
    }

    console.log("Generating passions...")
    for (let p in bonus.defaultPassion){

        console.log("Setting passions.",p," to",bonus.defaultPassion[p])
        setBonus("passions."+p,bonus.defaultPassion[p])
    }

    console.log("Moving 'Cultural Weapon' points (if any) to relevant waepon")
    let culturalWeaponSkill = getNested(characterData,"combatSkills","weapons","Cultural Weapon");
    if (culturalWeaponSkill) {
        let culturalWeapon = list.culturalWeapon[buildChar.culture]
        characterData.combatSkills.weapons[culturalWeapon] += culturalWeaponSkill
        delete characterData.combatSkills.weapons['Cultural Weapon']
    }

    console.log("Generating personality traits (defaulting to 3d6 method")
    for (let trait of list.personalityTrait.lefthand) {
        setBonus("personalityPairs."+trait, '3d6')
    }
    // console.log("Adding religious trait bonuses (+3)")
    for (let trait of list.religiousTrait[buildChar.religion]) {
        let updateTrait, modifier
        if (list.personalityTrait.righthand.includes(trait)){
            updateTrait = list.personalityTrait.lefthand[list.personalityTrait.righthand.indexOf(trait)]
            modifier = '-3'
        } else {
            updateTrait = trait
            modifier = '3'
        }
        setBonus("personalityPairs."+updateTrait, modifier)
    }

    // console.log("Generating siblings...")
    characterData.family={}
    characterData.family.siblings=[];

    let elderSiblings = roll(6)-1
    let youngerSiblings = roll(6)-1
    let loveLost = 0;

    // console.log("Siblings:",elderSiblings,"older,",youngerSiblings,"younger.")
    for (let s = 0 ; s < elderSiblings; s++){
        characterData.family.siblings[s] = randomSelect(select.gender).outcome;
        // console.log("Sibling:",characterData.family.siblings[s],"Self:",buildChar.gender)
        if (characterData.family.siblings[s]===buildChar.gender) {loveLost += 1}
        // console.log("Love lost:",loveLost)
    }
    characterData.family.siblings.push("Self")
    for (let s = 0 ; s < youngerSiblings; s++){
        characterData.family.siblings[s+elderSiblings+1] = randomSelect(select.gender).outcome;
    }
    // console.log("Setting Son/Daughter Number")
    if (buildChar.gender==="Male") {
        buildChar['Son Number'] = loveLost+1
    } else if (buildChar.gender==="Female") {
        buildChar['Daughter Number'] = loveLost+1
    }
    // console.log("Adjusting Love (Family): -",loveLost)
    setBonus("passions.Love (Family)","-"+loveLost)

    // console.log("Adding personal info to character sheet")
    characterData.personalInfo = buildChar;

    console.log("Character data compiled:",characterData)

    // CHECK CAPPED VALUES
    // console.log("Checking personality traits for exceeded caps:",characterData.personalityPairs)
    for (let trait in characterData.personalityPairs) {
        console.log(trait,":",characterData.personalityPairs[trait])
        if (characterData.personalityPairs[trait] > 19) {
            console.log(trait,"value:",characterData.personalityPairs[trait],"is greater than 19. Capping at 19.")
            characterData.personalityPairs[trait] = 19
        } else if (characterData.personalityPairs[trait] < 1) {
            console.log(trait,"value:",characterData.personalityPairs[trait],"is less than 1. Capping at 1.")
            characterData.personalityPairs[trait] = 1
        }
    }

    // console.log("Checking passions for exceeded caps:",characterData.passions)
    for (let trait in characterData.passions) {

        if (characterData.passions[trait] > 20) {
            console.log(trait,"value:",characterData.passions[trait],"is greater than 20. Capping at 20.")
            characterData.passions[trait] = 20
        }
    }




    // CONVERT TO CHARACTER SHEET FORMAT

    function convertToLVPair(label,value){
        // console.log("convertToLVPair :: Converting",label,":",value)
        // const newId = mongoObjectId()
        // console.log("newId:",newId)
        // let lvObj = {label:label,value:value, _id:newId}
        let lvObj = {label:label,value:value}
        console.log("lvObj:",lvObj)
        return lvObj
    }

    function buildPersonalityTraitObj(trait, value){
        // console.log("buildPersonalityTraitObj :: props:",trait,":",value)
        const newPersonalityTrait = {
            // _id:mongoObjectId(),
            trait1: {
                label: '',
                isTicked: false
            },
            trait2: {
                label: '',
                isTicked: false
            },
            value: 0
        }

        if (personalityTraitList.lefthand.includes(trait)){
            // console.log("personalityTraitList.lefthand includes trait:",trait)
            newPersonalityTrait.trait1.label = trait
            newPersonalityTrait.value = value
            newPersonalityTrait.trait2.label = personalityTraitList.righthand[personalityTraitList.lefthand.indexOf(trait)]
        } else {
            // console.log("personalityTraitList.lefthand does not include trait:",trait)
            newPersonalityTrait.trait2.label = trait
            newPersonalityTrait.value = 20-value
            newPersonalityTrait.trait1.label = personalityTraitList.lefthand[personalityTraitList.righthand.indexOf(trait)]
        }

        return newPersonalityTrait
    }

    // convert personalInfo
    characterSheet.personalInfo = []
    // let personalInfo = []
    for (let item in characterData.personalInfo) {
        characterSheet.personalInfo.push(convertToLVPair(_.startCase(item), characterData.personalInfo[item]))
        // personalInfo.push(convertToLVPair(_.startCase(item), characterData.personalInfo[item]))
    }
    // setCharacterSheet(prev=>({...prev,personalInfo:personalInfo}))

    // convert statistics
    characterSheet.statistics = []
    // let statistics = []
    for (let item in characterData.statistics) {
        characterSheet.statistics.push(convertToLVPair(item, characterData.statistics[item]))
        // statistics.push(convertToLVPair(item, characterData.statistics[item]))
    }
    // setCharacterSheet(prev=>({...prev,statistics:statistics}))

    // convert combatSkills
    characterSheet.combatSkills={general:[],weapons:[]}
    // let combatSkills = {}
    // combatSkills.general = []
    for (let item in characterData.combatSkills.general) {
        characterSheet.combatSkills.general.push(convertToLVPair(item, characterData.combatSkills.general[item]))
        // combatSkills.general.push(convertToLVPair(item, characterData.combatSkills.general[item]))
    }
    characterSheet.combatSkills.weapons = []
    // combatSkills.weapons = []
    for (let item in characterData.combatSkills.weapons) {
        characterSheet.combatSkills.weapons.push(convertToLVPair(item, characterData.combatSkills.weapons[item]))
        // combatSkills.weapons.push(convertToLVPair(item, characterData.combatSkills.weapons[item]))
    }
    // setCharacterSheet(prev=>({...prev,combatSkills:combatSkills}))

    // convert skills
    characterSheet.skills = []
    // let skills = []
    for (let item in characterData.skills) {
        characterSheet.skills.push(convertToLVPair(item, characterData.skills[item]))
        // skills.push(convertToLVPair(item, characterData.skills[item]))
    }
    // setCharacterSheet(prev=>({...prev,skills:skills}))

    // console.log("Converting basic personality trait scores to personality trait objects. pairs:",characterData.personalityPairs)
    characterSheet.personalityTraits = []
    // let personalityTraits = []
    personalityTraitList.lefthand.forEach((trait)=>{
        // console.log("trait:",trait,"value:",characterData.personalityPairs[trait])
        characterSheet.personalityTraits.push(buildPersonalityTraitObj(trait, characterData.personalityPairs[trait]))
        // personalityTraits.push(buildPersonalityTraitObj(trait, characterData.personalityPairs[trait]))
    })

    // add index value to personality trait pairs
    characterSheet.personalityTraits.forEach((trait,index)=>{
    // personalityTraits.forEach((trait,index)=>{
        trait.index=index
    })
    // setCharacterSheet(prev=>({...prev,personalityTraits:personalityTraits}))

    // convert directedTraits
    characterSheet.directedTraits = []
    // let directedTraits = []
    for (let item in characterData.directedTraits) {
        characterSheet.directedTraits.push(convertToLVPair(item, characterData.directedTraits[item]))
        // directedTraits.push(convertToLVPair(item, characterData.directedTraits[item]))
    }
    // setCharacterSheet(prev=>({...prev,directedTraits:directedTraits}))

    // convert passions
    characterSheet.passions = []
    // let passions = []
    for (let item in characterData.passions) {
        characterSheet.passions.push(convertToLVPair(item, characterData.passions[item]))
        // passions.push(convertToLVPair(item, characterData.passions[item]))
    }
    // setCharacterSheet(prev=>({...prev,passions:passions}))

    // convert equipment
    characterSheet.equipment = []
    // let equipment = []
    if (getNested(characterData,"Equipment")) {
        characterData.Equipment.forEach(item=> {
        // characterData.Equipment.forEach(item=> {
            characterSheet.equipment.push(item)
        })
    }
    // setCharacterSheet(prev=>({...prev,equipment:equipment}))

    characterSheet.reserves = characterData.reserves
    // setCharacterSheet(prev=>({...prev,reserves:characterData.reserves}))



    characterSheet.glory = characterData.Glory
    // setCharacterSheet(prev=>({...prev,glory:characterData.Glory}))


    console.log("Character build completed:",characterSheet)
    // props.setSheetDataTemp(characterSheet)
    // setNewCharacter(characterSheet)

return characterSheet
}

export {
    newChar,
    verification,
}

// export const verfication = 'verfication'
// export default newChar
