const storeState = () => {
	let currentState = {};
	return (stateChangeFunction = state => state) => {
		const newState = stateChangeFunction(currentState);
		currentState = { ...newState };
		return newState;
	};
};

const stateControl = storeState();

const changeLevelState = (prop) => {
	return (value) => {
		return (state) => ({
			...state,
			[prop]: (state[prop] || 0) + value
		});
	};
};

const changeNameState = (prop) => {
	return (value) => {
		return (state) => ({
			...state,
			[prop]: (state[prop]) = value
		});
	};
};

const levelUp = changeLevelState("level")(1);

$(document).ready(function () {

	const allPokemon = ["Pikachu", "Mew", "Dragonite"]
	let randPokemon;

	$("#grass-walk").click(function() {
		$(".post-encounter").hide();
		const encounterChance = Math.floor(Math.random() * 2);

		if (encounterChance == 1)
		{
			randPokemon = allPokemon[Math.floor(Math.random() * allPokemon.length)];
			$("#wild-pokemon-message").text(`A wild ${randPokemon} appeared!`);
			$(".no-encounter").hide();
			$(".encounter").show();
			console.log(`A wild ${randPokemon} appeared!`);
		}
		else
		{
			showFightResult("no encounter");
			console.log("No encounter...");
		}
	});

	$("#fight").click(function() {
		const hitChance = Math.floor(Math.random() * 2);

		if (hitChance == 1)
		{
			showFightResult("hit");
			const newLevelState = stateControl(levelUp);
			$("#level-value").text(newLevelState.level);
		}
		else
		{
			showFightResult("miss");
		}
	});

	$("#capture").click(function() {
		showFightResult("capture");
		const name = changeNameState("name")(randPokemon);
		const newNameState = stateControl(name);
		const level = changeLevelState("level")(Math.floor((Math.random() * 50) + 1));
		console.table(level);
		const newLevelState = stateControl(level);
		$("#name-value").text(newNameState.name);
		$("#level-value").text(newLevelState.level);
		$(".pokemon-details").show();
		console.log(`Captured ${randPokemon}!`);
	});

	function showFightResult(result)
	{
		if (result == "hit")
		{
			$("#fight-result-message").text(`You defeated ${randPokemon}!`);
		}
		else if (result == "miss")
		{
			$("#fight-result-message").text(`Your attack missed! The ${randPokemon} fled!`);
		}
		else if (result == "capture")
		{
			$("#fight-result-message").text(`You captured ${randPokemon}!`);
		}
		else if (result == "no encounter")
		{
			$("#fight-result-message").text("Did not encounter a Pokemon.");
		}

		$(".encounter").hide();
		$(".post-encounter").show();
		$(".no-encounter").show();
	}

});