module.exports = {
  "charName" : "Wan Meng",
  "charInfo" : {
    "class" : "Monk",
    "level" : 5,
    "background" : "Hermit",
    "race" : "Human",
    "alignment" : "Lawful Neutral",
    "xp" : 6500
  },
  "charTraits" : {
    "personalityTraits" : "I contemplate the reason for living each day during meditation; The meaning of life. I strive to pursue one goal each day.",
    "ideals" : "One should act according to tradition. Straying from one's past brings dishonor and ruin. There's always another way...",
    "bonds" : "Seeing my people ravaged and my loved ones killed, I entered seclusion to contemplate my sorrow and seek meaning for surviving.",
    "flaws" : "While I try to live acording to my peaceful traditions, a great wrath burns in my heart where love and my people should be. Sometimes that wrath surfaces..."
  },
  "charClassCharges" : [
    {
      "name" : "Ki",
      "desc" : "Do cool stuff with your inner power!",
      "charges" : 5
    }
  ],
  "charSpellSlots" : [],
  "charAbilities" : {
    "str" : {
      "score" : 11,
      "mod" : 0
    },
    "dex" : {
      "score" : 19,
      "mod" : 4
    },
    "con" : {
      "score" : 14,
      "mod" : 2
    },
    "int" : {
      "score" : 16,
      "mod" : 3
    },
    "wis" : {
      "score" : 18,
      "mod" : 4
    },
    "cha" : {
      "score" : 11,
      "mod" : 0
    }
  },
  "charSavingThrows" : {
    "str" : {
      "score" : 3,
      "proficient" : true,
      "derivatives" : []
    },  
    "dex" : { 
      "score" : 7,
      "proficient" : true,
      "derivatives" : []
    },
    "con" : {
      "score" : 2,
      "proficient" : false,
      "derivatives" : []
    },
    "int" : {
      "score" : 3,
      "proficient" : false,
      "derivatives" : []
    },
    "wis" : {
      "score" : 4,
      "proficient" : false,
      "derivatives" : []
    },
    "cha" : {
      "score" : 0,
      "proficient" : false,
      "derivatives" : []
    }
  },
  "charProficiencyBonus" : {
    "score" : 3,
    "derivatives" : []
  },
  "charPassivePerception" : {
    "score" : 14,
    "derivatives" : []
  },
  "charArmorClass" : {
    "score" : 18,
    "derivatives" : []
  },
  "charInitiative" : {
    "score" : 4,
    "derivatives" : []
  },
  "charSpeed" : {
    "score" : 50,
    "derivatives" : []
  },
  "charHitPoints" : {
    "current" : 37,
    "maximum" : 37,
    "temporary" : 0,
    "hitDiceTotal" : "5d8",
    "deathSaves" : {
      "successes" : 0,
      "failures" : 0
    },
    "derivatives" : []
  },
  "charAttacks" : [
    {
      "name" : "Unarmed Attack",
      "desc" : "Use monk table attack 1d6 + DEX"
    },
    {
      "name" : "Monk Weapon",
      "desc" : "Use Monk Weapon (+1 Monk Staff); 1d8 + DEX + 1"
    },
    {
      "name" : "Flurry of Blows",
      "desc" : "Immediately after you take the Attack action on your turn, you can spend 1 ki point to make two unarmed strikes as a bonus action."
    },
    {
      "name" : "Patient Defense",
      "desc" : "You can spend 1 ki point to take the Dodge action as a bonus action on your turn."
    },
    {
      "name" : "Step of the Wind",
      "desc" : "You can spend 1 ki point to take the Disengage or Dash action as a bonus action on your turn, and your jump distance is doubled for the turn."
    }
  ],
  "charEquipment" : {
    "money" : {
      "cp" : 0,
      "sp" : 0,
      "ep" : 0,
      "gp" : 1337,
      "pp" : 0
    },
    "otherEquipment" : [
      {
        "name" : "Cloth Armor",
        "desc" : "Simple cloth armor. Covers all the important parts."
      },
      {
        "name" : "Lyre of the Bearded Tree Goddess",
        "desc" : "A Lyre made from the branch of the Elder Tree and strings made from the stray beard hairs of the lovliest Tree Goddess."
      },
      {
        "name" : "+1 Monk Staff",
        "desc" : "Monk weapon; use DEX; 1d8 bludgeoning; A basic wooden quarterstaff that I have made using the knowledge of my people."
      }
    ]
  },
  "charOtherProficiencies" : {
    "languages" : [
      {
        "name" : "Common",
        "desc" : "Everyone speaks it!"
      },
      {
        "name" : "Tree Speech",
        "desc" : "WssooWssooWssooWssooWsso"
      },
      {
        "name" : "Elvish",
        "desc" : "Old dudes talk"
      },
      {
        "name" : "Dwarfish",
        "desc" : "Mountain dudes talk"
      }
    ],
    "proficiencies" : [
      {
        "name" : "Herbalism Kit",
        "desc" : "For making poultices and stuff"
      },
      {
        "name" : "Alchemist Supplies",
        "desc" : "For making potions and stuff"
      },
      {
        "name" : "Simple Weapons / Short swords",
        "desc" : "For defense and surviving"
      }
    ]
  },
  "charSkills" : {
    "Acrobatics" : {
      "mod" : "dex", 
      "trained" : true,
      "score" : 7,
      "derivatives" : []
    },
    "Animal Handling" : {
      "mod" : "wis",
      "trained" : false,
      "score" : 4,
      "derivatives" : []
    },
    "Arcana" : {
      "mod" : "int",
      "trained" : false,
      "score" : 3,
      "derivatives" : []
    },
    "Athletics" : {
      "mod" : "str",
      "trained" : false,
      "score" : 0,
      "derivatives" : []
    },
    "Deception" : {
      "mod" : "cha",
      "trained" : false,
      "score" : 0,
      "derivatives" : []
    },
    "History" : {
      "mod" : "int",
      "trained" : false,
      "score" : 3,
      "derivatives" : []
    },
    "Insight" : {
      "mod" : "wis",
      "trained" : true,
      "score" : 7,
      "derivatives" : []
    },
    "Intimidation" : {
      "mod" : "cha",
      "trained" : false,
      "score" : 0,
      "derivatives" : []
    },
    "Investigation" : {
      "mod" : "int",
      "trained" : false,
      "score" : 3,
      "derivatives" : []
    },
    "Medicine" : {
      "mod" : "wis",
      "trained" : true,
      "score" : 7,
      "derivatives" : []
    },
    "Nature" : {
      "mod" : "int",
      "trained" : true,
      "score" : 6,
      "derivatives" : []
    },
    "Perception" : {
      "mod" : "wis",
      "trained" : false,
      "score" : 4,
      "derivatives" : []
    },
    "Performance" : {
      "mod" : "cha",
      "trained" : false,
      "score" : 0,
      "derivatives" : []
    },
    "Persuasion" : {
      "mod" : "cha",
      "trained" : false,
      "score" : 0,
      "derivatives" : []
    },
    "Religion" : {
      "mod" : "int",
      "trained" : true,
      "score" : 6,
      "derivatives" : []
    },
    "Sleight of Hand" : {
      "mod" : "dex",
      "trained" : false,
      "score" : 4,
      "derivatives" : []
    },
    "Stealth" : {
      "mod" : "dex",
      "trained" : false,
      "score" : 4,
      "derivatives" : []
    },
    "Survival" : {
      "mod" : "wis",
      "trained" : false,
      "score" : 4,
      "derivatives" : []
    }
  },
  "charFeatures" : [
    {
      "name" : "Unarmored Defense",
      "desc" : "While not wearing armor or shield, AC is 10 + DEX + WIS"
    },
    {
      "name" : "Martial Arts",
      "desc" : "While wielding Monk Weapon: can use DEX for attack and damage rolls, roll 1d6 for unarmed strike or monk weapon (see monk table for higher levels), on Attack action with Monk Weapon can make on unarmed strike as a bonus action"
    },
    {
      "name" : "Ki",
      "desc" : "(See monk table for amount) Saving throw against Ki DC = 8 + PROF + WIS"
    },
    {
      "name" : "Unarmored Movement",
      "desc" : "Speed + 10 feet when not wearing armor or shield: see monk table for higher increase"
    },
    {
      "name" : "Monastic Tradition",
      "desc" : "I chose to follow the Way of the Open Palm tradition"
    },
    {
      "name" : "Open Hand Technique",
      "desc" : "When I hit with Flurry of Blows can do one on target: Make a DEX save or be prone, Make STR save or I push it 15 feet away, It cannot take reactions until end of my next turn"
    },
    {
      "name" : "Deflect Missiles",
      "desc" : "Use reaction to deflect or catch missile when hit by ranged attack. Reduce damage by 1d10 + DEX + Monk Level; if damage reduces to 0, catch it. Can spend 1 kip point to make a ranged attack with it with proficiency and counts as Monk Weapon"
    },
    {
      "name" : "Ability Score Improvement",
      "desc" : "Added to DEX and WIS"
    },
    {
      "name" : "Slow Fall",
      "desc" : "Use reaction whn falling to reduce damage equal to 5 times Monk Level"
    },
    {
      "name" : "Extra Attack",
      "desc" : "Attack twice, instead of once, when I take an Attack action on my turn"
    },
    {
      "name" : "Stunning Strike",
      "desc" : "Spend 1 ki point to attempt to stun; creatures takes CON save or be stunned until end of my next turn"
    }
  ]
};