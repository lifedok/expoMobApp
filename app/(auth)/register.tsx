import { Label, Input, Title, Button, LinkComposite, Wrapper } from '~/app/(auth)/components';

export default function Register() {
  return (
    <Wrapper>
      <Title>Register</Title>

      <Label>Username</Label>
      <Input placeholder="Enter your username" />

      <Label>Email</Label>
      <Input placeholder="Enter your Email" />

      <Label>Password</Label>
      <Input placeholder="Enter your password" />

      <Label>Confirm password</Label>
      <Input mb="$4" placeholder="Confirm password" />

      <Button mt="$8">Create account</Button>

      <LinkComposite text="Have an account?" activeText="Sign in" pathname="/login" />
    </Wrapper>
  );
}
