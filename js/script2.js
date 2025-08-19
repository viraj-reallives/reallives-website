const images = document.querySelectorAll(".hero-background img");
let index = 0;

setInterval(() => {
	images[index].classList.remove("active");
	index = (index + 1) % images.length;
	images[index].classList.add("active");
}, 3000); // Change image every 3 seconds

// video javascript code

function changeVideo(videoSrc) {
	const video = document.getElementById("heroVideo");
	video.src = videoSrc;
	video.play();
}

// video javascript code

// educatores javascript

document.addEventListener("DOMContentLoaded", function () {
	const tabButtons = document.querySelectorAll(".tab-btn");

	tabButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const group = button.getAttribute("data-group"); // NEW: detect group

			// Remove active classes from only this group
			document
				.querySelectorAll(`.tab-btn[data-group="${group}"]`)
				.forEach((btn) => {
					btn.classList.remove("active");
					btn.style.backgroundColor = "";
				});

			// Hide all tab-content in this group
			document
				.querySelectorAll(`.tab-content[data-group="${group}"]`)
				.forEach((tab) => {
					tab.classList.remove("active");
				});

			// Activate clicked tab + its content
			const target = button.getAttribute("data-tab");
			const bgColor = button.getAttribute("data-color");

			document.getElementById(target)?.classList.add("active");
			button.classList.add("active");
			button.style.backgroundColor = bgColor;
		});
	});

	// Activate first tab in each group
	const groups = [
		...new Set([...tabButtons].map((btn) => btn.getAttribute("data-group"))),
	];
	groups.forEach((group) => {
		const firstBtn = document.querySelector(`.tab-btn[data-group="${group}"]`);
		if (!firstBtn) return;
		const firstTabId = firstBtn.getAttribute("data-tab");
		const firstColor = firstBtn.getAttribute("data-color");
		firstBtn.classList.add("active");
		firstBtn.style.backgroundColor = firstColor;
		document.getElementById(firstTabId)?.classList.add("active");
	});
});

// educatores javascript end

// academic tab js

function toggleTab(element, showId) {
	// Toggle active class
	document.querySelectorAll(".text-tab-academic").forEach((tab) => {
		tab.classList.remove("active-tab");
	});
	element.classList.add("active-tab");

	// Show/Hide content containers
	document.querySelector(".academic-context-container").style.display = "none";
	document.querySelector(".lession-tab-container").style.display = "none";

	document.querySelector("." + showId).style.display = "block";
}

// Set default tab on page load

window.onload = () => {
	document.querySelectorAll(".text-tab-academic")[0].click();
};

// acadmic end js

// pricing tap click js start

// ✅ Set default selections on page load

window.addEventListener("DOMContentLoaded", () => {
	const allBoxes = document.querySelectorAll(".inner-number-title-box");

	// Set default: 0 - 300
	const studentButton = allBoxes[0].querySelector(".input-button");
	studentButton.textContent = "0 - 300";

	// Set default: 1 Month
	const timeButton = allBoxes[1].querySelector(".input-button");
	timeButton.textContent = "1 Month";
});

// ✅ Toggle dropdown on input-button click
document.querySelectorAll(".input-button").forEach((button) => {
	button.addEventListener("click", () => {
		const dropdown = button.nextElementSibling;
		dropdown.classList.toggle("active");

		// Close others
		document.querySelectorAll(".select-the-student-box").forEach((box) => {
			if (box !== dropdown) box.classList.remove("active");
		});
	});
});

// ✅ Set clicked value manually
document.querySelectorAll(".License-text").forEach((item) => {
	item.addEventListener("click", () => {
		const selectedText = item.textContent.trim();
		const parentBox = item.closest(".inner-number-title-box");
		const button = parentBox.querySelector(".input-button");
		const dropdown = parentBox.querySelector(".select-the-student-box");

		// Set the clicked value only (no auto-linking)
		button.textContent = selectedText;

		// Close dropdown
		dropdown.classList.remove("active");
	});
});

// ✅ Close all dropdowns when clicking outside
document.addEventListener("click", (e) => {
	if (!e.target.closest(".inner-number-title-box")) {
		document.querySelectorAll(".select-the-student-box").forEach((box) => {
			box.classList.remove("active");
		});
	}
});

// pricing click inforamtion tooltip click show js

document.addEventListener("DOMContentLoaded", function () {
	const infoIcon = document.querySelector(".icon-info-box");
	const toolInfo = document.querySelector(".show-tool-info");

	infoIcon.addEventListener("click", () => {
		if (toolInfo.style.display === "none" || toolInfo.style.display === "") {
			toolInfo.style.display = "block";
		} else {
			toolInfo.style.display = "none";
		}
	});
});


// pricing click information tooltip click show end js

// pricing tab click end js

// image slider js

const images1 = document.querySelectorAll(".slide-image");
let currentIndex = 0;
  const title = document.getElementById("sectionTitle");
  const names = ["Create Sections", "Upload Images", "Finish Setup"];
const showImage = (index) => {
	images1.forEach((img, i) => {
		img.classList.toggle("active", i === index);
	});
};

document.getElementById("nextBtn").addEventListener("click", () => {
	currentIndex = (currentIndex + 1) % images1.length;
	showImage(currentIndex);
 title.textContent = names[currentIndex];

});

document.getElementById("prevBtn").addEventListener("click", () => {
	currentIndex = (currentIndex - 1 + images1.length) % images1.length;
	showImage(currentIndex);
		    title.textContent = names[currentIndex];
});

// Initial show
showImage(currentIndex);
// image slider js



