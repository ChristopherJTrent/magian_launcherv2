import { DownloaderHelper } from 'node-downloader-helper'
import { Url } from 'url'
import { DOWNLOADS_LOCATION } from '../Installation/paths'
import { join } from 'path'

export default async function DownloadFile(fileUrl: Url | string, fileName: string) {
    console.log(fileName)
    const dl = new DownloaderHelper(fileUrl.toString(), DOWNLOADS_LOCATION, {
        fileName
    })
    dl.on('end', () => console.log('Completed download of ', join(DOWNLOADS_LOCATION, fileName)))
    dl.on('error', (err) => console.error(err, ' in DownloadFile'))
    return dl.start().catch(err => console.error(err, ' in DownloadFile (start)'))
}