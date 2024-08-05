import { Container } from 'react-bootstrap';
import styled from 'styled-components';

export const AppContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  background-color: var(--background-color);
`;