// Maximum number of iterations to prevent infinite loops
const MAX_ITERATION = 10;
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