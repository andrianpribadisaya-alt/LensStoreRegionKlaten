export function success(data: unknown) {
  return {
    success: true,
    data,
  };
}

export function failed(message: string) {
  return {
    success: false,
    message,
  };
}
