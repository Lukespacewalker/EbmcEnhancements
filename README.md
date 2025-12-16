# 🏥 Transform EKG Userscript

A userscript designed to streamline the EKG result documentation process on `ebmc.bdms.co.th`.

## ✨ Features

-   **One-Click Transformation**: Adds a "Copy EKG From Above" button to the interface.
-   **Smart Parsing**: Automatically parses and formats the EKG impression text, removing unnecessary characters and whitespace.
-   **Heart Rate Integration**: Appends the patient's heart rate (from the `#hr` field) directly to the formatted output.
-   **Workflow Enhancement**: Combines the transformed impression with the existing result summary in the `#ekg_result_text` field.

## 🚀 Installation

1.  Install a userscript manager extension for your browser (e.g., **Tampermonkey**, **Violentmonkey**, or **Greasemonkey**).
2.  Create a new script and copy the contents of `transformEkg.user.js` into the editor.
3.  Save the script.

## 📖 Usage

1.  Log in to `https://ebmc.bdms.co.th/`.
2.  Navigate to a page containing EKG results (the script checks for "EKG" and "Result Text" on the page).
3.  Look for the **"Copy EKG From Above"** button near the "Result Text" label.
4.  Click the button to automatically:
    -   Read the EKG Impression and Heart Rate.
    -   Transform and format the text.
    -   Populate the Result Text area with the combined data.

## ⚙️ Configuration

The script includes a safety configuration to prevent infinite loops during parsing:
-   `MAX_ITERATION`: Defaults to 10.

## 📄 License

MIT License. Copyright © 2025 [Suttisak Denduangchai](https://github.com/lukespacewalker).