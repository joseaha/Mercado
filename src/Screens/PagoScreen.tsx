import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

export const PagoScreen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../img/bg4.jpg')} style={styles.image}>
                <Text>
                    pago
                </Text>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
})