import  surpriseMePrompts  from '../constants'
import FileSave from 'file-saver';
function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex];
    
    if(randomPrompt === prompt ){
        return getRandomPrompt(prompt)
    }

    return randomPrompt;
}
export default getRandomPrompt


export async function downloadImage(_id , photo) {
    FileSave.saveAs(photo, `download-${_id}.jpg`);
}