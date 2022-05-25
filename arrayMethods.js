function forEach(array, cb) {
	for (let i = 0; i < array.length; i++) {
		cb(array[i], i, array)
	}
}

function map(array, cb) {
	const newArray = []

	for (let i = 0; i < array.length; i++) {
		newArray.push(cb(array[i], i, array))
	}

	return newArray
}

function filter(array, cb) {
	const newArray = []

	for (let i = 0; i < array.length; i++) {
		// Push on the array items which return true by the callback func
		if (cb(array[i], i, array)) {
			newArray.push(array[i])
		}
	}

	return newArray
}

// Simplified option
// initialValue = cb(initialValue, array[i], i, array)
// initialValue will be set to whatever returns from the cb which is initial + array[i]
// -- which will then run cb with said outcome of the cb function

function reduce(array, cb, initialValue) {
	for (let i = 0; i < array.length; i++) {
		// Only runs once by checking if the index is 0
		if (initialValue === undefined && i === 0) {
			// If there is no initial value passed in set it to the first element in the array
			initialValue = array[i]
			// and then continue from the next element (array[1] instead of 0)
			i++
		}

		cb(initialValue, array[i], i, array)
		let previousValue = (initialValue += array[i])
		initialValue = previousValue
	}

	return initialValue
}

// If the cb in the loop doesnt return true then return false
function some(array, cb) {
	for (let i = 0; i < array.length; i++) {
		if (cb(array[i], i, array)) {
			return true
		}
	}

	return false
}

// If the callback returns true for every element then return true, else false
function every(array, cb) {
	for (let i = 0; i < array.length; i++) {
		if (!cb(array[i], i, array)) {
			return false
		}
	}

	return true
}

// If the item in the array is an array
// Push the spread out array into the new array and depth - 1

// Explanation for first test
//// First flat() call
// Looping through array -- [1, [2, 3], [4, [5, 6, [7, 8]]]]
// 1 -- else triggers
// New Array = [1]

//// Second flat() call
// [2, 3] -- if triggers, it's an array and depth > 0
// flat(2, 3, depth = 0)
// Looping through 2, 3
// 2, 3 -- else triggers twice
// New Array == [1, 2, 3]

//// Back to first flat() call?
// [4, [5, 6, [7, 8]]] -- if triggers it's an array and depth > 0
// flat(4, [5, 6, [7, 8]], depth = 0)
// New Array = [1, 2, 3, 4, [5, 6, [7, 8]]]

function flat(array, depth = 1) {
	let newArray = []

	for (let i = 0; i < array.length; i++) {
		// base case
		if (Array.isArray(array[i]) && depth > 0) {
			newArray.push(...flat(array[i], depth - 1))
		} else {
			newArray.push(array[i])
		}
	}

	return newArray
}

function find(array, cb) {
	for (let i = 0; i < array.length; i++) {
		if (cb(array[i], i, array)) {
			return array[i]
		}
	}
}

module.exports = { forEach, map, filter, reduce, some, every, flat, find }
