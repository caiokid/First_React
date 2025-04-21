import { Container } from "../../Container"
import { Footer } from "../../footer"
import { Logo } from "../../Logo"
import { Menu } from "../../Menu"

type MainTemplastesPropos={
    children: React.ReactNode;
};


function MainTemplate({children} : MainTemplastesPropos){
  return (
    <>

      <Container>
       <Logo />
      </Container> 

      <Container>
       <Menu />
      </Container> 

    
      {children}

      
      <Container>    
       <Footer />
      </Container>  
    </>
  )
}
export default MainTemplate