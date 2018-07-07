const fs = require('fs')
const path = require('path')

const generateMD = (title,desc)=>`### ${title}\\n\\n${desc}`
const getTomlFromJson = (json)=>
`order = ${json.id}
id = "${json.id}"
title = "${json.title}"
markdown = "${json.markdown}"`

fs.readFile('raw_cn.txt','utf-8',(err,data)=>{
  if(err) throw err
  data.split('\n')
    .map(line=>{
      const [idx,rest] = line.split(/\.\s(.+)/)
      const [title,desc] = rest.split(/\s[\-|\–]\s(.+)/)
      return {
        order : idx,
        id : idx,
        title ,
        markdown : generateMD(title,desc)
      }
    })
    .forEach(obj=>{
      fs.writeFile(
        path.join('../../data/cases/cn',`case-${obj.order}.toml`),
        getTomlFromJson(obj), 'utf-8',(err)=>{
          if(err) throw err
          else console.log(`completed transforming ${obj.title}`)
        })
    })
})