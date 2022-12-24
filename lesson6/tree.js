const fs = require('fs');

function tree(dir, filesAndFolders) {
    if (!filesAndFolders) {
        filesAndFolders = {
            files: [],
            folders: [],
        }
    }

    filesAndFolders.folders.push(dir)
    fs.promises.readdir(dir)
        .then(response => {
            response.forEach(item => {
                const itemDir = `${dir}/${item}`
                fs.stat(itemDir, (err, stats) => {
                    if (stats.isDirectory()) {
                        tree(`${itemDir}`, filesAndFolders)
                    } else {
                        filesAndFolders.files.push(itemDir)
                    }
                })
            })
        })
        .catch(error => {
            console.log('Error occurred while reading directory!', error)
        })

    console.log(filesAndFolders)
    return filesAndFolders
}

const result = tree('foo')
console.log(result)
