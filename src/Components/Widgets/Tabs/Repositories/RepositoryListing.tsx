import { receiveRepositories, repositoryMapping } from "@lib/store/repositoriesReducer"
import { useAppDispatch, useAppSelector } from "@lib/store/store"
import RepositoryElement from "./RepositoryElement"
import { useEffect, useState } from "react"
import { Flex, IconButton, Input, List } from "@chakra-ui/react"
import {GrAdd} from 'react-icons/gr'


export default function RepositoryListing() {
    const repositories: repositoryMapping | undefined = useAppSelector((state) => state.repositories)
    const dispatch = useAppDispatch()

    const [remote, setRemote] = useState('')
    const updateRemote = (event:{target: {value: string}}) => setRemote(event.target.value)

    const installRepo = () => {
        if (repositories && !repositories.some(v => v.remote == remote)) {
            window.electron.ipcRenderer.onInstallRepository(() => {
                window.electron.ipcRenderer.getInstalledRepositories().then((v) => {
                    dispatch(receiveRepositories(v))
                })
            })
            window.electron.ipcRenderer.installRepository(remote)
        }
    }

    useEffect(() => {
        window.electron.ipcRenderer.getInstalledRepositories().then(v => {
            dispatch(receiveRepositories(v))
        })
    })


    return <Flex direction='column'>
        {
            repositories && repositories.map((v) => <List>{<RepositoryElement repository={v} />}</List>)
                || <> </>
        }
        <Flex direction='column'>
            <Input value={remote} onChange={updateRemote} placeholder="remote repository" size='sm' marginBottom='5px'/>
            <IconButton aria-label="add repository" as={GrAdd} width='100%' height='2em' onClick={installRepo}/>
        </Flex>
    </Flex>
}