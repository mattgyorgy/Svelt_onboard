export const validateEmail = (email: string): { valid: boolean; error: string | null } => {
  if (!email) {
    return { valid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true, error: null };
};

export const validateUrl = (url: string): { valid: boolean; error: string | null } => {
  if (!url) {
    return { valid: true, error: null }; // URLs are optional
  }

  try {
    new URL(url);
    return { valid: true, error: null };
  } catch {
    return { valid: false, error: 'Please enter a valid URL' };
  }
};