import Papa from 'papaparse';

/**
 * Service to fetch and parse data from published Google Sheets (CSV format).
 */

const GoogleSheetService = {
    /**
     * Fetches data from a Google Sheet published as CSV.
     * @param {string} sheetUrl - The URL of the published Google Sheet (CSV).
     * @returns {Promise<Array>} - Array of objects representing the rows.
     */
    fetchData: async (sheetUrl) => {
        if (!sheetUrl) return [];

        try {
            const response = await fetch(sheetUrl);
            const csvText = await response.text();

            return new Promise((resolve, reject) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        resolve(results.data);
                    },
                    error: (error) => {
                        reject(error);
                    },
                });
            });
        } catch (error) {
            console.error("Error fetching Google Sheet data:", error);
            return [];
        }
    },

    /**
     * Helper to transform keys if needed or validate data.
     * For now, it passes raw data, assuming Sheet columns match JSON keys.
     */
    transformData: (data) => {
        return data;
    }
};

export default GoogleSheetService;
