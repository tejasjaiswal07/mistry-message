import {Html , Font , Head, Preview, Heading, Row, Section, Text, Button} from '@react-email/components';


interface VerificationEmailProps {
   username: string;
   otp: string;
    }

 export default function VerificationEmail({username, otp}: VerificationEmailProps) {
    return(
        <Html lang="en" dir="ltr" ></Html>>
            <Head>
                <title>Verification Code</title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"

                />  

                <Preview> here&apos;s your Verification Code: {otp}</Preview>
                <Section>
                    <Row>
                        <Heading as='h2'>Hi {username},</Heading>
                    </Row>

                    <Row>
                        <Text>
                            thanks for signing up! Here&apos;s your verification code
                        </Text>
                    </Row>
                    <Row>
                        <Text>
                            {otp}
                        </Text>
                    </Row>

                    <Row>
                        <Text>
                            IF you didn&apos;t request this code, please ignore this email
                        </Text>
                    </Row>
                </Section>



            </Head>
            


    )            

            
 }