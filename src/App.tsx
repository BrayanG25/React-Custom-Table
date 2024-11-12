import { useState, useEffect, useRef, useMemo } from 'react'

import { User } from './DataTypes'
import Table from './components/table/Table'

import './App.css'

function App() {
  const [data, setData] = useState<User[]>([])
  const [color, setColor] = useState(false)
  const [orderByCountry, setOrderByCountry] = useState(false)
  const originalData = useRef<User[]>([]);
  const [filteredCountry, setFilteredCountry] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch(`https://randomuser.me/api?results=5`)

      if (!response.ok) {
        throw new Error('Error in fetching data...')
      }

      const result = await response.json()
      setData(result.results)
      originalData.current = result.results
      
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  useEffect(() => { fetchData() },[])

  const toggleColor = () => { 
    setColor(color => !color) 
  }

  const toggleOrderUsers = () => { 
    setOrderByCountry(orderByCountry => ! orderByCountry) 
  }

  const handleDeleteUser = (email: string) => { 
    const dataFiltered = data.filter((user) => user.email !== email) 
    setData(dataFiltered)
  }

  const filteredUser = useMemo(() => {
    console.log('filtrando');
    
    return filteredCountry !== null && filteredCountry.trim().length > 0 ? 
      data.filter((user) => { return user.location.country.toLowerCase().includes(filteredCountry.toLowerCase()) }) : 
      data
  }, [filteredCountry, data])

  const sortedUsers = useMemo(() => {
    console.log('ordenando...');
    
    return orderByCountry ? 
      [...filteredUser].sort((a,b) => { return a.location.country.localeCompare(b.location.country) }) : 
      filteredUser
  }, [filteredUser, orderByCountry])

  // const filteredUser = (() => {
  //   console.log('filtrando');
    
  //   return filteredCountry !== null && filteredCountry.trim().length > 0 ? 
  //     data.filter((user) => { return user.location.country.toLowerCase().includes(filteredCountry.toLowerCase()) }) : 
  //     data
  // })()

  // const sortedUsers = (() => {
  //   console.log('ordenando...');
    
  //   return orderByCountry ? 
  //     [...filteredUser].sort((a,b) => { return a.location.country.localeCompare(b.location.country) }) : 
  //     filteredUser
  // })()

  const resetData = () => { 
    setData(originalData.current) 
  }

  return (
    <>
      <header>
        <h1>Table React</h1>
        <button type='button' onClick={toggleColor}>{color ? 'No colorear' : 'Colorear Tabla'}</button>
        <button type='button' onClick={toggleOrderUsers}>{orderByCountry ? 'No ordenar' : 'Ordenar por pais'}</button>
        <button type='button' onClick={resetData}>Restaurar Datos</button>
        <input type="text" placeholder='Filtra por pais' onChange={(e) => {setFilteredCountry(e.target.value)}}></input>
      </header>
      <main>
        <Table users={sortedUsers} background={color} deleteUser={handleDeleteUser}/>
      </main>
    </>
  )
}

export default App
