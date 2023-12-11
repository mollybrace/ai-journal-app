const createURL = path => {
    return window.location.origin + path
}

export const updatedEntry = async (id, content) => {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
        method: "PATCH",
        body: JSON.stringify({ content })
    }))
    if (res.ok) {
        const data = await res.json()
        return data.data
    }
    //when error- return error: true
}

export const createNewEntry = async () => {
    const res = await fetch(new Request(createURL("/api/journal"), {
        method: "POST"
    }
        ))
        if (res.ok) {
            const data = await res.json()
            return data.data
        }
}



//if you send a body JSON.stringify({})