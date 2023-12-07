"use client"
const NewEntryCard = () => {

    const handleOnClick = () => {

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