// Counter Animation
function animateCounters() {
	const counters = document.querySelectorAll(".stat-number");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const counter = entry.target;
					const target = parseInt(counter.getAttribute("data-count"));
					const increment = target / 100;
					let current = 0;

					const updateCounter = () => {
						if (current < target) {
							current += increment;
							counter.textContent = Math.floor(current).toLocaleString();
							requestAnimationFrame(updateCounter);
						} else {
							counter.textContent = target.toLocaleString();
						}
					};

					updateCounter();
					observer.unobserve(counter);
				}
			});
		},
		{ threshold: 0.5 }
	);

	counters.forEach((counter) => {
		observer.observe(counter);
	});
}

// Fade in animation
function initFadeInAnimations() {
	const fadeElements = document.querySelectorAll(".fade-in");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.animationDelay = "0.2s";
					entry.target.style.animationFillMode = "forwards";
				}
			});
		},
		{ threshold: 0.1 }
	);

	fadeElements.forEach((element) => {
		observer.observe(element);
	});
}

// Mobile menu toggle

document.addEventListener("DOMContentLoaded", function () {
	initMobileMenu();
	initNavHighlight();
	initTabToggle();
	initMobileMenuone();
});

function initMobileMenu() {
	const toggle = document.querySelector(".mobile-menu-toggle");
	const navLinks = document.querySelector(".nav-links");
	const navActions = document.querySelector(".nav-actions");

	if (toggle) {
		toggle.addEventListener("click", () => {
			toggle.classList.toggle("active");
			navLinks?.classList.toggle("mobile-open");
			navActions?.classList.toggle("mobile-open");
		});
	}
}

function initNavHighlight() {
	const navLinks = document.querySelectorAll(".nav-link");
	const currentPath = window.location.pathname;

	navLinks.forEach((link) => {
		// Highlight based on current path (for external hrefs like .html files)
		if (
			link.getAttribute("href") &&
			currentPath.includes(link.getAttribute("href"))
		) {
			link.classList.add("active");
		}

		// Handle click
		link.addEventListener("click", function (e) {
			const href = this.getAttribute("href");

			// Check if it's a tab (starts with '#')
			if (href.startsWith("#")) {
				e.preventDefault(); // prevent page jump

				// Toggle active class for nav links
				navLinks.forEach((l) => l.classList.remove("active"));
				this.classList.add("active");

				// Toggle tab panels
				const tabPanels = document.querySelectorAll(".tab-panel");
				tabPanels.forEach((panel) => panel.classList.remove("active"));

				const targetPanel = document.querySelector(href);
				if (targetPanel) {
					targetPanel.classList.add("active");
				}

				// Close mobile menu if open
				document.querySelector(".nav-links")?.classList.remove("mobile-open");
				document.querySelector(".nav-actions")?.classList.remove("mobile-open");
				document
					.querySelector(".mobile-menu-toggle")
					?.classList.remove("active");
			}
		});
	});
}

// Optional: If you want a separate function
function initTabToggle() {
	const navLinks = document.querySelectorAll(".nav-link[href^='#']");
	const tabPanels = document.querySelectorAll(".tab-panel");

	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();

			// Remove active from all
			navLinks.forEach((l) => l.classList.remove("active"));
			tabPanels.forEach((p) => p.classList.remove("active"));

			// Add active to clicked
			this.classList.add("active");
			const tabId = this.getAttribute("href");
			const target = document.querySelector(tabId);
			if (target) target.classList.add("active");
		});
	});
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	});
}

// Header scroll effect
function initHeaderScroll() {
	const header = document.querySelector(".header");

	if (header) {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				header.style.background = "rgba(255, 255, 255, 0.98)";
				header.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)";
			} else {
				header.style.background = "rgba(255, 255, 255, 0.95)";
				header.style.boxShadow = "none";
			}
		});
	}
}

// Contact form handling
function initContactForm() {
	const contactForm = document.querySelector(".contact-form");

	if (contactForm) {
		contactForm.addEventListener("submit", function (e) {
			e.preventDefault();

			// Get form data
			const formData = new FormData(contactForm);
			const data = Object.fromEntries(formData);

			// Simple validation
			if (
				!data.firstName ||
				!data.lastName ||
				!data.email ||
				!data.role ||
				!data.subject
			) {
				alert("Please fill in all required fields.");
				return;
			}

			// Email validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(data.email)) {
				alert("Please enter a valid email Addresss.");
				return;
			}

			// Simulate form submission
			const submitButton = contactForm.querySelector('button[type="submit"]');
			const originalText = submitButton.textContent;

			submitButton.textContent = "Sending...";
			submitButton.disabled = true;

			// Simulate API call
			setTimeout(() => {
				alert("Thank you for your message! We'll get back to you soon.");
				contactForm.reset();
				submitButton.textContent = originalText;
				submitButton.disabled = false;
			}, 2000);
		});
	}
}

// FAQ accordion functionality
function initFAQAccordion() {
	const faqItems = document.querySelectorAll(".faq-item");

	faqItems.forEach((item) => {
		const question = item.querySelector("h3");
		if (question) {
			question.style.cursor = "pointer";
			question.addEventListener("click", () => {
				const answer = item.querySelector("p");
				if (answer) {
					const isVisible = answer.style.display !== "none";
					answer.style.display = isVisible ? "none" : "block";
					question.style.color = isVisible
						? "var(--neutral-900)"
						: "var(--primary-blue)";
				}
			});
		}
	});
}

