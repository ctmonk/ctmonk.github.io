class ModernSidebar {
  constructor() {
    this.navItems = [
      { label: 'Home', href: 'index.html' },
      { label: 'News', href: 'News.html' },
      { label: 'About', href: 'About.html' },
      { label: 'Projects', href: 'Projects.html' },
      { label: 'Members', href: 'Members.html' },
      { label: 'Publications', href: 'Publications.html' },
      { label: 'Visualizations', href: 'Visualizations.html' },
      { label: 'Contact', href: 'Contact.html' }
    ];

    // Use 'index.html' as default if the path is just '/'
    this.currentPath = window.location.pathname.split('/').pop() || 'index.html';
    this.isOpen = false;
    this.hamburgerBtn = null; // Store reference to button
    this.sidebarPanel = null; // Store reference to panel
    this.firstFocusableElement = null; // For focus management
    this.lastFocusedElement = null; // To restore focus on close

    this.init();
  }

  init() {
    this.createNavbar();
    this.setupEventListeners();
    this.highlightActiveItem();
  }

  createNavbar() {
    const navbarContainer = document.getElementById('navbar-container') || document.createElement('div');
    navbarContainer.id = 'navbar-container';
    // Ensure container exists in the body if it wasn't already there
    if (!document.getElementById('navbar-container')) {
        document.body.appendChild(navbarContainer);
    }

    // --- Create Hamburger Button ---
    this.hamburgerBtn = document.createElement('button');
    this.hamburgerBtn.className = 'hamburger-btn';
    this.hamburgerBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
    this.hamburgerBtn.setAttribute('aria-expanded', 'false'); // Initial state
    this.hamburgerBtn.setAttribute('aria-controls', 'sidebar-panel'); // Points to the sidebar
    this.hamburgerBtn.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    navbarContainer.appendChild(this.hamburgerBtn);

    // --- Create Overlay ---
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.setAttribute('aria-hidden', 'true'); // Hide from screen readers when closed
    navbarContainer.appendChild(overlay); // Append to container

    // --- Create Sidebar Panel ---
    this.sidebarPanel = document.createElement('div');
    this.sidebarPanel.id = 'sidebar-panel'; // ID for aria-controls
    this.sidebarPanel.className = 'sidebar-panel';
    this.sidebarPanel.setAttribute('role', 'navigation'); // Semantic role
    this.sidebarPanel.setAttribute('aria-hidden', 'true'); // Start hidden

    // Add logo
    const logo = document.createElement('img');
    logo.src = 'LogoLight.svg'; // Ensure this path is correct
    logo.alt = 'Company Logo'; // More descriptive alt text
    logo.className = 'sidebar-logo';
    this.sidebarPanel.appendChild(logo);

    // Create nav items container
    const navItemsContainer = document.createElement('nav'); // Use <nav> element
    navItemsContainer.className = 'nav-items-container';
    navItemsContainer.setAttribute('aria-label', 'Main Navigation');

    // Add nav items
    this.navItems.forEach((item, index) => {
      const navItem = document.createElement('a');
      navItem.href = item.href;
      navItem.textContent = item.label;
      navItem.className = 'nav-item';
      // Staggered transition delay applied via CSS now for simplicity
      // navItem.style.transitionDelay = `${index * 0.05}s`;
      navItemsContainer.appendChild(navItem);

      // Set the first focusable element
      if (index === 0) {
          this.firstFocusableElement = navItem;
      }
    });

    this.sidebarPanel.appendChild(navItemsContainer);
    navbarContainer.appendChild(this.sidebarPanel); // Append to container
  }

  setupEventListeners() {
    const overlay = document.querySelector('.sidebar-overlay'); // Select within container if needed

    this.hamburgerBtn.addEventListener('click', () => this.toggleSidebar());
    overlay.addEventListener('click', () => this.toggleSidebar());

    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.toggleSidebar();
      }
      // Basic focus trapping (optional, can be expanded)
      // if (e.key === 'Tab' && this.isOpen) {
      //   // Add logic here to trap focus within the sidebar
      // }
    });
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    document.body.classList.toggle('navbar-open', this.isOpen);

    // Update ARIA attributes
    this.hamburgerBtn.setAttribute('aria-expanded', this.isOpen);
    this.sidebarPanel.setAttribute('aria-hidden', !this.isOpen);
    const overlay = document.querySelector('.sidebar-overlay');
    overlay.setAttribute('aria-hidden', !this.isOpen);


    if (this.isOpen) {
      // Store the element that had focus before opening
      this.lastFocusedElement = document.activeElement;

      // Animate in nav items (CSS handles this now with the body class)
      // Optional: slight delay before setting focus to allow transition
      setTimeout(() => {
          if(this.firstFocusableElement) {
              this.firstFocusableElement.focus();
          }
      }, 100); // Adjust delay as needed to match transition time

    } else {
      // Return focus to the element that opened the sidebar
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
      // CSS handles hiding items
    }
  }

  highlightActiveItem() {
    // Use querySelectorAll on the specific panel to be more precise
    const navItems = this.sidebarPanel.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      // Get the filename part of the href for comparison
      const itemHref = item.getAttribute('href').split('/').pop();
      const currentHref = this.currentPath;

      // Check if the item's href matches the current path
      // Also handles the case where currentPath might be empty (root) and href is 'index.html'
      if (itemHref === currentHref || (currentHref === '' && itemHref === 'index.html')) {
        item.classList.add('active');
        item.setAttribute('aria-current', 'page'); // Indicate current page for accessibility
      } else {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      }
    });
  }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ModernSidebar();
});