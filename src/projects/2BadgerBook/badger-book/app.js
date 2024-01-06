/**
 * Step 1: API call from hw1
 */
fetch("https://cs571.org/api/f23/hw2/students", {
	headers: {
		"X-CS571-ID": CS571.getBadgerId()
	}
})
	.then(res => {
		if (res.status === 200 || res.status === 304) {
			return res.json()
		} else {
			throw new Error()
		}
	})
	.then(data => {
		console.log(data)

		// Step 2: update number of students
		document.getElementById('num-results').innerText = data.length
		document.getElementById('students').innerHTML = buildStudentsHtml(data)

		// Step 7: apply Bootstrap Grid
		document.getElementById('students').classList.add("row")
	})

/**
 * Step 3: Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n")
}

/**
 * Step 4: Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`
	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`
	html += `<p><strong>${stud.major}</strong></p>`
	html += `<p>${stud.name.first} is taking ${stud.numCredits} credits and is `
	if (!stud.fromWisconsin) {
		html += `not `
	}
	html += `from Wisconsin.</p>`
	html += `<p>They have ${stud.interests.length} interests, including:</p><ul>`
	for (let i = 0; i < stud.interests.length; i++) {
		html += `<li>${stud.interests[i]}</li>`
	}
	html += `</ul></div>`
	return html;
}

/** Step 5: search function */
function handleSearch(e) {
	e.preventDefault()
	// create string variables for input, remove whitespace, to lowercase
	var searchName = document.getElementById("search-name").value.trim().toLowerCase()
	var searchMajor = document.getElementById("search-major").value.trim().toLowerCase()
	var searchInterest = document.getElementById("search-interest").value.trim().toLowerCase()

	// re-fetch data
	fetch("https://cs571.org/api/f23/hw2/students", {
		headers: {
			"X-CS571-ID": CS571.getBadgerId()
		}
	}).then(res => {
		if (res.status === 200 || res.status === 304) {
			return res.json()
		} else {
			throw new Error()
		}
	}).then(data => {
		let output = data.filter(stud => {
			// concat first and last names
			let fullName = stud.name.first + " " + stud.name.last
			// find matches for name, major, interest
			let matchName = fullName.toLowerCase().includes(searchName)
			let matchMajor = stud.major.toLowerCase().includes(searchMajor)
			let matchInterest = false
			for (let i = 0; i < stud.interests.length; i++) {
				matchInterest = stud.interests[i].toLowerCase().includes(searchInterest)
				// exit loop if interest match is found, otherwise will only match last interest
				if (matchInterest) {
					break
				}
			}
			
			return matchName & matchMajor & matchInterest
		})

		// Step 6: update num-results
		document.getElementById('num-results').innerText = output.length
		// update HTML
		document.getElementById('students').innerHTML = buildStudentsHtml(output)
	})

}

document.getElementById("search-btn").addEventListener("click", handleSearch);