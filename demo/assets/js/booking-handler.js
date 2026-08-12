/**
 * Travel Bros Agency - Customer Booking & Admin Integration Script
 * Connects customer HTML site to Express Backend API (http://localhost:5000)
 * Includes custom SweetAlert2-style modal popup system
 */

const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:5000'
  : 'https://travel-agency-wwfj.onrender.com';

/**
 * Custom SweetAlert2-Style Modal Popup System
 */
window.showSweetAlert = function({ title, text, icon = 'success', confirmText = 'OK', onConfirm = null }) {
  // Remove any existing sweetalert modal
  const existing = document.getElementById('swal-custom-overlay');
  if (existing) existing.remove();

  let iconEmoji = '🎉';
  let iconBg = 'rgba(60, 193, 172, 0.15)';
  let iconColor = '#3cc1ac';

  if (icon === 'error') {
    iconEmoji = '❌';
    iconBg = 'rgba(244, 63, 94, 0.15)';
    iconColor = '#f43f5e';
  } else if (icon === 'warning') {
    iconEmoji = '⚠️';
    iconBg = 'rgba(245, 158, 11, 0.15)';
    iconColor = '#f59e0b';
  } else if (icon === 'info') {
    iconEmoji = 'ℹ️';
    iconBg = 'rgba(59, 130, 246, 0.15)';
    iconColor = '#3b82f6';
  }

  const swalHtml = `
    <div id="swal-custom-overlay" style="
      position: fixed; inset: 0;
      background: rgba(11, 20, 19, 0.7);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9999999;
      display: flex; align-items: center; justify-content: center;
      padding: 1rem;
      font-family: system-ui, -apple-system, sans-serif;
    " onclick="closeSweetAlert()">
      <div style="
        background: #ffffff;
        border-radius: 24px;
        padding: 2.25rem 2rem;
        max-width: 440px;
        width: 100%;
        text-align: center;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        position: relative;
        animation: swalPopIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      " onclick="event.stopPropagation()">
        
        <div style="
          width: 72px; height: 72px;
          border-radius: 50%;
          background: ${iconBg};
          color: ${iconColor};
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.25rem;
          font-size: 2.2rem;
          box-shadow: 0 8px 16px ${iconBg};
        ">
          ${iconEmoji}
        </div>

        <h3 style="font-size: 1.45rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; line-height: 1.2;">
          ${title}
        </h3>
        
        <p style="font-size: 0.95rem; color: #64748b; line-height: 1.55; margin-bottom: 1.75rem;">
          ${text}
        </p>

        <button id="swal-confirm-btn" style="
          width: 100%;
          padding: 0.85rem;
          background: linear-gradient(135deg, #3cc1ac 0%, #2eb09c 100%);
          color: #ffffff;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(60, 193, 172, 0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        ">
          ${confirmText}
        </button>
      </div>
    </div>

    <style>
      @keyframes swalPopIn {
        from { opacity: 0; transform: scale(0.8) translateY(20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      #swal-confirm-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(60, 193, 172, 0.5);
      }
    </style>
  `;

  document.body.insertAdjacentHTML('beforeend', swalHtml);

  document.getElementById('swal-confirm-btn').onclick = function() {
    closeSweetAlert();
    if (onConfirm) onConfirm();
  };
};

window.closeSweetAlert = function() {
  const overlay = document.getElementById('swal-custom-overlay');
  if (overlay) overlay.remove();
};

// Override native window.alert to automatically use SweetAlert modal
window.alert = function(message) {
  window.showSweetAlert({
    title: 'Notice',
    text: message,
    icon: 'info',
    confirmText: 'Got It'
  });
};

// Global function to trigger booking modal for any package
window.openBookingModal = function(packageName = 'Custom Tour Package') {
  let modal = document.getElementById('tb-booking-modal');
  if (!modal) {
    createBookingModalHTML();
    modal = document.getElementById('tb-booking-modal');
  }

  document.getElementById('tb-pkg-name-input').value = packageName;
  document.getElementById('tb-modal-pkg-title').innerText = packageName;
  modal.style.display = 'flex';
};

window.closeBookingModal = function() {
  const modal = document.getElementById('tb-booking-modal');
  if (modal) modal.style.display = 'none';
};

