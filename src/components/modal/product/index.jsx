import { Dialog, DialogTrigger, DialogContent } from '@radix-ui/react-dialog'
import { useState } from 'react'
import './style.css'
import { DarkButton } from '../../button/dark-button'

export function AddProductModal() {
  const [open, setOpen] = useState(false)
  const [productName, setProductName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [observations, setObservations] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // Implemente aqui a lógica para enviar as informações do modal
    console.log('Produto:', productName)
    console.log('Quantidade:', quantity)
    console.log('Observações:', observations)
    // Fecha o modal
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {/* nao precisa mexer aqui */}
        <button id="abrir-modal" onClick={() => setOpen(true)}>Abrir Modal</button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <label htmlFor="productName">Nome do Produto:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
          <label htmlFor="quantity">Quantidade:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
          <label htmlFor="observations">Observações:</label>
          <textarea
            id="observations"
            value={observations}
            onChange={(event) => setObservations(event.target.value)}
          />
          <DarkButton text="Salvar" />
        </form>
      </DialogContent>
    </Dialog>
  )
}
