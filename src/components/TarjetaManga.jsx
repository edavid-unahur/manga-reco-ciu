import { Fragment } from "react";
import createUseStyles from 'react-jss';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Box, Grid, GridItem, useColorMode, useColorModeValue } from '@chakra-ui/react';
import {useEffect, useState} from 'react';

export const TarjetaManga = ({id, titulo, descripcion, link, mangas, agregarMangaAFavoritos })  => {
    const styles = createUseStyles({
        thumbContainer: {
        width: '100%',
        height: 200,
      },
      thumbnail: {
        flex: 1,
        width: undefined,
        height: undefined,
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
    
    let coverArtUrl = "https://uploads.mangadex.org/covers/"+id+"/"+coverArt;
   
    return (
        <Fragment>
            <Box maxW='sm' borderWidth='3px' borderRadius='lg' overflow='hidden'>
                    <Box p='6'>
                        <Box
                            mt='1'
                            fontWeight='semibold'
                            as='h4'
                            lineHeight='tight'
                            noOfLines={6}
                        >
                            {titulo}
                        </Box>
                        <View style={styles.thumbContainer}>
                            <Image src={coverArtUrl} style={styles.thumbnail} />
                        </View>
                       
                        <Grid templateColumns={'repeat(2, 1fr)'} gap={3} >
                            <GridItem mt={3} maxW='sm' borderRadius='lg' overflow='hidden'>
                                <Box>
                                    
                                </Box>
                            </GridItem>
                            <GridItem p='1' colStart={3} colEnd={3}>
                                <Button
                                    type="button"
                                    onClick={() => agregarMangaAFavoritos(id)}
                                >Agregar a Favoritos</Button>
                            </GridItem>
                        </Grid>


                    </Box>

                </Box>
        </Fragment>
    )
}

export default TarjetaManga;