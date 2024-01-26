import { ReactElement, ReactNode } from "react";
import { SizableText, YStack as TYStack, styled } from "tamagui";
import { Button } from "~/app/(auth)/components/button";

interface ILink {
  title: string;
  callback: MyFnType;
}

export default function Link(props: ILink): ReactElement {
  return (
    <YStack>
      <SizableText>Have an account?</SizableText>
      <Link href={{ pathname: "/login" }} asChild>
        <Button background={"link"}>Sign in</Button>
      </Link>
    </YStack>
  );
}

const YStack = styled(TYStack, {
  mt: 16,
  flexDirection: 'row',
  alignItems: 'flex-end',
  gap: 6,
})
