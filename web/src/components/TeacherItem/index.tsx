import React from "react";
import './styles.css';
import whatsappIcon from "../../assets/imagens/icons/whatsapp.svg";
import api from "../../services/api";

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface teacherItemProps {
    teacher: Teacher
}

const getWhatsapp = (numero: string) => {
    let output = numero;
    output = output.replace(/[^0-9+]/g, '');
    return output;
}

const TeacherItem: React.FC<teacherItemProps> = ({teacher}) => {

    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img
                    src={teacher.avatar}
                    alt={teacher.name}
                />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>
                {teacher.bio}
            </p>
            <footer>
                <p>
                    Preço por hora <strong>R$ {teacher.cost}</strong>
                </p>
                <a
                    target="_blank"
                    onClick={createNewConnection}
                    href={`https://wa.me/${getWhatsapp(teacher.whatsapp)}`}
                    type="button"
                >
                    <img src={whatsappIcon} alt="Whatsapp"/> Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;