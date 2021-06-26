import React, {useEffect, useState} from 'react';
import {ScrollView, View} from "react-native";
import PageHeader from "../../components/PageHeader";
import styles from "../TeacherList/styles";
import TeacherItem, {Teacher} from "../../components/TeacherItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from '@react-navigation/native';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useFocusEffect(() => {
        loadFavorites();
    });

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeacher = JSON.parse(response);

                setFavorites(favoritedTeacher);
            }
        });
    }

    return (<View>
        <PageHeader title={"Meus proffis favoritos"}/>

        <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 24,
            }}
        >
            {
                favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={true}
                        />
                    );
                })
            }


        </ScrollView>
    </View>);
}

export default Favorites;