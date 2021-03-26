import React from "react";
import './styles.css';
import whatsappIcon from "../../assets/imagens/icons/whatsapp.svg";

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img
                    src="https://scontent.fpll4-1.fna.fbcdn.net/v/t1.0-9/133207102_1129732137460394_8719449655786547386_o.jpg?_nc_cat=104&ccb=3&_nc_sid=09cbfe&_nc_ohc=0p9bkY6T8zEAX-CFY8L&_nc_ht=scontent.fpll4-1.fna&oh=9d98dad35917122fe34dda3c2f2b3d09&oe=604EDF25"
                    alt=""
                />
                <div>
                    <strong>Raicley santana</strong>
                    <span>Quimica</span>
                </div>
            </header>

            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been<br/>
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
            </p>
            <footer>
                <p>
                    Preço por hora <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/> Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;