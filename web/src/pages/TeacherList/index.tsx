import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader'
import TeacherItem, {Teacher} from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import api from '../../services/api';
import './styles.css';

function TeacherList(){
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [onSearch, setOnSearch] = useState(false);

  async function searchTeachers(e: FormEvent){
    e.preventDefault();
    
    setOnSearch(true);

    const response = await api.get('classes', {
      params:{
        subject,
        week_day,
        time
      }
    });

    setTeachers(response.data)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponiveis">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select 
          name="subject" 
          label="Máteria"
          value={subject}
          onChange={ (e) => { setSubject(e.target.value) } }
              options={[
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
            />

            <Select name="week_day" label="Dia da semana"
             value={week_day}
             onChange={ (e) => { setWeekDay(e.target.value) } }
              options={[
                { value: '0', label: 'Domingo'},
                { value: '1', label: 'Segunda-feira'},
                { value: '2', label: 'Terça-feira'},
                { value: '3', label: 'Quarta-feira'},
                { value: '4', label: 'Quinta-feira'},
                { value: '5', label: 'Sexta-feira'},
                { value: '6', label: 'Sábado'},
              ]}
            />
          <Input type="time" name="time" label="Horas"  value={time}
             onChange={ (e) => { setTime(e.target.value) } }/>

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        
        { teachers.length === 0 && (
          <section className="section-search-empty">
            { !onSearch && (<p>Utilize os filtros para encontrar um proffy ideal. ;)</p>)}
            { onSearch && (<p>Não encontramos nenhum proffy com os filtros informados. Tente fazer uma nova busca! ;)</p>)}
          </section>
        )}

        {teachers.map( (teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher}></TeacherItem> 
        })}
      </main> 
    </div>
  )
}

export default TeacherList; 