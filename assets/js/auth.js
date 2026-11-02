/**
 * Usman Mens Wear - Authentication & Customer Profile Manager
 * Handles login, registration, addresses, sessions, and role checks
 */

const INITIAL_USERS = [
  {
    id: "usr-001",
    name: "Usman Khan",
    email: "user@usmanwear.com",
    phone: "9876543210",
    password: "user123",
    role: "customer",
    joinedDate: "2026-01-15",
    addresses: [
      {
        id: "addr-001",
        name: "Usman Khan",
        phone: "9876543210",
        addressLine: "Flat 402, Royal Residency, 12th Main Road, Indiranagar",
        landmark: "Near Defense Colony Park",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
        type: "Home",
        isDefault: true
      },
      {
        id: "addr-002",
        name: "Usman Khan",
        phone: "9876543210",
        addressLine: "Level 6, Tech Park Towers, Whitefield",
        landmark: "Opposite Metro Station",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560066",
        type: "Work",
        isDefault: false
      }
    ]
  },
  {
    id: "usr-admin",
    name: "Master Admin",
    email: "admin@usmanwear.com",
    phone: "9999988888",
    password: "admin123",
    role: "admin",
    joinedDate: "2025-11-01",
    addresses: []
  }
];

const AuthManager = {
  USERS_KEY: "umw_users",
  SESSION_KEY: "umw_session_user",

  init() {
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(INITIAL_USERS));
    }
  },

  getAllUsers() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.USERS_KEY)) || INITIAL_USERS;
    } catch (e) {
      return INITIAL_USERS;
    }
  },

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(this.SESSION_KEY)) || null;
    } catch (e) {
      return null;
    }
  },

  login(emailOrPhone, password) {
    const cleanId = (emailOrPhone || '').trim().toLowerCase();
    const users = this.getAllUsers();
    
    const user = users.find(u => 
      (u.email.toLowerCase() === cleanId || u.phone === cleanId) && u.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid email/phone or password." };
    }

    // Save session without password field
    const sessionUser = { ...user };
    delete sessionUser.password;
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  },

  register(name, email, phone, password) {
    const users = this.getAllUsers();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPhone = (phone || '').trim();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: "An account with this email address already exists." };
    }

    if (users.some(u => u.phone === cleanPhone)) {
      return { success: false, message: "An account with this mobile number already exists." };
    }

    const newUser = {
      id: "usr-" + Date.now().toString(36),
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      password: password,
      role: "customer",
      joinedDate: new Date().toISOString().split('T')[0],
      addresses: []
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    // Auto login
    const sessionUser = { ...newUser };
    delete sessionUser.password;
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionUser));

    return { success: true, user: sessionUser };
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    window.location.href = "login.html";
  },

  updateProfile(name, phone) {
    const session = this.getCurrentUser();
    if (!session) return false;

    const users = this.getAllUsers();
    const target = users.find(u => u.id === session.id);
    if (target) {
      target.name = name.trim();
      target.phone = phone.trim();
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

      session.name = target.name;
      session.phone = target.phone;
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      return true;
    }
    return false;
  },

  addAddress(addressData) {
    const session = this.getCurrentUser();
    if (!session) return false;

    const users = this.getAllUsers();
    const target = users.find(u => u.id === session.id);
    if (!target) return false;

    const newAddr = {
      id: "addr-" + Date.now(),
      ...addressData,
      isDefault: target.addresses.length === 0 || addressData.isDefault
    };

    if (newAddr.isDefault) {
      target.addresses.forEach(a => a.isDefault = false);
    }

    target.addresses.push(newAddr);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    session.addresses = target.addresses;
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return newAddr;
  },

  deleteAddress(addressId) {
    const session = this.getCurrentUser();
    if (!session) return false;

    const users = this.getAllUsers();
    const target = users.find(u => u.id === session.id);
    if (!target) return false;

    target.addresses = target.addresses.filter(a => a.id !== addressId);
    if (target.addresses.length > 0 && !target.addresses.some(a => a.isDefault)) {
      target.addresses[0].isDefault = true;
    }

    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    session.addresses = target.addresses;
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return true;
  },

  requireAuth() {
    const user = this.getCurrentUser();
    if (!user) {
      const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `login.html?returnUrl=${returnUrl}`;
      return null;
    }
    return user;
  },

  requireAdmin() {
    const user = this.getCurrentUser();
    if (!user || user.role !== "admin") {
      window.location.href = "index.html"; // Admin login gate
      return null;
    }
    return user;
  }
};

AuthManager.init();

