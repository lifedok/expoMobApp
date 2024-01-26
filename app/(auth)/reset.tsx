import { Button, Input, Label, LinkComposite, Title, Wrapper } from '~/app/(auth)/components';

export default function Reset() {
  return (
    <Wrapper>
      <Title>Reset</Title>

      <Label>Email</Label>
      <Input placeholder="Enter your email" />

      <Button mt="$8">Reset password</Button>

      <LinkComposite activeText="Back to login" pathname="/login" />
    </Wrapper>
  );
}
