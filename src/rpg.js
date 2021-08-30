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

	$("#levelUp").click(function () {
		const newState = stateControl(levelUp);
		$("#level-value").text(`Level: ${newState.level}`);
	});

	$("#changeName").click(function () {
		const changeName = changeNameState("name")("Test name");
		const newState = stateControl(changeName);
		$("#name-value").text(`Name: ${newState.name}`);
	});

});