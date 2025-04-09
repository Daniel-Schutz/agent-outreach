# Global Account ID Implementation

This document explains how the Account ID is implemented throughout the application.

## Overview

We have added a global `accountId` to the authentication context to make it accessible across the application. This allows any component to access the current account ID without having to pass it through props.

## Implementation Details

### 1. Auth Context Extension

The global authentication context (`AuthContext`) has been extended to include the `accountId`:

- Added `accountId` state to the `AuthProvider` component
- Added functionality to load `accountId` from localStorage on initialization
- Added functionality to save `accountId` to localStorage when setting it
- Exposed `accountId` and `setAccountId` through the context provider

### 2. Components Using Account ID

#### AccountInfo Component

A new component that displays basic account information, including the account ID.

File: `src/components/AccountInfo.jsx`

This component demonstrates simple access to the `accountId` from the global context.

#### AccountUsage Component

A component that uses the `accountId` to fetch and display account usage metrics.

File: `src/components/AccountUsage.jsx`

This component demonstrates how to use the global `accountId` for API calls and data fetching.

### 3. Account Service

A new service for account-related API calls that require the account ID.

File: `src/services/accountService.js`

This service demonstrates how to use the `accountId` in API calls:

- `getAccountDetails(accountId)`: Fetch account details
- `updateAccountSettings(accountId, settings)`: Update account settings
- `getAccountUsage(accountId, options)`: Get account usage metrics

### 4. Usage in Dashboard

The dashboard page has been updated to include the `AccountInfo` and `AccountUsage` components.

File: `src/app/dashboard/page.jsx`

## How to Use

To access the account ID in any component:

```jsx
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { accountId } = useAuth();
  
  // Use accountId...
  
  return (
    // JSX...
  );
}
```

To update the account ID:

```jsx
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { setAccountId } = useAuth();
  
  // Update account ID
  const handleAccountChange = (newAccountId) => {
    setAccountId(newAccountId);
  };
  
  return (
    // JSX...
  );
}
```

## Notes

- The account ID is persisted in localStorage, so it will be available across page refreshes
- When a user logs out, the account ID is cleared
- For demo/testing purposes, a random account ID is generated when a user logs in 