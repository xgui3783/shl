const fs = require('fs')
const path = require('path')


const cvtMdToToml = (origin,dest)=>{
  fs.readdir(origin,(err,files)=>{
    if(err) throw err
    files.forEach(file=>{
      fs.readFile(path.join(origin, file),'utf-8',(err,data)=>{
        if(err) throw err
        const newdata = data
          .replace(/\n/g,' \\n')
          .replace(/\"/g,'\\"') /* need to escape double quotes in toml files */
        const newname = file
          .replace('.md','')
          .split('-')
          .map(word=>(word.substring(0,1).toUpperCase() + word.substring(1)))
          .join(' ')
  
        const newfilename = file.replace('.md','.toml')
        const id = newfilename.replace('.toml','')
        const newfilecontent = `id  = "${id}"\ntitle = "${newname}"\nmarkdown = "${newdata}"`
        fs.writeFile(path.join(dest,newfilename),newfilecontent ,'utf-8',(err)=>{
          if(err) throw err
          console.log(`done writing ${newfilename}`)
        })
      })
    })
  })
}
cvtMdToToml('./content/areasofpractice/','./data/areas')
cvtMdToToml('./content/team/','./data/team/')