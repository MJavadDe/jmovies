'use client'
import { useFormStatus } from 'react-dom'

function SubmitButton() {

    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={pending ? true : false} className={`btn w-full bg-neutral`}>
        {pending ? <span className='loading loading-infinity loading-lg'></span>:"submit"}
    </button>
    )
}

export default SubmitButton
