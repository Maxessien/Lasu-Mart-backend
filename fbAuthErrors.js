const firebaseAuthErrors = [
  // ===== Email/Password Errors =====
  {
    errorType: "auth/invalid-email",
    customMessage: "Invalid email address format.",
    statusCode: 400,
  },
  {
    errorType: "app/network-error",
    customMessage: "Network error, Check your internet connection",
    statusCode: 400,
  },
  {
    errorType: "auth/user-disabled",
    customMessage: "This account has been disabled. Contact support.",
    statusCode: 403,
  },
  {
    errorType: "auth/user-not-found",
    customMessage: "Invalid email or password.",
    statusCode: 404,
  },
  {
    errorType: "auth/wrong-password",
    customMessage: "Invalid email or password",
    statusCode: 401,
  },
  {
    errorType: "auth/email-already-exists",
    customMessage: "This email is already in use",
    statusCode: 409,
  },
  {
    errorType: "auth/operation-not-allowed",
    customMessage: "This sign-in method is not allowed.",
    statusCode: 403,
  },
  {
    errorType: "auth/weak-password",
    customMessage: "Password is too weak. Use at least 6 characters.",
    statusCode: 400,
  },

  // ===== Phone Auth Errors =====
  {
    errorType: "auth/invalid-phone-number",
    customMessage: "Phone number format is invalid.",
    statusCode: 400,
  },
  {
    errorType: "auth/phone-number-already-exist",
    customMessage: "Phone number already in use",
    statusCode: 400,
  },
  {
    errorType: "auth/missing-phone-number",
    customMessage: "Phone number is required.",
    statusCode: 400,
  },
  {
    errorType: "auth/quota-exceeded",
    customMessage: "SMS quota exceeded. Try again later.",
    statusCode: 429,
  },
  {
    errorType: "auth/code-expired",
    customMessage: "Verification code has expired. Request a new one.",
    statusCode: 400,
  },
  {
    errorType: "auth/invalid-verification-code",
    customMessage: "Invalid verification code.",
    statusCode: 400,
  },
  {
    errorType: "auth/missing-verification-code",
    customMessage: "Verification code is required.",
    statusCode: 400,
  },
  {
    errorType: "auth/captcha-check-failed",
    customMessage: "Captcha verification failed.",
    statusCode: 400,
  },
  {
    errorType: "auth/too-many-requests",
    customMessage: "Too many attempts. Please try again later.",
    statusCode: 429,
  },

  // ===== OAuth / Social Auth Errors =====
  {
    errorType: "auth/account-exists-with-different-credential",
    customMessage: "Account exists with a different sign-in method.",
    statusCode: 409,
  },
  {
    errorType: "auth/auth-domain-config-required",
    customMessage: "Auth domain configuration is missing.",
    statusCode: 500,
  },
  {
    errorType: "auth/cancelled-popup-request",
    customMessage: "Sign-in popup was cancelled.",
    statusCode: 400,
  },
  {
    errorType: "auth/popup-blocked",
    customMessage: "Popup was blocked by the browser.",
    statusCode: 400,
  },
  {
    errorType: "auth/popup-closed-by-user",
    customMessage: "Sign-in popup closed before completing login.",
    statusCode: 400,
  },
  {
    errorType: "auth/credential-already-in-use",
    customMessage: "Credential already linked to another account.",
    statusCode: 409,
  },
  {
    errorType: "auth/operation-not-supported-in-this-environment",
    customMessage: "Operation not supported in this environment.",
    statusCode: 400,
  },
  {
    errorType: "auth/provider-already-linked",
    customMessage: "This provider is already linked to the account.",
    statusCode: 400,
  },
  {
    errorType: "auth/no-such-provider",
    customMessage: "This provider is not linked to the account.",
    statusCode: 400,
  },

  // ===== General / Network Errors =====
  {
    errorType: "auth/network-request-failed",
    customMessage: "Network error. Check your connection.",
    statusCode: 503,
  },
  {
    errorType: "auth/internal-error",
    customMessage: "An unexpected error occurred. Please try again.",
    statusCode: 500,
  },
];

export const findError = (typeValue) => {
  return firebaseAuthErrors.find((errors) =>
    typeValue.includes(errors.errorType)
  );
};
