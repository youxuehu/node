import fs from "fs";


export function readFile(filePath: string): string {
    try {
        return fs.readFileSync(filePath, 'utf8')
    } catch (error) {
        console.error('read file error', error)
        return ''
    }
}

export function exists(filename: string) {
    try {
        fs.accessSync('path/to/file', fs.constants.F_OK);
        return true
    } catch (err) {
        return false
    }
}