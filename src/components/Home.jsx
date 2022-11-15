import {React, Fragment} from 'react';
import {Box, SimpleGrid, Flex} from '@chakra-ui/react';
import {TarjetaManga} from './TarjetaManga';

export const Home = ({mangas, agregarMangaAFavoritos, mangasFavoritos}) => {
    return (
        <Fragment>
              <Box p='2' ml='5' mb="10">
                <SimpleGrid minChildWidth='300px' spacingX='60px' spacingY='500px'>
                  {mangas.map(manga => (
                    <Box w='100%' h='4'>
                      <Flex alingitems={'center'}>
                        <TarjetaManga
                          id={manga.id}
                          titulo={manga.attributes.title.en}
                          descripcion={manga.attributes.description.en}
                          link={manga.attributes.links.engtl}
                          key={manga.id}
                          tags={manga.attributes.tags}
                          mangas={mangas}
                          manga={manga}
                          mangasFavoritos={mangasFavoritos}
                          agregarMangaAFavoritos={agregarMangaAFavoritos}
                        />
                      </Flex>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
        </Fragment>
    )
}