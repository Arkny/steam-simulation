import { useEffect, useState } from "react";
import classes from "./AppRickMorty.module.css";
import FormRickMorty from "./FormRickMorty.jsx";
// const buscarPersonagens = () =>

export default function AppRickMorty() {
  const [loading, setLoading] = useState(false);
  const [lista, setLista] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    fetch("jogos.json")
      .then((result) => result.json())
      .then((dados) => setLista(dados.results.filter((x) => x.id < 12)))
      .then(() => setLoading(false));
  }, []);


  const adicionarJogo = (jogo) => {
    if (selecionados.find(p => p.id === jogo.id))
    {
        // alert(jogo.name & " já foi selecionado")
        alert(" já foi selecionado")
        return
    }
        console.log("Adicionando jogo", jogo)
        setSelecionados(old => [...old, jogo])
    
  }

  const removerJogo = (jogo) => {
    console.log("Removendo jogo", jogo)
    setSelecionados(old => [...old.filter(p => p.id !== jogo.id)])
  }

  return (
    <>
      <h1>Simulador de Loja de Jogos (Steam)</h1>

       <section>
        <FormRickMorty adicionarJogo={ adicionarJogo }/>
      </section>

      <section>
        <h3>Jogos</h3>
        {loading && <div>Carregando...</div>}
        <ListaPersonagens 
            lista={lista} 
            // selecionaJogo={(jogo) => 
            //     setSelecionados(old => [...old, jogo])}
            selecionaJogo={adicionarJogo}
            />
            <button onClick={() => setSelecionados(lista)}> Selecionar todos </button>
            <button onClick={() => setSelecionados([])}> Limpar seleção </button>
            <button onClick={() => setSelecionados([lista[0]])}> Selecionar o primeiro </button>
            <button onClick={() => setSelecionados([lista[1]])}> Selecionar o segundo </button>
      </section>
      <hr />
      <section>
        <h3>Lista de Desejos</h3>
        <ListaPersonagens
            lista={selecionados} 
             // selecionaJogo = {(jogo) => setSelecionados(old => [...old.filter(p => p.id !== jogo.id)])}
            selecionaJogo = {removerJogo}
            />
      </section>
    </>
  );
}

function ListaPersonagens({ lista, selecionaJogo }) {
  return (
    <div className={classes.box}>
      {/* {JSON.stringify(lista)} */}
      {lista.map((jogo) => (
        // <div key={jogo.id}>
        //     <img src={jogo.imagem} alt={jogo.name} />
        //     <h2>{jogo.name}</h2>
        //     <p>{jogo.genero}</p>
        // </div>

        <div key={jogo.id} className={classes.card}>
          {/* <div key = {jogo.id}> */}
          {/* {console.log(jogo.name)} */}
          <img src={jogo.image} style={{ width: "100%" }} />
          <div 
            className="container"
            key={jogo.id}
            onClick={() => selecionaJogo(jogo)}
            >
            <h4>
              <b>{jogo.name}</b>
            </h4>
            <p>Status: {jogo.genero}</p>
            <p>Preço: R$ {jogo.preco}</p>
          </div>

          {/* <div> <img src={jogo.image} /></div> */}

          {/* </div> */}
        </div>
      ))}
    </div>
  );
}
