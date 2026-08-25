import './Header.css'


function Header() {
    return(
        <header>
             <h1 className="header_titulo">*nome do site*</h1>

      <nav className="header_nav">
        <a href="#">Home</a>
        <a href="#">Sobre</a>
        <a href="#">Contatos</a>
        <a href="#">entrar</a>
        <a href="#">inscrever-se</a>
      </nav>
        </header>
    )
}
export default Header