export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function APIErrorsParse(response: any): string[] {
  const result: string[] = [];

  if (response.error) {
    if (typeof response.error == 'string') {
      result.push(response.error);
    } else if (Array.isArray(response.error)) {
      response.error.forEach((val: any) => result.push(val.description));
    } else {
      const errorsMap = response.error.errors;
      const inputs = Object.entries(errorsMap);
      inputs.forEach((arr: any[]) => {
        const field = arr[0];
        arr[1].forEach((errorMessage: any) => {
          result.push(`${field}: ${errorMessage}`);
        });
      });
    }
  }

  return result;
}
