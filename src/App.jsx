import React, { useState, useEffect } from 'react';
import './App.css';
import coupleImage from './assets/couple.jpg';

// ==================== MAIN APP ====================
export default function App() {
  const [activeTab, setActiveTab] = useState('wallet');
  const [user, setUser] = useState({ id: 'kik', name: 'Kik' });
  const [partner, setPartner] = useState({ id: 'partner', name: 'Partner' });

  return (
    <div className="app-container">
      <Header user={user} />

      <div className="tab-navigation">
        <TabButton
          tab="wallet"
          label="💰 Wallet"
          active={activeTab === 'wallet'}
          onClick={() => setActiveTab('wallet')}
        />
        <TabButton
          tab="event"
          label="📅 Event"
          active={activeTab === 'event'}
          onClick={() => setActiveTab('event')}
        />
      </div>

      <div className="content-wrapper">
        {activeTab === 'wallet' && <WalletModule user={user} partner={partner} />}
        {activeTab === 'event' && <EventModule />}
      </div>
    </div>
  );
}

// ==================== HEADER ====================
function Header({ user }) {
  const [anniversary, setAnniversary] = React.useState({
    date: '2024-12-25',
    daysUntil: calculateDaysUntil('12-25'),
    message: '💑 ครบรอบรักษ์คน',
  });

  const [showEditForm, setShowEditForm] = React.useState(false);
  const [relationshipDuration, setRelationshipDuration] = React.useState({
    years: 0,
    months: 0,
    days: 0,
  });

  // Calculate relationship duration in realtime
  React.useEffect(() => {
    const calculateDuration = () => {
      const startDate = new Date(2024, 1, 29); // 29/02/2024
      const today = new Date();

      let years = today.getFullYear() - startDate.getFullYear();
      let months = today.getMonth() - startDate.getMonth();
      let days = today.getDate() - startDate.getDate();

      // Adjust for negative days
      if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
      }

      // Adjust for negative months
      if (months < 0) {
        years--;
        months += 12;
      }

      setRelationshipDuration({ years, months, days });
    };

    calculateDuration();

    // Update every second for realtime effect
    const interval = setInterval(calculateDuration, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      <div style={{ textAlign: 'left'}}>
        <p style={{ letterSpacing: '0.2rem', color: '#272626' }}> 💖 Anniversary</p>
        <h1  style={{ letterSpacing: '0.1rem', color: '#272626',fontSize: '1.5rem' }}>{relationshipDuration.years} Y {relationshipDuration.months} M {relationshipDuration.days} D</h1>
      </div>
      {/* Anniversary Section */}
       <div>
        <img 
          src={coupleImage}
          alt="Our Couple" 
          className="header-anniversary-image"
        />
      </div>
      {/* <div>
        <div className="header-anniversary">
          <div className="countdown-mini">
            <span className="countdown-number">{anniversary.daysUntil}</span>
            <span className="countdown-label">days</span>
          </div>
          <p className="anniversary-msg">{anniversary.message}</p>
        </div>
        <button 
          className="btn-anniversary-edit"
          onClick={() => setShowEditForm(!showEditForm)}
        >
          ✏️ Edit
        </button>
      </div> */}

      {/* {showEditForm && (
        <AnniversaryEditForm 
          anniversary={anniversary}
          onSave={(updated) => {
            setAnniversary({
              ...updated,
              daysUntil: calculateDaysUntil(updated.date)
            });
            setShowEditForm(false);
          }}
          onCancel={() => setShowEditForm(false)}
        />
      )} */}

      {/* <div className="header-info">
        <span className="user-badge">👤 {user.name}</span>
      </div> */}
    </div>
  );
}

// ==================== TAB BUTTON ====================
function TabButton({ tab, label, active, onClick }) {
  return (
    <button
      className={`tab-button ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// ==================== WALLET MODULE ====================
function WalletModule({ user, partner }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      amount: 250,
      category: 'food',
      paidBy: 'kik',
      description: 'Lunch at Emporium',
      date: '2025-01-15',
      time: '12:30',
    },
    {
      id: 2,
      amount: 150,
      category: 'gas',
      paidBy: 'partner',
      description: 'Fill up at Shell',
      date: '2025-01-14',
      time: '16:45',
    },
    {
      id: 3,
      amount: 500,
      category: 'activity',
      paidBy: 'kik',
      description: 'Movie tickets + popcorn',
      date: '2025-01-13',
      time: '19:00',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'food', 'gas', 'borrow', 'activity'];

  const filteredExpenses = selectedCategory === 'all'
    ? expenses
    : expenses.filter(e => e.category === selectedCategory);

  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    setShowAddForm(false);
  };

  return (
    <div className="module-container wallet-module">
      {/* Summary Card */}
      <div className="summary-card">
        <div className="summary-item">
          <p className="summary-label">Total ({selectedCategory === 'all' ? 'All' : selectedCategory})</p>
          <p className="summary-amount">฿{totalAmount.toLocaleString()}</p>
        </div>
        <div className="summary-chart">
          <div className="chart-bar">
            <div className="chart-fill"></div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-button ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {getCategoryIcon(cat)} {cat}
          </button>
        ))}
      </div>

      {/* Add Expense Button */}
      <button
        className="btn btn-primary btn-block"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        ➕ Add Expense
      </button>

      {showAddForm && <ExpenseForm onAdd={handleAddExpense} onCancel={() => setShowAddForm(false)} />}

      {/* Expense List */}
      <div className="expense-list">
        {filteredExpenses.length === 0 ? (
          <div className="empty-state">
            <p>📭 No expenses yet</p>
          </div>
        ) : (
          filteredExpenses.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))
        )}
      </div>

      {/* Monthly Summary */}
      <MonthlySummary expenses={expenses} />
    </div>
  );
}

function ExpenseForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'food',
    paidBy: 'kik',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
    });
    setFormData({
      amount: '',
      category: 'food',
      paidBy: 'kik',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
    });
  };

  return (
    <div className="form-card">
      <h3>New Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount (฿)</label>
          <input
            type="number"
            placeholder="0"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="food">🍔 Food</option>
              <option value="gas">⛽ Gas</option>
              <option value="borrow">📌 Borrow</option>
              <option value="activity">🎭 Activity</option>
            </select>
          </div>

          <div className="form-group">
            <label>Paid By</label>
            <select
              value={formData.paidBy}
              onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
            >
              <option value="kik">Kik</option>
              <option value="partner">Partner</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description (optional)</label>
          <input
            type="text"
            placeholder="What was it for?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}

function ExpenseCard({ expense }) {
  return (
    <div className="expense-card">
      <div className="expense-left">
        <div className="category-badge">
          {getCategoryIcon(expense.category)}
        </div>
        <div className="expense-info">
          <p className="expense-category">{expense.category}</p>
          <p className="expense-description">{expense.description || 'No description'}</p>
          <p className="expense-meta">{expense.date} • {expense.time}</p>
        </div>
      </div>
      <div className="expense-right">
        <p className="expense-amount">฿{expense.amount}</p>
        <p className="expense-paidby">Paid by {expense.paidBy}</p>
      </div>
    </div>
  );
}

function MonthlySummary({ expenses }) {
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  const categories = ['food', 'gas', 'borrow', 'activity'];
  const summary = {};

  categories.forEach(cat => {
    summary[cat] = expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
  });

  const total = Object.values(summary).reduce((a, b) => a + b, 0);

  return (
    <div className="summary-section">
      <h3>📊 {currentMonth} Summary</h3>
      <div className="summary-grid">
        {categories.map(cat => (
          <div key={cat} className="summary-box">
            <p className="summary-icon">{getCategoryIcon(cat)}</p>
            <p className="summary-cat">{cat}</p>
            <p className="summary-val">฿{summary[cat]}</p>
            <p className="summary-percent">
              {total > 0 ? ((summary[cat] / total) * 100).toFixed(0) : 0}%
            </p>
          </div>
        ))}
      </div>
      <div className="summary-total">
        <p>Total This Month</p>
        <p className="total-amount">฿{total}</p>
      </div>
    </div>
  );
}

// ==================== EVENT MODULE ====================
function EventModule() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Movie Date',
      description: 'Watch Dune at EmQuartier',
      date: '2025-01-20',
      time: '19:00',
      location: 'EmQuartier',
      notification: '30min_before',
    },
    {
      id: 2,
      title: 'Dinner Together',
      description: 'Special dinner at Vertical',
      date: '2025-01-25',
      time: '18:30',
      location: 'Vertical Restaurant',
      notification: '1hour_before',
    },
  ]);

  const handleAddEvent = (newEvent) => {
    setEvents([newEvent, ...events]);
    setShowAddForm(false);
  };

  return (
    <div className="module-container event-module">
      <button
        className="btn btn-primary btn-block"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        ➕ Create Event
      </button>

      {showAddForm && <EventForm onAdd={handleAddEvent} onCancel={() => setShowAddForm(false)} />}

      <div className="event-list">
        {events.length === 0 ? (
          <div className="empty-state">
            <p>📭 No events yet</p>
          </div>
        ) : (
          events.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
}

function EventForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    location: '',
    notification: '30min_before',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      ...formData,
    });
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      location: '',
      notification: '30min_before',
    });
  };

  return (
    <div className="form-card">
      <h3>New Event</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title *</label>
          <input
            type="text"
            placeholder="Movie date, Dinner, etc"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            placeholder="Add details..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Time *</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="Where are you going?"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Remind Me</label>
          <select
            value={formData.notification}
            onChange={(e) => setFormData({ ...formData, notification: e.target.value })}
          >
            <option value="30min_before">30 minutes before</option>
            <option value="1hour_before">1 hour before</option>
            <option value="1day_before">1 day before</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-badge">📅</div>
      <div className="event-content">
        <h4>{event.title}</h4>
        {event.description && <p className="event-desc">{event.description}</p>}
        <div className="event-details">
          <span>🕐 {event.date} {event.time}</span>
          {event.location && <span>📍 {event.location}</span>}
          <span className="notification-badge">🔔 {event.notification.replace('_', ' ')}</span>
        </div>
      </div>
      <div className="event-actions">
        <button className="btn-icon" title="Edit">✏️</button>
        <button className="btn-icon" title="Delete">🗑️</button>
      </div>
    </div>
  );
}

// ==================== ANNIVERSARY EDIT FORM (for Header) ====================
function AnniversaryEditForm({ anniversary, onSave, onCancel }) {
  const [formData, setFormData] = React.useState({
    date: anniversary.date,
    message: anniversary.message,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="form-card form-card-header">
      <h3>Edit Anniversary</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Anniversary Date *</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Anniversary Message</label>
          <textarea
            placeholder="Write your message..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows="2"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

// ==================== HELPER FUNCTIONS ====================
function getCategoryIcon(category) {
  const icons = {
    food: '🍔',
    gas: '⛽',
    borrow: '📌',
    activity: '🎭',
    all: '📋',
  };
  return icons[category] || '📌';
}

function calculateDaysUntil(dateString) {
  const [month, day] = dateString.split('-').map(Number);
  const today = new Date();
  let anniversary = new Date(today.getFullYear(), month - 1, day);

  if (anniversary < today) {
    anniversary = new Date(today.getFullYear() + 1, month - 1, day);
  }

  const diff = anniversary - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}