export const formData =(e)=>{
    
    const formData=new FormData(e.target)
    return Object.fromEntries(formData) 
}