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

function flat(array, depth) {
	let newArray = []
	for (let i = 0; i < array.length; i++) {
		if (Array.isArray(array[i])) {
			newArray.push(...array[i])
		} else {
			newArray.push(array[i])
		}
	}

	return newArray
}

module.exports = { forEach, map, filter, reduce, some, every, flat }
