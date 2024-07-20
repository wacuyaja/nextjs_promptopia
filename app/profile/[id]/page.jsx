'use client'

import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Profile from '@components/profile'

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams()
    const userName = searchParams.get('name')
    console.log(userName);

    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect((post) => {
        const fetchPost = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`)
            const data = await response.json()

            setPosts(data)
        }

        if (params.id) fetchPost()
    }, [])

    return (
        <Profile
            name={userName}
            desc="Welcome to your personalized profile page"
            data={posts}
        />
    )
}

export default UserProfile