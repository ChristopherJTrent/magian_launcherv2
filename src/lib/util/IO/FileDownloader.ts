import { createWriteStream, PathLike, unlink } from 'fs'
import {get} from 'http'
import { Url } from 'url'

export default async function DownloadFile(fileUrl: Url | string, savePath: PathLike) {
    const file = createWriteStream(savePath)
    get(fileUrl, (res) => {
        res.pipe(file)
        file.on('finish', () => {
            file.close(() => {"Successfully saved file."})
        })
    }).on('error', (err) => {
        unlink(savePath, () => {
            console.error(`Error downloading file "${savePath.toString()}"`)
        })
    })
}