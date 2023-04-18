import { useState } from 'react'

import { Table } from '../../components/table'
import { Navbar } from '../../components/navbar'
import { LightButton } from '../../components/button/light-button'
import { AddUserModal } from '../../components/modal/user'

import './style.css'

export function Users() {
  const [open, setOpen] = useState(false)

  function handleButtonClick() {
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
  }

  return (
    <>
      <Navbar />
      {open ? <AddUserModal open={open} onClose={handleCloseModal} /> : <></>}
      <div id="users-container">
        <LightButton text="Adicionar usuário" func={handleButtonClick} />
        <Table
          titulo2="Email ou Usuário"
          titulo3="Observações"
          quantidadeBotoes={2}
        />
      </div>
    </>
  )
}
