export function chunkText(text){

const size = 1000
const overlap = 100

let chunks=[]

for(let i=0;i<text.length;i+=size-overlap){

chunks.push(text.slice(i,i+size))

}

return chunks

}