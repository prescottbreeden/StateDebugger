export const transformError = (error: string) =>
  error
    ? {
        type: 'error',
        message: error,
      }
    : undefined

export const set = (key: string) => (obj: any) => ({ [key]: obj })

export const replaceItem = (list: any[]) => (b: any) => {
  return list.map((a: any) => (a.id === b.id ? b : a))
}

export const randomString = () => Math.random().toString(36).substring(2, 15)
