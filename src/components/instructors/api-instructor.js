const create = async(instructor)=>{
    try{
        let response = await fetch('/api/instructors/new',{
            method:'POST',
            headers:{
                'Accept':'application/json'
            },
            body:instructor
        })
        return await response.json()
    } catch(err){
        console.log(err)
    }
}

const list = async(signal)=>{
    try {
        let response = await fetch('/api/instructors/all',{
            method:'GET',
            signal:signal
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async(params, instructor)=>{
    try {
        let response = await fetch('/api/instructors/update/'+params.instructorId,{
            method:'PUT',
            headers:{
                'Accept':'application/json'
            },
            body:instructor
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const remove = async(params)=>{
    try {
        let response = await fetch('/api/instructors/'+params.instructorId,{
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

const listCourses = async(params, signal)=>{
    try {
        let response = await fetch('/api/instructors/courses/'+params.name,{
            method:'GET',
            headers:{
                'Accept':'application/json'
            },
            signal:signal
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
    remove,
    listCourses
}