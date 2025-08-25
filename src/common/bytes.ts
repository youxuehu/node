/**
 * 将多个 Uint8Array 拼接成一个大的 Uint8Array
 * @param args
 * @returns {Uint8Array} 拼接后的 Uint8Array
 */
export function composite(...args: Uint8Array<ArrayBufferLike>[]): Uint8Array {
    // 计算总长度
    const totalLength = args.reduce((acc, arr) => acc + arr.length, 0)

    // 记录当前的偏移量
    const result = new Uint8Array(totalLength)
    let offset = 0
    for (const arg of args) {
        result.set(arg, offset)
        offset += arg.length
    }

    return result
}
