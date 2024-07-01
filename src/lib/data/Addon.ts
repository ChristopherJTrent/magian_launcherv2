import Extension from "./Extension"

export default class Addon extends Extension {
  author: string
  
  version: string
  
  desc: string
  
  link: string
  
  constructor(name: string, author: string, version: string, desc: string, link: string) {
    super(name, true)
    this.author = author
    this.version = version
    this.desc = desc
    this.link = link
  }
}
