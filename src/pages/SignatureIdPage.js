import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Logo from "../assets/emailsignature/senseinode_black.png";
import Linkedin from "../assets/emailsignature/linkedinlogo.png";

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
        </>
      );
}
export default SignatureIdPage;