;(function () {
	'use strict'

	const elements = {
		header: document.querySelector('header'),
		burger: document.querySelector('.burger'),
		nav: document.querySelector('nav'),
		quoteSlider: document.querySelector('.quote-slider'),
		prevBtn: document.querySelector('.chevron.left'),
		nextBtn: document.querySelector('.chevron.right'),
		faqItems: document.querySelectorAll('.faq-item'),
		forms: document.querySelectorAll('form'),
	}

	function initHeaderScroll() {
		if (elements.header) {
			window.addEventListener('scroll', function () {
				if (window.scrollY > 50) {
					elements.header.classList.add('scrolled')
				} else {
					elements.header.classList.remove('scrolled')
				}
			})
		}
	}

	function initMobileNav() {
		if (elements.burger && elements.nav) {
			elements.burger.addEventListener('click', function () {
				elements.nav.classList.toggle('open')
				elements.burger.classList.toggle('active')

				const isExpanded = elements.nav.classList.contains('open')
				elements.burger.setAttribute('aria-expanded', isExpanded)

				elements.burger.style.zIndex = '101'
			})

			document.addEventListener('click', function (event) {
				if (
					!elements.nav.contains(event.target) &&
					!elements.burger.contains(event.target) &&
					elements.nav.classList.contains('open')
				) {
					elements.nav.classList.remove('open')
					elements.burger.classList.remove('active')
					elements.burger.setAttribute('aria-expanded', false)
				}
			})

			if (elements.nav) {
				const navLinks = elements.nav.querySelectorAll('a')
				navLinks.forEach(link => {
					link.addEventListener('click', function () {
						if (window.innerWidth <= 992) {
							elements.nav.classList.remove('open')
							elements.burger.classList.remove('active')
							elements.burger.setAttribute('aria-expanded', false)
						}
					})
				})
			}
		}
	}

	function initSmoothScroll() {
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (e) {
				const target = document.querySelector(this.getAttribute('href'))

				if (target) {
					e.preventDefault()

					if (elements.nav.classList.contains('open')) {
						elements.nav.classList.remove('open')
						elements.burger.setAttribute('aria-expanded', false)
					}

					target.scrollIntoView({
						behavior: 'smooth',
					})
				}
			})
		})
	}

	function enhanceServiceBoxes() {
		const serviceBoxes = document.querySelectorAll('.service-box')

		if (serviceBoxes.length > 0) {
			serviceBoxes.forEach((box, index) => {
				if (index !== 0) {
					box.addEventListener('mouseenter', function () {
						const decorativeLine = box.querySelector('.decorative-line')
						if (decorativeLine) {
							decorativeLine.style.width = '80px'
							decorativeLine.style.transition = 'width 0.3s ease-out'
						}
					})

					box.addEventListener('mouseleave', function () {
						const decorativeLine = box.querySelector('.decorative-line')
						if (decorativeLine) {
							decorativeLine.style.width = '50px'
						}
					})
				}
			})
		}
	}

	function initQuoteSlider() {
		if (elements.quoteSlider) {
			const quotes = [
				'Качество наших работ – это наша репутация, которую мы не собираемся терять. За нами не нужно переделывать работу. Убедитесь в этом сами!',
				'Строительство дома - это ответственный процесс. Доверьте его профессионалам с многолетним опытом.',
				'Мы проектируем и строим дома, которые будут радовать вас и ваших детей долгие годы.',
			]

			let currentQuote = 0
			const quoteText = elements.quoteSlider.querySelector('.quote-text p')

			if (elements.prevBtn && elements.nextBtn && quoteText) {
				elements.nextBtn.addEventListener('click', function () {
					currentQuote = (currentQuote + 1) % quotes.length
					updateQuote()
				})

				elements.prevBtn.addEventListener('click', function () {
					currentQuote = (currentQuote - 1 + quotes.length) % quotes.length
					updateQuote()
				})

				function updateQuote() {
					quoteText.style.opacity = 0

					setTimeout(() => {
						quoteText.textContent = quotes[currentQuote]
						quoteText.style.opacity = 1
					}, 300)
				}
			}
		}
	}

	function initFormValidation() {
		if (elements.forms.length > 0) {
			elements.forms.forEach(form => {
				form.addEventListener('submit', function (e) {
					e.preventDefault()

					form
						.querySelectorAll('.error-message')
						.forEach(error => error.remove())
					form
						.querySelectorAll('.error')
						.forEach(field => field.classList.remove('error'))

					let isValid = true

					const nameInput = form.querySelector('input[name="name"]')
					if (nameInput && nameInput.value.trim() === '') {
						addError(nameInput, 'Пожалуйста, укажите ваше имя')
						isValid = false
					}

					const phoneInput = form.querySelector('input[name="phone"]')
					if (phoneInput) {
						const phonePattern =
							/^(\+?\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/
						if (!phonePattern.test(phoneInput.value)) {
							addError(
								phoneInput,
								'Пожалуйста, укажите корректный номер телефона'
							)
							isValid = false
						}
					}

					const emailInput = form.querySelector('input[name="email"]')
					if (emailInput) {
						const emailPattern =
							/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
						if (!emailPattern.test(emailInput.value)) {
							addError(emailInput, 'Пожалуйста, укажите корректный email')
							isValid = false
						}
					}

					const messageInput = form.querySelector('textarea[name="message"]')
					if (messageInput && messageInput.value.trim() === '') {
						addError(messageInput, 'Пожалуйста, введите ваше сообщение')
						isValid = false
					}

					if (isValid) {
						alert('Форма успешно отправлена!')
						form.reset()
					}

					function addError(inputElement, message) {
						inputElement.classList.add('error')
						const errorMessage = document.createElement('div')
						errorMessage.className = 'error-message'
						errorMessage.textContent = message
						inputElement.parentNode.appendChild(errorMessage)
					}
				})
			})
		}
	}

	function initScrollAnimations() {
		const animatedElements = document.querySelectorAll('.animate-on-scroll')

		if (animatedElements.length > 0) {
			window.addEventListener('load', handleScroll)

			window.addEventListener('scroll', handleScroll)

			function isInViewport(element) {
				const rect = element.getBoundingClientRect()
				return (
					rect.top <=
						(window.innerHeight || document.documentElement.clientHeight) *
							0.8 && rect.bottom >= 0
				)
			}

			function handleScroll() {
				animatedElements.forEach(element => {
					if (
						isInViewport(element) &&
						!element.classList.contains('animated')
					) {
						element.classList.add('animated')

						if (element.parentNode.classList.contains('animation-container')) {
							const siblings = Array.from(element.parentNode.children)
							const index = siblings.indexOf(element)
							element.style.animationDelay = `${index * 0.1}s`
						}
					}
				})
			}
		}
	}

	function initFaqAccordion() {
		if (elements.faqItems.length > 0) {
			const firstItem = elements.faqItems[0]
			if (firstItem) {
				const firstQuestion = firstItem.querySelector('.faq-question')
				const firstAnswer = firstItem.querySelector('.faq-answer')
				const firstToggleBtn = firstItem.querySelector('.toggle-btn')

				if (firstQuestion && firstAnswer) {
					firstAnswer.classList.add('open')
					firstQuestion.classList.add('active')
					if (firstToggleBtn) firstToggleBtn.classList.add('active')
					firstQuestion.setAttribute('aria-expanded', 'true')

					setTimeout(() => {
						firstAnswer.style.opacity = '1'
						firstAnswer.style.transform = 'translateY(0)'
					}, 300)
				}
			}

			elements.faqItems.forEach(item => {
				const question = item.querySelector('.faq-question')
				const answer = item.querySelector('.faq-answer')
				const toggleBtn = item.querySelector('.toggle-btn')

				if (question && answer) {
					question.addEventListener('click', function () {
						if (answer.classList.contains('open')) {
							answer.style.opacity = '0'
							answer.style.transform = 'translateY(-10px)'

							setTimeout(() => {
								answer.classList.remove('open')
								question.classList.remove('active')
								if (toggleBtn) toggleBtn.classList.remove('active')
							}, 300)

							question.setAttribute('aria-expanded', 'false')
						} else {
							elements.faqItems.forEach(otherItem => {
								const otherAnswer = otherItem.querySelector('.faq-answer')
								const otherQuestion = otherItem.querySelector('.faq-question')
								const otherToggleBtn = otherItem.querySelector('.toggle-btn')

								if (otherAnswer && otherAnswer.classList.contains('open')) {
									otherAnswer.style.opacity = '0'
									otherAnswer.style.transform = 'translateY(-10px)'

									setTimeout(() => {
										otherAnswer.classList.remove('open')
										otherQuestion.classList.remove('active')
										if (otherToggleBtn)
											otherToggleBtn.classList.remove('active')
									}, 300)

									otherQuestion.setAttribute('aria-expanded', 'false')
								}
							})

							answer.classList.add('open')
							question.classList.add('active')
							if (toggleBtn) toggleBtn.classList.add('active')

							setTimeout(() => {
								answer.style.opacity = '1'
								answer.style.transform = 'translateY(0)'
							}, 10)

							question.setAttribute('aria-expanded', 'true')
						}
					})

					question.addEventListener('keydown', function (e) {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault()
							question.click()
						}
					})
				}
			})
		}
	}

	function initDropdownMenus() {
		const dropdownItems = document.querySelectorAll('.has-dropdown')

		if (dropdownItems.length > 0) {
			dropdownItems.forEach(item => {
				const link = item.querySelector('a')
				const dropdown = item.querySelector('.dropdown-menu')

				if (link && dropdown) {
					checkDropdownPosition()
					window.addEventListener('resize', checkDropdownPosition)

					function checkDropdownPosition() {
						dropdown.style.left = ''
						dropdown.style.right = ''

						const rect = dropdown.getBoundingClientRect()

						if (rect.right > window.innerWidth) {
							dropdown.style.left = 'auto'
							dropdown.style.right = '0'
						}
					}

					if (window.innerWidth > 992) {
						item.addEventListener('mouseenter', function () {
							dropdown.classList.add('show')
							link.setAttribute('aria-expanded', 'true')
						})

						item.addEventListener('mouseleave', function () {
							dropdown.classList.remove('show')
							link.setAttribute('aria-expanded', 'false')
						})
					} else {
						link.addEventListener('click', function (e) {
							e.preventDefault()
							dropdown.classList.toggle('show')

							const isExpanded = dropdown.classList.contains('show')
							link.setAttribute('aria-expanded', isExpanded)

							dropdownItems.forEach(otherItem => {
								if (otherItem !== item) {
									const otherDropdown =
										otherItem.querySelector('.dropdown-menu')
									const otherLink = otherItem.querySelector('a')

									if (
										otherDropdown &&
										otherDropdown.classList.contains('show')
									) {
										otherDropdown.classList.remove('show')
										otherLink.setAttribute('aria-expanded', 'false')
									}
								}
							})
						})
					}
				}
			})
		}
	}

	function init() {
		initHeaderScroll()
		initMobileNav()
		initSmoothScroll()
		enhanceServiceBoxes()
		initQuoteSlider()
		initFormValidation()
		initScrollAnimations()
		initFaqAccordion()
		initDropdownMenus()
	}

	document.addEventListener('DOMContentLoaded', init)
})()
;(function () {
	'use strict'

	window.addEventListener('load', function () {
		const preloader = document.querySelector('.preloader')
		if (preloader) {
			setTimeout(() => {
				preloader.classList.add('fade-out')

				preloader.addEventListener('transitionend', function () {
					preloader.remove()
				})
			}, 500)
		}
	})
})()
