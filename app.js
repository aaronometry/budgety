
// BUDGET CONTROLLER
var budgetController = (function() {

	// Expense function constructor
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	// Income function constructor
	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	// Data array structure
	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItem: function(type, desc, val) {
			var newItem, ID;

			// Create new ID
			if(data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			};

			// Create new item based on type
			if(type==='exp') {
				newItem = new Expense(ID, desc, val);
			} else if(type==='inc') {
				newItem = new Income(ID, desc, val);
			};
			
			// Push the new item into the data array
			data.allItems[type].push(newItem);

			// Return the new element
			return newItem;
		},

		testing: function() {
			console.log(data);
		}
	};

})();

// UI CONTROLLER
var UIController = (function() {
	// Declare the classes of DOM elements as strings
	var DOMstrings = {
		inputType: '.add__type',
		inputDesc: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	};

	return {
		// Return the contents of those elements as an object
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDesc).value,
				value: document.querySelector(DOMstrings.inputValue).value
			};
		},

		addListItem: function(obj, type) {
			var html, newHtml, element;
			// Create HTML string with placeholder text
			if (type === 'inc') {
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			// Replace the placeholder text with actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// Insert HTML into DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		// Make the array containing the DOM element classes accessible in other functions
		getDOMstrings: function() {
			return DOMstrings;
		}
	};
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
	var setupEventListeners = function() {
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(e) {
			// "Which" property is for older browsers
			if (event.keyCode === 13 || event.which === 13){
				console.log('Enter/Return key was pressed.');
				ctrlAddItem();
			}
		});
	}
	
	var ctrlAddItem = function(){
		var input, newItem;

		// 1. Get the field input data
		input = UICtrl.getInput();

		// 2. Add item to budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		// 3. Add item to UI
		UICtrl.addListItem(newItem, input.type);

		// 4. Calculate budget

		// 5. Display budget on UI

	};

	return {
		init: function() {
			setupEventListeners();
		}
	};

})(budgetController, UIController);

controller.init();

