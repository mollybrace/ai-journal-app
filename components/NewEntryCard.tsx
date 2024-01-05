"use client"

import { createNewEntry } from "@/utils/api"
import { useRouter } from "next/navigation"

const NewEntryCard = () => {
    const router = useRouter()
    console.log(router, "router")

    const handleOnClick = async() => {
        const data = await createNewEntry()
        console.log(data.id, "DATA")
        router.push(`/journal/${data.id}`)


    }
return (
    <div className="rounded-lg cursor-pointer overflow-hidden bg-white shadow" onClick={handleOnClick}>
        <div className="px-4 py-5 sm:p-6">
            <span className="text-3xl">New Entry</span>
        </div>
    </div>
)
}

export default NewEntryCard