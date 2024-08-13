import { PathLike, rmSync } from "fs"

export default class GarbageCollector {
    static #instance: GarbageCollector
    
    private gcStack: Array<PathLike>

    private constructor() {
        this.gcStack = []
    }

    public static get instance(): GarbageCollector {
        if (GarbageCollector.#instance == null) {
            GarbageCollector.#instance = new GarbageCollector()
        }
        
        return GarbageCollector.#instance
    }

    public push(element: PathLike): void {
        console.log(`pushed ${element.toString()} onto gc stack`)
        this.gcStack.push(element)
    }

    public run(): void {
        while(this.gcStack.length > 0) {
            const path = this.gcStack.pop()!
            console.log(`deleting file ${path}`)
            try {
                rmSync(path, {
                    force: true,
                    recursive: true,
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
}