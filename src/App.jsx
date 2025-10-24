import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import ContactList from './components/ContactList'
import AddContactForm from './components/AddContactForm'
import EditContactForm from './components/EditContactForm'
import DeleteConfirmationModal from './components/DeleteConfirmationModal'
import Pagination from './components/Pagination'
import ThemeToggle from './components/ThemeToggle'
import SortButton from './components/SortButton'
import { mockContacts } from './data/mockContacts'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date-newest')
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [deletingContact, setDeletingContact] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6) // Show 6 contacts per page
  
  // Theme state - check localStorage or default to system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Simulate API call to fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true)
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setContacts(mockContacts)
      setIsLoading(false)
    }

    fetchContacts()
  }, [])

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort contacts based on selected sort option
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'date-newest':
        return new Date(b.dateAdded) - new Date(a.dateAdded)
      case 'date-oldest':
        return new Date(a.dateAdded) - new Date(b.dateAdded)
      default:
        return 0
    }
  })

  // Calculate pagination
  const totalPages = Math.ceil(sortedContacts.length / itemsPerPage)
  const indexOfLastContact = currentPage * itemsPerPage
  const indexOfFirstContact = indexOfLastContact - itemsPerPage
  const currentContacts = sortedContacts.slice(indexOfFirstContact, indexOfLastContact)

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Handle adding a new contact
  const handleAddContact = (newContactData) => {
    const newContact = {
      id: Date.now(),
      ...newContactData,
      // Use uploaded avatar or fallback to generated one
      avatar: newContactData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${newContactData.name}`,
      dateAdded: new Date().toISOString()
    }
    setContacts(prev => [newContact, ...prev])
    setShowAddForm(false)
    setCurrentPage(1) // Go to first page to see new contact
  }

  // Handle editing a contact
  const handleEditContact = (contact) => {
    setEditingContact(contact)
  }

  const handleUpdateContact = (updatedContact) => {
    setContacts(prev => prev.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    ))
    setEditingContact(null)
  }

  // Handle deleting a contact
  const handleDeleteContact = (contactId) => {
    const contact = contacts.find(c => c.id === contactId)
    setDeletingContact(contact)
  }

  const confirmDelete = () => {
    setContacts(prev => prev.filter(contact => contact.id !== deletingContact.id))
    setDeletingContact(null)
    
    // Adjust current page if necessary after deletion
    const newTotalPages = Math.ceil((filteredContacts.length - 1) / itemsPerPage)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }
  }

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Contact List</h1>
          <p className="subtitle">Manage your contacts easily</p>
        </div>
        <div className="header-actions">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button 
            className="add-contact-btn" 
            onClick={() => setShowAddForm(true)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
            Add Contact
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="controls-container">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          <SortButton 
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
        
        {!isLoading && filteredContacts.length > 0 && (
          <div className="results-info">
            <p>
              {filteredContacts.length === contacts.length
                ? `${contacts.length} total contact${contacts.length !== 1 ? 's' : ''}`
                : `Found ${filteredContacts.length} of ${contacts.length} contacts`
              }
            </p>
          </div>
        )}

        <ContactList 
          contacts={currentContacts} 
          isLoading={isLoading}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />

        {!isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredContacts.length}
          />
        )}
      </main>

      {showAddForm && (
        <AddContactForm 
          onAddContact={handleAddContact}
          onCancel={() => setShowAddForm(false)}
          existingContacts={contacts}
        />
      )}

      {editingContact && (
        <EditContactForm
          contact={editingContact}
          onUpdateContact={handleUpdateContact}
          onCancel={() => setEditingContact(null)}
          existingContacts={contacts}
        />
      )}

      {deletingContact && (
        <DeleteConfirmationModal
          contact={deletingContact}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingContact(null)}
        />
      )}
    </div>
  )
}

export default App
