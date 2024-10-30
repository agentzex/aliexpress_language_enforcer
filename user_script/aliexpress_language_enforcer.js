// ==UserScript==
// @name         aliexpress_language_enforcer
// @version      0.1
// @description  Force any AliExpress locale (like xx.aliexpress.com) page to redirect to its global equivalent and saves location/currency settings. Set your preferred settings in the globals below. Please clear cookies on all "aliexpress" domains before using this userscript.
// @author       github.com/agentzex
// @include      https://*.aliexpress.*
// @include      https://aliexpress.*
// @license      MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aliexpress.com
// @supportURL   https://github.com/agentzex/aliexpress_language_enforcer
// ==/UserScript==

// adapted from: https://gist.github.com/apfelchips/d8a6e08c1aeb79df4372096fd11c1fc1


const FORCE_SITE = 'glo';
const FORCE_REGION = 'IL';
const FORCE_LOCALE = 'en_US';
const FORCE_CURRENCY = 'USD';


const COOKIE_AEP_USUC_F = "aep_usuc_f";


const languageCodes = [
    "aa", "ab", "ae", "af", "ak", "am", "an", "ar", "as", "av", "ay", "az",
    "ba", "be", "bg", "bh", "bi", "bm", "bn", "bo", "br", "bs",
    "ca", "ce", "ch", "co", "cr", "cs", "cu", "cv", "cy",
    "da", "de", "dv", "dz",
    "ee", "el", "en", "eo", "es", "et", "eu",
    "fa", "ff", "fi", "fj", "fo", "fr",
    "ga", "gd", "gl", "gn", "gu", "gv",
    "ha", "he", "hi", "ho", "hr", "ht", "hu", "hy", "hz",
    "ia", "id", "ie", "ig", "ii", "ik", "io", "is", "it", "iu",
    "ja", "jv",
    "ka", "kg", "ki", "kj", "kk", "kl", "km", "kn", "ko", "kr", "ks", "ku", "kv", "kw", "ky",
    "la", "lb", "lg", "li", "ln", "lo", "lt", "lu", "lv",
    "mg", "mh", "mi", "mk", "ml", "mn", "mr", "ms", "mt", "my",
    "na", "nb", "nd", "ne", "ng", "nl", "nn", "no", "nr", "nv", "ny",
    "oc", "oj", "om", "or", "os",
    "pa", "pi", "pl", "ps", "pt",
    "qu",
    "rm", "rn", "ro", "ru", "rw",
    "sa", "sc", "sd", "se", "sg", "si", "sk", "sl", "sm", "sn", "so", "sq", "sr", "ss", "st", "su", "sv", "sw",
    "ta", "te", "tg", "th", "ti", "tk", "tl", "tn", "to", "tr", "ts", "tt", "tw", "ty",
    "ug", "uk", "ur", "uz",
    "ve", "vi", "vo",
    "wa", "wo",
    "xh",
    "yi", "yo",
    "za", "zh", "zu"
];



const Style = {
	base: [
		"color: #fff", "background-color: #444", "padding: 2px 4px", "border-radius: 2px", "font-weight: bold"
	],
	green: [
		"background-color: green"
	],
	red: [
		"color: #eee", "background-color: red"
	],
	blue: [
		"background-color: blue"
	],
	yellow: [
		"color: #444", "background-color: yellow"
	],
	orange: [
		"background-color: orange"
	]
}


function isCookieValueCorrect(cookieValue) {
	if (cookieValue.includes(`site=${FORCE_SITE}`) &&
		cookieValue.includes(`region=${FORCE_REGION}`) &&
		cookieValue.includes(`b_locale=${FORCE_LOCALE}`) &&
		cookieValue.includes(`c_tp=${FORCE_CURRENCY}`)) {
		return true;
	}

	return false;

}


function shouldSetCookieValue(cookieKey) {
	const cookiePattern = new RegExp('(^| )' + cookieKey + '=([^;]+)');
	const cookies = document.cookie.split('; ');
	var shouldSet = false;

	for (let cookie of cookies) {
		// Cookie key might appear more than one time if already set for different subdomains.
		// If the value of any of the found cookies isn't what is set on the global constants, we will set them to the values of the globals.
		const match = cookie.match(cookiePattern);
		if (match && !isCookieValueCorrect(decodeURIComponent(match[2]))) {
			shouldSet = true;
			break;
		}
	}

	return shouldSet;
}


function setCookie(cName, cValue, expDays) {
	let date = new Date();
	date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${cName}=${cValue}; ${expires}; path=/; domain=aliexpress.com`;
}


function isLanguageSubdomain() {
    const parts = window.location.hostname.split('.');

    // Check if subdomain is 2-letters language, ISO  639
    if (parts.length > 2 && parts[0].length === 2) {
        return languageCodes.includes(parts[0]);
    }
    return false;
}


(function() {

	function redirectToGlobal() {
        // Only apply on languages subdomains, and not on URLs like m.aliexpress.com
        if (!isLanguageSubdomain()) {
            return;
        }

		const global_url = "https://www.aliexpress.com" + window.location.pathname;
		if (shouldSetCookieValue(COOKIE_AEP_USUC_F)) {
			const newCookie = `site=${FORCE_SITE}&c_tp=${FORCE_CURRENCY}&region=${FORCE_REGION}&b_locale=${FORCE_LOCALE}&ae_u_p_s=2`;
			setCookie(COOKIE_AEP_USUC_F, newCookie, 9999);
			window.location.href = global_url;
		}
		else if (window.location.hostname !== "www.aliexpress.com") {
			// if cookies are set correctly but we are not in the global site, redirect to global site
			window.location.href = global_url;
		}
	}
	
	window.onload = redirectToGlobal;
	
})();
