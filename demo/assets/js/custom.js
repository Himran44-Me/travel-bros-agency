const Travlla = (function () {
	const handleCursorsection = () => {
		let cursor = document.querySelector(".cursor");
		let cursor2 = document.querySelector(".cursor2");
		let cursorScale = document.querySelectorAll(".cursor-scale");
		let mouseX = 0;
		let mouseY = 0;

		gsap.to({}, 0.016, {
		  repeat: -1,
		  onRepeat: function () {
			gsap.set(cursor, {
			  css: {
				left: mouseX,
				top: mouseY,
			  },
			});
			gsap.set(cursor2, {
			  css: {
				left: mouseX,
				top: mouseY,
			  },
			});
		  },
		});

		window.addEventListener("mousemove", (e) => {
		  mouseX = e.clientX;
		  mouseY = e.clientY;
		});

		cursorScale.forEach((link) => {
		  link.addEventListener("mousemove", () => {
			cursor.classList.add("grow");
			if (link.classList.contains("small")) {
			  cursor.classList.remove("grow");
			  cursor.classList.add("grow-small");
			}
		  });

		  link.addEventListener("mouseleave", () => {
			cursor.classList.remove("grow");
			cursor.classList.remove("grow-small");
		  });
		});
	};

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
		  $(".sticky-header").addClass("is-fixed");
		} else {
		  $(".sticky-header").removeClass("is-fixed");
		}
	});

	const handleColorfillheader = () => {
		const scroll = window.scrollY;
		const header = document.querySelector(".is-fixed");

		if (!header) return;

		if (scroll >= 100) {
		  header.classList.add("color-fill");
		} else {
		  header.classList.remove("color-fill");
		}
	};

	function handleMobilesidedrawer() {
		jQuery("#mobile-side-drawer").on("click", function () {
		  jQuery(".mobile-sider-drawer-menu").toggleClass("active");
		});
	}
	
	function handleSitesearch() {
		jQuery('a[href="#search"]').on("click", function (event) {
		  jQuery("#search").addClass("open");
		  jQuery('#search > form > input[type="search"]').focus();
		});

		jQuery("#search, #search .close-btn").on("click keyup", function (event) {
		  if (event.target === this || event.target.className === "close-btn") {
			jQuery(this).removeClass("open");
		  }
		});
	}

	function handleMagnificvideo() {
		if (jQuery(".popup-youtube").length) {
		  jQuery(".popup-youtube").magnificPopup({
			type: "iframe",
		  });
		}
	}

	const handleCounterJS = () => {
		const counters = document.querySelectorAll(".value");
		const speed = 200;

		const runCounter = (counter) => {
		  const target = +counter.getAttribute("data-value");
		  let current = 0;
		  const increment = target / speed;

			  const update = () => {
				current += increment;
				if (current < target) {
				  counter.innerText = Math.ceil(current);
				  requestAnimationFrame(update);
				} else {
				  counter.innerText = target;
				}
			  };

		  update();
		};

		const isInViewport = (el) => {
		  const rect = el.getBoundingClientRect();
		  return (
			rect.top >= 0 &&
			rect.bottom <=
			  (window.innerHeight || document.documentElement.clientHeight)
		  );
		};

		const handleScroll = () => {
		  counters.forEach((counter) => {
			if (!counter.classList.contains("counted") && isInViewport(counter)) {
			  counter.classList.add("counted");
			  runCounter(counter);
			}
		  });
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();
	};

	if (jQuery(".emblem").length) {
		const Emblem = {
		  init: function (el, str) {
			const element = document.querySelector(el);
			const text = str ? str : element.innerHTML;
			element.innerHTML = "";
			for (let i = 0; i < text.length; i++) {
			  const letter = text[i];
			  const span = document.createElement("span");
			  const node = document.createTextNode(letter);
			  const r = (360 / text.length) * i;
			  const x = (Math.PI / text.length).toFixed(0) * i;
			  const y = (Math.PI / text.length).toFixed(0) * i;
			  span.appendChild(node);
			  span.style.webkitTransform =
				"rotateZ(" + r + "deg) translate3d(" + x + "px," + y + "px,0)";
			  span.style.transform =
				"rotateZ(" + r + "deg) translate3d(" + x + "px," + y + "px,0)";
			  element.appendChild(span);
			}
		  },
		};

		Emblem.init(".emblem");
	}

	const handleSetCurrentYear = () => {
		const currentDate = new Date();
		let currentYear = currentDate.getFullYear();
		let elements = document.getElementsByClassName("current-year");

		for (const element of elements) {
		  element.innerHTML = currentYear;
		}
	};

	function handleTvrRainEffetctfunction() {
		$(".rain").empty();

		let increment = 0;
		let drops = "";
		let backDrops = "";

		while (increment < 100) {
		  const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
		  const randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);

		  increment += randoFiver;

		  drops +=
			'<div class="drop" style="left: ' +
			increment +
			"%; bottom: " +
			(randoFiver + randoFiver - 1 + 100) +
			"%; animation-delay: 0." +
			randoHundo +
			"s; animation-duration: 0.5" +
			randoHundo +
			's;">' +
			'<div class="stem" style="animation-delay: 0.' +
			randoHundo +
			"s; animation-duration: 0.5" +
			randoHundo +
			's;"></div>' +
			'<div class="splat" style="animation-delay: 0.' +
			randoHundo +
			"s; animation-duration: 0.5" +
			randoHundo +
			's;"></div>' +
			"</div>";

		  backDrops +=
			'<div class="drop" style="right: ' +
			increment +
			"%; bottom: " +
			(randoFiver + randoFiver - 1 + 100) +
			"%; animation-delay: 0." +
			randoHundo +
			"s; animation-duration: 0.5" +
			randoHundo +
			's;">' +
			'<div class="stem" style="animation-delay: 0.' +
			randoHundo +
			"s; animation-duration: 0.5" +
			randoHundo +
			's;"></div>' +
			'<div class="splat" style="animation-delay: 0.' +
			randoHundo +
			"s; animation-duration: 0.5" +
			randoHundo +
			's;"></div>' +
			"</div>";
		}

		$(".rain.front-row").append(drops);
		$(".rain.back-row").append(backDrops);
	}

	function handleScrollTop() {
		jQuery("button.scroltop").on("click", function () {
		  jQuery("html, body").animate(
			{
			  scrollTop: 0,
			},
			1000
		  );
		  return false;
		});

		jQuery(window).on("scroll", function () {
		  const scroll = jQuery(window).scrollTop();

		  if (scroll > 900) {
			jQuery("button.scroltop").fadeIn(1000);
		  } else {
			jQuery("button.scroltop").fadeOut(1000);
		  }
		});
	}

	const handleCustomSelects = () => {
		document.querySelectorAll(".dynamic-select").forEach((selectElement) => {
		createCustomSelectFromSelect(selectElement);
		});
	};

	const createCustomSelectFromSelect = (selectElement) => {
		const selectId =
		  selectElement.id || `select-${Math.random().toString(36).substr(2, 9)}`;
		const customSelectDiv = document.createElement("div");
		customSelectDiv.id = `custom-${selectId}`;
		customSelectDiv.className = "custom-select";

		const selectedDiv = document.createElement("div");
		selectedDiv.className = "select-selected";
		selectedDiv.textContent = (
		  selectElement.querySelector("option[selected]") ||
		  selectElement.options[0]
		).textContent;

		const labelText = selectElement.parentElement?.dataset?.label || "";
		if (labelText) {
		  const label = document.createElement("span");
		  label.textContent = labelText;
		  selectedDiv.appendChild(label);
		}

		customSelectDiv.appendChild(selectedDiv);

		const itemsDiv = document.createElement("div");
		itemsDiv.className = "select-items select-hide";
		customSelectDiv.appendChild(itemsDiv);

		Array.from(selectElement.options).forEach((option) => {
		  const customOptionDiv = document.createElement("div");
		  customOptionDiv.className = "select-item";
		  customOptionDiv.setAttribute("data-value", option.value);
		  customOptionDiv.textContent = option.textContent;
		  if (option.selected) customOptionDiv.classList.add("active");

		  customOptionDiv.addEventListener("click", function () {
			selectedDiv.childNodes[0].textContent = this.textContent;
			selectElement.value = this.getAttribute("data-value");
			selectElement.dispatchEvent(new Event("change"));
			selectElement.dispatchEvent(new Event("click"));

			itemsDiv.classList.add("select-hide");
			selectedDiv.classList.remove("select-active");

			itemsDiv
			  .querySelectorAll(".select-item")
			  .forEach((item) => item.classList.remove("active"));
			this.classList.add("active");
		  });

		  itemsDiv.appendChild(customOptionDiv);
		});

		selectElement.style.display = "none";
		selectElement.parentNode.insertBefore(
		  customSelectDiv,
		  selectElement.nextSibling
		);

		selectedDiv.addEventListener("click", function (e) {
		  e.stopPropagation();
		  itemsDiv.classList.toggle("select-hide");
		  selectedDiv.classList.toggle("select-active");
		});

		document.addEventListener("click", function (e) {
		  if (!customSelectDiv.contains(e.target)) {
			itemsDiv.classList.add("select-hide");
			selectedDiv.classList.remove("select-active");
		  }
		});
	};

	const handleAccordion = (container = document) => {
		const accordionContainers = container.querySelectorAll(".myAccordion");

		accordionContainers.forEach((accordion) => {
		  if (accordion.dataset.bound === "true") return;
		  accordion.dataset.bound = "true";

		  accordion.addEventListener("click", function (e) {
			const header = e.target.closest(".accordion-header");
			if (!header || !accordion.contains(header)) return;

			const item = header.parentElement;
			const content = item.querySelector(".accordion-content");
			const arrow = header.querySelector(".arrow");
			const isOpen = header.classList.contains("open");

			accordion.querySelectorAll(".accordion-header").forEach((h) => {
			  if (h !== header) {
				h.classList.remove("open");
				h.querySelector(".arrow")?.classList.remove("active");
				const c = h.parentElement.querySelector(".accordion-content");
				if (c) c.style.maxHeight = null;
			  }
			});

			if (!isOpen) {
			  header.classList.add("open");
			  content.style.maxHeight = content.scrollHeight + "px";
			  arrow?.classList.add("active");
			} else {
			  header.classList.remove("open");
			  content.style.maxHeight = null;
			  arrow?.classList.remove("active");
			}
		  });
		});

		container.querySelectorAll(".accordion-header.open").forEach((header) => {
		  const content = header.parentElement.querySelector(".accordion-content");
		  const arrow = header.querySelector(".arrow");
		  if (content) {
			content.style.maxHeight = content.scrollHeight + "px";
			arrow?.classList.add("active");
		  }
		});
	};

	function handleLightboxPopup() {
		lc_lightbox(".elem", {
		  wrap_class: "lcl_fade_oc",
		  gallery: true,
		  thumb_attr: "data-lcl-thumb",

		  skin: "minimal",
		  radius: 0,
		  padding: 0,
		  border_w: 0,
		});
	}

	const handleTouchSpin = () => {
		function incrementValue(e) {
		  e.preventDefault();
		  const button = e.target.closest("[data-field]");
		  const fieldName = button.getAttribute("data-field");

		  const parent = button.closest("div") || button.closest("td");
		  const input = parent.querySelector(`input[name="${fieldName}"]`);

		  let currentVal = parseInt(input.value, 10);
		  input.value = !isNaN(currentVal) ? currentVal + 1 : 0;
		}

		function decrementValue(e) {
		  e.preventDefault();
		  const button = e.target.closest("[data-field]");
		  const fieldName = button.getAttribute("data-field");

		  const parent = button.closest("div") || button.closest("td");
		  const input = parent.querySelector(`input[name="${fieldName}"]`);

		  let currentVal = parseInt(input.value, 10);
		  input.value = !isNaN(currentVal) && currentVal > 0 ? currentVal - 1 : 0;
		}

		document.querySelectorAll(".input-group").forEach((group) => {
		  group.addEventListener("click", function (e) {
			const target = e.target.closest(".button-plus, .button-minus");
			if (!target) return;

			if (target.classList.contains("button-plus")) {
			  incrementValue(e);
			} else if (target.classList.contains("button-minus")) {
			  decrementValue(e);
			}
		  });
		});
	};

	const handleFlatpickr = () => {
		if (jQuery(".flatpickr1").length > 0) {
		  flatpickr(".flatpickr1", {});
		}
		if (jQuery(".time-picker").length > 0) {
		  flatpickr(".time-picker", {
			enableTime: true,
			noCalendar: true,
			dateFormat: "H:i",
			defaultDate: "13:45",
		  });
		}
	};

	const handleShopProductPrice = () => {
		const directionSlider = document.getElementById("slider-direction");
		const directionField = document.getElementById("field");

		if (!directionSlider || !directionField) return;

		noUiSlider.create(directionSlider, {
		  start: 1,
		  connect: [true, false],
		  range: {
			min: 0,
			max: 10,
		  },
		});

		directionSlider.noUiSlider.on("update", (values, handle) => {
		  directionField.innerHTML = values[handle];
		});
	};

	const handlePageLoader = () => {
		$(".loading-area").fadeOut(1500);
	};
	
	function handleMasonryBox() {
	if ( jQuery().isotope ) {      
			var $container = jQuery('.masonry-wrap');
			
			$container.isotope({
				itemSelector: '.masonry-item',
				transitionDuration: '1s',
				originLeft: true,
				stamp: '.stamp',
          		percentPosition: true,
				layoutMode: 'masonry',
			});
		
			$container.imagesLoaded().progress( function() {
				$container.isotope('layout');
			});
			
			jQuery('.masonry-filter li').on('click',function() {                           
				var selector = jQuery(this).find("a").attr('data-filter');
				jQuery('.masonry-filter li').removeClass('active');
				jQuery(this).addClass('active');
				$container.isotope({ filter: selector });
				return false;
			});
	};
	}
			
	function handleStickySidebar(){		
		$('.rightSidebar')
			.theiaStickySidebar({
				additionalMarginTop: 100
		});		
	}
		
	const handleMasonry = () => {
		const masonryContainer = document.querySelector(".masonry-grid");
		if (masonryContainer) { 
		  new Masonry( masonryContainer, {
			itemSelector: '.card-container',
			columnWidth: '.grid-sizer',
			percentPosition: true
		  });
		}
	};	
		
	document.addEventListener("DOMContentLoaded", function () {

		function handleGallerySlider(topId, thumbsId) {

			var galleryThumbs = new Swiper(thumbsId, {
				centeredSlides: false,
				centeredSlidesBounds: true,
				loop: true,
				spaceBetween: 30,
				slidesPerView: 4,
				freeMode: false,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
				watchOverflow: true,
				breakpoints: {
					0: { slidesPerView: 2 },
					480: { slidesPerView: 3 },
					768: { slidesPerView: 4 },
					1024: { slidesPerView: 4 },
					1365: { slidesPerView: 4 }
				}
			});

			var galleryTop = new Swiper(topId, {
				direction: "horizontal",
				spaceBetween: 0,
				loop: true,

				// ✅ Navigation Buttons
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},

				// ✅ Pagination Added Here
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},

				thumbs: {
					swiper: galleryThumbs
				}
			});

			galleryTop.on("slideChangeTransitionStart", function () {
				galleryThumbs.slideTo(galleryTop.activeIndex);
			});

			galleryThumbs.on("transitionStart", function () {
				galleryTop.slideTo(galleryThumbs.activeIndex);
			});
		}

		handleGallerySlider(".twm-gallery-top1", ".twm-gallery-thumbs1");
		handleGallerySlider(".twm-gallery-top2", ".twm-gallery-thumbs2");
		handleGallerySlider(".twm-gallery-top3", ".twm-gallery-thumbs3");
		handleGallerySlider(".twm-gallery-top4", ".twm-gallery-thumbs4");

	});

	const handleThemeBtn = () => {
		const themeBtn = document.querySelector(".theme-btn");
		const html = document.documentElement;

		const setCookie = (name, value, days) => {
		const expires = new Date(
			Date.now() + days * 24 * 60 * 60 * 1000,
		).toUTCString();

		document.cookie = `${name}=${value}; expires=${expires}; path=/`;
		};

		const getCookie = (name) => {
		const match = document.cookie.match(
			new RegExp("(^| )" + name + "=([^;]+)"),
		);

		return match ? match[2] : null;
		};

		
		const savedTheme = getCookie("theme");

		if (savedTheme === "dark") {
		html.classList.add("dark");
		html.classList.remove("light");
		} else {
		html.classList.add("light");
		html.classList.remove("dark");
		}

		themeBtn?.addEventListener("click", () => {
		const isDark = html.classList.contains("dark");

		html.classList.toggle("dark", !isDark);
		html.classList.toggle("light", isDark);

		
		setCookie("theme", !isDark ? "dark" : "light", 30);
		});
	};
					
	return {
		init: function () {
		  handleCursorsection();
		  handleColorfillheader();
		  handleMobilesidedrawer();
		  handleSitesearch();
		  handleTvrRainEffetctfunction();
		  handleMagnificvideo();
		  handleScrollTop();
		  handleCounterJS();
		  handleSetCurrentYear();
		  handleCustomSelects();
		  handleAccordion();
		  handleLightboxPopup();
		  handleTouchSpin();
		  handleFlatpickr();
		  handleShopProductPrice();
		  handleMasonryBox(); 
		  handleMasonry();
		  handleStickySidebar();
		  handlePageLoader();
		  handleThemeBtn();
		},
	};
})();

document.addEventListener("DOMContentLoaded", () => {
  Travlla.init();
});
