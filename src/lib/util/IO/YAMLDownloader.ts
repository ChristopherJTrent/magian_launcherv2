import { load } from "js-yaml"

export default async function DownloadYAML<T>(URL:URL):Promise<T> {
  const res:Response = await fetch(URL)

  if (res.ok) {
    return load(await res.text()) as T
  }
  throw Error("got invalid response")
}
