# 🏥 EBMC Enhancement Userscript

A comprehensive userscript designed to streamline workflows and fix interface issues on `ebmc.bdms.co.th`.

## ✨ Features

### 1. EKG Result Transformation
-   **One-Click Transformation**: Adds a "Copy EKG From Above" button to the interface.
-   **Smart Parsing**: Automatically parses and formats the EKG impression text, removing unnecessary characters and whitespace.
-   **Heart Rate Integration**: Appends the patient's heart rate (from the `#hr` field) directly to the formatted output.
-   **Workflow Enhancement**: Combines the transformed impression with the existing result summary in the `#ekg_result_text` field.

### 2. PAC Link Fixes
-   **Link Correction**: Fixes broken PAC links

### 3. DocView Integration
-   **Link Correction**: Fixes broken DocView links by adjusting the URL path.
-   **Expanded Access**: Adds direct DocView links to:
    -   **Exercise Stress Test (EST)** section.
    -   **Ankle-Brachial Index (ABI)** section.

### 4. Echocardiography (ECHO) Enhancements
-   **PAC Access**: Adds a direct PAC link to the Echocardiography section for quick image viewing.

## 🚀 Installation

1.  Install a userscript manager extension for your browser (e.g., **Tampermonkey**, **Violentmonkey**, or **Greasemonkey**).
2.  Create a new script and copy the contents of `transformEkg.user.js` into the editor.
3.  Save the script.

## 📖 Usage

1.  Log in to `https://ebmc.bdms.co.th/`.
2.  The script automatically runs and applies fixes/enhancements upon page load.
3.  **For EKG Transformation**:
    -   Navigate to a page containing EKG results.
    -   Click the **"Copy EKG From Above"** button near the "Result Text" label to populate the result area.
4.  **For PAC/DocView**:
    -   Look for the new or fixed links in the EST, ABI, and ECHO sections.

## ⚙️ Configuration

The script includes a safety configuration for the EKG parser:
-   `MAX_ITERATION`: Defaults to 10 (prevents infinite loops during text parsing).

## 📄 License

MIT License. Copyright © 2025 [Suttisak Denduangchai](https://github.com/lukespacewalker).