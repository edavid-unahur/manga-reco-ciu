import { Fragment } from "react";
import { View} from 'react-native';
import { Button, Box, useColorModeValue, SimpleGrid, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Badge } from '@chakra-ui/react';

export const TarjetaManga = ({ id, titulo, descripcion, link, tags, mangasFavoritos, mangas, manga,agregarMangaAFavoritos, eliminarMangaDeFavoritos }) => {

    let generos = (tags) => {
        let generos = [];
        let i = 0;
        tags.forEach(tag => {
            if (i < 4) {
                generos.push(tag.attributes.name.en)
            }
            i++;
        });
        return generos;
    };

    const [coverArt, setCoverArt] = useState([]);

    useEffect(() => {
        fetch(`https://api.mangadex.org/cover?manga[]=${id}`)
            .then(res => res.json())
            .then(data => {
                setCoverArt(data.data[0].attributes.fileName);
            })
    }, [id])

    let coverArtUrl = "https://uploads.mangadex.org/covers/" + id + "/" + coverArt;
    return (
        <Fragment>
            <Box maxW='lg' borderWidth='3px' borderRadius='lg'>
                <Flex p='2' alingitems={'center'}>
                    {generos(tags).map((genero, index) => (
                        <Badge key={index}
                            colorScheme="blue"
                            m={1}
                        >
                            {genero}
                        </Badge>
                    ))}
                </Flex>
                <Box p='6'>
                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                    >
                        {titulo ? titulo : 'Sin titulo'}
                    </Box>
                    <SimpleGrid columns={2} spacing={10}>
                        <View style={{ width: "100%" }}>
                            <img src={coverArtUrl} style={{ width: "100%", height: "100%" }} alt="Imagen del manga" />
                        </View>
                        <Box maxW='sm' overflow={'hidden'} noOfLines={10}>
                            {descripcion}
                        </Box>
                        <Button
                            type="button"
                            bg={useColorModeValue('teal.50', 'teal.700')}
                            color={useColorModeValue('teal.500', 'teal.100')}
                        ><a href={link} target={"_blank"}>Leer</a>
                        </Button>
                        { agregarMangaAFavoritos == undefined ?
                            <Button
                            type="button"
                            fontSize={['sm', 'md']}
                            colorScheme="red"
                            onClick={() => eliminarMangaDeFavoritos(id)}
                            >Eliminar de Favoritos</Button>
                            :
                            mangasFavoritos.find(manga => manga.id === id) ?
                            <Button
                                type="button"
                                fontSize={['sm', 'md']}
                                colorScheme="purple"

                            >Ya agregado</Button>
                            : 
                                <Button
                                    type="button"
                                    colorScheme="teal"
                                    fontSize={['sm', 'md']}
                                    onClick={() => agregarMangaAFavoritos(manga)}
                                >Agregar a Favoritos</Button>
                        }


                    </SimpleGrid>



                </Box>

            </Box>
        </Fragment>
    )
}

export default TarjetaManga;