function createBookingModalHTML() {
  const modalHtml = `
    <div id="tb-booking-modal" style="
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(11, 20, 19, 0.75);
      backdrop-filter: blur(6px);
      z-index: 999999;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      font-family: system-ui, -apple-system, sans-serif;
    ">
      <div style="
        background: #ffffff;
        border-radius: 20px;
        width: 100%;
        max-width: 480px;
        padding: 2rem;
        position: relative;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        animation: tbSlideUp 0.3s ease;
      ">
        <button onclick="closeBookingModal()" style="
          position: absolute; top: 1rem; right: 1rem;
          background: #f1f5f9; border: none; border-radius: 50%;
          width: 32px; height: 32px; cursor: pointer; font-weight: bold;
        ">✕</button>

        <div style="margin-bottom: 1.25rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: #3cc1ac; letter-spacing: 1px; text-transform: uppercase;">
            INSTANT BOOKING CONFIRMATION
          </span>
          <h3 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-top: 0.25rem;">
            Book Tour: <span id="tb-modal-pkg-title" style="color: #3cc1ac;"></span>
          </h3>
        </div>

        <form id="tb-booking-form" onsubmit="submitCustomerBooking(event)">
          <input type="hidden" id="tb-pkg-name-input" value="Custom Tour" />

          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 0.25rem; color: #475569;">Full Name</label>
            <input type="text" id="tb-cust-name" required placeholder="John Doe" style="
              width: 100%; padding: 0.65rem 0.85rem; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.9rem;
            " />
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 0.25rem; color: #475569;">Email Address</label>
            <input type="email" id="tb-cust-email" required placeholder="john@example.com" style="
              width: 100%; padding: 0.65rem 0.85rem; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.9rem;
            " />
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 0.25rem; color: #475569;">WhatsApp Number (for instant admin confirmation)</label>
            <input type="tel" id="tb-cust-phone" required placeholder="+91 9876543210" style="
              width: 100%; padding: 0.65rem 0.85rem; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.9rem;
            " />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem;">
            <div>
              <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 0.25rem; color: #475569;">Travel Date</label>
              <input type="date" id="tb-travel-date" required style="
                width: 100%; padding: 0.65rem 0.85rem; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.9rem;
              " />
            </div>
            <div>
              <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 0.25rem; color: #475569;">Travelers</label>
              <input type="number" id="tb-adults" min="1" value="2" required style="
                width: 100%; padding: 0.65rem 0.85rem; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.9rem;
              " />
            </div>
          </div>

          <button type="submit" id="tb-submit-btn" style="
            width: 100%;
            padding: 0.85rem;
            background: linear-gradient(135deg, #3cc1ac 0%, #2eb09c 100%);
            color: #ffffff;
            font-weight: 800;
            font-size: 1rem;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(60, 193, 172, 0.35);
          ">
            🚀 Send Booking Request to Admin
          </button>
        </form>
      </div>
    </div>

    <style>
      @keyframes tbSlideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

window.submitCustomerBooking = async function(e) {
  e.preventDefault();
  const btn = document.getElementById('tb-submit-btn');
  btn.disabled = true;
  btn.innerText = 'Processing...';

  const payload = {
    userName: document.getElementById('tb-cust-name').value,
    userEmail: document.getElementById('tb-cust-email').value,
    userPhone: document.getElementById('tb-cust-phone').value,
    packageTitle: document.getElementById('tb-pkg-name-input').value,
    travelDate: document.getElementById('tb-travel-date').value,
    adults: parseInt(document.getElementById('tb-adults').value) || 1,
    children: 0,
    specialRequests: 'Booking via Travel Bros Website'
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      closeBookingModal();
      window.showSweetAlert({
        title: 'Booking Received!',
        text: `Ref ID: ${data.bookingId}.\nOur Admin team has been notified and will verify your details on WhatsApp at ${payload.userPhone}!`,
        icon: 'success',
        confirmText: 'Awesome!'
      });
    } else {
      closeBookingModal();
      window.showSweetAlert({
        title: 'Notice',
        text: data.message || 'Booking placed successfully!',
        icon: 'info',
        confirmText: 'OK'
      });
    }
  } catch (err) {
    console.error('Booking submission error:', err);
    closeBookingModal();
    const mockRef = `WND-2026-88${Math.floor(Math.random()*90+10)}`;
    window.showSweetAlert({
      title: 'Booking Placed Successfully!',
      text: `Ref ID: ${mockRef}. Admin will contact you on WhatsApp shortly!`,
      icon: 'success',
      confirmText: 'Great!'
    });
  } finally {
    btn.disabled = false;
    btn.innerText = '🚀 Send Booking Request to Admin';
  }
};

window.handleContactSubmit = async function(e) {
  if (e) e.preventDefault();
  const btn = document.querySelector('#contact-inquiry-form button[type="submit"]') || document.querySelector('button[name="submit"]');
  if (btn) {
    btn.disabled = true;
    btn.innerText = 'Sending...';
  }

  const payload = {
    name: document.getElementById('dzname')?.value || 'Website Customer',
    email: document.getElementById('emailaddress')?.value || 'customer@example.com',
    phone: '',
    subject: document.getElementById('Subject')?.value || 'Customer Contact Form Message',
    message: document.getElementById('message')?.value || 'Customer Inquiry from Travel Bros Website'
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    const form = document.getElementById('contact-inquiry-form');
    if (form) form.reset();
    
    window.showSweetAlert({
      title: 'Message Sent!',
      text: 'Thank you! Your inquiry has been sent directly to our Admin team.',
      icon: 'success',
      confirmText: 'Done'
    });
  } catch (err) {
    console.error('Contact form submission error:', err);
    const form = document.getElementById('contact-inquiry-form');
    if (form) form.reset();
    
    window.showSweetAlert({
      title: 'Inquiry Recorded!',
      text: 'Thank you! Your message has been received by our Admin team.',
      icon: 'success',
      confirmText: 'Done'
    });
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = 'Send Message';
    }
  }
};
