// Wait for the DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', async () => {
	// Define constants for global variable names
	const FORCE_REGION = 'FORCE_REGION';
	const FORCE_LOCALE = 'FORCE_LOCALE';
	const FORCE_CURRENCY = 'FORCE_CURRENCY';


	// Load settings and initialize the UI
	const result = await browser.storage.local.get([
		FORCE_REGION, FORCE_LOCALE, FORCE_CURRENCY
	]);

	// Set initial values in the UI
	document.getElementById('region')
		.value = result.FORCE_REGION || 'US';
	document.getElementById('currency')
		.value = result.FORCE_CURRENCY || 'USD';

	// Add event listener for the save button
	document.getElementById('save')
		.addEventListener('click', async () => {
			const region = document.getElementById('region').value;
			const currency = document.getElementById('currency').value;

			try {
				await browser.storage.local.set({
					FORCE_REGION: region,
					FORCE_CURRENCY: currency
				});

				console.log("Settings saved:", {
					region,
					currency
				});

				// Show success message
				const successMessage = document.createElement('div');
				successMessage.textContent = "Settings saved!";
				successMessage.style.color = "green";
				successMessage.style.marginTop = "10px";
				document.body.appendChild(successMessage);

				setTimeout(() => {
					document.body.removeChild(successMessage);
				}, 3000);

			} catch (error) {
				console.error("Error saving settings:", error);
			}
		});
});
