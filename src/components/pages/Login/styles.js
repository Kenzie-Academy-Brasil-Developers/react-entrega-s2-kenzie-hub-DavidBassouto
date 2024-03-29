import styled, { keyframes } from "styled-components";

const appearFromTop = keyframes`
from{
    opacity:0;
    transform: translateY(-10px);
}
to{
    opacity:1;
    transform: translateY(0px);
}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  width: 100%;
  gap: 10px;

  animation: ${appearFromTop} 1s;
`;
export const Logo = styled.div`
  width: 90%;
  max-width: 500px;
  > h1 {
    cursor: pointer;
    color: var(--pink);
    font-size: 16px;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  border-radius: 10px;

  width: 90%;
  max-width: 500px;
  height: 50%;
  max-height: fit-content;
  background: var(--darkblue);
  > span {
    color: var(--gray);
  }
`;