// Testimonial carousel (if needed)
function initTestimonialCarousel() {
	const testimonialGrid = document.querySelector(".testimonials-grid");

	if (testimonialGrid && window.innerWidth <= 768) {
		// Convert to carousel on mobile
		testimonialGrid.style.display = "flex";
		testimonialGrid.style.overflowX = "auto";
		testimonialGrid.style.scrollSnapType = "x mandatory";

		const cards = testimonialGrid.querySelectorAll(".testimonial-card");
		cards.forEach((card) => {
			card.style.minWidth = "300px";
			card.style.scrollSnapAlign = "start";
		});
	}
}

// Product card interactions
function initProductCards() {
	const productCards = document.querySelectorAll(".product-card");

	productCards.forEach((card) => {
		card.addEventListener("mouseenter", () => {
			card.style.transform = "translateY(-8px) scale(1.02)";
		});

		card.addEventListener("mouseleave", () => {
			card.style.transform = "translateY(0) scale(1)";
		});
	});
}

// Lazy loading for images
function initLazyLoading() {
	const images = document.querySelectorAll("img[data-src]");

	const imageObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.removeAttribute("data-src");
				imageObserver.unobserve(img);
			}
		});
	});

	images.forEach((img) => imageObserver.observe(img));
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
	animateCounters();
	initFadeInAnimations();
	initMobileMenu();
	initSmoothScrolling();
	initHeaderScroll();
	initContactForm();
	initFAQAccordion();
	initTestimonialCarousel();
	initProductCards();
	initLazyLoading();

	// Add loading animation
	document.body.style.opacity = "0";
	document.body.style.transition = "opacity 0.3s ease";

	setTimeout(() => {
		document.body.style.opacity = "1";
	}, 100);
});

// Handle window resize
window.addEventListener("resize", () => {
	initTestimonialCarousel();
});

// Add smooth page transitions
function initPageTransitions() {
	const links = document.querySelectorAll(
		'a[href^="/"]:not([href^="//"]):not([target="_blank"])'
	);

	links.forEach((link) => {
		link.addEventListener("click", function (e) {
			const href = this.getAttribute("href");

			// Skip if it's the current page
			if (href === window.location.pathname) {
				e.preventDefault();
				return;
			}

			// Add transition effect
			document.body.style.opacity = "0.7";
			document.body.style.transform = "translateY(20px)";

			setTimeout(() => {
				window.location.href = href;
			}, 200);
		});
	});
}

// Initialize page transitions
document.addEventListener("DOMContentLoaded", initPageTransitions);

//mobile hamberger

function initMobileMenuone() {
	const toggle = document.querySelector(".mobile-menu-toggle");
	const navLinks = document.querySelector(".nav-links");
	const navActions = document.querySelector(".nav-actions");

	if (toggle) {
		toggle.addEventListener("click", () => {
			toggle.classList.toggle("active");

			if (navLinks) {
				navLinks.classList.toggle("mobile-open");
				if (navLinks.classList.contains("mobile-open")) {
					navLinks.style.display = "flex";
					navLinks.style.flexDirection = "column";
					navLinks.style.position = "absolute";
					navLinks.style.top = "100%";
					navLinks.style.left = "60%";
					navLinks.style.right = "0";
					navLinks.style.background = "#f7f7f7";
					navLinks.style.padding = "1rem";
					navLinks.style.boxShadow = "var(--shadow-lg)";
					navLinks.style.zIndex = "1000";
				} else {
					resetNavStyles(navLinks);
				}
			}

			if (navActions) {
				navActions.classList.toggle("mobile-open");
				if (navActions.classList.contains("mobile-open")) {
					navActions.style.display = "flex";
					navActions.style.flexDirection = "column";
					navActions.style.width = "100%";
					navActions.style.marginTop = "1rem";
					navActions.style.gap = "0.5rem";
				} else {
					resetNavStyles(navActions);
				}
			}
		});
	}

	// Close mobile menu when clicking a nav link
	document.querySelectorAll(".nav-links a, .tab-btn").forEach((link) => {
		link.addEventListener("click", () => {
			toggle.classList.remove("active");
			navLinks?.classList.remove("mobile-open");
			navActions?.classList.remove("mobile-open");
			resetNavStyles(navLinks);
			resetNavStyles(navActions);
		});
	});

	function resetNavStyles(element) {
		if (!element) return;
		element.style.display = "";
		element.style.flexDirection = "";
		element.style.position = "";
		element.style.top = "";
		element.style.left = "";
		element.style.right = "";
		element.style.background = "";
		element.style.padding = "";
		element.style.boxShadow = "";
		element.style.zIndex = "";
		element.style.width = "";
		element.style.marginTop = "";
		element.style.gap = "";
	}
}

// open products tab from home
document.addEventListener("DOMContentLoaded", function () {
	const navLinks = document.querySelectorAll(".nav-link, .product-link");
	const sections = document.querySelectorAll(".tab-panel");

	function activateSection(id) {
		// Remove active from all
		sections.forEach((sec) => sec.classList.remove("active"));
		navLinks.forEach((link) => link.classList.remove("active"));

		// Add active to the correct section
		const targetSection = document.querySelector(id);
		const targetLink = document.querySelector(`.nav-link[href="${id}"]`);

		if (targetSection) targetSection.classList.add("active");
		if (targetLink) targetLink.classList.add("active");

		// Smooth scroll
		targetSection.scrollIntoView({ behavior: "smooth" });
	}

	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			const targetId = this.getAttribute("href");
			activateSection(targetId);
		});
	});

	// If page loads with a hash in URL, show that section
	if (window.location.hash) {
		activateSection(window.location.hash);
	}
});


function downloadFile(url) {
  const fileUrl = url;
  const a = document.createElement("a");
  a.href = fileUrl;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
