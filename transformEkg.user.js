// ==UserScript==
// @namespace     https://github.com/lukespacewalker
// @name          EBMC Enhancement: Transform EKG
// @author        Suttisak Denduangchai
// @description   Add copy EKG button ebmc.bdms.ac.th
// @copyright     2025, Suttisak Denduangchai (https://github.com/lukespacewalker)
// @license       MIT
// @version       1.0.3
// @include       https://ebmc.bdms.co.th/*
// @grant         GM_addStyle
// ==/UserScript==

/* 
Configuration
*/

// Maximum number of iterations to prevent infinite loops
const MAX_ITERATION = 10;

/*
Library function: TransformEKG
*/
/**
 * Transform EKG input string into an array of strings.
 * @param {string} input
 * @returns {string[]}
 **/
function TransformEKG(input) {
    const inputs = input.split(/\r?\n/);
    if (inputs.length < 0) return;

    let elements = [];

    let currentElementStartingLineNumber = 0;
    let currentElementEndingLineNumber = 0;


    let iteration = 0;
    while (iteration < MAX_ITERATION) {
        let elementName = inputs[currentElementStartingLineNumber];
        // Find the boundary of element by using elementName
        for (
            let lineNumber = currentElementStartingLineNumber;
            lineNumber < inputs.length;
            lineNumber++
        ) {
            if (inputs[lineNumber].includes(`${elementName}-`)) {
                currentElementEndingLineNumber = lineNumber;
                break; // stop searching
            }
        }

        let text = inputs[currentElementStartingLineNumber + 1];
        text = text.replace(/\s+/g, " ");
        text = text.replace(/^-|-$/g, "");
        elements.push(text);

        currentElementEndingLineNumber = currentElementStartingLineNumber =
            currentElementEndingLineNumber + 1;

        iteration++;
        if (currentElementEndingLineNumber + 1 >= inputs.length) break; // entire string has been processed. break the while loop
    }

    return elements;
}

/*
  Styles functions
*/

function addStyles() {
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
}


/*
  Main function to add the button
*/

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

/*
    Run the main function on DOMContentLoaded
*/
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        addCopyButton();
        addStyles();
    });
} else {
    addCopyButton();
    addStyles();
}
