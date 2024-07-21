import { lstatSync, mkdirSync, readdir, rename } from "fs"
import { join } from "path"

/**
 * @author Aman Preet (amanpreet-dev on github)
 * @param sourceDir the directory to copy all children from
 * @param targetDir the destination where those files should be placed
 * @returns nothing
 */
export default function moveFiles(sourceDir: string, targetDir: string): Promise<void> {
    return new Promise((resolve, reject) => {
        readdir(sourceDir, (err, files) => {
            if (err) {
                reject(err)
                return
            }
            files.forEach((file) => {
                const oldPath = join(sourceDir, file)
                const newPath = join(targetDir, file)
                const stat = lstatSync(oldPath)

                if (stat.isDirectory()) {
                    mkdirSync(newPath, {recursive: true})
                    moveFiles(oldPath, newPath)
                        .then(()=> {
                            if (files.indexOf(file) === files.length - 1) {
                                resolve()
                            }
                        }).catch((err) => reject(err))
                } else if (stat.isFile()) {
                    rename(oldPath, newPath, (err) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        if (files.indexOf(file) === files.length - 1) {
                            resolve()
                        }
                    })
                }
            })
        })
    })
}