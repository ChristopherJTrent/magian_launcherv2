// eslint-disable-next-line import/prefer-default-export
export function percentage(current:number, total:number):number {
  return Math.ceil((current/total)*100)
}
