import fs from "fs"
import { spawn } from "child_process"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { performance } from "perf_hooks"

export const getExecutionCommand = (language, file) => {
    let command = ''
    let executablePath = ''
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename).split('utils')[0]
    let commandArgs = []
    if (['c', 'cpp'].includes(language)) {
        executablePath = `${__dirname}/temp/main`
    }
    switch (language) {
        case 'javascript':
            command = `node`
            commandArgs = [file]
            break
        case 'python':
            command = `python`
            commandArgs = [file]
            break
        case 'cpp':
            command = `g++`
            commandArgs = [file, '-o', executablePath, '&&', `${executablePath}`]
            break
        case 'c':
            command = `g++`
            commandArgs = [file, '-o', executablePath, '&&', `${executablePath}`]
            break
        default:
            command = ''
            commandArgs = []
            break
    }

    return [command, commandArgs]
}


export const getFilePath = (language) => {

    let filePath = ''
    switch (language) {
        case 'javascript':
            filePath = 'static/file.js'
            break
        case 'python':
            filePath = 'static/file.py'
            break
        case 'c':
            filePath = 'static/file.c'
            break
        case 'cpp':
            filePath = 'static/file.cpp'
            break
        default:
            filePath = 'static/default.txt'
            break

    }

    return filePath

}

export const writeContentsToFile = (filePath, code) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, code, 'utf-8');
            return true
        }
        return false
    }
    catch (err) {
        console.log(err)
        return false;
    }
}


export const runCode = (command, commandArgs, inputs) => {
    // Execute the command using child_process module of nodejs
    const startTime = performance.now()
    return new Promise((resolve, reject) => {
        const childProcess = spawn(command, commandArgs, { shell: true })
        let output = []
        let error = []
        if (inputs && inputs.length > 0) {
            childProcess.stdin.write(inputs);
            childProcess.stdin.end()
        }
        childProcess.stdout.on('data', (data) => {
            output.push(data)
        })
        childProcess.stderr.on('data', (data) => {
            error.push(data)
        })
        childProcess.on('close', (code) => {
            const endTime = performance.now()
            const timeTaken = endTime - startTime
            const memory = process.memoryUsage()
            if (code == 0) {
                resolve({ output: output.join('') })
            }
            else {
                reject(error)
            }
        })
        childProcess.on('error', (err) => {
            reject(err)
        })
    })


}