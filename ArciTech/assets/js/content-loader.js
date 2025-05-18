document.addEventListener('DOMContentLoaded', function () {
	loadContent()
})

function loadContent() {
	const xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			const xmlDoc = this.responseXML

			loadAboutSection(xmlDoc)

			loadServices(xmlDoc)
		}
	}
	xhr.open('GET', 'assets/data/content.xml', true)
	xhr.send()
}

/**
 * @param {Document} xmlDoc
 */
function loadAboutSection(xmlDoc) {
	const aboutTitleElement = document.getElementById('about-title')
	const aboutContentElement = document.getElementById('about-content')

	if (aboutTitleElement && aboutContentElement) {
		const aboutTitle = xmlDoc.getElementsByTagName('about-title')[0].textContent
		const aboutText = xmlDoc.getElementsByTagName('about')[0].textContent

		aboutTitleElement.textContent = aboutTitle
		aboutContentElement.innerHTML = `<p>${aboutText}</p>`
	}
}

/**
 * @param {Document} xmlDoc
 */
function loadServices(xmlDoc) {
	const services = xmlDoc.getElementsByTagName('service')

	const servicesGrid = document.querySelector('.services-grid')

	if (servicesGrid && services.length > 0) {
		const serviceBoxes = servicesGrid.querySelectorAll('.service-box')

		for (let i = 0; i < Math.min(services.length, serviceBoxes.length); i++) {
			const serviceTitleElement =
				serviceBoxes[i].querySelector('.service-title')
			if (serviceTitleElement) {
				serviceTitleElement.textContent = services[i].textContent
			}
		}
	}
}
