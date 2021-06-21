/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
// eslint-disable-next-line no-unused-vars
import React, {FormEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import PageHeader from "../../components/PageHeader";
import './style.css';
import Input from "../../components/Input";
import warningIcon from '../../assets/imagens/icons/warning.svg';
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";
import api from "../../services/api";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    const [scheduleItems, setscheduleItems] = useState([
        {week_day: '', from: '', to: ''}
    ]);


    function addNewScheduleItem() {
        setscheduleItems([
            ...scheduleItems,
            {week_day: '', from: '', to: ''}
        ]);

    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,
        }).then(() => {
            toast.success("Cadastro realizado com sucesso!", {
                position: toast.POSITION.TOP_RIGHT,
                className: 'foo-bar'
            });

            history.push('/');
        }).catch(() => {
            toast.warning("Erro ao cadastrar!", {
                position: toast.POSITION.TOP_RIGHT,
                className: 'foo-bar'
            });
        });

    }

    function setscheduleItemsValue(position: number, field: string, value: string) {
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return {...scheduleItem, [field]: value};
            }

            return scheduleItem;
        });
        setscheduleItems(newArray);
    }

    return (<>

            <div id="page-teacher-form" className="container">
                <PageHeader
                    title="Que incrivel que você quer dar aula."
                    description="O primeiro passo é preencher esse formulário de inscrição"
                />

                <main>
                    <form onSubmit={handleCreateClass}>
                        <fieldset>
                            <legend>Seus dados</legend>

                            <Input
                                label={"Nome Completo"} name={"name"} value={name}
                                onChange={(e) => setName(e.target.value)}/>
                            <Input
                                label={"Avatar"} name={"avatar"} value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                            />
                            <Input
                                label={"Whatsapp"} name={"whatsapp"} value={whatsapp}
                                onChange={(e) => setWhatapp(e.target.value)}
                            />
                            <TextArea
                                label={"Biografia"} name={"bio"} value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Sobre a aula</legend>

                            <Select
                                label={"Matéria"}
                                name={"subject"}
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
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
                            <Input
                                label={"Custo da aula"}
                                name={"cost"}
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Horários disponiveis <button type={"button"} onClick={addNewScheduleItem}>+ Novo
                                horário</button></legend>
                            {
                                scheduleItems.map((scheduleItem, index) => {
                                    return (
                                        <div key={scheduleItem.week_day} className={"schedule-item"}>
                                            <Select
                                                label={"Dia da semana"}
                                                name={"week-day"}
                                                value={scheduleItem.week_day}
                                                onChange={e => setscheduleItemsValue(index, 'week_day', e.target.value)}
                                                options={[
                                                    {value: '0', label: "Domingo"},
                                                    {value: '1', label: "Segunda-feita"},
                                                    {value: '2', label: "Terça-feira"},
                                                    {value: '3', label: "Quarta-feira"},
                                                    {value: '4', label: "Quinta-feira"},
                                                    {value: '5', label: "Sexta-feira"},
                                                    {value: '6', label: "Sabado"},
                                                ]}/>

                                            <Input
                                                label={"Dás"} name={"from"} type={"time"} value={scheduleItem.from}
                                                onChange={e => setscheduleItemsValue(index, 'from', e.target.value)}
                                            />
                                            <Input
                                                label={"Até"} name={"to"} type={"time"} value={scheduleItem.to}
                                                onChange={e => setscheduleItemsValue(index, 'to', e.target.value)}
                                            />
                                        </div>
                                    );
                                })
                            }


                        </fieldset>
                        <footer>
                            <p>
                                <img src={warningIcon} alt={"Aviso importante"}/>
                                Importante <br/>
                            </p>
                            <button type="submit">
                                Salvar cadastro
                            </button>
                        </footer>
                    </form>
                </main>
            </div>
        </>
    );
}

export default TeacherForm;