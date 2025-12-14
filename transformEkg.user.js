// ==UserScript==
// @namespace     https://openuserjs.org/users/lukespacewalker
// @name          Transform EKG
// @description   Add copy EKG butto on ebmc.bdms.ac.th
// @copyright     2025, lukespacewalker (https://openuserjs.org/users/lukespacewalker)
// @license       MIT
// @version       1.0.0
// @include       https://ebmc.bdms.ac.th/*
// @require       transformEkg.js
// @grant         GM_addStyle
// ==/UserScript==

// ==OpenUserJS==
// @author lukespacewalker
// ==/OpenUserJS==

/**
  *
  * Please begin typing or paste your User script now.
  *
  * NOTE: It is still strongly recommended to use the Author Tools panel to
  *       add your `@updateURL` even if we are not in lockdown.
  *
  */

(function () {
    'use strict';

    GM_addStyle(`
.ekg-copy-button {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
}

.ekg-copy-button:hover {
  background-color: #0056b3;
}
    `);
})();

function addCopyButton() {
    // 1. Check if the page has "EKG" word in it
    if (!(document.body.innerText.includes("EKG") && document.body.innerText.includes("Result Text"))) {
        console.log("Page does not contain 'EKG' and 'Result Text'. Skipping.");
        return;
    }

    // 2. Find label containing "Result" word
    // We look for a label that directly contains the text "Result" or has it in its innerText.
    // To be precise and avoid selecting the whole body, we look for the deepest element or a specific match.

    // Strategy: Find all labels, filter by those containing "Result", sort by length of text to find the most specific one.
    const allLabels = Array.from(document.querySelectorAll('label'));
    const resultLabels = allLabels.filter(label => label.innerText.includes("Result Text"));

    if (resultLabels.length === 0) {
        console.log("No label containing 'Result Text' found.");
        return;
    }

    // Sort by innerText length ascending. The shortest one containing "Result" is likely the label or the specific container.
    resultLabels.sort((a, b) => a.innerText.length - b.innerText.length);
    const targetLabel = resultLabels[0];

    console.log("Found target label:", targetLabel);

    // 3. Add "Copy EKG" button near the label
    // We will append it to the target label, or insert it after.
    // Let's create a container for the button to ensure it doesn't mess up layout too much, or just append.
    const button = document.createElement("button");
    button.innerText = "Copy EKG From Above";
    button.classList.add("ekg-copy-button");

    button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        // get content from textarea id = "output"
        const heartRate = document.querySelector("#hr").value;
        const ekgImpression = document.querySelector("#ecg_impression").value;
        const transformedTextArray = TransformEKG(ekgImpression);
        const ekgSummary = document.querySelector("#ekg_result_text").value;
        // Add heart rate at the end of first element
        if (
            transformedTextArray.length > 0 &&
            heartRate &&
            heartRate.trim() !== ""
        ) {
            transformedTextArray[0] += ` ${heartRate.trim()} bpm`;
        }
        transformedTextArray.push(ekgSummary.trim())
        document.querySelector("#ekg_result_text").value = transformedTextArray.join("\r\n");
    });

    // Append to the found label
    targetLabel.appendChild(button);
}

// Run when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addCopyButton);
} else {
    addCopyButton();
}
