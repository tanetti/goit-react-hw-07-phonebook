import styled from 'styled-components';

export const LoaderContainer = styled.div`
  position: ${({ position }) => (position ? position : 'static')};
  top: 50%;
  left: 50%;

  opacity: ${({ shouldShown }) => (shouldShown ? 1 : 0)};

  transition: ${({ theme }) => theme.transitions.opacity};

  transform: ${({ position }) =>
    position === 'absolute' ? 'translate(-50%, -50%)' : null};
`;
