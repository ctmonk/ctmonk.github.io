function loadNavbar() {
  // Define all navigation options
  const navItems = [
    { label: 'Home', href: 'index.html' },
    { label: 'News', href: 'News.html' },
    { label: 'About', href: 'About.html' },
    { label: 'Projects', href: 'Projects.html' },
    { label: 'Members', href: 'Members.html' },
    { label: 'Publications', href: 'Publications.html' },
    { label: 'Visualizations', href: 'Visualizations.html' },
    { label: 'Contact', href: 'Contact.html' }
  ];
  let currentIndex = 0;
  let isAnimating = false;
  
  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function animateTransition(direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    const navItemDisplay = document.getElementById('nav-item-display');
    if (!navItemDisplay) return;

    const targetIndex = (currentIndex + direction + navItems.length) % navItems.length;
    const startTime = performance.now();
    const duration = 300;
    
    const exitDirection = direction > 0 ? -1 : 1;
    const enterDirection = direction > 0 ? 1 : -1;
    
    const newItem = createNavItem(navItems[targetIndex]);
    newItem.style.transform = `translateX(${enterDirection * 100}%)`;
    newItem.style.opacity = "0";
    navItemDisplay.appendChild(newItem);
    
    const currentItem = navItemDisplay.children[0];

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apple's cubic-bezier easing: (0.65, 0, 0.35, 1)
      const easeProgress = cubicBezier(progress, 0.65, 0, 0.35, 1);
      
      currentItem.style.transform = `translateX(${exitDirection * 100 * easeProgress}%)`;
      currentItem.style.opacity = (1 - easeProgress).toString();
      
      newItem.style.transform = `translateX(${enterDirection * 100 * (1 - easeProgress)}%)`;
      newItem.style.opacity = easeProgress.toString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        navItemDisplay.removeChild(currentItem);
        currentIndex = targetIndex;
        isAnimating = false;
      }
    }

    requestAnimationFrame(update);
}

// Cubic Bezier easing function
function cubicBezier(t, p1, p2, p3, p4) {
  function A(a1, a2) { return 1.0 - 3.0 * a2 + 3.0 * a1; }
  function B(a1, a2) { return 3.0 * a2 - 6.0 * a1; }
  function C(a1) { return 3.0 * a1; }
  
  function calcBezier(t, a1, a2) {
    return ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t;
  }
  
  function getSlope(t, a1, a2) {
    return 3.0 * A(a1, a2) * t * t + 2.0 * B(a1, a2) * t + C(a1);
  }
  
  // Newton-Raphson iteration to find 't' that produces the given 'x'
  function getTForX(x) {
    let guess = x;
    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(guess, p1, p3);
      if (currentSlope === 0.0) return guess;
      const currentX = calcBezier(guess, p1, p3) - x;
      guess -= currentX / currentSlope;
    }
    return guess;
  }
  
  if (p1 === p2 && p3 === p4) return t; // Linear
  return calcBezier(getTForX(t), p2, p4);
}


  function createNavItem(item) {
    const a = document.createElement('a');
    a.href = item.href;
    a.innerText = item.label;
    a.className = 'nav-item';
    return a;
  }

  function renderNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) {
      console.error('Navbar container not found.');
      return;
    }
    navbarContainer.innerHTML = ''; // Clear previous content
    
    // Add CSS for styling
    const style = document.createElement('style');
    style.textContent = `
      #nav-item-display {
        position: relative;
        height: 50px;
        width: 250px;  /* Set fixed width instead of flex: 1 */
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .nav-item {
        position: absolute;
        text-align: center;
        text-decoration: none;
        font-weight: bold;
        padding: 10px 20px;
        transition: transform 0.3s, opacity 0.3s;
        white-space: nowrap;
        color: #333;
      }
      
      .nav-arrow {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0 5px;  /* Reduced padding */
        margin: 0 5px;   /* Added small margin */
      }
    `;

    document.head.appendChild(style);

    // Left arrow button
    const leftBtn = document.createElement('button');
    leftBtn.innerHTML = '&#9664;';
    leftBtn.className = 'nav-arrow';
    leftBtn.addEventListener('click', () => animateTransition(-1));
    navbarContainer.appendChild(leftBtn);

    // Container for the single visible nav item
    const navItemDisplay = document.createElement('div');
    navItemDisplay.id = 'nav-item-display';
    
    // Create the initial nav item
    const initialItem = createNavItem(navItems[currentIndex]);
    navItemDisplay.appendChild(initialItem);
    
    navbarContainer.appendChild(navItemDisplay);

    // Right arrow button
    const rightBtn = document.createElement('button');
    rightBtn.innerHTML = '&#9654;';
    rightBtn.className = 'nav-arrow';
    rightBtn.addEventListener('click', () => animateTransition(1));
    navbarContainer.appendChild(rightBtn);
  }
  
  renderNavbar();
}

window.addEventListener('load', loadNavbar);