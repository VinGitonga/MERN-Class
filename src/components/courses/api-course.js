const create = async(course)=>{
    try {
        let response = await fetch('/api/courses/new',{
            method:'POST',
            headers:{
                'Accept':'application/json'
            },
            body:course
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const list = async(signal)=>{
    try {
        let response = await fetch('/api/courses/all',{
            method:'GET',
            signal:signal
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const update = async(params, course)=>{
    try {
        let response = await fetch('/api/courses/update/'+params.courseId,{
            method:'PUT',
            headers:{
                'Accept':'application/json'
            },
            body:course
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async(params)=>{
    try {
        let response = await fetch('/api/courses/'+params.courseId,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


export {
    create,
    list,
    update,
    remove
}