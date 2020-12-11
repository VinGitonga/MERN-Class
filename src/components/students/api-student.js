const create = async(student)=>{
    try {
        let response = await fetch('/api/students/new',{
            method:'POST',
            headers:{
                'Accept':'application/json'
            },
            body:student
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const list = async(signal)=>{
    try {
        let response = await fetch('/api/students/all',{
            method:'GET',
            signal:signal
        })

        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async(params, student)=>{
    try {
        let response = await fetch('/api/students/update/'+params.studentId,{
            method:'PUT',
            headers:{
                'Accept':'application/json'
            },
            body:student
        })

        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const remove = async(params)=>{
    try {
        let response = await fetch('/api/students/'+params.studentId,{
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