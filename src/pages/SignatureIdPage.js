import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';

import Hero from '../components/hero';
import StyledSection from '../components/styled-section';
import Logo from "../assets/emailsignature/senseinode_black.png";
import Linkedin from "../assets/emailsignature/linkedinlogo.png";

const Styles = css `
    width: 100%;
    height: 100;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    background-color: white;
`

const SignatureIdPage = () => {
    const [signature, setSignature] = useState(null);
    const { id } = useParams();
    const selectImg = (id) => {
        switch (id) {
            case 'senseinode_black.png':
                setSignature(Logo);
                break;
            case 'linkedinlogo.png':
                setSignature(Linkedin);
                break;
            default:
                setSignature(null);
                break;
        }
    }
    useEffect(() => {
        selectImg(id);
    }, [id]);
    return (
        <>
          <Hero title={"SignatureID"} />
          <StyledSection color={"white"} >
            <div className="container column">
              
              {
                signature && id ? (
                    <div>
                        <img src={signature} alt="signature" />
                    </div>
                )
                :
                (
                    <h2>Error</h2>
                )
              }
            </div>
          </StyledSection>
        </>
      );
}
export default SignatureIdPage;