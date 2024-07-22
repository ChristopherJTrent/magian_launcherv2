export default function deepTransformKeys(obj:object, transformer?:(str:string)=>string):object {
  const internalTransformer = transformer ?? ((str) => str.replaceAll(/\\\./, '.'))
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => {
    if (typeof v === 'object' && !(typeof v === 'string')) {
      return [internalTransformer(k), deepTransformKeys(v, internalTransformer)]
    }
    return [internalTransformer(k), v]
  }))
}
