import {fakeAPIErrors} from "./fake_api_errors"

export const Query = (_payload: any) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({
        ...fakeAPIErrors,
      })
    }, 1000)
  })
}

