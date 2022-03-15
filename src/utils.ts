export const transformError = (error: string) =>
  error
    ? {
        type: 'error',
        message: error,
      }
    : undefined

export const set = (key: string) => (obj: any) => ({ [key]: obj })
