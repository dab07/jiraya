import React from 'react';
import {View, ScrollView, StyleSheet} from "react-native";
import Navbar from '../components/Navbar'
import Features from '../components/Features';


export default function Index() {
    return (
        <View
            style={styles.container}>
            <Navbar/>
            <ScrollView style = {styles.scrollview}>
                <Features/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollview: {
        flex: 1,
    }
})
