const storeState = () => {
	let currentState = {};
	return (stateChangeFunction = state => state) => {
		const newState = stateChangeFunction(currentState);
		currentState = { ...newState };
		return newState;
	};
};

const stateControl = storeState();

const levelUpState = (prop) => {
	return (value) => {
		return (state) => ({
			...state,
			[prop]: (state[prop] || 0) + value
		});
	};
};

const levelChangeState = (prop) => {
	return (value) => {
		return (state) => ({
			...state,
			[prop]: (state[prop]) = value
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

const levelUp = levelUpState("level")(1);

$(document).ready(function () {

	const allPokemon = ["Pikachu", "Mew", "Dragonite"]
	let encounteredPokemon;
	let encounteredLevel;

	$("#grass-walk").click(function() {
		$(".post-encounter").hide();
		const encounterChance = Math.floor(Math.random() * 2);

		if (encounterChance == 1)
		{
			encounteredPokemon = allPokemon[Math.floor(Math.random() * allPokemon.length)];
			encounteredLevel = Math.floor((Math.random() * 50) + 1);
			$("#wild-pokemon-message").text(`A wild lv ${encounteredLevel} ${encounteredPokemon} appeared!`);
			$(".no-encounter").hide();
			$(".encounter").show();

			if (typeof stateControl().name === "undefined") {
				$("#fight").hide();
			}
			else
			{
				$("#fight").show();
			}

			console.log(`A wild ${encounteredPokemon} appeared!`);
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
		const name = changeNameState("name")(encounteredPokemon);
		const newNameState = stateControl(name);
		const level = levelChangeState("level")(encounteredLevel);
		const newLevelState = stateControl(level);
		$("#name-value").text(newNameState.name);
		$("#level-value").text(newLevelState.level);
		$(".pokemon-details").show();
		console.log(`Captured ${encounteredPokemon}!`);
	});

	function showFightResult(result)
	{
		if (result == "hit")
		{
			$("#fight-result-message").text(`You defeated ${encounteredPokemon}!`);
		}
		else if (result == "miss")
		{
			$("#fight-result-message").text(`Your attack missed! The ${encounteredPokemon} fled!`);
		}
		else if (result == "capture")
		{
			$("#fight-result-message").text(`You captured ${encounteredPokemon}!`);
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