"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const {data: session} = useSession()
  const [provider, setProvider] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders()
      setProvider(response)
    }

    setProviders()
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width="30" height="30" className="object-contain"></Image>
      </Link>
      
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={() => {
                    signOut()
                  }}>
              Sign Out
            </button>
            <Link href="profile">
              <Image src={session?.user.image} alt="Profile" width="37" height="37" className="object-contain rounded-full"></Image>
            </Link>
          </div>
        ) : (
          <>
            {provider && Object.values(provider).map((prov) => {
              return (
                <button
                  type="button"
                  className="black_btn"
                  key={prov.name}
                  onClick={() => signIn(prov.id)}>
                  Sign In
                </button>
              )
            })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="Profile"
              width="37"
              height="37"
              className="object-contain rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}></Image>

            {toggleDropdown && (
              <div className="dropdown">
                <Link href="profile" className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href="create-prompt" className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider && Object.values(provider).map((prov) => {
              return (
                <button
                  type="button"
                  className="black_btn"
                  key={prov.name}
                  onClick={() => signIn(prov.id)}>
                  Sign In
                </button>
              )
            })}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav