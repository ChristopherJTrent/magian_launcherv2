import { receiveRepositories, repositoryMapping } from "@lib/store/repositoriesReducer"
import { useAppDispatch, useAppSelector } from "@lib/store/store"
import RepositoryElement from "./RepositoryElement"
import { useEffect } from "react"
import { List } from "@chakra-ui/react"


export default function RepositoryListing() {
    const repositories: repositoryMapping | undefined = useAppSelector((state) => state.repositories)
    const dispatch = useAppDispatch()
    useEffect(() => {
        window.electron.ipcRenderer.getInstalledRepositories().then(v => {
            dispatch(receiveRepositories(v))
        })
    })
    return <>
        {
            repositories && repositories.map((v) => <List>{<RepositoryElement repository={v} />}</List>)
                || <> </>
        }
    </>
}