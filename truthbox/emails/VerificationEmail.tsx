import {Html,Head,Font,Preview,Heading,Row,Section,Text,Button} from '@react-email/components';
interface VerificationEmailProps {
    username : string;
    otp : string;
}
export default function VerificationEmail({username,otp}:VerificationEmailProps){
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification code</title>
                <Font fontFamily="Roboto" fallbackFontFamily="Verdana" webFont={{url : "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2" , format : "woff2"}} fontWeight={400} fontStyle='normal'/>
            </Head>
            <Preview>Here&apos;s your verification code for TruthBox: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as='h2'>Hello, {username}!</Heading>
                </Row>
                <Row>
                    <Text>Thank you for signing up for TruthBox. Please use the verification code below to verify your email address and complete your registration:</Text>
                </Row>
                <Row>
                    <Heading as='h1' style={{fontSize: '32px', letterSpacing: '8px', marginTop: '20px', marginBottom: '20px'}}>{otp}</Heading>
                </Row>
                <Row>
                    <Text>If you did not sign up for a TruthBox account, please ignore this email.</Text>
                </Row>
            </Section>
            </Html>
    );
}