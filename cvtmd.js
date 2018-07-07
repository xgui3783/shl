const fs = require('fs')
const path = require('path')

const getOrder = (filename,array)=>{
  if(!array)
    return false
  const idx = array.findIndex(it=>it===filename)
  return idx < 0 ?
    false : 
    idx < 9 ? 
      '0' + (idx + 1).toString() :
      (idx + 1).toString()
}

const areasOrder = [
  'commercial-litigation',
  'property-law-conveyancing',
  'commercial-corporate-law',
  'family-law',
  'immigration-services',
  'criminal-law',
  'notary-public'
]

const teamOrder = [
  'jonathan-lu',
  'cathy-zhou',
  'jessica-chung',
  'amy-huang',
  'gloria-wang'
]

const cvtMdToToml = (origin,dest,areasOrder)=>{
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
        const newfilecontent = `${getOrder(file.replace('.md',''),areasOrder) ? 'order = "' + getOrder(file.replace('.md','') ,areasOrder) + '"\n' : ''}id  = "${id}"\ntitle = "${newname}"\nmarkdown = "${newdata}"`
        fs.writeFile(path.join(dest,newfilename),newfilecontent ,'utf-8',(err)=>{
          if(err) throw err
          console.log(`done writing ${newfilename}`)
        })
      })
    })
  })
}

// cvtMdToToml('./content/areasofpractice/cn','./data/areas/cn',areasOrder)
// cvtMdToToml('./content/areasofpractice','./data/areas',areasOrder)

cvtMdToToml('./content/team/cn/','./data/team/cn/',teamOrder)
// cvtMdToToml('./content/team/','./data/team/')