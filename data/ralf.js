module.exports = {
  "charName" : "Ralf McBeardsly",
  "charInfo" : {
    "class" : "Bard",
    "level" : 6,
    "background" : "Beard",
    "race" : "Gnome",
    "alignment" : "Chaotic Good",
    "xp" : 12480
  },
  "charTraits" : {
    "personalityTraits" : "Party always. No Exceptions.",
    "ideals" : "Why can't we all just be friends? And Drink!",
    "bonds" : "My luscious, wavy, wiry, prehensile, tree of a beard. ",
    "flaws" : "None? Maybe just being too awesome, or not enough beard."
  },
  "charClassSlots" : [
    {
      "name" : "Spell Slots lvl 1",
      "amount" : 4
    },
    {
      "name" : "Spell Slots lvl 2",
      "amount" : 2
    }
  ],
  "charAbilities" : {
    "str" : {
      "score" : 9,
      "mod" : -1
    },
    "dex" : {
      "score" : 12,
      "mod" : 1
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
      "score" : 18,
      "mod" : 4
    }
  },
  "charSavingThrows" : {
    "str" : {
      "score" : 5,
      "derivatives" : [
        {
          "name" : "Racial Bonus",
          "bonus" : 3
        },
        {
          "name" : "Ability Score Mod",
          "bonus" : 2
        }
      ]
    },  
    "dex" : { 
      "score" : -1,
      "derivatives" : []
    },
    "con" : {
      "score" : 4,
      "derivatives" : []
    },
    "int" : {
      "score" : 0,
      "derivatives" : []
    },
    "wis" : {
      "score" : 1,
      "derivatives" : []
    },
    "cha" : {
      "score" : 2,
      "derivatives" : []
    }
  },
  "charProficiencyBonus" : {
    "score" : 2,
    "derivatives" : []
  },
  "charPassivePerception" : {
    "score" : 13,
    "derivatives" : []
  },
  "charArmorClass" : {
    "score" : 17,
    "derivatives" : [
      {
        "name" : "Feat - Mage Armor",
        "bonus" : 1
      },
      {
        "name" : "Armor (Cloth)",
        "bonus" : 3
      }
    ]
  },
  "charInitiative" : {
    "score" : -1,
    "derivatives" : []
  },
  "charSpeed" : {
    "score" : 30,
    "derivatives" : []
  },
  "charHitPoints" : {
    "current" : 27,
    "maximum" : 32,
    "temporary" : 2,
    "hitDiceTotal" : "1d10",
    "deathSaves" : {
      "successes" : 0,
      "failures" : 0
    },
    "derivatives" : []
  },
  "charAttacks" : [
    {
      "name" : "Majestic Word",
      "desc" : "Cause ally in 5 sqrs to use healing surge + CHA mod + CHA mod Temp hp."
    },
    {
      "name" : "Misdirected Mark",
      "desc" : "Cha vs Ref; Make Enemy marked by other ally."
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
        "desc" : "Simple cloth armor. Covers all the important parts... +3 to AC."
      },
      {
        "name" : "Lyre of the Bearded Tree Goddess",
        "desc" : "A Lyre made from the branch of the Elder Tree and strings made from the stray beard hairs of the lovliest Tree Goddess. +1 to attack rolls."
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
      }
    ],
    "proficiencies" : [
      {
        "name" : "All Armor",
        "desc" : "Training in all armor"
      },
      {
        "name" : "Musical Instruments",
        "desc" : "Your musical talent is limitless!"
      }
    ]
  },
  "charSkills" : {
    "Acrobatics" : {
      "mod" : "dex", 
      "trained" : false,
      "score" : 4,
      "derivatives" : [
        {
          "name" : "Dexterity Mod",
          "bonus": 1
        },
        {
          "name" : "Prehensile Beard",
          "bonus": 3
        }
      ]
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
      "score" : 1,
      "derivatives" : []
    },
    "Deception" : {
      "mod" : "cha",
      "trained" : false,
      "score" : 4,
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
      "trained" : false,
      "score" : 4,
      "derivatives" : []
    },
    "Intimidation" : {
      "mod" : "cha",
      "trained" : false,
      "score" : 4,
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
      "trained" : false,
      "score" : 4,
      "derivatives" : []
    },
    "Nature" : {
      "mod" : "int",
      "trained" : false,
      "score" : 3,
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
      "score" : 4,
      "derivatives" : []
    },
    "Persuasion" : {
      "mod" : "cha",
      "trained" : false,
      "score" : 4,
      "derivatives" : []
    },
    "Religion" : {
      "mod" : "int",
      "trained" : false,
      "score" : 3,
      "derivatives" : []
    },
    "Sleight of Hand" : {
      "mod" : "dex",
      "trained" : false,
      "score" : 1,
      "derivatives" : []
    },
    "Stealth" : {
      "mod" : "dex",
      "trained" : false,
      "score" : 1,
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
      "name" : "Distant Advantage",
      "desc" : "Allows attacker to gain advantage on a ranged enemey who is flanked by two players."
    },
    {
      "name" : "Toughness",
      "desc" : "Add a bunch of HP to your current HP"
    }
  ]
};