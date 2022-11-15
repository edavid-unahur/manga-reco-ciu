import { React, Fragment } from 'react';
import { Box, SimpleGrid, Flex } from '@chakra-ui/react';
import { TarjetaManga } from './TarjetaManga';

export const Favoritos = ({ mangasFavoritos, mangas, eliminarMangaDeFavoritos }) => {
    return (
        <Fragment>
            <Box p='2' ml='5' mb="10">
                <SimpleGrid minChildWidth='300px' spacingX='60px' spacingY='500px'>
                    {mangasFavoritos.length > 0 ? mangasFavoritos.map(manga => (
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
                                    eliminarMangaDeFavoritos={eliminarMangaDeFavoritos}
                                />
                            </Flex>
                        </Box>
                    )
                    ) :
                        <Flex alingitems={'center'}>
                            <Box w='100%' h='4'>
                                <h1>Aún no ha seleccionado Mangas Favoritos.</h1>
                                <h1>Para agregar un Manga a Favoritos, presione el boton "Agregar a Favoritos".</h1>
                                <h1>Para eliminar un Manga de Favoritos, presione el boton "Eliminar de Favoritos".</h1>
                            </Box>
                        </Flex>
                    }
                </SimpleGrid>
            </Box>
        </Fragment>
    )
}

export default Favoritos;