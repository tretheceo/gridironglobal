import { useEffect } from 'react';

// Types of accessibility issues to check for
type AccessibilityIssue = {
  element: HTMLElement;
  issue: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  suggestion?: string;
};

// Accessibility checker utility
export function runAccessibilityChecks(): AccessibilityIssue[] {
  if (typeof document === 'undefined') return [];
  
  const issues: AccessibilityIssue[] = [];
  
  // Check for images without alt text
  document.querySelectorAll('img').forEach((img) => {
    if (!img.hasAttribute('alt')) {
      issues.push({
        element: img,
        issue: 'Image missing alt text',
        impact: 'serious',
        suggestion: 'Add descriptive alt text to the image',
      });
    }
  });
  
  // Check for insufficient color contrast
  document.querySelectorAll('*').forEach((el) => {
    const style = window.getComputedStyle(el);
    const backgroundColor = style.backgroundColor;
    const color = style.color;
    
    // This is a simplified check - in production you would use a proper contrast ratio calculator
    if (backgroundColor === 'rgba(0, 0, 0, 0)' || color === 'rgba(0, 0, 0, 0)') {
      return;
    }
    
    // Placeholder for contrast check logic
    const hasLowContrast = false; // Replace with actual contrast check
    
    if (hasLowContrast) {
      issues.push({
        element: el as HTMLElement,
        issue: 'Insufficient color contrast',
        impact: 'serious',
        suggestion: 'Increase the contrast between text and background',
      });
    }
  });
  
  // Check for missing form labels
  document.querySelectorAll('input, select, textarea').forEach((input) => {
    const hasLabel = 
      input.hasAttribute('aria-label') || 
      input.hasAttribute('aria-labelledby') ||
      document.querySelector(`label[for="${input.id}"]`);
    
    if (!hasLabel) {
      issues.push({
        element: input as HTMLElement,
        issue: 'Form control missing label',
        impact: 'critical',
        suggestion: 'Add a label element with a matching "for" attribute',
      });
    }
  });
  
  // Check for missing heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  for (let i = 0; i < headings.length - 1; i++) {
    const current = parseInt(headings[i].tagName.substring(1));
    const next = parseInt(headings[i + 1].tagName.substring(1));
    
    if (next > current + 1) {
      issues.push({
        element: headings[i + 1] as HTMLElement,
        issue: 'Skipped heading level',
        impact: 'moderate',
        suggestion: `Change from h${next} to h${current + 1}`,
      });
    }
  }
  
  return issues;
}

// Hook for monitoring accessibility in development
export function useAccessibilityCheck(enabled = process.env.NODE_ENV === 'development') {
  useEffect(() => {
    if (!enabled) return;
    
    // Run checks after initial render and DOM is stable
    const timer = setTimeout(() => {
      const issues = runAccessibilityChecks();
      
      if (issues.length > 0) {
        console.group('Accessibility Issues Detected');
        issues.forEach((issue) => {
          console.warn(
            `${issue.impact.toUpperCase()}: ${issue.issue}`,
            issue.element,
            issue.suggestion ? `Suggestion: ${issue.suggestion}` : ''
          );
        });
        console.groupEnd();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [enabled]);
}

// Focus trap for modals and dialogs
export function useFocusTrap(ref: React.RefObject<HTMLElement>, active = true) {
  useEffect(() => {
    if (!active || !ref.current) return;
    
    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } 
      // Tab
      else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    
    // Focus the first element when the trap is activated
    firstElement.focus();
    
    // Add event listener
    element.addEventListener('keydown', handleKeyDown);
    
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, active]);
}

// Skip to content link functionality
export function useSkipToContent(contentId: string) {
  useEffect(() => {
    const handleSkipLink = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
        const skipLink = document.getElementById('skip-to-content');
        if (skipLink && document.activeElement === skipLink) {
          skipLink.style.opacity = '1';
          skipLink.style.pointerEvents = 'auto';
        }
      }
    };
    
    document.addEventListener('keydown', handleSkipLink);
    
    return () => {
      document.removeEventListener('keydown', handleSkipLink);
    };
  }, [contentId]);
  
  return {
    skipLinkProps: {
      id: 'skip-to-content',
      href: `#${contentId}`,
      className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-primary',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        const content = document.getElementById(contentId);
        if (content) {
          content.tabIndex = -1;
          content.focus();
          content.scrollIntoView();
        }
      },
    },
    contentProps: {
      id: contentId,
      tabIndex: -1,
    },
  };
}
