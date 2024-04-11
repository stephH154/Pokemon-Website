const types = {
    normal: {
        strong: [],
        weak: ["rock", "steel"],
        immune: ["ghost"]
    },
    fire: {
        strong: ["grass", "ice", "bug", "steel"],
        weak: ["fire", "water", "rock", "dragon"],
        immune: []
    },
    water: {
        strong: ["fire", "ground", "rock"],
        weak: ["water", "grass", "dragon"],
        immune: []
    },
    electric: {
        strong: ["water", "flying"],
        weak: ["electric", "grass", "dragon"],
        immune: ["ground"]
    },
    grass: {
        strong: ["water", "ground", "rock"],
        weak: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
        immune: []
    },
    ice: {
        strong: ["grass", "ground", "flying", "dragon"],
        weak: ["fire", "water", "ice", "steel"],
        immune: []
    },
    fighting: {
        strong: ["normal", "ice", "rock", "dark", "steel"],
        weak: ["poison", "flying", "psychic", "bug", "fairy"],
        immune: ["ghost"]
    },
    poison: {
        strong: ["grass", "fairy"],
        weak: ["poison", "ground", "rock", "ghost"],
        immune: ["steel"]
    },
    ground: {
        strong: ["fire", "electric", "poison", "rock", "steel"],
        weak: ["grass", "bug"],
        immune: ["flying"]
    },
    flying: {
        strong: ["grass", "fighting", "bug"],
        weak: ["electric", "rock", "steel"],
        immune: []
    },
    psychic: {
        strong: ["fighting", "poison"],
        weak: ["psychic", "steel"],
        immune: ["dark"]
    },
    bug: {
        strong: ["grass", "psychic", "dark"],
        weak: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"],
        immune: []
    },
    rock: {
        strong: ["fire", "ice", "flying", "bug"],
        weak: ["fighting", "ground", "steel"],
        immune: []
    },
    ghost: {
        strong: ["psychic", "ghost"],
        weak: ["dark"],
        immune: ["normal"]
    },
    dragon: {
        strong: ["dragon"],
        weak: ["steel"],
        immune: ["fairy"]
    },
    dark: {
        strong: ["psychic", "ghost"],
        weak: ["fighting", "dark", "fairy"],
        immune: []
    },
    steel: {
        strong: ["ice", "rock", "fairy"],
        weak: ["fire", "water", "electric", "steel"],
        immune: ["poison"]
    },
    fairy: {
        strong: ["fighting", "dragon", "dark"],
        weak: ["fire", "poison", "steel"],
        immune: []
    }
};

module.exports = types;