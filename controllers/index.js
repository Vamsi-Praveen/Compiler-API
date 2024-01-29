import { getExecutionCommand, getFilePath, writeContentsToFile, runCode } from "../utils/functions.js";


export const executeCode = async (req, res, next) => {
    const { code, language, inputs } = req.body;
    //getting the file path of language for saving the file contents
    try {
        const filepath = getFilePath(language)
        const write = writeContentsToFile(filepath, code)
        if (write) {
            const [command, commandArgs] = getExecutionCommand(language, filepath)
            if (command != '') {
                await runCode(command, commandArgs, inputs)
                    .then((data) => {
                        return res.send({ output: data.output.toString() }).status(200)
                    })
                    .catch((err) => {
                        return res.send({ error: err.toString() }).status(400)
                    })
            }
        }
    } catch (error) {
        console.log(err)
        return res.send('Internal Server Error').status(500)
    }
}