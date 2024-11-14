import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

import Table from './components/table/Table'
import { User } from './DataTypes'

import './App.css'

const API_URL = 'https://randomuser.me/api?results=5';

function App() {
  const [data, setData] = useState<User[]>([])
  const [color, setColor] = useState(false)
  const [orderByCountry, setOrderByCountry] = useState(false)
  const [filteredCountry, setFilteredCountry] = useState<string | null>(null)
  const originalData = useRef<User[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Error in fetching data...')
      }

      const result = await response.json()
      setData(result.results)
      originalData.current = result.results
      
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const toggleColor = () => { 
    setColor(prevColor => !prevColor) 
  }

  const toggleOrderUsers = () => { 
    setOrderByCountry(prevOrder  => !prevOrder) 
  }

  const handleDeleteUser = (email: string) => { 
    setData(prevData => prevData.filter((user) => user.email !== email))
  }

  const resetData = () => { 
    setData(originalData.current) 
  }

  // Forma Optima
  const filteredUser = useMemo(() => {    
    return filteredCountry?.trim() 
      ? data.filter( user =>
        user.location.country.toLowerCase().includes(filteredCountry.toLowerCase())
      ) 
      : data
  }, [filteredCountry, data])

  const sortedUsers = useMemo(() => {
    return orderByCountry 
      ? [...filteredUser].sort((a,b) => a.location.country.localeCompare(b.location.country)) 
      : filteredUser
  }, [filteredUser, orderByCountry])

  // Forma no optima
  // const filteredUser = (() => {    
  //   return filteredCountry !== null && filteredCountry.trim().length > 0 ? 
  //     data.filter((user) => { return user.location.country.toLowerCase().includes(filteredCountry.toLowerCase()) }) : 
  //     data
  // })()

  // const sortedUsers = (() => {    
  //   return orderByCountry ? 
  //     [...filteredUser].sort((a,b) => { return a.location.country.localeCompare(b.location.country) }) : 
  //     filteredUser
  // })()

  return (
    <>
      <header>
        <h1>Table React</h1>
        <button type='button' onClick={toggleColor} aria-label="Toggle table color">
          {color ? 'No colorear' : 'Colorear Tabla'}
        </button>
        <button type='button' onClick={toggleOrderUsers} aria-label="Toggle sorting by country">
          {orderByCountry ? 'No ordenar' : 'Ordenar por pais'}
        </button>
        <button type='button' onClick={resetData} aria-label="Reset data">
          Restaurar Datos
        </button>
        <input type="text" placeholder='Filtra por pais' onChange={e => setFilteredCountry(e.target.value)} aria-label="Filter by country"></input>
      </header>
      <main>
        <Table users={sortedUsers} background={color} deleteUser={handleDeleteUser}/>
      </main>
    </>
  )
}

export default App
