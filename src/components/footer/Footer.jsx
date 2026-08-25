import whats from './whats.png'
import face from './face.png'
import './Footer.css'

function Footer(){
     const ano = new Date().getFullYear()

     return(
        <footer className="rodape">
            <p>© {ano} *nome do site*, aplicativo de ajuda financeira</p>
            <a href="#" className="sobre">Sobre</a>
            <a href="#" className="telefone">telefone</a>
            <a href="#"><img src={whats} alt="whatsapp" className="whats"/></a>
            <a href="#"><img src={face} alt="facebook" className="face"/></a>
        </footer>
     )
}
export default Footer