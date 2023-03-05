import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
const { v1: uuid } = require('uuid')

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`
const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 500
  })  
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  if (!props.show) {
    return null
  }

  let authors = []

  if (result.loading) {
    return <div>loading...</div>
  }

  authors = authors.concat(result.data.allAuthors);

  const submit = async (event) => {
    event.preventDefault()

    const setBornTo = birthYear

    editAuthor({ variables: { name, setBornTo } })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(i =>
              <option key={uuid()} value={i.name}>{i.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default Authors
