import logo from './logo.svg';
import './App.css';
import { ChakraProvider, SimpleGrid } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import TarjetaManga from './components/TarjetaManga';
import {useState, useEffect, React} from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';
import Footer from './components/Footer';

function App() {

  let preferenciasUsuarioInicio = JSON.parse(localStorage.getItem('preferenciasUsuario'));
  if (!preferenciasUsuarioInicio) {
    preferenciasUsuarioInicio = [];
  }
  
  let [preferenciasUsuario, setPreferenciasUsuario] = useState(preferenciasUsuarioInicio);

  useEffect(
    () => {
    if(preferenciasUsuarioInicio){
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
    if(mangasFavoritosInicio){
      localStorage.setItem('mangasFavoritos', JSON.stringify(mangasFavoritos));
    } else {
      localStorage.setItem('mangasFavoritos', JSON.stringify([]));
    }
  }, [mangasFavoritosInicio]
  );

  const [mangas, setMangas] = useState([]);

  //fetch most popular mangas mangadex api for manga list
  useEffect(() => {
    fetch('https://api.mangadex.org/manga?order[followedCount]=desc&limit=50')
      .then(response => response.json())
      .then(data => {
        setMangas(data.data);
      })
  }, []);

  const [mangasPreferidos, setMangasPreferidos] = useState([]);

  //fetch mangas by preferenciasUsuario from mangadex api for manga list
  useEffect(() => {
    fetch('https://api.mangadex.org/manga?order[followedCount]=desc&limit=100')
      .then(response => response.json())
      .then(data => {
        setMangasPreferidos(data.data);
      })
  }, []);


  const agregarMangaAFavoritos = (manga) => {
    setMangasFavoritos([...mangasFavoritos, manga]);
  }

  const eliminarMangaDeFavoritos = (manga) => {
    setMangasFavoritos(mangasFavoritos.filter((mangaFavorito) => mangaFavorito.id !== manga.id)); 
  }

  const agregarPreferencia = (preferencia) => {
    setPreferenciasUsuario([...preferenciasUsuario, preferencia]);
  }

  const eliminarPreferencia = (preferencia) => {
    setPreferenciasUsuario(preferenciasUsuario.filter((preferenciaUsuario) => preferenciaUsuario !== preferencia));
  }

  return (
    <ChakraProvider>
      <Navbar />
      <Box p='6' ml='10'>
        <SimpleGrid minChildWidth='500px' spacing='60px'>
          {mangas.map(manga => (
            <Box w='100%' h='8'>
              <Flex alingitems={'center'}>
                <TarjetaManga
                  id={manga.id}
                  titulo={manga.attributes.title.en}
                  descripcion={manga.attributes.description.en}
                  link={manga.attributes.links.engtl}
                  key={manga.id}
                  mangas={mangas}
                  agregarMangaAFavoritos={agregarMangaAFavoritos}
                />
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
