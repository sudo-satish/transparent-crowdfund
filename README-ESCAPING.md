# HTML Escaping Implementation

This document explains the HTML escaping functionality implemented in the RaiseIt application to prevent XSS (Cross-Site Scripting) attacks.

## Overview

The application now includes comprehensive HTML escaping utilities to ensure that user-generated content is safely displayed without allowing malicious scripts to execute.

## Functions Available

### 1. `escapeHtml(text)`

Escapes HTML special characters to prevent XSS attacks.

**Parameters:**

- `text` (string): The text to escape

**Returns:**

- `string`: The escaped text

**Example:**

```javascript
import { escapeHtml } from '@/utils/helper';

const userInput = '<script>alert("XSS")</script>';
const safeText = escapeHtml(userInput);
// Result: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
```

### 2. `escapeHtmlAndFormat(text)`

Escapes HTML and converts newlines to `<br>` tags for display.

**Parameters:**

- `text` (string): The text to escape and format

**Returns:**

- `string`: The escaped and formatted text

**Example:**

```javascript
import { escapeHtmlAndFormat } from '@/utils/helper';

const userInput = 'Hello\nWorld<script>alert("XSS")</script>';
const safeText = escapeHtmlAndFormat(userInput);
// Result: 'Hello<br>World&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
```

### 3. `sanitizeInput(input)`

Sanitizes user input by trimming whitespace and escaping HTML.

**Parameters:**

- `input` (string): The user input to sanitize

**Returns:**

- `string`: The sanitized input

**Example:**

```javascript
import { sanitizeInput } from '@/utils/helper';

const userInput = '  <script>alert("XSS")</script>  ';
const sanitized = sanitizeInput(userInput);
// Result: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
```

## Implementation Details

### Characters Escaped

The following HTML special characters are escaped:

- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#x27;`
- `/` → `&#x2F;`

### Where It's Applied

1. **Frontend Display:**

   - Fund titles and descriptions in the dashboard
   - Fund titles and descriptions in the fund detail page
   - Transaction names and contact information
   - Top contributor names

2. **API Routes:**

   - Fund creation API (`/api/funds`)
   - Feedback submission API (`/api/feedback`)
   - Payment link creation APIs (`/api/razorpay/payment-link`, `/api/razorpay/fixed-payment-link`)
   - Webhook processing (`/api/razorpay/webhook`)

3. **Share Functionality:**
   - Fund titles and descriptions in share data

## Testing

A test function `testEscapeHtml()` is available in the helper utilities to verify the escaping functionality:

```javascript
import { testEscapeHtml } from '@/utils/helper';

// Run tests in browser console or Node.js environment
testEscapeHtml();
```

## Security Benefits

1. **XSS Prevention:** Prevents malicious scripts from executing in the browser
2. **Data Integrity:** Ensures user input is displayed exactly as intended
3. **Cross-Platform Safety:** Works consistently across different browsers and platforms
4. **Input Validation:** Provides a standardized way to handle user input

## Best Practices

1. **Always escape user input** before displaying it in the UI
2. **Use `sanitizeInput()`** for data that will be stored in the database
3. **Use `escapeHtml()`** for data that will be displayed in the UI
4. **Test with malicious input** to ensure proper escaping
5. **Keep the escaping functions updated** if new attack vectors are discovered

## Migration Notes

If you're adding new user input fields or displaying user-generated content:

1. Import the appropriate escaping function
2. Apply it to the user input before display
3. Test with various input types including malicious scripts
4. Update this documentation if needed

## Example Usage in Components

```javascript
import { escapeHtml } from '@/utils/helper';

// In a React component
function DisplayUserContent({ userInput }) {
  return (
    <div>
      <h1>{escapeHtml(userInput.title)}</h1>
      <p>{escapeHtml(userInput.description)}</p>
    </div>
  );
}
```

This implementation ensures that the RaiseIt application is secure against XSS attacks while maintaining a good user experience.
