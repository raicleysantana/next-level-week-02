import React, {FormEvent, useState} from 'react';


import whatsappIcon from '../../assets/imagens/icons/whatsapp.svg';
import './styles.css';
import PageHeader from "../../components/PageHeader";
import TeacherItem, {Teacher} from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";


function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');


    async function searchTeacher(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject, week_day, time
            }
        });

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffyys disponiveis.">
                <form id="search-teachers" onSubmit={searchTeacher}>
                    <Select
                        label={"Matéria"}
                        name={"subject"}
                        value={subject}
                        onChange={e => {
                            setSubject(e.target.value);
                        }}
                        options={[
                            {value: "Artes", label: "Artes"},
                            {value: "Biologia", label: "Biologia"},
                            {value: "Ciência", label: "Ciência"},
                            {value: "Educação física", label: "Educação física"},
                            {value: "Geografia", label: "Geografia"},
                            {value: "Física", label: "Física"},
                            {value: "Português", label: "Português"},
                            {value: "História", label: "História"},
                            {value: "Matemática", label: "Matemática"},
                            {value: "Química", label: "Química"},
                        ]}/>

                    <Select
                        label={"Dia da semana"}
                        name={"week-day"}
                        value={week_day}
                        onChange={e => {
                            setWeek_day(e.target.value);
                        }}
                        options={[
                            {value: "0", label: "Domingo"},
                            {value: "1", label: "Segunda-feita"},
                            {value: "2", label: "Terça-feira"},
                            {value: "3", label: "Quarta-feira"},
                            {value: "4", label: "Quinta-feira"},
                            {value: "5", label: "Sexta-feira"},
                            {value: "6", label: "Sabado"},
                        ]}/>
                    <Input
                        type={"time"}
                        label={"Horário"}
                        name={"time"}
                        value={time}
                        onChange={e => {
                            setTime(e.target.value);
                        }}
                    />
                    <button type={"submit"}>Buscar</button>
                </form>
            </PageHeader>

            <main>
                {
                    teachers.map((teacher: Teacher) => {
                        return <TeacherItem key={teacher.id} teacher={teacher}/>
                    })
                }

            </main>
        </div>
    );
}

export default TeacherList;