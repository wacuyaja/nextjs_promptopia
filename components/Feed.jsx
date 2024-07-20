'use client'

import { useState, useEffect } from "react"
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setsearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [searchResult, setSearchResult] = useState([])

  const hanldeSearchChange = async (e) => {
    const value = e.target.value
    
    setsearchText(value)
    const searchResult = handleFiltered(value)
    setSearchResult(searchResult)
  }

  const handleFiltered = (value) => {
    const regex = new RegExp(value, 'i')
    return posts.filter((e) => {
      return regex.test(e.prompt) || regex.test(e.tag) || regex.test(e.creator.username)
    })
  }

  const handleTagClick = (value) => {
    setsearchText(value)
    const searchResult = handleFiltered(value)
    setSearchResult(searchResult)
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPost()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={hanldeSearchChange}
          className="search_input peer"
          required
        />
      </form>

      <PromptCardList
        data={searchText ? searchResult : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed