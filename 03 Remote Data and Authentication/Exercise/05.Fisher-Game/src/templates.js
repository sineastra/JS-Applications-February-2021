function catchTemplate ({ angler, weight, species, location, bait, captureTime, _id }, ownCatch) {
	const wrapper = document.createElement('div')
	wrapper.className = 'catch'
	wrapper.id = _id

	wrapper.innerHTML = `<label>Angler</label>
<input type="text" class="angler" value=${angler} />
<hr>
<label>Weight</label>
<input type="number" class="weight" value=${weight} />
<hr>
<label>Species</label>
<input type="text" class="species" value=${species} />
<hr>
<label>Location</label>
<input type="text" class="location" value=${location} />
<hr>
<label>Bait</label>
<input type="text" class="bait" value=${bait} />
<hr>
<label>Capture Time</label>
<input type="number" class="captureTime" value=${captureTime} />
<hr>
<button ${! ownCatch ? 'disabled' : ''} class="update">Update</button>
<button ${! ownCatch ? 'disabled' : ''} class="delete">Delete</button>`

	return wrapper
}

export { catchTemplate }