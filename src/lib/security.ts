// Client-side security utilities

interface SecurityEvent {
  type: 'suspicious_activity' | 'rapid_clicks' | 'unusual_behavior' | 'console_access';
  details: string;
  timestamp: number;
  userAgent: string;
  url: string;
}

class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private readonly MAX_EVENTS = 100;
  private clickCount = 0;
  private lastClickTime = 0;
  private suspiciousPatterns = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    // Monitor for rapid clicking (potential automation)
    document.addEventListener('click', this.handleClick.bind(this));

    // Monitor for console access attempts
    this.protectConsole();

    // Monitor for suspicious key combinations
    document.addEventListener('keydown', this.handleKeydown.bind(this));

    // Monitor for unusual paste events (potential data theft)
    document.addEventListener('paste', this.handlePaste.bind(this));

    // Monitor for developer tools
    this.detectDevTools();
  }

  private handleClick() {
    const now = Date.now();
    const timeDiff = now - this.lastClickTime;

    if (timeDiff < 100) { // Clicks faster than 100ms apart
      this.clickCount++;
      if (this.clickCount > 5) {
        this.logEvent('rapid_clicks', `Detected ${this.clickCount} rapid clicks`);
      }
    } else {
      this.clickCount = 0;
    }

    this.lastClickTime = now;
  }

  private protectConsole() {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args: any[]) => {
      this.logEvent('console_access', 'Console log accessed');
      return originalLog.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      this.logEvent('console_access', 'Console warn accessed');
      return originalWarn.apply(console, args);
    };

    console.error = (...args: any[]) => {
      this.logEvent('console_access', 'Console error accessed');
      return originalError.apply(console, args);
    };
  }

  private handleKeydown(event: KeyboardEvent) {
    // Detect common developer shortcuts
    const suspiciousKeys = [
      { ctrl: true, shift: true, key: 'I' }, // Chrome DevTools
      { ctrl: true, shift: true, key: 'J' }, // Console
      { ctrl: true, shift: true, key: 'C' }, // Element inspector
      { key: 'F12' }, // DevTools
    ];

    const matches = suspiciousKeys.some(pattern => {
      return (!pattern.ctrl || event.ctrlKey) &&
             (!pattern.shift || event.shiftKey) &&
             event.key === pattern.key;
    });

    if (matches) {
      this.logEvent('suspicious_activity', `Detected developer shortcut: ${event.key}`);
    }
  }

  private handlePaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text') || '';

    // Check for suspicious patterns in pasted content
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /data:text\/html/i,
      /eval\(/i,
      /document\.cookie/i,
    ];

    if (suspiciousPatterns.some(pattern => pattern.test(pastedData))) {
      this.logEvent('suspicious_activity', 'Suspicious content pasted');
      event.preventDefault();
    }
  }

  private detectDevTools() {
    const devtools = { open: false };

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > 200 ||
          window.outerWidth - window.innerWidth > 200) {
        if (!devtools.open) {
          devtools.open = true;
          this.logEvent('suspicious_activity', 'Developer tools detected');
        }
      } else {
        devtools.open = false;
      }
    }, 1000);
  }

  private logEvent(type: SecurityEvent['type'], details: string) {
    const event: SecurityEvent = {
      type,
      details,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    this.events.push(event);

    // Keep only recent events
    if (this.events.length > this.MAX_EVENTS) {
      this.events.shift();
    }

    // Count suspicious patterns
    if (type === 'suspicious_activity') {
      this.suspiciousPatterns++;

      // If too many suspicious patterns, could implement additional measures
      if (this.suspiciousPatterns > 5) {
        console.warn('Multiple suspicious activities detected');
      }
    }

    // Send to server for analysis (implement as needed)
    // this.sendToServer(event);
  }

  public getEvents(): SecurityEvent[] {
    return [...this.events];
  }

  public getSuspiciousCount(): number {
    return this.suspiciousPatterns;
  }

  // Method to send security events to server
  private async sendToServer(event: SecurityEvent) {
    try {
      await fetch('/api/security-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Failed to send security event:', error);
    }
  }
}

// Singleton instance
export const securityMonitor = new SecurityMonitor();

// Form protection utilities
export function protectForm(formElement: HTMLFormElement) {
  // Prevent multiple rapid submissions
  let submitting = false;
  let lastSubmitTime = 0;

  formElement.addEventListener('submit', (event) => {
    const now = Date.now();

    if (submitting || (now - lastSubmitTime) < 1000) {
      event.preventDefault();
      securityMonitor['logEvent']('suspicious_activity', 'Rapid form submission attempt');
      return false;
    }

    submitting = true;
    lastSubmitTime = now;

    // Reset after reasonable time
    setTimeout(() => {
      submitting = false;
    }, 3000);
  });

  // Monitor for automated form filling
  const inputs = formElement.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    let rapidFillCount = 0;
    let lastFillTime = 0;

    input.addEventListener('input', () => {
      const now = Date.now();
      if (now - lastFillTime < 50) { // Very fast typing
        rapidFillCount++;
        if (rapidFillCount > 3) {
          securityMonitor['logEvent']('suspicious_activity', 'Rapid form filling detected');
        }
      } else {
        rapidFillCount = 0;
      }
      lastFillTime = now;
    });
  });
}

// Content integrity protection
export function protectContent() {
  // Prevent text selection on sensitive areas
  const sensitiveSelectors = ['.no-select', '[data-sensitive]'];

  sensitiveSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener('selectstart', (e) => e.preventDefault());
      element.addEventListener('dragstart', (e) => e.preventDefault());
    });
  });

  // Detect attempts to access sensitive DOM elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // Monitor for suspicious DOM modifications
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === 'SCRIPT' || element.tagName === 'IFRAME') {
              securityMonitor['logEvent']('suspicious_activity', `Dynamic ${element.tagName} injection detected`);
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Initialize client-side security on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    protectContent();

    // Protect all forms on the page
    const forms = document.querySelectorAll('form');
    forms.forEach(protectForm);
  });
}