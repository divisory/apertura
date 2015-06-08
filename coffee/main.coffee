$ document

	.ready ->

		handle = (hash)->
			to = $(hash).position().top - 60
			$ 'html,body'
				.animate {scrollTop: to}, 1000
			location.hash = hash

		$ '.anchors li a'
			.click (e)->
				e.preventDefault()
				handle "#{$(this).attr('href')}"

		if location.hash.length > 0
			handle location.hash

		$ '.show-menu'
			.click (e)->
				e.preventDefault()
				$(this).toggleClass 'active'
				$('.main-nav').toggleClass 'active'

		return