import moment from "moment";

const convertToIndianCurrency = (paise) => {
    return `₹${(paise / 100).toFixed(2)}`;
};

const formatDate = (date) => {
    return moment(date).format('DD MMM YYYY hh:mm A');
};

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} text - The text to escape
 * @returns {string} - The escaped text
 */
const escapeHtml = (text) => {
    if (typeof text !== 'string') {
        return text;
    }

    const htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };

    return text.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
};

/**
 * Escapes HTML and also converts newlines to <br> tags for display
 * @param {string} text - The text to escape and format
 * @returns {string} - The escaped and formatted text
 */
const escapeHtmlAndFormat = (text) => {
    if (typeof text !== 'string') {
        return text;
    }

    return escapeHtml(text).replace(/\n/g, '<br>');
};

/**
 * Sanitizes user input by trimming whitespace and escaping HTML
 * @param {string} input - The user input to sanitize
 * @returns {string} - The sanitized input
 */
const sanitizeInput = (input) => {
    if (typeof input !== 'string') {
        return input;
    }

    return escapeHtml(input.trim());
};

/**
 * Test function to verify HTML escaping functionality
 * This function can be used for testing purposes
 */
const testEscapeHtml = () => {
    const testCases = [
        { input: '<script>alert("XSS")</script>', expected: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;' },
        { input: 'Hello & World', expected: 'Hello &amp; World' },
        { input: 'User\'s input', expected: 'User&#x27;s input' },
        { input: 'Normal text', expected: 'Normal text' },
        { input: '', expected: '' },
        { input: null, expected: null },
        { input: undefined, expected: undefined }
    ];

    console.log('Testing HTML escaping functionality:');
    testCases.forEach((testCase, index) => {
        const result = escapeHtml(testCase.input);
        const passed = result === testCase.expected;
        console.log(`Test ${index + 1}: ${passed ? 'PASS' : 'FAIL'}`);
        console.log(`  Input: ${testCase.input}`);
        console.log(`  Expected: ${testCase.expected}`);
        console.log(`  Got: ${result}`);
        console.log('');
    });
};

export {
    convertToIndianCurrency,
    formatDate,
    escapeHtml,
    escapeHtmlAndFormat,
    sanitizeInput,
    testEscapeHtml
};