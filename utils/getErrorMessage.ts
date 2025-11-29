type ClerkAPIError = {
  errors?: {
    message?: string;
  }[];
};

function isClerkAPIError(err: unknown): err is ClerkAPIError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'errors' in err &&
    Array.isArray((err as Record<string, unknown>).errors)
  );
}

function isErrorWithMessage(err: unknown): err is { message: string } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof (err as Record<string, unknown>).message === 'string'
  );
}

export function getErrorMessage(err: unknown): string {
  if (isClerkAPIError(err)) {
    return err.errors?.[0]?.message ?? 'Unknown error';
  }

  if (isErrorWithMessage(err)) {
    return err.message;
  }

  return 'Failed to update username.';
}
