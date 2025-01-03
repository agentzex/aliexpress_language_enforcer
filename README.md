
## What It's For

Force any AliExpress language/locale page (like xx.aliexpress.com, where xx is the two-letter language ISO code) to redirect to its global English equivalent.

This works great if you happen to compare Aliexpress items prices via image search and other addons, and one of the search results
is a link to an item page in a different language/locale than your default one. 

Usually what happens is not only that link will open in a different language, but also Aliexpress
might stuck with that language for any other page you open until you manually change it via the language/currency/locale settings. 

This tool solves this annoying issue! 


Watch:


https://github.com/user-attachments/assets/0972eaf1-457d-4b5c-bbac-affdba32577f



## Browser Extension\Add-On


Click on the extension icon to set region and currency settings. Don't forget to click save!

![thumbnail](https://github.com/user-attachments/assets/b9df4f26-9759-4181-866c-9eaccf0b9d4f)


* Install via [Firefox Extension Store](https://addons.mozilla.org/en-GB/firefox/addon/aliexpress-language-enforcer/)

OR

* Install manually:
  * Use /extension as browser extension (tested on Chrome/Firefox)


## Userscript

* Use /user_script as User Script in Greasemoneky, Tampermonkey or equivalent browser extension.
  * Use the global variables to set your desired region and currency:
  ```
  const FORCE_SITE = 'glo'
  const FORCE_REGION = ''
  const FORCE_LOCALE = 'en_US'
  const FORCE_CURRENCY = ''
  ```
  * If any current locale cookie values don't match the global variables you set earlier, this script will change them and then redirect to the global site. To avoid errors, it might take a few seconds (based on your browser, network connection etc.) since it will wait for window.onload to resend the request.
  * Tested with Greasemoneky on Firefox and Tampermonkey on Chrome.


  **Important**: Don't forget to delete all your current cookies from all subdomains of Aliexpress from your browser **BEFORE** enabling and running this script
