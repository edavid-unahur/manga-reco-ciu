import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import { useState, useEffect, React } from 'react';
import {Text, useColorModeValue } from '@chakra-ui/react';

import { extendTheme } from "@chakra-ui/react"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Home } from './components/Home';
import Favoritos from './components/Favoritos';
import { Container } from 'react-bootstrap';

function App() {

  const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  }

  let preferenciasUsuarioInicio = JSON.parse(localStorage.getItem('preferenciasUsuario'));
  if (!preferenciasUsuarioInicio) {
    preferenciasUsuarioInicio = [];
  }

  let [preferenciasUsuario, setPreferenciasUsuario] = useState(preferenciasUsuarioInicio);

  useEffect(
    () => {
      if (preferenciasUsuarioInicio) {
        localStorage.setItem('preferenciasUsuario', JSON.stringify(preferenciasUsuario));
      } else {
        localStorage.setItem('preferenciasUsuario', JSON.stringify([]));
      }
    }, [preferenciasUsuarioInicio]
  );

  let mangasFavoritosInicio = JSON.parse(localStorage.getItem('mangasFavoritos'));
  if (!mangasFavoritosInicio) {
    mangasFavoritosInicio = [];
  }

  let [mangasFavoritos, setMangasFavoritos] = useState(mangasFavoritosInicio);

  useEffect(
    () => {
      if (mangasFavoritosInicio) {
        localStorage.setItem('mangasFavoritos', JSON.stringify(mangasFavoritos));
      } else {
        localStorage.setItem('mangasFavoritos', JSON.stringify([]));
      }
    }, [mangasFavoritosInicio]
  );

  const [mangas, setMangas] = useState([]);

  //fetch most popular mangas mangadex api for manga list
  useEffect(() => {
    fetch('https://corseze.herokuapp.com/https://api.mangadex.org/manga?order[followedCount]=desc&limit=50', 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.json())
      .then(data => {
        setMangas(data.data);
      })
  }, []);

  const [mangasPreferidos, setMangasPreferidos] = useState([]);

  //fetch mangas by preferenciasUsuario from mangadex api for manga list
  useEffect(() => {
    fetch('https://corseze.herokuapp.com/https://api.mangadex.org/manga?order[followedCount]=desc&limit=100',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.json())
      .then(data => {
        setMangasPreferidos(data.data);
      })
  }, []);


  const agregarMangaAFavoritos = (manga) => {
    setMangasFavoritos([...mangasFavoritos, manga]);
  }

  const eliminarMangaDeFavoritos = (id) => {
    setMangasFavoritos(mangasFavoritos.filter(manga => manga.id !== id));
  }

  const agregarPreferencia = (preferencia) => {
    setPreferenciasUsuario([...preferenciasUsuario, preferencia]);
  }

  const eliminarPreferencia = (preferencia) => {
    setPreferenciasUsuario(preferenciasUsuario.filter((preferenciaUsuario) => preferenciaUsuario !== preferencia));
  }

  const theme = extendTheme({ breakpoints })

  return (
    <ChakraProvider theme={theme}>

      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route exact path="/"
              element={<Home
                mangas={mangas}
                mangasFavoritos={mangasFavoritos}
                agregarMangaAFavoritos={agregarMangaAFavoritos}
              />} />
            <Route exact path="/favoritos"
              element={<Favoritos
                mangasFavoritos={mangasFavoritos}
                mangas={mangas}
                eliminarMangaDeFavoritos={eliminarMangaDeFavoritos} />} />
          </Routes>
        </Container>

      </Router>
      <div className="footer" bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Text>© 2022 MangaApp. Ezequiel David. API MangaDex</Text>
      </div>
    </ChakraProvider>


  );
}

export default App;
