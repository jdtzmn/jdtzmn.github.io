import { useState } from 'react'

/**
 * @description Count the number of words in a given excerpt
 * @param {string} text The text to count the words in
 * @returns {number} The number of words
 */
export function calculateWordCount(text: string): number {
  const words = text.split(' ').filter((word) => word !== '')
  return words.length
}

type HandleChangeFunction = (
  event: React.ChangeEvent<HTMLTextAreaElement>
) => void

/**
 * @description React hook to keep track of the textarea's word count
 * @returns {[number, handleChange]} The wordCount state and a function to handle textarea change events
 */
export default function useWordCount(): [
  count: number,
  handleChange: HandleChangeFunction
] {
  const [wordCount, setWordCount] = useState(0)

  const handleChange: HandleChangeFunction = (event) => {
    const comments = event.target.value
    setWordCount(calculateWordCount(comments))
  }

  return [wordCount, handleChange]
}
