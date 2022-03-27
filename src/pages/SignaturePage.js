import { NavLink } from 'react-router-dom';
import Hero from '../components/hero';
import StyledSection from '../components/styled-section';

const SignaturePage = () => {
    return (
        <>
          <Hero title={"Signature"} />
          <StyledSection color={"black"} >
            <div className="container column">
              <h2>Signature</h2>
                <div>
                    <NavLink to="/signature/senseinode_black.pngooir">Logo</NavLink>
                    <NavLink to="/signature/linkedinlogo.png">Linkedin</NavLink>
                </div>
            </div>
          </StyledSection>
        </>
      );
}
export default SignaturePage;