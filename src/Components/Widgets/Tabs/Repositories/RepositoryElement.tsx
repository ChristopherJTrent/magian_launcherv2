import { Divider, Flex, IconButton, Link, ListItem, Text } from "@chakra-ui/react"
import { statefulRepo } from "@lib/store/repositoriesReducer"
import { convertLocation } from "@lib/util/helpers/YAML/convertLocation"
import { repoRegex } from "Zod/Repository"
import { FaGithub, FaGitlab } from 'react-icons/fa'

type repositoryElementProps = {repository: statefulRepo}

export default function RepositoryElement({repository}:repositoryElementProps) {
    const {service, user, repo, branch, file} = repoRegex.exec(repository.remote)?.groups ?? {}
    const uri = convertLocation(repository.remote)
    return <ListItem marginTop='4px'
                     border='2px solid rgba(0,0,0,0.2)'
                     padding='0.75em'
                     width='100%'>
        <Flex justifyContent='space-between' direction='row' width='100%'>
            <Flex direction="column" width='100%'>
                <Flex direction='row' justifyContent='space-between' width='100%'>
                    <Text fontSize='large' fontWeight={700}>{repo}</Text>
                    
                </Flex>
                <Flex direction='row' alignItems='center'>
                    <Divider borderColor='#D35547'
                        backgroundColor='#D35547'
                        orientation="vertical"
                        width='1px'
                        borderWidth='1px'
                        marginTop='5px'
                        marginBottom='5px'
                        marginRight='5px'/>
                    <Flex direction='column'>
                        <Flex direction='row'>
                            <Text>Maintainer: {user}</Text>
                            <IconButton as={ service == 'gh:' ? FaGithub : FaGitlab } 
                                aria-label={service == 'gh:' ? "Github Logo" : "Gitlab Logo"}
                                onClick={() => {window.open(uri, "_blank")}}
                                size='xs'
                                marginLeft='5px'
                                padding='2px'
                            />
                        </Flex>

                            <Text>
                            Repo File: <Link href={uri} 
                                             target="_blank" 
                                             margin={0} 
                                             textDecor='underline'
                            >{file}@{branch}</Link>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    </ListItem>
}