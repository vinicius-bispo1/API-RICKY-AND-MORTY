import React from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";

const API = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character"
});

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`;

const Container = styled.div`
  width: 100%;
  height: 310vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #515151;
  color: white;
  h1{
    position: relative;
    top: 4vh;
  }
`;

const Box = styled.div`
  width: 20vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: gray;
  border-radius: 10px;
  h2{
    
    height: 4vh;
  }

  p {
    height: 4vh;
    display: flex;
    align-items: center;
  }
`;

const Seconde = styled.div`
  width: 100vw;
  height: 300vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export default class App extends React.Component {
  state = {
    info: []
  };

  pegarPersonagens = async () => {
    const resposta = await API.get();
    console.log(resposta);
    //Map da API para pegar os itens
    const itensApi = resposta.data.results.map((item) => {
      return {
        ...item //spread - acesso a toda a array results
      };
    });

    this.setState({
      info: itensApi
    });
  };

  componentDidMount() {
    this.pegarPersonagens();
  }

  render() {
    return (
      <Container>
        <GlobalStyle />
        <h1>API RICKY AND MORTY</h1>
        <Seconde>
          {this.state.info.map((item) => (
            <Box>
              <h2>{item.name}</h2>
              <img src={item.image} alt="" />
              <p>{item.species}</p>
              <p>{item.gender}</p>
            </Box>
          ))}
        </Seconde>
      </Container>
    );
  }
}
