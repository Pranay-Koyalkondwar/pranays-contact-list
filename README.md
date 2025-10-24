# Contact List Application

A modern, responsive contact management application built with React and Vite. This application allows users to view, search, and add contacts with an intuitive user interface.

## 🚀 Features

### Core Features
1. **View Contact List** - Display all contacts in a responsive grid layout with avatar, name, email, and phone information
2. **Search Functionality** - Real-time search filter to find contacts by name
3. **Add New Contacts** - Modal form to add new contacts with validation
4. **Edit Contacts** - Edit existing contact information including profile image
5. **Delete Contacts** - Delete contacts with confirmation modal

### Additional Features
- **Theme Toggle** - Manual switch between light and dark modes with persistent preference
- **Animated Theme Button** - Rotating sun/moon icon with smooth transitions
- **Pagination** - Navigate through contacts with page numbers (6 contacts per page)
- **Smart Pagination** - Auto-adjusts pages after adding/deleting contacts
- **Page Info** - Shows current range and total contacts
- **Profile Image Upload** - Upload custom profile images for contacts (PNG, JPG up to 5MB)
- **Image Preview** - Real-time preview of uploaded images with remove option
- **Delete Confirmation** - Warning modal before deleting contacts
- **Action Buttons** - Edit and delete buttons on each contact card
- **Loading States** - Smooth loading animation while fetching contacts
- **Empty States** - Friendly message when no contacts match the search
- **Form Validation** - Client-side validation for name, email, phone, and image fields
- **Duplicate Prevention** - Prevents adding contacts with duplicate phone numbers
- **Responsive Design** - Fully responsive layout that works on desktop, tablet, and mobile
- **Dark Mode Support** - Full dark mode with manual toggle (overrides system preference)
- **Interactive UI** - Hover effects, smooth transitions, and modern animations
- **Results Counter** - Display count of filtered/total contacts

## 🛠️ Technologies Used

- **React** (v18+) - Component-based UI library
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **DiceBear API** - For generating unique avatar images

## 📦 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd contact-list-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

### Build for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
contact-list-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx                # Search input component
│   │   ├── SearchBar.css
│   │   ├── ContactList.jsx              # Contact grid container
│   │   ├── ContactList.css
│   │   ├── ContactCard.jsx              # Individual contact card
│   │   ├── ContactCard.css
│   │   ├── AddContactForm.jsx           # Modal form for adding contacts
│   │   ├── AddContactForm.css
│   │   ├── EditContactForm.jsx          # Modal form for editing contacts
│   │   ├── DeleteConfirmationModal.jsx  # Delete confirmation dialog
│   │   ├── DeleteConfirmationModal.css
│   │   ├── Pagination.jsx               # Pagination controls
│   │   ├── Pagination.css
│   │   ├── ThemeToggle.jsx              # Theme switcher button
│   │   └── ThemeToggle.css
│   ├── data/
│   │   └── mockContacts.js       # Mock contact data
│   ├── App.jsx                   # Main application component
│   ├── App.css
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Application entry point
├── public/
├── package.json
└── README.md
```

## 🎨 Design Decisions

### Component Architecture
- **Modular Components**: Each component has a single responsibility (SearchBar, ContactCard, ContactList, AddContactForm)
- **Component Composition**: Components are composed together in the main App component
- **Separation of Concerns**: Styling is kept in separate CSS files for each component

### State Management
- **Local State with useState**: Used React hooks for managing component state
- **Simulated API Call**: `useEffect` hook simulates an API call with loading delay
- **Derived State**: Filtered contacts are computed on-the-fly rather than stored separately

### Data Handling
- **Mock Data**: Hardcoded contact data in `mockContacts.js` to simulate API response
- **API-Ready Structure**: The code structure makes it easy to replace mock data with real API calls
- **Unique IDs**: Using `Date.now()` for new contact IDs (would use server-generated IDs in production)

### User Experience
- **Loading State**: 1-second simulated delay to demonstrate loading UI
- **Pagination**: Shows 6 contacts per page for optimal viewing and performance
- **Smart Navigation**: Auto-scrolls to top when changing pages
- **Page Reset**: Returns to page 1 when searching or adding new contacts
- **Search Debouncing**: Instant search without debouncing for better UX (debouncing could be added for large datasets)
- **Form Validation**: Real-time validation with error messages
- **Empty States**: Helpful messages when no contacts are found
- **Accessibility**: Semantic HTML, proper labels, and keyboard navigation support

### Styling Approach
- **Pure CSS**: No CSS frameworks to demonstrate CSS skills
- **Data Attributes**: Using `data-theme` attribute for theme switching
- **LocalStorage**: Persisting user's theme preference across sessions
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Dark Mode**: Manual toggle with localStorage persistence (defaults to system preference)
- **Animations**: Smooth transitions and hover effects for better interactivity

### Error Handling
- **Form Validation**: Email format validation, required field checks
- **Duplicate Detection**: Checks phone numbers against existing contacts
- **User Feedback**: Descriptive error messages with contact names for duplicates
- **Defensive Programming**: Null checks and fallback states throughout

## 🔮 Future Enhancements

If more time were available, these features could be added:

1. **Backend Integration**
   - Connect to a real REST API or GraphQL endpoint
   - Persistent storage with database
   - User authentication and authorization

2. **Advanced Features**
   - Bulk operations (select multiple, delete all)
   - Export contacts to CSV/vCard
   - Contact groups/categories
   - Favorites/starred contacts
   - Sort contacts (alphabetically, by date added)

3. **Enhanced Search**
   - Search by email or phone number
   - Advanced filters (by date added, alphabetical, etc.)
   - Search suggestions/autocomplete

4. **Performance Optimizations**
   - Virtualized list for very large datasets (1000+ contacts)
   - Debounced search for better performance
   - Infinite scroll as alternative to pagination
   - Memoization with useMemo/useCallback

5. **Testing**
   - Unit tests with Vitest
   - Component tests with React Testing Library
   - E2E tests with Playwright or Cypress

6. **Accessibility**
   - ARIA labels and roles
   - Keyboard shortcuts
   - Screen reader optimization
   - Focus management

7. **Additional UX Improvements**
   - Drag and drop to reorder
   - Contact import from file
   - Contact details view (modal/page)
   - Recent contacts section
   - Undo/redo functionality

## 🌐 Deployment

This application can be easily deployed to various platforms:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Using `gh-pages` package
- **AWS S3**: Upload `dist` folder to S3 bucket

## 📝 Assumptions Made

1. **Data Source**: The application uses hardcoded mock data. In production, this would be replaced with API calls
2. **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge) with ES6+ support
3. **Avatar Images**: Using DiceBear API for avatars (external dependency)
4. **ID Generation**: Using timestamp-based IDs for new contacts (would use UUID or server-generated IDs in production)
5. **No Persistence**: Added contacts are lost on page refresh (would need backend/localStorage)
6. **Single User**: No multi-user support or authentication required
7. **Network Conditions**: Assuming stable internet connection for avatar images

## 📄 License

This project is created as an assignment for Tria.

## 👤 Author

Built with ❤️ as part of the Tria frontend assignment.
