const fs = require('fs');
const path = process.env.npm_config_path || '.';

async function tree(dir, filesAndFolders) {
    if (!filesAndFolders) {
        filesAndFolders = {
            files: [],
            folders: [],
        }
    }

    filesAndFolders.folders.push(dir)
     await fs.promises
         .readdir(dir)
         .then(async (response) => {
             for(const item of response) {
                 const itemDir = `${dir}/${item}`
                 const stats = await fs.promises.stat(itemDir)

                 if (stats.isDirectory()) {
                     await tree(`${itemDir}`, filesAndFolders)
                 } else {
                     filesAndFolders.files.push(itemDir)
                 }
             }
         })
         .catch(error => {
             console.log('Error occurred while reading directory!', error)
         })

    return filesAndFolders
}

tree(path)
    .then(r => {
        console.log(r)
    })
