import React, {useEffect, useState} from 'react';
import styles from "./styles";
import {ScrollView, View, Text, TextInput} from "react-native";
import PageHeader from "../../components/PageHeader";
import TeacherItem, {Teacher} from "../../components/TeacherItem";
import {BorderlessButton, RectButton} from "react-native-gesture-handler";
import {Feather} from '@expo/vector-icons';
import api from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from "@react-navigation/native";

function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');


    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeacher = JSON.parse(response);
                const favoritedTeacherIds = favoritedTeacher.map((teacher: Teacher) => {
                    return teacher.id;
                });

                setFavorites(favoritedTeacherIds);
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    function handleToogleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFilterSubmit() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject, week_day, time
            }
        });
        console.log(response.data);

        setTeachers(response.data);
        setIsFiltersVisible(false);
    }

    return (<>
        <View style={styles.container}>
            <PageHeader
                title={"Proffis disponiveis"}
                headerRight={(
                    <BorderlessButton onPress={handleToogleFiltersVisible}>
                        <Feather name={"filter"} size={20} color={"#FFF"}/>
                    </BorderlessButton>
                )}>

                {isFiltersVisible && (<View style={styles.searchForm}>

                    <Text style={styles.label}>
                        Matéria
                    </Text>
                    <TextInput
                        placeholderTextColor="#c1bccc"
                        style={styles.input}
                        placeholder="Qual á matéria"
                        value={subject}
                        onChangeText={text => setSubject(text)}
                    />


                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>
                                Dia da semana
                            </Text>
                            <TextInput
                                placeholderTextColor="#c1bccc"
                                style={styles.input}
                                placeholder="Qual Dia?"
                                value={week_day}
                                onChangeText={text => setWeek_day(text)}
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>
                                Horário
                            </Text>
                            <TextInput
                                placeholderTextColor="#c1bccc"
                                style={styles.input}
                                placeholder="Qual horário?"
                                value={time}
                                onChangeText={text => setTime(text)}
                            />
                        </View>
                    </View>

                    <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>)}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)}/>
                    )
                })}

            </ScrollView>

        </View>
    </>);
}

export default TeacherList;