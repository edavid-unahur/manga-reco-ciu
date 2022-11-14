import { Fragment } from "react";
import createUseStyles from 'react-jss';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Box, Grid, GridItem, useColorMode, useColorModeValue, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const TarjetaManga = ({ id, titulo, descripcion, link, mangas, agregarMangaAFavoritos }) => {
    const styles = createUseStyles({
        thumbContainer: {
            width: '50%',
            height: 100,
        },
        thumbnail: {
            flex: 1,
            width: 10,
            height: 10,
            resizeMode: 'cover',
        }
    })

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
                <Box p='6'>
                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                    >
                        {titulo}
                    </Box>
                    <SimpleGrid columns={2} spacing={10}>
                        <View style={{ width: "100%" }}>
                            <img src={coverArtUrl} style={{ width: "100%", height: "100%" }} />
                        </View>
                        <Box maxW='sm' overflow={'hidden'} noOfLines={10}>
                            {descripcion}
                        </Box>
                        <Button
                                type="button"
                            ><a href={link}  target={"_blank"}>Leer</a></Button>
                        <Button
                                type="button"
                                onClick={() => agregarMangaAFavoritos(id)}
                            >Agregar a Favoritos</Button>

                    </SimpleGrid>

                    

                </Box>

            </Box>
        </Fragment>
    )
}

export default TarjetaManga;