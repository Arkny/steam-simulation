import { useState } from "react";

export default function FormRickMorty( {adicionarJogo} ) {
    const [form, setForm] = useState({
        name: "",
        genero: "",
        preco: "",
        image: "",
      })

    const onSubmit = (evt) => {
        evt.preventDefault()
        console.log(form)
        adicionarJogo({
          ...form,
          id:Math.random(),
          origin:
              {
                  name: form.origin
              }
        })
      }

      const onChange = (evt) => setForm(old =>
        ({
            ...old,
            [evt.target.name]: evt.target.value
        }))



  return (
    <div>
      <h1>Formulário de Cadastro</h1>
      <form
        onSubmit= { onSubmit }
      >
        <div>
          <label>Nome</label>
          <input name="name" 
            value={form.name} 
            onChange={ onChange } />
        </div>
        <div>
          <label>Genero</label>
          <input 
            name="genero" 
            value={form.genero}  
        //     onChange={evt => setForm(old => ({
        //         ...old,
        //         status: evt.target.value
        //   }))} 
            onChange={ onChange }
          />
        </div>

        <div>
          <label>Preço</label>
          <input 
            name="preço" 
            value={form.preço}  
            onChange={ onChange }
             />
        </div>

        <div>
          <label>Imagem</label>
          <input 
            name="image" 
            value={form.image}
            onChange={ onChange }
            />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
