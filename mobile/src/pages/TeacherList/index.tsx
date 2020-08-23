import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => { 
          return teacher.id;
        });

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      }
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={25} color="#FfF" />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <RNPickerSelect 
              placeholder={{
                  label: 'Qual a matéria?',
                  value: null,
              }}
              style={pickerSelectStyles }
              value={subject}
              onValueChange={(value) => setSubject(value)}
              items={[
                { value: 'Artes', label: 'Artes'},
                { value: 'Biologia', label: 'Biografia'},
                { value: 'Ciências', label: 'Ciências'},
                { value: 'Educação Física', label: 'Educação Física'},
                { value: 'Física', label: 'Física'},
                { value: 'Geografia', label: 'Geografia'},
                { value: 'História', label: 'História'},
                { value: 'Matemática', label: 'Matemática'},
                { value: 'Português', label: 'Português'},
                { value: 'Química', label: 'Química'}
              ]}
              useNativeAndroidPickerStyle={false} //android only
              />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>

            <RNPickerSelect 
              placeholder={{
                  label: 'Qual o dia?',
                  value: null,
              }}
              style={pickerSelectStyles }
              value={weekDay}
              onValueChange={(value) => setWeekDay(value)}
              items={[
                { value: '0', label: 'Domingo'},
                { value: '1', label: 'Segunda-feira'},
                { value: '2', label: 'Terça-feira'},
                { value: '3', label: 'Quarta-feira'},
                { value: '4', label: 'Quinta-feira'},
                { value: '5', label: 'Sexta-feira'},
                { value: '6', label: 'Sábado'},
              ]}
              useNativeAndroidPickerStyle={false} //android only
              />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  onChangeText={text => setTime(text)}
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton 
              onPress={handleFiltersSubmit} 
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

        {teachers.length >0  && (
          <ScrollView
          style={styles.teacherList}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >
          {teachers.map((teacher: Teacher) => (
            <TeacherItem 
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          ))}
          </ScrollView>
        ) }
      
      {(teachers.length === 0 && !isFiltersVisible) && (
        <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        >
          <View style={styles.containerEmpty}>
            <Text style={styles.textEmpty}>Ainda não foi encontrado nenhum prof disponiveis. Por favor novamente</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
    paddingVertical: 8,
    paddingRight: 30, // to ensure the text is never behind the icon*/
  },
});
export default TeacherList;